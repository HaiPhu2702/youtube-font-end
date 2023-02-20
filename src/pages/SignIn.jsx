import React, { useState} from "react";
import styled from "styled-components";
import axiosClient from "../api/axiosClient";
import {useDispatch} from "react-redux";
import {loginFailure, loginStart, loginSuccess, SignUpStart, SignUpFailure} from "../redux/userSlice";
import {useNavigate} from "react-router-dom";

import {signInWithPopup,getAuth,GoogleAuthProvider} from "firebase/auth"
const auth=getAuth();
const provider=new GoogleAuthProvider()



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({theme}) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({theme}) => theme.bgLighter};
  border: 1px solid ${({theme}) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({theme}) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({theme}) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({theme}) => theme.soft};
  color: ${({theme}) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({theme}) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [nameLogin, setNameLogin] = useState("")
  const [passwordL, setPasswordL] = useState("")




    const [nameR, setNameR] = useState("")
    const [emailR, setEmailR] = useState("")
    const [passwordR, setPasswordR] = useState("")
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [signupSuccess, setSignupSuccess] = useState(false)
    const [SignFailure, setSignupFailure] = useState(false)

    const handleSignIn = async (e) => {
        e.preventDefault();
        dispatch(loginStart())
        try {
            const res = await axiosClient.post("/auth/signin", {nameLogin, passwordL})
            dispatch(loginSuccess(res.data))
            navigate(`/home`)
        } catch (e) {
            dispatch(loginFailure())
        }

    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        dispatch(SignUpStart())
        try {
            const res = await axiosClient.post("/auth/signup", {nameR, emailR, passwordR})
            if (res.data.success === true) {
                setSignupSuccess(true)
                setSignupFailure(false)
            }
        } catch (e) {
            dispatch(SignUpFailure())
            setSignupFailure(true)
            setSignupSuccess(false)
        }
    }

    const handleSignInWithGoogle = async () => {
       await dispatch(loginStart())

       await signInWithPopup(auth, provider)
            .then( async result => {
               await axiosClient.post('/auth/google', {
                    name: result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL
                }).then((res) => {
                    dispatch(loginSuccess(res.data))
                })
                .then(()=>{
                  navigate('/home')
                })
            })
            .catch((err) => {
                dispatch(loginFailure())
            })
    }


    return (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to Hai Phu Tube</SubTitle>
                <Input placeholder="username" onChange={(e) => setNameLogin(e.target.value)}/>
                <Input type="password" placeholder="password" onChange={(e) => setPasswordL(e.target.value)}/>
                <Button onClick={handleSignIn}>Sign in</Button>


                <Title>or</Title>
                <Button onClick={handleSignInWithGoogle}>Sign In With Google</Button>
                <Title>or</Title>

                {signupSuccess && <p style={{color: "blue"}}>SignUp success</p>}
                {SignFailure && <p style={{color: "red"}}>SignUp fail, please check again!!</p>}

                <Input placeholder="username" onChange={(e) => setNameR(e.target.value)} defaultValue={nameR}/>
                <Input placeholder="email" onChange={(e) => setEmailR(e.target.value)} defaultValue={emailR}/>
                <Input type="password" placeholder="password" onChange={(e) => setPasswordR(e.target.value)} defaultValue={passwordR}/>
                <Button onClick={handleSignUp}>Sign up</Button>
            </Wrapper>
            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    );
};

export default SignIn;
