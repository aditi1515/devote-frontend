import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { toggleLoader } from '../config/LoaderReducer';
import { URL } from '../config/data';
import "./resultPage.scss";
const ResultPage = () => {

 const { idx } = useParams();
 const [currContest, setCurrContest] = useState({});
 const [participants, setParticipants] = useState([]);
 const { contestList } = useSelector((state) => state.contestState);
 const [sortedVotes, setSortedVotes] = useState([]);
 const [ranks, setRanks] = useState([]);
 const { loaderActive } = useSelector((state) => state.loaderState);
 const dispatch = useDispatch();
 useEffect(() => {
  if (contestList?.length >= 0) {
   setCurrContest(contestList[idx]);
  }

  function generatePayload(contest) {
   let participants = contest?.participants;
   let votes = contest?.participantsVotes;
   const itemsWithFrequencies = participants.map((item, index) => ({ item, frequency: votes[index] }));

   // Sort the array based on frequency in descending order
   itemsWithFrequencies.sort((a, b) => b.frequency - a.frequency);

   // Extract the sorted items and frequencies
   const sortedParticipantsAccToVoteCount = itemsWithFrequencies.map(itemWithFreq => itemWithFreq.item);
   const sortedVotesFrequencies = itemsWithFrequencies.map(itemWithFreq => itemWithFreq.frequency);
   console.log(sortedParticipantsAccToVoteCount, sortedVotesFrequencies);
   setSortedVotes(sortedVotesFrequencies)


   // rank array 
   let localRanks = [1];

   for (let i = 1; i < sortedVotesFrequencies.length; i++) {
    let rank = 1;
    if (sortedVotesFrequencies[i] === sortedVotesFrequencies[i - 1]) {
     localRanks.push(rank);
    } else {
     localRanks.push(++rank);
    }

   }
   console.log(localRanks);
   setRanks(localRanks);
   return sortedParticipantsAccToVoteCount;
  }

  async function getParticipants() {
   try {
    dispatch(toggleLoader(true))
    const payload = generatePayload(contestList[idx])
    const response = await axios.post(
     `${URL}/user/getUsers`,
     {
      userIDs: payload,
     },
     {
      headers: {
       "Content-Type": "application/json",
      },
      withCredentials: true,
     }
    );
    console.log(response);
    setParticipants(response?.data?.users);

   } catch (error) {
    console.log(error);
   }
   finally {
    dispatch(toggleLoader(false))
   }
  }
  getParticipants();

 }, [contestList])
 console.log(currContest?.participants);

 return (
  <>
   {
    loaderActive ? <Loader /> : (<div className='result-page-container'>
     <h1>Congratulations</h1>

     <div className="result-card-container">
      {
       participants?.map((participant, index) => {
        return (
         <div className="participant-card-container" key={index}>
          <div className="participant-Image">
           <h1 className='rank'>{ranks[index]}</h1>
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
          <div
           className="votingPage-button"
          >
           Votes : {sortedVotes[index]}
          </div>
         </div>
        )
       }, [])
      }
     </div>

    </div>)
   }
  </>
 )
}

export default ResultPage