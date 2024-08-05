import React from "react";

interface CardFileProps {
  id: string;
  title: string;
  description: string;
  handleClick: (title: string) => void;
  isDisable: boolean;
  completed: boolean;
}

const cardStyle: React.CSSProperties = {
  margin: "5px auto",
  border: "1px solid #d9d9d9",
  borderRadius: "4px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  width: "350px",
  backgroundColor: "#fff",
  position: "relative",
};

const buttonStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "5px",
  backgroundColor: "#1677ff",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};

const disabledButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#d9d9d9",
  cursor: "not-allowed",
};

const CardFile: React.FC<CardFileProps> = ({
  id,
  title,
  description,
  handleClick,
  isDisable,
  completed,
}) => (
  <div style={cardStyle}>
    <div>
      <span style={{ fontWeight: "800" }}>Task {id}</span>
      {!completed && (
        <button
          style={isDisable ? disabledButtonStyle : buttonStyle}
          onClick={() => !isDisable && handleClick(title)}
          disabled={isDisable}>
          Done
        </button>
      )}
    </div>
    <div style={{ marginBottom: "8px", fontWeight: "bold" }}>{title}</div>
    <p style={{ color: "grey" }}>{description}</p>
  </div>
);

export default CardFile;
