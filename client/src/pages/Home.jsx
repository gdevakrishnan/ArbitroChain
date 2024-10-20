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
                <span>Smart</span> Attendance,{" "}
              </h1>
              <h1 className="hero_title">Smarter Workforce</h1>
              <p className="hero_content">
                With our software, attendance is more than just a check-in.
                Leverage comprehensive analytics to understand productivity
                trends, improve scheduling, and make smarter workforce decisions
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
