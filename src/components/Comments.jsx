import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Comment from "./Comment";
import {useParams} from "react-router-dom";
import axios from "axios";
import comment from "./Comment";
import {useSelector} from "react-redux";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({videoId}) => {
    const {currentUser}=useSelector(state=>state.user)

const [comments,setComments]=useState([])

useEffect(()=>{
    const fetComments=async ()=>{
        try {
            const commentRes=  await axios.get(`/comments/${videoId}`)
            setComments(commentRes.data)
        }catch (e) {}
    }
    fetComments();
},[videoId])
  return (
    <Container>

      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
        {comments.map(comment=>(
            <Comment key={comment._id} comment={comment}/>
        ))}

    </Container>
  )
};

export default Comments;
