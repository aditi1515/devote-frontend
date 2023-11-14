import React from "react";
import "./contestsList.scss";
import { ContestCard } from "./ContestCard";
import { useSelector } from "react-redux";

export const ContestList = () => {
  const { contestList } = useSelector((state) => state.contestState);
  console.log("Contests", contestList);
  return (
    <div className="contestsList-container">
      {contestList?.map((contest, index) => (
        <ContestCard contest={contest} idx = {index} key={index} />
      ))}
    </div>
  );
};
