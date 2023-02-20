import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../api/axiosClient";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type}) => {
const [videos,setVideo]=useState([])

useEffect(()=>{
  const fetchVideos=async () => { 
    const res=await axiosClient.get(`/videos/${type}`)
    setVideo(res.data)
  }
  fetchVideos();
},[type])

  return (
    <Container>
      {videos.map(video =>(
          <Card
              key={video._id}
              video={video}
          />
      ))
      }
    </Container>
  );
};

export default Home;
