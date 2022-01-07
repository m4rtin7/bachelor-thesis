import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoggedStat = {
  value: boolean;
};

const initialState: LoggedStat = {
  value: false,
};

export const loggedSlice = createSlice({
  name: "logged",
  initialState,
  reducers: {
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setLogged } = loggedSlice.actions;

export default loggedSlice.reducer;
