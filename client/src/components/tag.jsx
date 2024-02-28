import React from "react";

export default function Tag({ name, color }) {
  return (
    <p
      className="rounded d-inline-block ps-2 pe-2 me-2"
      style={{
        background: "#c5c5c520",
        color: color,
        border: `1px solid ${color}`,
      }}
    >
      {name}
    </p>
  );
}
