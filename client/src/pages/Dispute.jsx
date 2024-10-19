import React, { useState, useEffect } from 'react';
import '../static/dispute.css';

const Dispute = () => {
  // Assuming you have dispute details that you will fetch from your API or database
  const [dispute, setDispute] = useState({
    title: '',
    description: '',
    status: '',
    createdDate: '',
    resolution: '',
  });

  // Mock dispute data for demonstration purposes
  useEffect(() => {
    const mockDispute = {
      title: 'Dispute over Contract Terms',
      description: 'There is a disagreement regarding the terms of the contract signed on January 1, 2023.',
      status: 'Pending',
      createdDate: '2023-01-15',
      resolution: 'Awaiting mediator assignment.',
    };
    setDispute(mockDispute);
  }, []);

  return (
    <div className="dispute">
      <h1>{dispute.title}</h1>
      <p><strong>Description:</strong> {dispute.description}</p>
      <p><strong>Status:</strong> {dispute.status}</p>
      <p><strong>Created Date:</strong> {dispute.createdDate}</p>
      <p><strong>Resolution:</strong> {dispute.resolution}</p>
      <button>Resolve Dispute</button>
    </div>
  );
};

export default Dispute;