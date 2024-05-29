import { configureStore } from "@reduxjs/toolkit";
import likeSlicer from "../slicer/like-slicer";

export default configureStore({
    reducer:{
        store:likeSlicer
    }
})