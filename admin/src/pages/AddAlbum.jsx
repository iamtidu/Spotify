/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const AddAlbum = () => {
    const [image, setImage] = useState(false);
    const [Colour, setColor] = useState("#ffffff");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append('name',name);
            formData.append('desc',desc);
            formData.append('image',image);
            formData.append('bgColour',Colour);

            const response = await axios.post(`${url}/api/album/add`,formData);

            if(response.data.success){
                toast.success("Album Added");
                setDesc("");
                setImage(false);
                setName("");
            }else{
                toast.error("something went wrong")
            }
            
        } catch (error) {
            toast.error("something went wrong")
        }
        setLoading(false);
    }


    return loading ? (
        <div className='grid place-items-center min-h-[80vh]'>
            <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'>
            </div>
        </div>
    ) : (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-start text-gray-600 gap-8'>
            <div className='flex flex-col gap-4'>
                <p>Upload Image</p>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-24 cursor-pointer' alt="" />
                </label>
            </div>
            <div className='flex flex-col gap-2.5'>
                <p>Album Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type="text" placeholder='Type Here' />

            </div>
            <div className='flex flex-col gap-2.5'>
                <p>Album Description</p>
                <input onChange={(e) => setDesc(e.target.value)} value={desc} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type="text" placeholder='Type Here' />
            </div>

            <div className='flex flex-col gap-3'>
                <p>Background color</p>
                <input onChange={(e) => setColor(e.target.value)} value={Colour} type="color" />
            </div>
            <button type="submit" className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>

        </form>
    )
}

export default AddAlbum
