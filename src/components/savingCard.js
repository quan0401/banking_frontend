import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const SavingsCards = ({ userId }) => {
  const [savings, setSavings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const response = await axios.post(
          "http://localhost:6969/api/v1/getsavings",
          { userId }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch savings");
        }

        const data = response.data;

        if ("savings" in data) {
          setSavings(data.savings);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        setError(error.message || "Unknown error");
      }
    };

    fetchSavings();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!savings) {
    return <div>No savings found for user ID {userId}</div>;
  }

  return (
    <div className="container my-5">
      <h2
        className="text-center mb-4"
        style={{ fontFamily: "Arial, sans-serif", color: "#4a4a4a" }}
      >
        My Savings
      </h2>
      {savings.map((saving) => (
        <div key={saving.id} className="row mb-4">
          <div className="col">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "10px" }}
            >
              <div
                className="card-header"
                style={{
                  backgroundColor: "#0056b3",
                  color: "#fff",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <h5 className="card-title mb-0">Saving ID: {saving.id}</h5>
              </div>
              <div className="card-body" style={{ backgroundColor: "#f8f9fa" }}>
                <p className="card-text">
                  <strong>Plan ID:</strong> {saving.savingPlanId}
                  <br />
                  <strong>Balance:</strong>{" "}
                  <span style={{ color: "#28a745" }}>
                    ${saving.balance.toLocaleString()}
                  </span>
                  <br />
                  <strong>Status:</strong>{" "}
                  <span
                    style={{ color: saving.status ? "#28a745" : "#dc3545" }}
                  >
                    {saving.status ? "Active" : "Inactive"}
                  </span>
                  <br />
                  <strong>Created At:</strong>{" "}
                  {new Date(saving.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div
                className="card-footer"
                style={{
                  backgroundColor: "transparent",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                <button className="btn btn-primary w-100">View Details</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavingsCards;
