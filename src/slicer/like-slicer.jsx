import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    MyVideoLibrary :[],
    videoCount:0
}

const likeSlice= createSlice({
    name:'My Library',
    initialState,
    reducers :{
        addToLibrary(State,action){
            State.MyVideoLibrary.push(action.payload);
            State.videoCount = State.MyVideoLibrary.length
        }
    }
})

export const {addToLibrary} = likeSlice.actions;
export default likeSlice.reducer;