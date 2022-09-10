import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type}) => {
const [videos,setVideo]=useState([])

useEffect(()=>{
  const fetchVideos=async () => { 
    const res=await axios.get(`/videos/${type}`)
    setVideo(res.data)
  }
  fetchVideos();
},[type])


  return (
    <Container>
    </Container>

  );
};

export default Home;
