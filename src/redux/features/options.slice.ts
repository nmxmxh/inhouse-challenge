import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface OptionsState {
  theme: "light" | "dark";
}

const initialState: OptionsState = {
  theme: "dark",
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    changeOptionsState: (state, action: PayloadAction<OptionsState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { changeOptionsState } = optionsSlice.actions;
export const selectOptions = (state: RootState): OptionsState => state.options;

export default optionsSlice.reducer;
