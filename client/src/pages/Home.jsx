import React, { Fragment } from "react";
import img1 from "../assets/icons/dashboard/img1.png";
import img2 from "../assets/icons/dashboard/img2.png";
import img3 from "../assets/icons/dashboard/img3.png";
import img4 from "../assets/icons/dashboard/img4.png";
import { Link } from "react-router-dom";
import "../static/home.css";

function Home() {
  return (
    <Fragment>
      <section className="page hero_page">
        <div className="main_container">
          <div className="container">
            <img src={img1} alt="img1" className="img1" />
            <img src={img2} alt="img2" className="img2" />
            <img src={img3} alt="img3" className="img3" />
            <img src={img4} alt="img4" className="img4" />

            <div className="content">
              <h1 className="hero_title">
                <span>Jury-Rigg</span> {" "}
              </h1>
              <h1 className="hero_title">Arbitration System</h1>
              <p className="hero_content">Unlock a new era of dispute resolution with a token-powered system that puts fairness in your community's hands. Harness smart contracts for transparent decision-making and empower governance to drive equitable outcomes. Transform conflicts into growth with blockchain-enabled justice.
              </p>
            </div>

            <div className="button">
              <Link to={"/login"}>
                <button className="btn">Continue Login</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Home;
