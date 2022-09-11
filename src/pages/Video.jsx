import React, {useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Upload from "../components/Upload"
import Comments from "../components/Comments";
import {LinearProgress} from "@mui/material";


import {useDispatch, useSelector} from "react-redux";
import axiosClient from "../api/axiosClient";
import {fetchSuccess, like, dislike} from "../redux/videoSlice"
import {subscription} from "../redux/userSlice"
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({theme}) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({theme}) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({theme}) => theme.soft};
`;


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({theme}) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;


const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`

const Video = () => {
  const [update,setUpdate]=useState(false)
    const navigate = useNavigate()
    const {currentUser} = useSelector(state => state.user);
    const {currentVideo} = useSelector(state => state.video);
    const dispatch = useDispatch();

    const {id} = useParams();

    const [chanel, setChannel] = useState({})
    const [check, setCheck] = useState(true)
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
    const timer = setInterval(() => {
        setProgress((oldProgress) => {
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
        });
    }, 500);

    const fetchData = async () => {
        try {
            const videoRes = await axiosClient.get(`/videos/find/${id}`);
            const channelRes = await axiosClient.get(
                `/users/find/${videoRes.data.userId}`
            );
            setChannel(channelRes.data);
            dispatch(fetchSuccess(videoRes.data));
            setProgress(100)
            setCheck(false)
            clearInterval(timer);
        } catch (err) {
        }
    };
    fetchData();
}, [id, dispatch]);

    const handleLike = async () => {
        await axiosClient.put(`/users/like/${currentVideo._id}`);
        dispatch(like(currentUser._id));
    };

    const handleDisLike = async () => {
        await axiosClient.put(`/users/dislike/${currentVideo._id}`);
        dispatch(dislike(currentUser._id));
    };

    const handleSubscribe = async () => {
        currentUser.subscribedUsers.includes(chanel._id)
            ? await axiosClient.put(`/users/unsub/${chanel._id}`)
            : await axiosClient.put(`/users/sub/${chanel._id}`);

        dispatch(subscription(chanel._id))
    }

    const handleDelete = async () => {
        await axiosClient.delete(`/videos/${id}`)
            .then(res=>navigate('/'))
            .catch(err=>alert(err.response.data.message));
    }

    const handleUpdate=async ()=>{
        await setUpdate(true)
    }


    return (
    <>
        {check ?
            <LinearProgress variant="determinate" value={progress}/>
            :
            <Container>
                <Content>
                    <VideoWrapper>
                        <VideoFrame src={currentVideo.videoUrl} controls/>
                    </VideoWrapper>
                    <Title>{currentVideo.title}</Title>
                    <Details>
                        <Info>{currentVideo.views}views • {currentVideo.createdAt}</Info>
                        <Buttons>


                            <Button onClick={handleLike}>
                                {
                                    //if trong arrLike ton tai id_user hien tai thi icon like sang len
                                    currentVideo.likes?.includes(currentUser._id)
                                        ? <ThumbUpIcon/>  //da like sang len
                                        : <ThumbUpOutlinedIcon/> //chua like
                                }

                                {currentVideo.likes?.length}
                            </Button>

                            <Button onClick={handleDisLike}>
                                {
                                    currentVideo.dislikes?.includes(currentUser._id)
                                        ? <ThumbDownAltIcon/>    //chua dislike
                                        : <ThumbDownOffAltOutlinedIcon/>  //chua like
                                }

                                {currentVideo.dislikes?.length}
                            </Button>


                            <Button>
                                <ReplyOutlinedIcon/> Share
                            </Button>


                            <Button onClick={handleDelete}>
                                <DeleteIcon/> Delete
                            </Button>

                            <Button onClick={handleUpdate}>
                                <UpgradeIcon/> Update
                            </Button>

                            {update && <Upload setUpdate={setUpdate}/>}


                        </Buttons>
                    </Details>
                    <Hr/>
                    <Channel>
                        <ChannelInfo>
                            <Image
                                src={chanel.img}/>
                            <ChannelDetail>
                                <ChannelName>{chanel.name}</ChannelName>
                                <ChannelCounter>{chanel.subscribers} subscribers</ChannelCounter>
                                <Description>
                                    {currentVideo.desc}
                                </Description>
                            </ChannelDetail>
                        </ChannelInfo>
                        <Subscribe onClick={handleSubscribe}>
                            {currentUser.subscribedUsers?.includes(chanel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
                        </Subscribe>
                    </Channel>
                    <Hr/>

                    <Comments videoId={currentVideo._id}/>
                </Content>
                <Recommendation tags={currentVideo.tags}/>
            </Container>
        }
    </>
)
};

export default Video;
