import React, { Fragment, useEffect, useState } from 'react';
import { ethers } from "ethers";
import ABI from "./contractJson/ArbitroChain.json";
import GrullABI from "./contractJson/GrullToken.json";
import Router from './router/Router';
import appContext from './context/appContext';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const initialState = {
    WindowEthereum: false,
    ContractAddress: "0x9EE22d9DEB6544858FcFb28B20C6302197CF04e7",
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
  const [msg, setMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
      setErrorMsg("Metamask Not Found");
    }
  };

  const context = {
    State,
    setState,
    getStateParameters,
    setMsg,
    setErrorMsg
  };

  useEffect(() => {
    msg && toast.success(msg, { autoClose: 4000 });
    setMsg(null); // Reset msg after showing toast
  }, [msg]);
 
  useEffect(() => {
    errorMsg && toast.error(errorMsg, { autoClose: 4000 });
    setErrorMsg(null); // Reset errorMsg after showing toast
  }, [errorMsg]);

  return (
    <Fragment>
      <ToastContainer />
      <appContext.Provider value={context}>
        <Router />
      </appContext.Provider>
    </Fragment>
  );
}

export default App;
