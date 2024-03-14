import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./Home.css";

const customButtonStyle = {
  marginTop: "1rem",
  display: "inline-block",
  padding: "10px 40px",
  borderRadius: "20px",
  backgroundColor: "#fdc913",
  color: "#292929",
  textDecoration: "none",
  fontSize: "large",
};

export default function Main() {
  return (
    <section className="main-section">
      <img
        className="fullscreen-image"
        src="./Assets/mile1-assets/home-banner.png"
        alt=""
      />
      <img className="logo" src="./Assets/mile1-assets/logo.svg" />
      <div className="main">
        <div className="metinler">
          <p>KOD ACIKTIRIR </p>
          <p>PIZZA, DOYURUR</p>
        </div>
        <Link to="/siparis">
          <Button data-cy="aciktim" style={customButtonStyle}>
            ACIKTIM
          </Button>
        </Link>
      </div>
    </section>
  );
}
