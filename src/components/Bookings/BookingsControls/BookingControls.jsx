import React from "react";
import "./BookingsControls.css";

function BookingControls(props) {
  return (
    <div className="bookings-control">
      <button
        className={props.activeButton === "List" ? "active" : ""}
        onClick={props.onChange.bind(this, "List")}
      >
        Bookings
      </button>
      <button
        className={props.activeButton === "Chart" ? "active" : ""}
        onClick={props.onChange.bind(this, "Chart")}
      >
        Chart
      </button>
    </div>
  );
}

export default BookingControls;
