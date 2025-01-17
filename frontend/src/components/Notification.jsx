import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Notification() {
  const authToken = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.user._id);
  const [notifications, setNotification] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;

  const fetchNotification = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/notify/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setNotification(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchNotification();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const handleNextPage = () => {
    if (currentPage * notificationsPerPage < notifications.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="m-4 mx-auto w-full max-w-3xl">
        <h1 className="text-2xl font-semibold font-poppins text-center">Your Notifications...</h1>
      

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{
            padding: "0.5rem 1rem",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            backgroundColor: currentPage === 1 ? "#ddd" : "#34AF9D",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            width: "120px",
          }}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage * notificationsPerPage >= notifications.length}
          style={{
            padding: "0.5rem 1rem",
            cursor:
              currentPage * notificationsPerPage >= notifications.length
                ? "not-allowed"
                : "pointer",
            backgroundColor:
              currentPage * notificationsPerPage >= notifications.length
                ? "#ddd"
                : "#34AF9D",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            width: "120px",
          }}
        >
          Next
        </button>
      </div>
      <ul className="mt-5">
        {currentNotifications.map((notification) => (
          <li key={notification.id} className="border-2 border-gray-200 py-2 bg-gradient-to-br from-greyish to light shadow-lg mb-4 rounded-lg p-2">
            <h3>{notification.message}</h3>
            <p>{formatDate(notification.sentAt)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;
