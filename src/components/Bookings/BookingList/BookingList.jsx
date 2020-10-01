import React from "react";
import "./BookingList.css";

function BookingList(props) {
  return (
    <ul className="bookings-list">
      {props.bookings.map((booking) => {
        return (
          <li className="booking-list-item" key={booking._id}>
            <div className="bookings-item-data">
              {booking.event.title} -{" "}
              {new Date(booking.createdAt).toLocaleDateString()}
            </div>
            <div className="bookings-item-actions">
              <button
                className="btn"
                onClick={props.onDelete.bind(this, booking._id)}
              >
                Cancel
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default BookingList;
