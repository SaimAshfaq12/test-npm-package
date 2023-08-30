import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	email: "",
};

export const userEmailSlice = createSlice({
	name: "userEmail",
	initialState,
	reducers: {
		saveUserEmail: (state, action) => {
			state.email = action.payload;
		},
	},
});

export const { saveUserEmail } = userEmailSlice.actions;

export default userEmailSlice.reducer;
