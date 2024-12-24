const Video = require('../Modals/video');
const User = require('../Modals/user');


exports.uploadVideo = async (req,res)=>{
    try{
        const { title, description, videoLink, videoType,thumbnail }  = req.body;
         const uploadVideo = new Video({user: req.user._id , title , description, videoLink, videoType,thumbnail });
         await uploadVideo.save();
         res.status(201).json({ sucess: "true", uploadVideo });
    }catch (error){
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
}


exports.getAllVideo = async(req,res)=>{
    try{
        const videos = await Video.find().populate('user','channelName profilePic userName createdAt');
         
        res.status(201).json({ sucess: "true", "videos": videos });
    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getVideoById = async (req,res)=>{
    try{
        let {id} = req.params;
         const video = await Video.findById(id).populate('user','channelName profilePic userName createdAt');
        res.status(201).json({ sucess: "true", "video": video });
    }catch (error){
        console.log(error) 
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getAllVideoByUserID = async(req,res)=>{
    try{
        let {userId} = req.params;
        const video = await Video.find({user:userId}).populate('user','channelName profilePic userName createdAt about');
        const usersend = await User.findById(userId)
        res.status(201).json({ sucess: "true", "video": video , "user" : usersend });

    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}
