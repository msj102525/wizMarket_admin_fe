import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        roadAddress: '',
    },
    reducers: {
        setRoadAddress: (state, action) => {
            state.roadAddress = action.payload;
        },
    },
});

export const { setRoadAddress } = addressSlice.actions;

export default addressSlice.reducer;
