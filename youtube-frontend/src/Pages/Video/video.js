import React, { useState, useEffect } from 'react'
import './video.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
const Video = () => {
      const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain")
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);

    const fetchVedioById = async () => {
        await axios.get(`http://localhost:4000/api/getVideoById/${id}`).then((response) => {
            // console.log(response.data.video);
            setData(response.data.video)
            setVideoURL(response.data.video.videoLink)
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(()=>{
        const storedImage = localStorage.getItem('userProfilePic');
        if(storedImage){
            setUserPic(storedImage)
        }
    },[])
    const getCommentByVideoId = async () => {
        await axios.get(`http://localhost:4000/commentApi/comment/${id}`).then((response) => {
            // console.log(response);
            setComments(response.data.comments)
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchVedioById();
        getCommentByVideoId();
    }, [])

    const handleComment = async () => {
        const body = {
            "message": message,
            "video": id
        }
        await axios.post('http://localhost:4000/commentApi/comment', body, { withCredentials: true }).then((resp) => {
            // console.log(resp)
            const newComment = resp.data.comment;
            setComments([newComment, ...comments]);
            setMessage("")
        }).catch(err => {
            toast.error("Please Login First to comment")
        })
    }
    return (
        <div className='video'>
            <div className="videoPostSection">
                <div className="video_youtube">
                    {data && <video width="400" height="400" controls autoPlay className='video_youtube_video'>
                        <source src={videoUrl} type='video/mp4' />
                        <source src={videoUrl} type='video/webm' />
                        your browser does not support the video tag.
                    </video>}

                </div>

                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle">{data?.title}</div>

                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                                <img className='youtube_video_ProfileBlock_left_image' src={data?.user?.profilePic} />
                            </Link>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName"> {data?.user?.channelName} </div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            <div className="subscribeBtnYoutube">Subscribe</div>
                        </div>

                        <div className="youtube_video_likeBlock">
                            <div className='youtube_video_likeBlock_Like'>
                                <ThumbUpOutlinedIcon />
                                <div className='youtube_video_likeBlock_NoOfLikes'>{data?.like}</div>
                            </div>
                            <div className='youtubeVideoDivider'></div>

                            <div className='youtube_video_likeBlock_Like'>
                                <ThumbDownAltOutlinedIcon />
                                <div className='youtube_video_likeBlock_NoOfLikes'>{data?.dislike}</div>
                            </div>

                        </div>


                    </div>

                    <div className="youtube_video_About">
                        <div>{data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>

                <div className="youtubeCommentSection">

                    <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>

                    <div className="youtubeSelfComment">
                        <img src={userPic} alt='user' className='video_youtubeSelfCommentProfile' />
                        <div className='addAComment'>
                            <input type='text' value={message} onChange={(e)=>{setMessage(e.target.value)}} className='addAcommentInput' placeholder='Add your comment here...' />
                            <div className='cancelSubmitComment'>
                                <div className='cancelComment'>Cancel</div>
                                <div className='cancelComment' onClick={handleComment}>Comment</div>
                            </div>
                        </div>
                 </div>
                             
                         <div className="youtubeOthersComments">
                        {
                          comments.map((item, index) => {
                           return (
                               <div className="youtubeSelfComment">
                                  <img className='video_youtubeSelfCommentProfile' src={item?.user?.profilePic} />
                                      <div className='others_commentSection'>
                                         <div className='others_commentSectionHeader'>
                                            <div className='channelName_comment'>{item?.user?.channelName}</div>
                                            <div className='commentTimingOthers'>{item?.createdAt.slice(0,10)}</div>
                                        </div>
                                    <div className='otherCommentSectionComment'>
                                        {item?.message}
                                        </div>
                                </div>
                            </div>
                                         );
                                     })
                              }
                      </div>

                </div>
            </div>

            <div className="videoSuggestions">

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://res.cloudinary.com/dh40ehqgy/image/upload/v1734971988/pexels-studio-art-smile-218587-3476860_oh4aqg.jpg" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://res.cloudinary.com/dh40ehqgy/image/upload/v1734973972/pexels-sagar-soneji-3581694_vc9lic.jpg" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://res.cloudinary.com/dh40ehqgy/image/upload/v1734979507/Screenshot_2024-05-24_233028_mv44at.png" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://res.cloudinary.com/dh40ehqgy/image/upload/v1735056502/GettyImages-615625258-723b86363a654db482191db78b31294e_iusxhe.jpg" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
            </div>

            <ToastContainer />

        </div>
    )
}

export default Video