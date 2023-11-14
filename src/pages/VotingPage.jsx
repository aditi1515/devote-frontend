import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { URL } from "../config/data";

import axios from "axios";
import "./votingPage.scss";
const VotingPage = () => {
  const { idx } = useParams();
  const [currContest, setCurrContest] = useState({});
  const [participants, setParticipants] = useState([]);
  const { contestList } = useSelector((state) => state.contestState);
  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    const currCont = contestList[idx];
    setCurrContest(currCont);
  }, [contestList]);

  useEffect(() => {
    async function getParticipants() {
      const response = await axios.post(
        `${URL}/user/getUsers`,
        {
          userIDs: currContest.participants,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setParticipants(response?.data);
    }
    getParticipants();
  }, [currContest]);
  console.log(participants);
  async function handleParticipantVote(participantUserID) {
    const res = await axios.post(`${URL}/voting/vote`, {
      contestIdx: idx,
      userID: user.userID,
      participantUserID
    },{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log(res);
  }
  return (
    <div className="votingPage-container">
      <h1 className="contestTitle">{currContest?.title}</h1>

      {participants?.map((participant, index) => {
        return (
          <div className="participant-card-container" key={index}>
            <div className="participant-Image">
              <img
                src={
                  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                }
              />
            </div>
            <div className="participant-details">
              <h5>
                Name: {participant?.firstName} {participant?.lastName}
              </h5>
              <h5>Age: {participant?.age}</h5>
            </div>
            <button
              className="votingPage-button"
              onClick={() => handleParticipantVote(participant?.userID)}
            >
              Vote
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default VotingPage;
