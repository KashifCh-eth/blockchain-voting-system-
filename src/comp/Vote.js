import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useState } from "react";

function Vote({ contract, account, provider }) {
  const [showvote, setshowVote] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log();
  console.log("vote comp");
  const ToVote = () => {
    if (showvote === true) {
      setshowVote(false);
    } else {
      setshowVote(true);
    }
  };
  const SetVoteFc = async (e) => {
    e.preventDefault();
    const VoterID = document.getElementById("voterId").value;
    console.log(VoterID);
    const VoterName = document.getElementById("voterName").value;
    console.log(VoterName);
    const CandidateAddress = document.getElementById("CandidateAddress").value;
    console.log(CandidateAddress);
    if (VoterID && VoterName && CandidateAddress) {
      setLoading(true);
      const signer = contract.connect(provider.getSigner());
      await signer.SetVote(
        VoterID,
        VoterName,
        account.toString(),
        CandidateAddress
      );
      console.log("Voted Succssfuly ");
      alert("Voted!");
      window.location.reload();
      setshowVote(false);
    } else {
      alert("please Fill input Felid");
    }
  };

  return (
    <div>
      <br></br>
      <div>
        <button
          onClick={ToVote}
          disabled={!account}
          className="btn btn-dark text-light"
        >
          Vote To Candidate!
        </button>
      </div>
      <br></br>
      {showvote && (
        <form onSubmit={SetVoteFc}>
          <div className="mt3">
            <p className="h5">Voter Address : {account}</p>
          </div>
          <div class="form-group">
            <label>Your ID</label>
            <input type="text" id="voterId" class="form-control"></input>
          </div>
          <div class="form-group">
            <label>Your Name</label>
            <input type="text" id="voterName" class="form-control "></input>
          </div>
          <div class="form-group">
            <label>Candidate Address</label>
            <input
              type="text"
              id="CandidateAddress"
              class="form-control"
            ></input>
          </div>

          <button type="submit" className="btn btn-dark mt-2">
            {!loading ? (
              "Vote Now"
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
        </form>
      )}
    </div>
  );
}

export default Vote;
