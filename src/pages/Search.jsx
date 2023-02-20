import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import {useLocation} from "react-router-dom";
import axiosClient from "../api/axiosClient";
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
            const res = await axiosClient.get(`/videos/search${query}`)
            setVideos(res.data)
        }
        fetchVideo()
    }, [query])
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