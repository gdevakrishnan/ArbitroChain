import React from "react";
import "../static/about.css";

const About = () => {
  return (
    <section className="page about_page">
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Arbitrary Dispute Resolving (ADR) is a platform designed to facilitate
          the resolution of disputes in a fair, efficient, and cost-effective
          manner. Our mission is to provide a trusted and neutral environment
          for parties to resolve their disputes through a transparent and
          technology-driven process.
        </p>

        <h2>Our Mission</h2>
        <p>
          To empower individuals and organizations to resolve disputes in a
          fair, efficient, and cost-effective manner.
        </p>

        <h2>Our Vision</h2>
        <p>
          To become the leading online dispute resolution platform, trusted by
          individuals and organizations worldwide.
        </p>

        <h2>Our Values</h2>
        <ul>
          <li>
            Neutrality: We remain impartial and unbiased in all dispute
            resolution processes.
          </li>
          <li>
            Transparency: We ensure that all parties have access to clear and
            concise information throughout the dispute resolution process.
          </li>
          <li>
            Efficiency: We strive to resolve disputes in a timely and
            cost-effective manner.
          </li>
          <li>
            Innovation: We continuously develop and implement new technologies
            to improve the dispute resolution process.
          </li>
        </ul>

        <h2>Our Team</h2>
        <div>
          <div>
            <h3>John Doe</h3>
            <p>Founder and CEO</p>
            <p>
              John is a seasoned entrepreneur and dispute resolution expert with
              over 10 years of experience.
            </p>
          </div>
          <div>
            <h3>Jane Smith</h3>
            <p>COO</p>
            <p>
              Jane is a highly experienced operations executive with a proven
              track record of success.
            </p>
          </div>
          <div>
            <h3>Bob Johnson</h3>
            <p>CTO</p>
            <p>
              Bob is a technology expert with over 15 years of experience in
              software development and IT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
