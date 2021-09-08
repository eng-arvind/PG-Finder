import React from "react";
import "./Body.css";

const Body = () => {
  return (
    <div className="reset-this container">
        <img
          className="image"
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt="background"
          style={{ width: "100%", height: "697px" }}
        />
        <div className="centeredText">Finding PG is easy Now</div>
    </div>
  );
};
export default Body;
