import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "../../config/LoaderReducer";
import { contestsAdded } from "../../config/contestReducer";
import { URL } from "../../config/data";
import Loader from "../Loader/Loader";
import { ContestCard } from "./ContestCard";
import "./contestsList.scss";

export const ContestList = () => {
  const { contestList } = useSelector((state) => state.contestState);
  const { loaderActive } = useSelector((state) => state.loaderState);

  console.log("Contests", contestList);
  const dispatch = useDispatch();


  useEffect(() => {
    console.log("here");
    async function handleContests() {
      dispatch(toggleLoader(true))
      try {
        const response = await axios.post(
          `${URL}/voting/getAllContests`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(response?.data?.contests);
        dispatch(contestsAdded(response?.data?.contests));
      } catch (err) {
        console.log(err);
      }
      finally {
        dispatch(toggleLoader(false))
      }
    }
    handleContests();
  }, []);
  return (
    <div className="contestsList-container">
      {
        loaderActive ? <Loader /> : (
          <>{contestList?.map((contest, index) => (
            <ContestCard contest={contest} idx={index} key={index} />
          ))}</>
        )
      }
    </div>
  );
};
