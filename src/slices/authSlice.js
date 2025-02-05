import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  signupData: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    }, //*action    //* reducer fun
    setLoading: function (state, action) {
      state.loading = action.payload;
    },
    setSingupData: function (state, action) {
      state.signupData = action.payload;
    },
  },
});

export const { setToken, setLoading, setSingupData } = authSlice.actions;
export default authSlice.reducer;
