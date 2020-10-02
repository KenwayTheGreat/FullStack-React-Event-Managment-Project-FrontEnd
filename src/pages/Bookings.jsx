import React, { Component } from "react";
import Spinner from "../components/Spinner/Spinner";
import AuthContext from "../context/auth-context";
import BookingList from "../components/Bookings/BookingList/BookingList";
import BookingsChart from "../components/Bookings/BookingsChart/BookingsChart";
import BookingsControls from "../components/Bookings/BookingsControls/BookingControls";

export default class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: [],
    output: "List",
  };

  isActive = true;
  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({ isLoading: true });
    const reqBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
              price
            }
          }
        }
      `,
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed !!!");
        }
        return res.json();
      })
      .then((resData) => {
        const bookings = resData.data.bookings;

        if (this.isActive) {
          this.setState({ bookings: bookings, isLoading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  deleteBookingHandler = (bookingId) => {
    this.setState({ isLoading: true });
    const reqBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
            _id
            title
          }
        }
      `,
      variables: {
        id: bookingId,
      },
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed !!!");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState((prevState) => {
          const updatedBookings = prevState.bookings.filter((booking) => {
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings, isLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeTypeHandler = (type) => {
    if (type === "List") {
      this.setState({ output: "List" });
    } else {
      this.setState({ output: "Chart" });
    }
  };

  render() {
    let content = <Spinner />;

    if (!this.state.isLoading) {
      content = (
        <React.Fragment>
          <BookingsControls
            activeButton={this.state.output}
            onChange={this.changeTypeHandler}
          />

          <div>
            {this.state.output === "List" ? (
              <BookingList
                bookings={this.state.bookings}
                onDelete={this.deleteBookingHandler}
              />
            ) : (
              <BookingsChart bookings={this.state.bookings} />
            )}
          </div>
        </React.Fragment>
      );
    }
    return <React.Fragment>{content}</React.Fragment>;
  }
}
