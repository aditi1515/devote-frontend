import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ContestList } from "../components/ContestComp/ContestList";
import { toggleLoader } from "../config/LoaderReducer";
import { contestsAdded } from "../config/contestReducer";
import { URL } from "../config/data";

export const ContestPage = () => {

  return (
    <div>
      <ContestList />
    </div>
  );
};
