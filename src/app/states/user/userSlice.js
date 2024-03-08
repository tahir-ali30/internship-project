import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: JSON.parse(localStorage.getItem('auth'))?.user || null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { token, account } = action.payload;
            const user = account[0];
            state.userData = user;
            localStorage.setItem('auth', JSON.stringify({ token, user }));
        },
        removeUserData: state => {
            state.userData = null;
            localStorage.removeItem('auth');
        },
    },
});

export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;