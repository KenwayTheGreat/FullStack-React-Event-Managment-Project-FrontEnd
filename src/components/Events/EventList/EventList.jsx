import React from "react";
import EventItem from "./EventItem/EventItem";
import "./EventList.css";

function EventList(props) {
  const events = props.events.map((event) => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        price={event.price}
        date={event.date}
        userId={props.authUserId}
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  });
  return <ul className="event-list">{events}</ul>;
}

export default EventList;