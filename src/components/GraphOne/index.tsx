import React, { useState } from "react";

const GraphOne: React.FC = () => {
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [orgId, setOrgId] = useState<string>("");

  const handleSubmit = () => {
    // Placeholder for handling data submission
    console.log("Date From:", dateFrom);
    console.log("Date To:", dateTo);
    console.log("Org ID:", orgId);
    // Add additional logic here, like calling an API or updating the parent component
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Component One</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Date From:
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Date To:
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Org ID:
          <input
            type="text"
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default GraphOne;
