import React, { Fragment, useContext, useState } from "react";
import "../static/dispute.css";
import appContext from "../context/appContext";
import DisputeList from '../components/DisputeList';

const Dispute = () => {
  const { State, setMsg, setErrorMsg } = useContext(appContext);

  const {
    WriteContract,
  } = State;

  const [formData, setFormData] = useState({
    companyA: "",
    companyB: "",
    companyBAddress: "",
    issueDescription: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { companyA, companyB, companyBAddress, issueDescription, category } = formData;

    try {
      const fields = [companyA, companyB, companyBAddress, issueDescription, category];

      if (fields.some(field => field.trim() === "")) {
        setErrorMsg("Enter all the fields");
        return;
      }

      // Call the raiseDispute function in the smart contract
      const tx = await WriteContract.raiseDispute(companyA, companyB, issueDescription, category);
      await tx.wait(); // Wait for the transaction to be mined

      console.log("Dispute raised successfully:", tx);
      setMsg("Dispute Raised Successfully");

      // Reset the form data after submission
      setFormData({
        companyA: "",
        companyB: "",
        companyBAddress: "",
        issueDescription: "",
        category: "",
      });
    } catch (error) {
      console.error("Error raising dispute:", error);
    }
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
            <label htmlFor="companyBAddress">Opposition Company Address</label>
            <input
              type="text"
              id="companyBAddress"
              name="companyBAddress"
              value={formData.companyBAddress}
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
              <option value="Transaction Disagreements">Transaction Disagreements</option>
              <option value="Token Ownership Issues">Token Ownership Issues</option>
              <option value="Governance Disputes">Governance Disputes</option>
              <option value="User Conduct Violations">User Conduct Violations</option>
              <option value="Protocol Violation Claims">Protocol Violation Claims</option>
            </select>
          </div>
          <div className="form_group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
      <DisputeList />
    </Fragment>
  );
};

export default Dispute;
