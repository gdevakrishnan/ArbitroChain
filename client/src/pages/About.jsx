import React from "react";
import "../static/about.css";

const About = () => {
  return (
    <section className="page about_page">
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Arbitrary Dispute Resolving (ADR) is designed to offer a fair,
          efficient, and cost-effective approach to resolving disputes. Our
          platform provides a trusted environment where technology-driven
          solutions facilitate transparent dispute resolution.
        </p>

        <div className="section-cards">
          <div className="card">
            <h2>Our Mission</h2>
            <p>Our mission is to redefine the dispute resolution experience by empowering individuals and organizations with accessible, technology-driven solutions. We aim to streamline the resolution process, ensuring fairness and efficiency at every stage while significantly reducing costs. By leveraging advanced tools and transparent practices, we create a secure environment that builds trust and clarity, transforming how disputes are resolved in a rapidly evolving digital world.
            </p>
          </div>

          <div className="card">
            <h2>Our Vision</h2>
            <p>
            Our vision is to revolutionize online dispute resolution, becoming the go-to platform for individuals and organizations seeking swift, transparent, and fair outcomes. We strive to redefine trust and impartiality through cutting-edge technology and innovative solutions, making the process not only efficient but also transformative, reshaping how disputes are resolved in the digital age.
            </p>
          </div>

          <div className="card">
            <h2>Our Values</h2>
            <p>
              <strong>Neutrality:</strong> We ensure impartiality across all
              processes.
            </p>
            <p>
              <strong>Transparency:</strong> We uphold clear communication at
              every stage.
            </p>
            <p>
              <strong>Efficiency:</strong> We focus on timely and cost-effective
              resolutions.
            </p>
            <p>
              <strong>Innovation:</strong> We leverage technology to enhance
              dispute resolution.
            </p>
          </div>
        </div>

        <h2>Our Team</h2>
        <div className="team-members">
        <div className="team-member">
            <h3>Abhinesh P R</h3>
            <p>Team Lead and Android Developer
            </p>
            <p>
            Aspiring innovator exploring Android development for impactful and sustainable solutions.
            </p>
          </div>
          <div className="team-member">
            <h3>Parvathy Nathan K</h3>
            <p>RPA Developer</p>
            <p>
            Aspiring innovator exploring RPA's potential for sustainable and efficient solutions.
            </p>
          </div>
          <div className="team-member">
            <h3>Deva Krishnan G</h3>
            <p>Full Stack Developer, BlockChain Developer</p>
            <p>
            Aspiring innovator exploring BlockChain development for impactful and sustainable solutions.
            </p>
          </div>
          {/* New Team Member */}
          <div className="team-member">
            <h3>John Wesly P D</h3>
            <p>BlockChain Developer, Android Developer</p>
            <p>Aspiring innovator exploring Android development for impactful and sustainable solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
