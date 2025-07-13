import {createSlice} from "@reduxjs/toolkit";

const userDetails = createSlice({
    name:'user',
    initialState: {
        userData: null,
        category: [
            {
                id: 1,
                title: "Workout"
            },
            {
                id: 2,
                title: "Study"
            },
            {
                id: 3,
                title: "Break"
            },
        ],
        items: [
            // {
            //     id: 1,
            //     name: 'T-bar row',
            //     duration: 5,
            //     remaining: 5,
            //     status: 'paused',
            //     categoryId: 1
            // },
            // {
            //     id: 2,
            //     name: 'Lat pull',
            //     duration: 5,
            //     remaining: 5,
            //     status: 'paused',
            //     categoryId: 1
            // },
        ],
        completedItems: []
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload.userData
        },
        setItems: (state, action) => {
            state.items = action.payload.items
        },
        setCompletedItems: (state, action) => {
            state.completedItems = action.payload.completedItems
        },
    }
})

export const addUserData = userDetails.actions.setUserData;
export const addItems = userDetails.actions.setItems;
export const addCompletedItems = userDetails.actions.setCompletedItems;


export default userDetails.reducer;