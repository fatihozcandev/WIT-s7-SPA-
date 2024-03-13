import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const customButtonStyle = {
  marginTop: "1rem",
  display: "inline-block",
  padding: "10px 40px",
  borderRadius: "20px",
  backgroundColor: "#fdc913",
  color: "black",
  textDecoration: "none",
  fontSize: "large",
};

export default function Main() {
  return (
    <div className="main">
      <section>
        <img className="logo" src="./Assets/mile1-assets/logo.svg" />
      </section>
      <p className="mainP">KOD ACIKTIRIR </p>
      <p className="mainP">PIZZA, DOYURUR</p>
      <Link to="/siparis">
        <Button style={customButtonStyle}>Acıktım</Button>
      </Link>
    </div>
  );
}
