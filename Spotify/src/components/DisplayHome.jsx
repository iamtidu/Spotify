/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import Navbar from './Navbar'
// import { albumsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
// import { songsData } from '../assets/assets'
import Songitem from './Songitem'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {
const{songsData,albumsData} = useContext(PlayerContext)

  return (
    <>
      <Navbar/>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Festured Charts</h1>
        <div className='flex overflow-auto'>
        {albumsData.map((item,index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>))}
      </div>
      </div>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'> Todays biggest hits </h1>
        <div className='flex overflow-auto'>
        {songsData.map((item,index)=>(<Songitem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>))}
      </div>
      </div>
    </>
  )
}

export default DisplayHome
