import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    currentVideo:null,
    loading:false,
    error:false,
}

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        fetchStart:state=>{
            state.loading=true
        },
        fetchSuccess: (state, action) => {
            state.loading=false
            state.currentVideo=action.payload;
        },
        fetchFailure: state=>{
            state.loading=false;
            state.loading=true
        },
        like: (state,action)=>{
            //if trong mang like k chứa id ms làm
            if(!state.currentVideo.likes.includes(action.payload)){
                //thêm id ng like vào
                state.currentVideo.likes.push(action.payload);

                //tìm trong mảng dislike xem có chưa;; if có  thì gỡ ra
                   const userId=state.currentVideo.dislikes.findIndex(userId => userId===action.payload)
                state.currentVideo.dislikes.splice(userId,1)
            }
        },

         dislike: (state,action)=>{
            //if trong mang like k chứa id ms làm
            if(!state.currentVideo.dislikes.includes(action.payload)){
                //thêm id ng like vào
                state.currentVideo.dislikes.push(action.payload);
                //tìm trong mảng dislike xem có chưa;; if có  thì gỡ ra
                   const userId=state.currentVideo.likes.findIndex(userId => userId===action.payload)
                state.currentVideo.likes.splice(userId,1)
            }
        },


    },
    extraReducers: {}
})

export const {fetchStart,fetchSuccess,fetchFailure,like,dislike}=videoSlice.actions;


export default videoSlice.reducer;