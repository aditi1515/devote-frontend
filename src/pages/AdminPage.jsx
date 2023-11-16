import axios from 'axios';
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ContestCardAdmin from '../components/Admin/ContestCardAdmin';
import Loader from '../components/Loader/Loader';
import { toggleLoader } from '../config/LoaderReducer';
import { contestsAdded } from '../config/contestReducer';
import { URL } from '../config/data';
import "./adminPage.scss";
const AdminPage = () => {
  const { loaderActive } = useSelector((state) => state.loaderState);
  const { contestList } = useSelector((state) => state.contestState);
  const dispatch = useDispatch()
  useEffect(() => {
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
    <>
      {
        loaderActive ? <Loader /> :
          (<div className='admin-page-wrapper'>
            <h1>Admin Page</h1>
            <div className='container-1'>
              <button className='btn'><Link className='link' to={"/admin/new_contest"}>New Contest</Link></button>
            </div>
            <div className='contest-container'>
              {
                contestList?.map((contest, index) => (<ContestCardAdmin index={index} key={index} contest={contest} />))
              }
            </div>
          </div>)
      }
    </>
  )
}

export default AdminPage