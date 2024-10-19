import React, { Fragment, useEffect, useState } from 'react';
import { ethers } from "ethers";
import ABI from "./contractJson/ArbitroChain.json";
import Router from './router/Router';
import appContext from './context/appContext';

function App() {
  const initialState = {
    WindowEthereum: false,
    ContractAddress: "0xD0EE8Ddf759a7b8d0ca7441DC6fDb650F698C710",
    WalletAddress: null,
    Balance: 0,
    ContractAbi: ABI.abi,
    Provider: null,
    Signer: null,
    ReadContract: null,
    WriteContract: null,
  };

  const [State, setState] = useState(initialState);
  const [navState, setNavState] = useState(null); // Define navState and setNavState

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

      setState(prevState => ({
        ...prevState,
        ReadContract,
        WriteContract
      }));

      const accBalance = await ReadContract.accountBalance({ from: WalletAddress });
      const accBalanceEth = ethers.utils.formatEther(accBalance);

      setState(prevState => ({
        ...prevState,
        Balance: accBalanceEth,
      }));
    } else {
      console.log("Metamask Not Found");
    }
  };

  const context = {
    State,
    setState,
    getStateParameters,
    navState,
    setNavState
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
