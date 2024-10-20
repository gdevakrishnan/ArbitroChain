import React, { Fragment, useState } from "react";
import "../static/dispute.css";

const Dispute = () => {
  const [formData, setFormData] = useState({
    companyA: "",
    companyB: "",
    issueDescription: "",
    category: "", // Added category state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);
  };

  return (
    <Fragment>
      <section className="form_page">
        <h2>Issue Reporting Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label htmlFor="companyA">Your Company Name</label>
            <input
              type="text"
              id="companyA"
              name="companyA"
              value={formData.companyA}
              onChange={handleChange}
            />
          </div>
          <div className="form_group">
            <label htmlFor="companyB">Opposition Company Name</label>
            <input
              type="text"
              id="companyB"
              name="companyB"
              value={formData.companyB}
              onChange={handleChange}
            />
          </div>
          <div className="form_group">
            <label htmlFor="issueDescription">Issue Description</label>
            <textarea
              id="issueDescription"
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleChange}
            />
          </div>
          <div className="form_group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Fraud Claims">Fraud Claims</option>
              <option value="Transaction Disagreements">
                Transaction Disagreements
              </option>
              <option value="Token Ownership Issues">
                Token Ownership Issues
              </option>
              <option value="Governance Disputes">Governance Disputes</option>
              <option value="User Conduct Violations">
                User Conduct Violations
              </option>
              <option value="Protocol Violation Claims">
                Protocol Violation Claims
              </option>
            </select>
          </div>
          <div className="form_group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
      <section className="page dispute_list">
        <h1>List of disputes</h1>
      </section>
    </Fragment>
  );
};

export default Dispute;
