import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const linkStyle = {
    textDecoration: "none",
    color: "inherit",
};

const Navbar = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState("");

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location]);

    return (
        <div>
            <div className="d-flex justify-content-around mt-3">
                <Link to={"/"} style={linkStyle}>
                    <h2>
                        <span className="material-symbols-outlined">pets</span> CatPedia
                    </h2>
                </Link>
                <ul class="nav nav-underline">
                    <li className={`nav-item ${currentPage === "/" && "active"}`}>
                        <Link to="/" style={linkStyle} onClick={() => setCurrentPage("/")}>
                            <p className="nav-link" aria-current="page">
                                Home
                            </p>
                        </Link>
                    </li>
                    <li className={`nav-item ${currentPage === "/liked" && "active"}`}>
                        <Link
                            to="/liked"
                            style={linkStyle}
                            onClick={() => setCurrentPage("/liked")}
                        >
                            <p className="nav-link">Liked Images</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
