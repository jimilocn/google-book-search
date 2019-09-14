import React from "react";
// import Button from "../Button";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem(props) {
  return <li className="list-group-item">
  
  <h1>{props.children}</h1>
   <img alt={props.key} src={props.thumbnail}/>
   <p>{props.info}
     </p>
 
{/* 
<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src={props.thumbnail} class="card-img" alt="book image"/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{props.title} by {props.authors}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div> */}
     
     </li>;
}
