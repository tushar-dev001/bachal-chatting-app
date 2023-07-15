import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlices/UserSlices'

export default configureStore({
    reducer: {
        loggedUser: userReducer,
    },
})