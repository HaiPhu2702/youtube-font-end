import React, {useState} from "react";
import styled from "styled-components";

import VideoCallIcon from '@mui/icons-material/VideoCall';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
   color: ${({ theme }) => theme.text};
  width: 100%;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User=styled.div`
  display:flex;
  align-items:center;
  gap:10px;
  font-weight:500;
  color:${({theme }) => theme.text}
`
const Avatar=styled.img`
width:32px;
  height:32px;
  border-radius:50%;
  background-color:#999;
`
const IconSearch=styled.div`
cursor: pointer;
`

const Navbar = () => {
  const navigate=useNavigate()
const [close,setClose]=useState(false)
const {currentUser}=useSelector(state =>state.user)
const[search,setSearch]=useState("")
  return (
      <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search"
                 onChange={e=> setSearch(e.target.value)}
          />

          <IconSearch >
          <SearchOutlinedIcon onClick={()=>{navigate(`/search?q=${search}`)}} />
        </IconSearch>

        </Search>
        {currentUser
            ?
            <User>
              <VideoCallIcon onClick={()=>setClose(true)}/>
              <Avatar src={currentUser.img}/>
              {currentUser.name}
            </User>
            :
            <Link to="" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
        }
      </Wrapper>
    </Container>
          {close && <Upload setClose={setClose}/>}
</>

  );
};

export default Navbar;
