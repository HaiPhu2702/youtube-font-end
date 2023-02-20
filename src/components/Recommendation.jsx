import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import axiosClient from "../api/axiosClient";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;
const Recommendation = ({tags}) => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        const fetchVideo = async () => {
            const res = await axiosClient.get(`/videos/tags?tags=${tags}`)
            setVideos(res.data)
        }
        fetchVideo()
    }, [tags])

    return (
        <Container>
            {videos.map(video=>(
                <Card
                type="sm"
                key={video._id}
                video={video}
                />
            ))}

        </Container>
    );
};

export default Recommendation;