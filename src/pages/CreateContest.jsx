import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { toggleLoader } from '../config/LoaderReducer';
import { URL } from '../config/data';
import "./createcontest.scss";
const CreateContest = () => {

 const [contestTitle, setContestTitle] = useState(null);
 const dispatch = useDispatch()

 const { user } = useSelector((state) => state.userState);
 const { loaderActive } = useSelector((state) => state.loaderState);
 const navigate = useNavigate()

 async function handleContestCreation() {
  if (contestTitle === null) {
   alert('Please enter a valid contest title');
   return;
  }
  dispatch(toggleLoader(true))
  try {
   const response = await axios.post(
    `${URL}/voting/createContest`,
    {
     title: contestTitle,
     userID: user?.userID
    },
    {
     headers: {
      "Content-Type": "application/json",
     },
     withCredentials: true,
    }
   );
   navigate("/admin")
  } catch (err) {
   console.log(err);
  }
  finally {
   dispatch(toggleLoader(false))
  }
 }

 return (
  <>
   {
    loaderActive ? <Loader /> :
     (<div className='CreateContest-wrapper'>
      <h1>Create New Contest</h1>

      <div className="login-form">
       <h2 className="login-heading">CONTEST</h2>
       <div className="form-fields">
        {" "}
        <h3 className="field-label">Contest Title</h3>
        <input
         type="text"
         className="form-inputs"
         onChange={(e) => setContestTitle(e.target.value)}
        />

       </div>
       <button onClick={handleContestCreation} style={{ margin: 20 }} className='btn'>Create</button>
      </div>
     </div>)
   }
  </>
 )
}

export default CreateContest