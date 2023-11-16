import React from 'react';
import { ColorRing, MutatingDots, Triangle } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const ShortLoader = () => {
 const { loaderActive } = useSelector((state) => state.loaderState);
 return (
  <div className='short-loader-container'>
   <MutatingDots
   height="100"
   width="100"
   color="white"
   secondaryColor= 'black'
   radius='12.5'
   ariaLabel="mutating-dots-loading"
   wrapperStyle={{}}
   wrapperClass=""
   visible={loaderActive}
   />
  </div>
 )
}

export default ShortLoader