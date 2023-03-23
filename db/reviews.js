const client = require("./client");

async function createReview({productId, userId, title, description, rating, isPublic}) {
   try {
      const {
        rows: [review],
      } = await client.query(
        `
      INSERT INTO reviews ("productId", "userId", title, description, rating, 
      "isPublic")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
        [productId, userId, title, description, rating, isPublic]
      );
      return review;
    } catch (error) {
      console.log(error);
    }
}

async function getAllReviews() {
   try {
      const { rows: reviews } = await client.query(`
        SELECT r.*, u.username AS "username"
        FROM reviews r
        JOIN users u 
        ON u.id = r."userId"
      `);
      return reviews
    } catch (error) {
      console.log(error);
    }
}

async function getReviewById(id) {
  try {
    const {
      rows: [review],
    } = await client.query(`
      SELECT *
      FROM reviews
      WHERE id=${id}
      `);
    if (!review) {
      return null;
    }
    return review;
  } catch (error) {
    console.log(error);
  }
}

async function getAllPublicReviews() {
   try {
      const reviews = await getAllReviews();
  
      return reviews.filter((review) => review.isPublic === true);
    } catch (error) {
      console.log(error);
    }
}

async function getAllReviewsByUser(username) {
   try {
      const reviews = await getAllReviews();
  
      return reviews.filter((review) => review.username === username);
    } catch (error) {
      console.log(error);
    }
}

async function getAllPublicReviewsByUser(username) {
   try {
      const reviews = await getAllReviewsByUser({ username });
  
      return reviews.filter((review) => review.isPublic === true);
    } catch (error) {
      console.log(error);
    }
}

async function getAllReviewsByProduct(productId) {
   try {
      const reviews = await getAllReviews();
      const {
        rows: [review],
      } = await client.query(`
        SELECT * FROM products p
        JOIN reviews r
        ON r.id = p."productId"
      `)
      return reviews.filter((review) => review.productId === productId);
    } catch (error) {
      console.log(error);
    }
}

async function getAllPublicReviewsByProduct() {
   try {
      const reviews = await getAllReviewsByProduct({ productId });
  
      return reviews.filter((review) => review.isPublic === true);
    } catch (error) {
      console.log(error);
    }
}

async function updateReview({id, ...fields}) {
   const setString = Object.keys(fields)
   .map((key, index) => `"${key}"=$${index + 1}`)
   .join(", ");
 // return early if this is called without fields
 if (setString.length === 0) {
   return;
 }
 try {
   const {
     rows: [reviews],
   } = await client.query(
     `
   UPDATE reviews
   SET ${setString}
   WHERE id=${id}
   RETURNING *;
 `,
     Object.values(fields)
   );

   return reviews;
 } catch (error) {
   console.log(error);
 }
}

async function deleteReview(id) {
   try {
      await client.query(
        `
      DELETE FROM reviews
      WHERE id=$1;`,
        [id]
      );
    } catch (error) {
      console.log(error);
    }
}

module.exports = {
   createReview,
   getAllReviews,
   getReviewById,
   getAllPublicReviews,
   getAllReviewsByUser,
   getAllPublicReviewsByUser,
   getAllReviewsByProduct,
   getAllPublicReviewsByProduct,
   updateReview,
   deleteReview
}