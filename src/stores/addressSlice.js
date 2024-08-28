import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        kakaoAddressResult: '',
        roadAddress: '',
        administrativeAddress: '',
    },
    reducers: {
        setKakaoAddressResult: (state, action) => {
            state.kakaoAddressResult = action.payload;
        },
        setRoadAddress: (state, action) => {
            state.roadAddress = action.payload;
        },
        setAdministrativeAddress: (state, action) => {
            state.administrativeAddress = action.payload;
        },
    },
});

export const { setRoadAddress, setAdministrativeAddress, setKakaoAddressResult } = addressSlice.actions;

export default addressSlice.reducer;
