import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js';
import { json } from 'express';

const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        const audioaUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const duration = `${Math.floor(audioaUpload.duration / 60)} : ${Math.floor(audioaUpload.duration % 60)}`

        // console.log(name, desc, album, imageUpload, audioaUpload)

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioaUpload.secure_url,
            duration
        }

        const song = songModel(songData);
        await song.save();

        res.json({ success: true, message: "song added" })

    } catch (error) {
        res.json({ success: false })

    }

}

const listSong = async (req, res) => {
    try {
        const allsongs = await songModel.find({});
        res.json({ success: true, Songs: allsongs })

    } catch (error) {
        res.json({ success: false })

    }

}

const removeSong = async (req,res)=>{
    try{
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Song Removed"})

    }catch(error){
        res.json({success:false})
    }

}

export { addSong, listSong, removeSong }