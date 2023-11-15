import React from 'react';
import { TailSpin, Triangle } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const Loader = () => {
 const { loaderActive } = useSelector((state) => state.loaderState);
 return (
  <div className='loader-container'>
   <Triangle
    height="160"
    width="160"
    color="white"
    ariaLabel="triangle-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={loaderActive}
   />
  </div>
 )
}

export default Loader