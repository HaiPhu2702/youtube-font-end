import {createSlice} from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        loading: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: state => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscription:(state, action) => {
            if(state.currentUser.subscribedUsers.includes(action.payload)){
                //tim +gỡ
              const chanelId=  state.currentUser.subscribedUsers.findIndex(chanelId=>chanelId===action.payload)
                state.currentUser.subscribedUsers.splice(chanelId,1)
            }else {
                state.currentUser.subscribedUsers.push(action.payload)
            }
        },
        SignUpStart: (state) => {
            state.loading = true;
        },
        SignUpSuccess:(state,action)=>{
            state.loading = false;
            state.currentUser = action.payload;
        },
        SignUpFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
})


export const {loginStart, loginSuccess, loginFailure, logout,subscription,SignUpStart,SignUpSuccess,SignUpFailure}=userSlice.actions

export default userSlice.reducer