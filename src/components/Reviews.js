import React from "react";
import { useState, useEffect } from "react";
import { fetchPublicReviews, createReview, editReview } from "../apiFrontend/api";

const Reviews = (props) => {
    const {
        userToken,
        productId
    } = props
    const [reviews, setReviews] = useState([]);
  
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState("")
  
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editRating, setEditRating] = useState("");
  const [editIsPublic, setEditIsPublic] = useState(false);
  
    const handleSubmit = async (event) => {
    (userToken ? handleSubmit : null);
      event.preventDefault();
      const newReview = await createReview({
        isPublic: true,
        title: `${title}`,
        description: `${description}`,
        rating: `${rating}`,
      });
      setReviews([...reviews, newReview]);
      setName("");
      setGoal("");
    };
  
    const handleEditSubmit = async (event, reviewId) => {
      (userToken ? handleEditSubmit : null);
      event.preventDefault();
      const editedReview = await editReview(editTitle, editDescription, editRating, reviewId);
      
      const editedReviews = reviews.map((review) => {
        if (review.id === reviewId) {
          return editedReview;
        }
        return review;
      });
      setRoutines(editedReviews);
      setEditTitle("");
      setEditDescription("");
      setEditRating("");
      setEditIsPublic(false);
    };
  
    useEffect(() => {
      const fetchReviews = async () => {
        const data = await fetchPublicReviews();
        setReviews(data);
      };
      fetchReviews();
    }, []);
    console.log(reviews);
    return (
      <div>
         <ul>
          {reviews.filter((review) => review.id == productId).map((review) => (
            <li
              key={review.id}
            >
              <h1 className="header">
                {review.title}
              </h1>

              <h2 className="bdy">{review.rating}</h2>
  
              <h2 className="bdy">{review.description}</h2>
            </li>
          ))}
        </ul>
        <h1 className="header">
          Make A Review
        </h1>
        <form onSubmit={handleSubmit}>
          <label classname="lablez">
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <br />
          <label classname="lablez">
            Rating:
            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
          </label>
          <br />
          <label classname="lablez">
            Description:
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <br />
          <button type="submit" className="button">Create Review</button>
        </form>
      </div>
    );
  };
  
  export default Reviews;