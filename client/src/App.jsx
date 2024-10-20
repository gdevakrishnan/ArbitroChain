import React, { Fragment, useEffect, useState } from 'react';
import { ethers } from "ethers";
import ABI from "./contractJson/ArbitroChain.json";
import GrullABI from "./contractJson/GrullToken.json";
import Router from './router/Router';
import appContext from './context/appContext';

function App() {
  const initialState = {
    WindowEthereum: false,
    ContractAddress: "0x0532A7259F2c82F0FFBb0AA9b19302B26c4B0c07",
    GrullContractAddress: "0xE890f155432a67C6DE6db70fa2560fEd0a26934a",
    WalletAddress: null,
    ContractAbi: ABI.abi,
    GrullContractAbi: GrullABI.abi,
    Provider: null,
    Signer: null,
    ReadContract: null,
    WriteContract: null,
    GrullReadContract: null,
    GrullWriteContract: null,
  };

  const [State, setState] = useState(initialState);

  useEffect(() => {
    getStateParameters();
  }, []);

  const getStateParameters = async () => {
    if (window.ethereum) {
      setState(prevState => ({
        ...prevState,
        WindowEthereum: true
      }));

      const Provider = new ethers.providers.Web3Provider(window.ethereum);
      await Provider.send("eth_requestAccounts", []);
      const Signer = await Provider.getSigner();
      const WalletAddress = await Signer.getAddress();

      setState(prevState => ({
        ...prevState,
        WalletAddress,
        Provider,
        Signer
      }));

      const ReadContract = new ethers.Contract(
        State.ContractAddress,
        State.ContractAbi,
        Provider
      );
      const WriteContract = new ethers.Contract(
        State.ContractAddress,
        State.ContractAbi,
        Signer
      );

      const GrullReadContract = new ethers.Contract(
        State.GrullContractAddress,
        State.GrullContractAbi,
        Provider
      );
      const GrullWriteContract = new ethers.Contract(
        State.GrullContractAddress,
        State.GrullContractAbi,
        Signer
      );

      setState(prevState => ({
        ...prevState,
        ReadContract,
        WriteContract,
        GrullReadContract,
        GrullWriteContract
      }));
    } else {
      console.log("Metamask Not Found");
    }
  };

  const context = {
    State,
    setState,
    getStateParameters,
  };

  return (
    <Fragment>
      <appContext.Provider value={context}>
        <Router />
      </appContext.Provider>
    </Fragment>
  );
}

export default App;
