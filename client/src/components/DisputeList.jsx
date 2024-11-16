import React, { useContext, useEffect, useState } from 'react';
import appContext from '../context/appContext';
import '../static/disputeList.css';

function DisputeList() {
  const { State, setMsg, setErrorMsg } = useContext(appContext);
  const { ReadContract, WriteContract } = State;

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
  }, [ReadContract, disputes]);

  const handleVote = async (disputeId, vote) => {
    try {
        console.log(disputeId, vote);
        const tx = await WriteContract.vote(disputeId, vote);
        await tx.wait(); // Wait for the transaction to be mined

        console.log("Voted successfully:", tx);
        setMsg('Voted Successfully');
        console.log(`Voted ${vote} for dispute ID: ${disputeId}`);
    } catch (e) {
        if (e.message.includes("Already voted")) {
          setErrorMsg("You already voted for this dispute");
        } else {
            console.error("Error voting:", e.message);
        }
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
                    onClick={() => {
                      handleVote(dispute.id, 1)
                    }}
                  >
                    Vote A
                  </button>
                  <button
                    className="vote_button vote_b"
                    onClick={() => {
                      handleVote(dispute.id, 2);
                    }}
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
