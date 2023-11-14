import React, { useState } from "react";
import "./leaderboardPage.scss";
import { BarChart } from "../components/LeaderboardCharts/BarChart";
import { VoteData } from "../config/data.js";

export const LeaderboardPage = () => {
  const [voteData, setVoteData] = useState({
    labels: VoteData?.map((Data) => Data.partyName),
    dataSets: [
      {
        label: "Vote Count",
        data: VoteData?.map((Data) => Data.votes),
      },
    ],
  });
  return (
    <div className="leaderboard-container">
      <BarChart voteData={voteData} />
    </div>
  );
};
