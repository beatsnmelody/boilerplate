import React, { useEffect, useState } from "react";
import background from "./../assets/catplaceholder.gif"
import { NavLink } from "react-router-dom";

const Home = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (props.isLoggedIn) {
            setIsLoggedIn(true);
        }
    }, [props.isLoggedIn, props.setIsLoggedIn]);
    return (
    <div>
    <h1 className="header">
    WELCOME TO THE LAND OF HARAJUKU, WHERE FASHION RULEZ
    </h1>
    <h2 className="bdy">
    Welcome to your one-stop shop for everything about Harajuku fashion. We've spent a long time researching and curating the trendiest, most fashinable Harajuku gear to bring you the most fun and unique shopping experience on the internet!
    </h2>
    <img src={background} alt="background" className="background"/>
    </div>);
};

export default Home;