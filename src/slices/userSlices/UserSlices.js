import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loginUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    },
    reducers: {
        userData: (state, action)=>{
            // console.log('ami reducer theke esechi',action.payload);
            state.loginUser = action.payload
        }
    }

})

export const {userData} = userSlice.actions

export default userSlice.reducer