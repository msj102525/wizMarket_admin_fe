import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        roadAddress: '',
        administrativeAddress: '',
    },
    reducers: {
        setRoadAddress: (state, action) => {
            state.roadAddress = action.payload;
        },
        setAdministrativeAddress: (state, action) => {
            state.administrativeAddress = action.payload;
        },
    },
});

export const { setRoadAddress, setAdministrativeAddress } = addressSlice.actions;

export default addressSlice.reducer;
