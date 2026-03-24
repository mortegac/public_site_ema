import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { saveSimulatorResult } from "./services";
import { SaveSimulatorInput, SaveSimulatorResponse } from "./type";

interface SimulatorState {
  status: "idle" | "loading" | "succeeded" | "failed";
  simulatorLeadId: string | null;
  simulatorResultId: string | null;
  error: string | null;
}

const initialState: SimulatorState = {
  status: "idle",
  simulatorLeadId: null,
  simulatorResultId: null,
  error: null,
};

export const saveSimulatorResultThunk = createAsyncThunk(
  "SIMULATOR/saveResult",
  async (input: SaveSimulatorInput) => {
    const response: SaveSimulatorResponse = await saveSimulatorResult(input);
    return response;
  }
);

const simulatorSlice = createSlice({
  name: "simulator",
  initialState,
  reducers: {
    resetSimulatorState: (state) => {
      state.status = "idle";
      state.simulatorLeadId = null;
      state.simulatorResultId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveSimulatorResultThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(saveSimulatorResultThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.simulatorLeadId = action.payload.simulatorLeadId;
        state.simulatorResultId = action.payload.simulatorResultId;
      })
      .addCase(saveSimulatorResultThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error al guardar simulación";
      });
  },
});

export const { resetSimulatorState } = simulatorSlice.actions;
export const selectSimulator = (state: RootState) => state.simulator;
export default simulatorSlice.reducer;
