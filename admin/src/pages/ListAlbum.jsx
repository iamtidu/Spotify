/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {

    const [data, setData] = useState([]);

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success) {
                setData(response.data.albums)
                // console.log(response.data.albums)
            }

        } catch (error) {
            toast.error('error')
        }
    }
    const removeAlbums = async (id) =>{

        try {
            const response = await axios.post(`${url}/api/album/remove`,{id})
            if(response.data.success){
                toast.success(response.data.message);
                await fetchAlbums();   
            }
        } catch (error) {
            toast.error("error")
        }
            
    }

    useEffect(() => {
        fetchAlbums();
    }, [])
    return (
        <div>
            <p>All Albums List</p>
            <br />
            <div>
                <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Colour</b>
                    <b>Action</b>
                </div>
                {data.map((item,index)=>{
                    return (
                        <div key={index} className='grid grid-cold-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                            <img src={item.image} className='w-12'  alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input type="color" value={item.bgColour} readOnly={true} />
                            <p onClick={()=>removeAlbums(item._id)} className='cursor-pointer bg-black text-white rounded-full p-1 w-10 flex justify-center'>x</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListAlbum
