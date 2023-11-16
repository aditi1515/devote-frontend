import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import ShortLoader from '../components/Loader/ShortLoader'
import { toggleLoader } from '../config/LoaderReducer'
import { URL } from '../config/data'
import "./adminContestPage.scss"
const AdminContestPage = () => {
  const { contestList } = useSelector((state) => state.contestState)
  const { idx } = useParams()
  const [currContest, setCurrContest] = useState({})
  const [activeTab, setActiveTab] = useState(0)
  const { loaderActive } = useSelector((state) => state.loaderState);
  const [requestParticipants, setRequestParticipants] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (contestList && contestList.length > 0) {
      setCurrContest(contestList[idx])

      setRequestParticipants(contestList[idx]?.requestParticipants.filter(participant => !contestList[idx]?.participants.includes(participant)))

    }
  }, [contestList])
  console.log(requestParticipants);

  const handleStartContest = async () => {
    dispatch(toggleLoader(true))
    try {
      await axios.post(`${URL}/voting/startContest`, {
        contestIdx: idx,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      navigate("/admin")
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(toggleLoader(false))
    }
  }


  const handleEndContest = async () => {
    dispatch(toggleLoader(true))
    try {
      await axios.post(`${URL}/voting/endContest`, {
        contestIdx: idx,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      navigate("/admin")
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(toggleLoader(false))
    }
  }



  return (
    <div className='admin-contest-page-wrapper'>
      <h1>Admin Contest Page</h1>
      <div className='contest-sheet-wrapper'>
        <h2><span className='span-bold'>Title : </span>{currContest?.title}</h2>
        {
          <div> <span className='span-bold'>Start contest : </span>  {currContest?.isContestStarted ? <button className='btn disabled'  > contest started already  </button> : <button className='btn' onClick={handleStartContest}>Start contest</button>}</div>
        }

        {
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>

            <div style={{ display: "flex", width: "75%" }}>
              <span className='span-bold'>End Contest : </span>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: "1rem" }}>{currContest?.isContestEnded == false ? <><button className='btn' onClick={handleEndContest}>End contest</button></> : <><span>contest already ended &nbsp; &nbsp;</span></>}</div>
            </div>
            <div style={{ width: "25%", display: "flex", justifyContent: "flex-end" }}><button className={currContest?.isContestEnded == false ? "btn disabled" : "btn"}  >{currContest?.isContestEnded == false ? "Results" : <Link to={"/result/" + idx}>Results</Link>}</button></div>
          </div>
        }

        <div className="tabs">
          <div className={activeTab === 0 ? "tabs-part active" : "tabs-part"} onClick={() => setActiveTab(0)} >Requested Participants</div>
          <div className={activeTab === 1 ? "tabs-part active" : "tabs-part"} onClick={() => setActiveTab(1)}>Approved Participants</div>
          <div className={activeTab === 2 ? "tabs-part active" : "tabs-part"} onClick={() => setActiveTab(2)}>Voters</div>
        </div>

        <div className='tableContainer'>
          {
            activeTab === 0 ? participantsTable(requestParticipants, idx, true) : activeTab === 1 ? participantsTable(currContest?.participants, idx, false) : participantsTable(currContest?.hasVoted, false)
          }
        </div>
      </div>

    </div>
  )
}

const participantsTable = (participants, contestIdx, showAction) => {
  const [participantsList, setParticipantsList] = useState([])
  const { loaderActive } = useSelector((state) => state.loaderState);
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {

    async function getParticipants() {
      dispatch(toggleLoader(true))
      try {
        const response = await axios.post(
          `${URL}/user/getUsers`,
          {
            userIDs: participants,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setParticipantsList(response?.data?.users);
      } catch (error) {
        console.log(error);
      }
      finally {
        dispatch(toggleLoader(false))
      }
    }
    getParticipants();
  }, [participants]);


  const handleAddToParticipants = async (participantUserID) => {


    dispatch(toggleLoader(true))
    try {
      const response = await axios.post(
        `${URL}/voting/addParticipant`,
        {
          contestIdx,
          participantUserID,
          userID: user?.userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/admin")
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(toggleLoader(false))
    }


  }

  return (
    <>
      {
        loaderActive ? <ShortLoader /> : (<table className="styled-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>UserId</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Address</th>
              <th>Constituency</th>
              {showAction && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {
              participantsList?.map((participant, index) => (<tr>

                <td>Image</td>
                <td>{participant?.userID}</td>
                <td>{participant?.firstName + " " + participant?.lastName}</td>
                <td>{participant?.age}</td>
                <td>{participant?.email}</td>
                <td>{participant?.isOwner ? "true" : "false"}</td>
                <td>{participant?.address}</td>
                <td>{participant?.voterConstituency}</td>
                {showAction && <td><button className='btn' onClick={() => handleAddToParticipants(participant?.userID)}>Approve</button></td>}
              </tr>))
            }
          </tbody>
        </table>)
      }

    </>)
}

export default AdminContestPage