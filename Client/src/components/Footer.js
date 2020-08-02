import React from 'react';
import logo2 from "../img/nsw-government-logo.png";

export default function Footer() {
    return (
        <footer className="footer  mt-auto py-3 bg-dark text-white sticky-bottom" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={logo2} width="100px" alt="NSW Government Logo" />
            <p style={{ fontSize: "12px" }}>This is a fictional competition and is not endorsed by the Governement of NSW</p>
        </footer>
    )
}
