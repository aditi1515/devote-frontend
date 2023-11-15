import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleLoader } from "../../config/LoaderReducer";
import { URL } from "../../config/data";
import "./contestCard.scss";
export const ContestCard = ({ contest, idx }) => {
  const { user } = useSelector((state) => state.userState);
  console.log(user);

  const dispatch = useDispatch()
  const navigate = useNavigate();
  async function handleParticipate() {
    dispatch(toggleLoader(true))
    try {
      const res = await axios.post(
        `${URL}/voting/requestToParticipate`,
        {
          contestIdx: idx,
          userID: user.userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(toggleLoader(false))
      location.reload();
    }
  }
  //contest button conditions
  let button;

  if (contest.isContestStarted === false) {
    if (contest.participants.includes(user.userID)) {
      button = (
        <button className="contest-button-disabled">Participated</button>
      );
    } else if (contest.requestParticipants.includes(user.userID)) {
      button = <button className="contest-button-disabled">Requested</button>;
    } else {
      button = (
        <button className="contest-button" onClick={handleParticipate}>
          Participate
        </button>
      );
    }
  } else if (contest.isContestEnded) {
    button = <button className="contest-button" onClick={() => navigate("/result/" + idx)}>Result</button>;
  } else if (contest.isContestStarted) {
    if (contest.hasVoted.includes(user.userID)) {
      button = <button className="contest-button-disabled">Voted</button>;
    } else {
      button = <button className="contest-button" onClick={() => navigate("/vote/" + idx)}>Vote</button>;
    }
  }
  //contest status conditions
  let contestStatus;

  if (contest.isContestStarted === false) {
    contestStatus = <h3 className="contest-status">Contest Not Started</h3>;
  } else if (contest.isContestEnded) {
    contestStatus = <h3 className="contest-status">Contest Ended</h3>;
  } else if (contest.isContestStarted) {
    contestStatus = <h3 className="contest-status">Contest Is Live</h3>;
  }

  return (
    <div className="contestCard-container">
      <div className="contest-headings">
        <h2 className="contest-name">{contest.title}</h2>
        {contestStatus}
      </div>
      {button}
    </div>
  );
};
