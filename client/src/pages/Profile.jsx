import React, { useState, useEffect, useContext } from "react";
import "../static/profile.css";
import profile_pic from "../assets/profile.png";
import appContext from '../context/appContext';
import { ethers } from "ethers";

const Profile = () => {
  const { State } = useContext(appContext);
  const {
    WriteContract,
    ReadContract,
    WalletAddress,
    ContractAddress,
    GrullWriteContract,
  } = State;

  const [user, setUser] = useState({
    address: "",
    stake: 0,
  });

  const getStake = async () => {
    try {
      const stake = await ReadContract.getArbitratorStake(WalletAddress);
      const stakeValue = ethers.utils.formatUnits(stake, "ether"); // Convert to ether
      setUser((prevUser) => ({ ...prevUser, stake: stakeValue }));
    } catch (e) {
      console.log("Error fetching stake: ", e.message);
    }
  };

  const buyStake = async (e) => {
    e.preventDefault();

    const stakeAmount = ethers.utils.parseUnits("0.0001", "ether"); // 0.0001 ETH in wei

    try {
      // Approve the contract to spend GrullTokens on behalf of the user
      const approveTx = await GrullWriteContract.approve(ContractAddress, stakeAmount);
      await approveTx.wait(); // Wait for the transaction to be mined
      console.log("Approval successful");

      // Call the depositStake function from the ArbitroChain contract
      const depositTx = await WriteContract.depositStake(stakeAmount);
      await depositTx.wait(); // Wait for the transaction to be mined
      console.log("Stake deposited successfully");

      // Refresh the stake information after successful deposit.
      getStake();
    } catch (e) {
      console.log("Error depositing stake: ", e);
      console.log("Error message: ", e.message);
    }
  };

  useEffect(() => {
    if (WalletAddress) {
      setUser((prevUser) => ({ ...prevUser, address: WalletAddress }));
      getStake();
    }
  }, [WalletAddress]);

  return (
    <div className="profile">
      <div className="profile-picture">
        <img src={profile_pic} alt={user.address} />
      </div>
      <div className="profile-info">
        <h1>{user.address.slice(0, 8)}...{user.address.slice(-8, -1)}</h1>
        <p>Stake: {parseFloat(user.stake).toFixed(4)} GT</p>
        <button onClick={(e) => buyStake(e)}>Buy Stake</button>
      </div>
    </div>
  );
};

export default Profile;
