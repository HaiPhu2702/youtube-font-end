import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import app from "../firebase"
import axiosClient from "../api/axiosClient";
import {useNavigate, useParams} from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  height: 600px;
  width: 600px;
  background-color: ${({theme}) => theme.bgLighter};
  color: ${({theme}) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`

const Title = styled.h1`
  text-align: center;
`

const Input = styled.input`
  border: 1px solid ${({theme}) => theme.soft};
  color: ${({theme}) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent

`

const Desc = styled.textarea`
  border: 1px solid ${({theme}) => theme.soft};
  border-radius: 3px;
  padding: 12px;
  color: ${({theme}) => theme.text};
  background-color: transparent

`

const Button = styled.button`
  border: 1px solid ${({theme}) => theme.soft};
  border-radius: 3px;
  padding: 12px;
  color: ${({theme}) => theme.text};
  background-color: transparent
`



const Upload = ({setClose,setUpdate}) => {
    const [image, setImage] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const[close1,setClose1] = useState(false);

    const [inputs, setInputs] = useState({});
    const handleChange=e=>{
        setInputs(prev=>{
            return { ...prev,[e.target.name]: e.target.value}
        })
    }


    const [tags, setTags] = useState([]);
    const handleTags = (e) => {
        setTags(e.target.value.split(','));
    }

  
      
  

    useEffect(() => {
       video && upload(video,"videoUrl")
    }, [video])

    useEffect(() => {
      image &&  upload(image,"imgUrl")
    }, [image])

    const upload = (file,urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType==='imgUrl'?setImgPerc(Math.round(progress)):setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs(prev=>{
                        return{ ...prev,[urlType]:downloadURL }
                    })

                })
            }

        )

    }

    const navigate=useNavigate()

    const {id} = useParams();
    console.log(id)
    const handleUpdateVideo=async ()=>{
        await axiosClient.put(`/videos/${id}`)
            .then(response=>{
                axiosClient.delete(`/videos/${id}`);
                navigate('/')
            })
            .catch(err=>alert(err.response.data))
    }
    //onClick
    const handleUpload=async (e)=>{
        e.preventDefault();
       const res= await axiosClient.post('/videos',{...inputs,tags})
        {setClose?setClose(false):setUpdate(false)}
        { setClose ? ( res.status===200 && navigate(`/video/${res.data._id}`)) : handleUpdateVideo()  }
    }


    return (
        <Container>
          <Wrapper>
                <Close onClick={()=>setClose1(false)} >X</Close>
                <Title>Upload a new video</Title>

                Video:
                {videoPerc>0
                    ? "upload: "+videoPerc+" %"
                    : <Input type="file"
                             accept="video/*"
                             onChange={(e) => setVideo(e.target.files[0])}
                    />
                }

                <Input type="text" placeholder="Title" name="title" onChange={handleChange}/>
                <Desc placeholder="Description" rows={8} name="desc" onChange={handleChange}/>
                <Input type="text" placeholder="separate the tags with commas" onChange={handleTags}/>

                Image:
                {imgPerc > 0
                    ? "upload: "+imgPerc+" %"
                    : <Input type="file"
                             accept="image/*"
                             onChange={(e) => setImage(e.target.files[0])}
                    />
                }

                <Button onClick={handleUpload}>Up load</Button>

            </Wrapper>
        </Container>
    );
};

export default Upload;