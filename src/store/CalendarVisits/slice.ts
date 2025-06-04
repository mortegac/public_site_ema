import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emptyCalendarVisit, calendarVisitInput, CalendarVisit } from './type';
import { RootState } from "../store";
import { fetchCalendarVisitsByState } from './services';
interface CalendarVisitsSliceState {
  currentStep: number,
  status: "idle" | "loading" | "failed";
  installerId: string;
  calendarVisits: CalendarVisit;
  loading: boolean;
  error: string | null;
}

const initialState: CalendarVisitsSliceState = {
  currentStep: 0,
  status: "idle",
  installerId: "",
  calendarVisits: emptyCalendarVisit,
  loading: false,
  error: null,
};

export const getCalendarVisits = createAsyncThunk(
    "CalendarVisits/list ",
    async (objFilter: calendarVisitInput) => {
      try {
        const response:any = await fetchCalendarVisitsByState({ ...objFilter });
        return response;
      } catch (error) {
        console.log(">>>>ERROR FETCH getCalendarVisits", error)
        return Promise.reject(error);
      }
    }
  );
  
export const setCalendarVisits = createAsyncThunk(
    "CalendarVisits/updateCalendarVisits ",
    async (objFilter: calendarVisitInput) => {
      try {
        const response:any = await fetchCalendarVisitsByState({ ...objFilter });
        return response;
      } catch (error) {
        console.error(">>>>ERROR FETCH getCalendarVisits", error)
        return Promise.reject(error);
      }
    }
  );


// export const updateDistance = createAsyncThunk(
//   'clientForms/updateDistance',
//   async (distance: number) => {
//     // Aquí puedes agregar lógica asíncrona si es necesario
//     return distance;
//   }
// );

const calendarVisitsSlice = createSlice({
  name: 'clientForms',
  initialState,
  reducers: {
    // setLoading: (state, action: PayloadAction<boolean>) => {
    //   state.loading = action.payload;
    // },
    // setError: (state, action: PayloadAction<string | null>) => {
    //   state.error = action.payload;
    // },
      setInstaller: (state, action: PayloadAction<{}>) => {
        state.installerId = String(action.payload || "");
      },
      setStep: (state, action: PayloadAction<{}>) => {
        const objAction: any = action.payload;
        state.currentStep = objAction;
      },
      increment: (state) => {
        state.status = "loading";
        // if (state.currentStep <= 2) 
          state.currentStep += 1;
        state.status = "idle";
      },
      decrement: (state) => {
        state.status = "loading";
        if (state.currentStep >= 2) state.currentStep -= 1;
        state.status = "idle";
      },
      setDataForm: (state, action: PayloadAction<{}>) => {
        const objAction: any = action.payload;
        // console.log(">> objAction >>", objAction)
        // state.currentForm = {
        //   ...state.currentForm,
        //   [objAction.key]: objAction.value,
        // };
      },
      cleanData: (state) => {
        // state.currentForm = {
        //   ...emptyClientForm
        // }
      },
  },
  extraReducers: (builder) => {
    builder
    // getCalendarVisits
      .addCase(getCalendarVisits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCalendarVisits.fulfilled, (state, action) => {
        state.loading = false;
        console.log(">>> getCalendarVisits >> action.payload >>", action.payload.data)
        state.calendarVisits = action?.payload
        
      })
      .addCase(getCalendarVisits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar la distancia';
      });
  },
});


export const {
    setStep,
    setInstaller,
    decrement,
    increment,
    setDataForm,
    cleanData,
  } = calendarVisitsSlice.actions;
  
export const selectCalendarVisits = (state: RootState) => state.calendarVisits;

export default calendarVisitsSlice.reducer;
