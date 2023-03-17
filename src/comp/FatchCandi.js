import React from "react";
import { useEffect, useState } from "react";

function FatchCandi({ contract, account, provider }) {
  const [candidates, setCandidate] = useState([]);
  console.log("Set Comp");

  useEffect(() => {
    const Fatch = async () => {
      const info = await contract.getCandidate();
      console.log(info);
      setCandidate(info);
    };
    contract && Fatch();
  }, [contract]);

  return (
    <div>
      <p className="text-dark h3">Candidates</p>
      {candidates.map((candidate) => {
        return (
          <div key={Math.random()}>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td className="p-2">Candidate Name {candidate.name}</td>

                    <td className="p-2">
                      {" "}
                      Candidate Address {candidate._CandidateAddress}
                    </td>

                    <td className="p-2"> Voted {candidate.vote.toString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FatchCandi;
