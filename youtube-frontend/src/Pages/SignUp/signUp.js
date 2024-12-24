import React, { useState } from 'react'
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const SignUp = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain");
    const [singUpFiled, setSignUpField] = useState({ "channelName": "", "userName": "", "password": "", "about": "", "profilePic": uploadedImageUrl });
    const [progressBar,setProgressBar] = useState(false);
    const navigate = useNavigate();
    const handleInputFiled = (event, name) => {
        setSignUpField({
            ...singUpFiled, [name]: event.target.value
        })
    }
    const uploadImage = async (e) => {
        console.log("Uploading")
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);

        data.append('upload_preset', 'ml_default');
        try {
            setProgressBar(true)
            const response = await axios.post("https://api.cloudinary.com/v1_1/dh40ehqgy/image/upload", data)
            const imageUrl = response.data.url;
            setUploadedImageUrl(imageUrl);
            setSignUpField({
                ...singUpFiled, "profilePic": imageUrl
            })
            setProgressBar(false)
        } catch (err) {
            console.log(err)
        }


    }
    const handleSignup = async () => {
        axios.post('http://localhost:4000/auth/signUp' , singUpFiled , {withCredentials:true}).then((res)=>{
            setProgressBar(false);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.data._id);
            localStorage.setItem("userProfilePic", res.data.data.profilePic);
            navigate('/')
            window.location.reload();
            toast.success(res.data.message);
        }).catch((err)=>{
            toast.error(err)
            setProgressBar(false)
        })
    }



    return (
        <div className='signUp'>
            <div className="signup_card">
                <div className="signUp_title">
                    <YouTubeIcon sx={{ fontSize: "54px" }} className='login_youtubeImage' />
                    SignUp
                </div>

                <div className="signUp_Inputs">
                    
                    <input type='text' className='signUp_Inputs_inp'value={singUpFiled.channelName} placeholder='Channel Name' onChange={(e)=>handleInputFiled(e, "channelName")} />
                    <input type='text' className='signUp_Inputs_inp' value={singUpFiled.userName} placeholder='User Name' onChange={(e)=>handleInputFiled(e, "userName")} />
                    <input type='password' className='signUp_Inputs_inp' value={singUpFiled.password} placeholder='Password' onChange={(e)=>handleInputFiled(e, "password")}/>
                    <input type='text' className='signUp_Inputs_inp' value={singUpFiled.about} placeholder='About Your Channel' onChange={(e)=>handleInputFiled(e, "about")}/>

                    <div className="image_upload_signup">
                        <input type='file' onChange={(e) => uploadImage(e)} />
                        <div className='image_upload_signup_div'>
                            <img className='image_default_signUp' src={uploadedImageUrl} />
                        </div>
                    </div>


                    <div className="signUpBtns">
                        <div className="signUpBtn" onClick={handleSignup}>SignUp</div>
                        <Link to={'/'} className="signUpBtn">Home Page</Link>

                    </div>

                    {progressBar && <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>}

                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp