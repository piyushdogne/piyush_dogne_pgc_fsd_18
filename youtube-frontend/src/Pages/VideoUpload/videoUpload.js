import React, { useState,useEffect } from 'react'
import './videoUpload.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const VideoUpload = () => {
    const [inputField, setInputField] = useState({ "title": "", "description": "", "videoLink": "", "thumbnail": "", "videoType": "" })
    const [loader ,setLoader] = useState(false);
    const navigate = useNavigate()
    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField, [name]: event.target.value
        })
    }

    const uploadImage = async (e, type) => {
        setLoader(true)
        console.log("Uploading")
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'ml_default');
        try {

            const response = await axios.post(`https://api.cloudinary.com/v1_1/dh40ehqgy/${type}/upload`, data)
            const url = response.data.url;
            let val = type==='image'?'thumbnail':'videoLink';
            setInputField({
                ...inputField, [val]:url
            })
            setLoader(false)
        } catch (err) {
            setLoader(false)
            console.log(err)
        }


    }
    
    useEffect(()=>{
        let isLogin = localStorage.getItem("userId");
        if(isLogin===null){
            navigate('/')
        }
    },[])
    // console.log(inputField)
    const handleSubmitFunc = async()=>{
        setLoader(true)
        await axios.post('http://localhost:4000/api/video' , inputField , {withCredentials : true}).then((resp)=>{
            setLoader(false)
            navigate('/')
        }).catch((err)=>{
            setLoader(false)
            console.log(err)
        })

    }

    

    return (
        <div className='videoUpload'>
            <div className="uploadBox">
                <div className="uploadVideoTitle">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    Upload Video
                </div>

                <div className="uploadForm">
                   <input className='uploadFormInputs' value={inputField.title} onChange={(e)=>{handleOnChangeInput(e , 'title')}} placeholder='Title of video' type='text'/>
                   <input className='uploadFormInputs' value={inputField.description} onChange={(e)=>{handleOnChangeInput(e , 'description')}} placeholder='Description' type='text'/>
                   <input className='uploadFormInputs' value={inputField.videoType} onChange={(e)=>{handleOnChangeInput(e , 'videoType')}} placeholder='Category' type='text'/>
                   <div>Thumbnail <input type='file'  onChange={(e)=>{uploadImage(e , 'image')}} accept='image/*'/></div>
                   <div>Video <input type='file'  onChange={(e)=>{uploadImage(e , 'video')}} accept='video/mp4 , video/webm , video/*'/></div>

                    {
                    loader && <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>
                    }
                </div>

                
                

                <div className="uploadBtns">
                    <div className="uploadBtn-form" onClick={handleSubmitFunc}>Upload</div>
                    <Link to={'/'} className="uploadBtn-form">Home</Link>
                </div>

            </div>
        </div>
    )
}

export default VideoUpload