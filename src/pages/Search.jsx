import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import {useLocation} from "react-router-dom";
import axios from "axios";
import Card from "../components/Card"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

`


const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search

    useEffect(() => {
        const fetchVideo = async () => {
            const res = await axios.get(`/videos/search${query}`)
            setVideos(res.data)
        }
        fetchVideo()
    }, [])
    return (
        <Container>
            {videos.map(video => (
                <Card
                    key={video._id}
                    video={video}
                />
            ))}

        </Container>
    );
};

export default Search;