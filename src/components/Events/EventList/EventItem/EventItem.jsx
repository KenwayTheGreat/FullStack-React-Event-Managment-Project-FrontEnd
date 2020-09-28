import React from "react";
import "./EventItem.css";

function EventItem(props) {
  return (
    <li key={props.eventId} className="events-list-item">
      <div>
        <h1>{props.title}</h1>
        <h2>
          ${props.price} - {new Date(props.date).toLocaleDateString("de-DE")}
        </h2>
      </div>
      <div>
        {props.userId === props.creatorId ? (
          <p> You're the owner of this Event</p>
        ) : (
          <button
            className="btn"
            onClick={props.onDetail.bind(this, props.eventId)}
          >
            View Details
          </button>
        )}
      </div>
    </li>
  );
}

export default EventItem;
