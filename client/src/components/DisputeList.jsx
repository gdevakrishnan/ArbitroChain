import React, { useContext, useEffect, useState } from 'react';
import appContext from '../context/appContext';
import '../static/disputeList.css';

function DisputeList() {
  const { State } = useContext(appContext);
  const { ReadContract } = State;

  const [disputes, setDisputes] = useState([]);

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const disputeData = await ReadContract.getAllDisputes();
        setDisputes(disputeData);
      } catch (error) {
        console.error("Error fetching disputes:", error);
      }
    };

    fetchDisputes();
  }, [ReadContract]);

  const handleVote = async (disputeId, vote) => {
    try {
      // Here you would call the smart contract function to vote
      // For example: await WriteContract.vote(disputeId, vote);
      console.log(`Voted ${vote} for dispute ID: ${disputeId}`);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div>
      <section className="page dispute_list_page">
        <h1>Dispute List</h1>
        <div className="dispute_list">
          {disputes.length === 0 ? (
            <p>No disputes found.</p>
          ) : (
            disputes.map((dispute, index) => (
              <div className="dispute_card" key={index}>
                <h3>A: {dispute.companyAName} vs B: {dispute.companyBName}</h3>
                <p><strong>Issue:</strong> {dispute.issueDescription}</p>
                <p><strong>Category:</strong> {dispute.category}</p>
                <p><strong>Status:</strong> {dispute.resolved ? "Resolved" : "Pending"}</p>
                <div className="vote_buttons">
                  <button
                    className="vote_button vote_a"
                    onClick={() => handleVote(dispute.id, 'A')}
                  >
                    Vote A
                  </button>
                  <button
                    className="vote_button vote_b"
                    onClick={() => handleVote(dispute.id, 'B')}
                  >
                    Vote B
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default DisputeList;
