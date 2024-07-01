import { ethers } from "ethers";
import * as ReactBootStrap from "react-bootstrap";
import { useState, useEffect } from "react";
import ABIFILE from "./artifacts/contracts/BlockchainVoting.sol/BlockchainVoting.json";
import FatcVoter from "./comp/FatcVoter";
import Propsal from "./comp/Propsal";
import Set from "./comp/FatchCandi";
import Vote from "./comp/Vote";
const ABI = ABIFILE.abi;
const ContractAddress = "0xE984f31e44273844F9B313d66eBED6Eb8e73376D";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isoff, setOff] = useState(false);
  const [loading, setLoading] = useState(false);

  const Dicconnect = async () => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("Connected")) {
        window.localStorage.removeItem("Connected");
        setOff(false);
        window.location.reload();
      } else {
      }
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("Connected")) {
        Connect();
      }
    }
  }, []);

  const Connect = async (e) => {
    // e.preventDefault();
    setLoading(true);
    if (typeof window.ethereum !== "undefined") {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setOff(true);
      window.localStorage.setItem("Connected", "injected");
      console.log(account);
      setAccount(account);
      document.getElementById("connectbtn").innerHTML = account;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const signer = provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(ContractAddress, ABI, signer);
      setContract(contract);
      console.log(contract);
    }
  };
  return (
    <div
      className="mx-auto p-4 text-light  "
      style={{
        width: 1000,
        marginTop: 25,
        backgroundColor: "rgb(135,62,35)",
      }}
    >
      <p className="text-center h5 text-warning p-2">
        Blockchain for Electronic Voting System
      </p>
      <p>Please Connect sepolia</p>
      <div className="d-flex justify-content-between">
        <button
          onClick={Connect}
          id="connectbtn"
          className="btn btn-success mx-2"
        >
          {!loading ? (
            "Connect"
          ) : (
            <ReactBootStrap.Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </button>

        <button
          onClick={Dicconnect}
          id="Dissconnectbtn"
          className="btn btn-success mx-2"
          disabled={!isoff}
        >
          Disconnect
        </button>
      </div>

      <br></br>
       
      <Set contract={contract} account={account} provider={provider} />

      <Vote contract={contract} account={account} provider={provider} />

      <FatcVoter contract={contract} account={account} provider={provider} />

      <Propsal contract={contract} account={account} provider={provider} />
    </div>
  );
}

export default App;
