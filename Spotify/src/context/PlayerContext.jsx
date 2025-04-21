/* eslint-disable react/prop-types */
import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
// import { songsData } from "../assets/assets";

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()

    // const url = 'http://localhost:4000';
    const url = 'https://spotify-six-wine.vercel.app';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumData] = useState([]);

    const [track, setTrack] = useState("");
    const [playStatus, setPlayStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })
    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }
    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)
    }

    const playWithId = async (id) => {
        await songsData.map((item) => {
            if (id === item._id) {
                setTrack(item)
            }
        })
        await audioRef.current.play()
        setPlayStatus(true)
    }

    // const previous = async () => {
    //     if (track.id > 0) {
    //         await setTrack(songsData[track.id - 1])
    //         await audioRef.current.play();
    //         await setPlayStatus(true)
    //     }
    // }
    const previous = async () => {
        songsData.map(async (item,index)=>{
            if(track._id === item._id && index>0){
                await setTrack(songsData[index-1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    // const next = async () => {
    //     if (track.id < songsData.length - 1) {
    //         await setTrack(songsData[track.id + 1])
    //         await audioRef.current.play();
    //         await setPlayStatus(true)
    //     }
    // }

    const next = async () => {
        songsData.map(async (item,index)=>{
            if(track._id === item._id && index < songsData.length-1){
                await setTrack(songsData[index+1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

   


    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.Songs);
            setTrack(response.data.Songs[2]);
        } catch (error) {
            console.log("check internet")
        }
    }

    const getAlbumData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`)
            setAlbumData(response.data.albums)
        } catch (error) {
            console.log("check internet")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000)
    }, [audioRef])

    useEffect(() => {
        getSongsData()
        getAlbumData();
    }, [])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData


    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;