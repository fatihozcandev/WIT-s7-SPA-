import React from "react";
import "./SiparisHeader.css";

export default function SiparisHeader() {
  return (
    <header className="siparis-header">
      <img className="logo" src="./Assets/mile1-assets/logo.svg" />
      <p>
        Anasayfa - Seçenekler -<span id="secili-bolum"> Deneme</span>
      </p>
    </header>
  );
}
