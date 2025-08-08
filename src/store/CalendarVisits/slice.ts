import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emptyCalendarVisit, calendarVisitInput, CalendarVisit } from './type';
import { RootState } from "../store";
import { fetchCalendarVisitsByState, fetchLastScheduleInstallers, fetchLastScheduleOneInstaller,makeReservation, makeReservationNotPaid } from './services';
import { getShoppingCart } from '../ShoppingCart/slice';
import { getWebpayStart } from '../Webpay/slice';
// import { AnyARecord } from 'node:dns';
import dayjs from 'dayjs';

interface CalendarVisitsSliceState {
  currentStep: number,
  status: "idle" | "loading" | "failed";
  statusCalendar: "idle" | "loading" | "failed" | string;
  installerId: string;
  lastScheduleInstallers: any;
  calendarVisits: CalendarVisit;
  loading: boolean;
  error: string | null;
  message: string;
  cartId: string;
  installersData: {[key: string]: string};
}

const initialState: CalendarVisitsSliceState = {
  currentStep: 0,
  status: "idle",
  statusCalendar: "loading",
  installerId: "",
  lastScheduleInstallers: [],
  calendarVisits: emptyCalendarVisit,
  loading: false,
  error: null,
  message: "",
  cartId: "",
  installersData: {},
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

export const getLastScheduleInstallers = createAsyncThunk(
  "CalendarVisits/listLastScheduleInstaller ",
  async () => {
    try {
      const response = await fetchLastScheduleInstallers();
      
      
      // console.log(">>> 1.- response >>", response);
      
      const combinedData = await Promise.all(response.map(async (installer: any) => {
        
        const scheduleData:any = await fetchLastScheduleOneInstaller(installer.userId);
        
        
        // console.log(`>>> 2.- ${installer.userId} >>", ${JSON.stringify(scheduleData, null, 2)}`);
        
        if (Array.isArray(scheduleData) && scheduleData.length > 0) {
          
          
          const now = dayjs();
          const closestDate = scheduleData.reduce((closest: any, current: any) => {
            const currentDate = dayjs(current.startDate);
            const closestDate = dayjs(closest.startDate);
            return currentDate.diff(now) < closestDate.diff(now) ? current : closest;
          }, scheduleData[0]);

          return {
            userId: installer.userId,
            name: installer.name,
            startDate: closestDate.startDate,
            state: closestDate.state,
            calendarId: closestDate.calendarId
          };
        }
        
        return {
          userId: installer.userId,
          name: installer.name,
          startDate: null,
          state: null
        };
      }));
      
    
      // console.log(">>> combinedData >>", combinedData);
      
      return combinedData;
    } catch (error) {
      console.log(">>>>ERROR FETCH getCalendarVisits", error)
      return Promise.reject(error);
    }
  }
); 

export const getScheduleInstaller = createAsyncThunk(
  "CalendarVisits/getScheduleInstaller ",
  async (userId: string) => {
    try {
      const response = await fetchLastScheduleOneInstaller(userId);
      
      const now = dayjs();
      const closestDate = response.reduce((closest: any, current: any) => {
        const currentDate = dayjs(current.startDate);
        const closestDate = dayjs(closest.startDate);
        
        return currentDate.diff(now) < closestDate.diff(now) ? current : closest;
      }, response[0]);
      
      // console.log(">>> getScheduleInstaller - closest date >>", closestDate);
      
      return closestDate;
    } catch (error) {
      console.log(">>>>ERROR FETCH getScheduleInstaller", error)
      return Promise.reject(error);
    }
  }
); 
  
export const setCalendarVisits = createAsyncThunk(
    "CalendarVisits/updateCalendarVisits ",
    async (objFilter: calendarVisitInput, { dispatch }) => {
      try {
        const response:any = await makeReservation({ ...objFilter });
        
        if (response && response.cartId) {
          Promise.all([
            dispatch(getShoppingCart({ shoppingCartId: response.cartId })),
            dispatch(getWebpayStart({ 
              shoppingCartId: response.cartId,
              glosa: "Visita técnica", 
             }))
          ])
          // await dispatch(getShoppingCart({ shoppingCartId: response.cartId }));
        }
        
        return response;
      } catch (error) {
        console.error(">>>>ERROR FETCH getCalendarVisits", error)
        return Promise.reject(error);
      }
    }
);
  
export const setCalendarNotPay = createAsyncThunk(
    "CalendarVisits/updateCalendarNotPay ",
    async (objFilter: calendarVisitInput, { dispatch }) => {
      try {
        const response:any = await makeReservationNotPaid({ ...objFilter });
        console.log(">>> response >>", response)
        // if (response && response.cartId) {
        //   Promise.all([
        //     dispatch(getShoppingCart({ shoppingCartId: response.cartId })),
        //     dispatch(getWebpayStart({ 
        //       shoppingCartId: response.cartId,
        //       glosa: "Visita técnica", 
        //      }))
        //   ])
          // await dispatch(getShoppingCart({ shoppingCartId: response.cartId }));
        // }
        
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
    setLoadingCalendar: (state, action: PayloadAction<string>) => {
      state.statusCalendar = action.payload;
    },
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
        state.calendarVisits = {
          ...state.calendarVisits,
          [objAction.key]: objAction.value,
        };
      },
      cleanData: (state) => {
        state.calendarVisits = {
          ...emptyCalendarVisit
        }
      },
      setLoading: (state) => {
        state.status = "loading"
      },
  },
  extraReducers: (builder) => {
    builder
    // getCalendarVisits
      .addCase(getCalendarVisits.pending, (state) => {
        state.statusCalendar = "loading"
        state.error = null;
      })
      .addCase(getCalendarVisits.fulfilled, (state, action) => {
        state.statusCalendar = "idle"
        // console.log(">>> getCalendarVisits >> action.payload >>", action.payload.data)
        state.calendarVisits = action?.payload
        
      })
      .addCase(getCalendarVisits.rejected, (state, action) => {
        state.statusCalendar = "failed"
        state.error = action.error.message || 'Error al actualizar la distancia';
      })
      
      
    // getLastScheduleInstallers
      .addCase(getLastScheduleInstallers.pending, (state) => {
        state.status = "loading"
        state.error = null;
      })
      .addCase(getLastScheduleInstallers.fulfilled, (state, action) => {
        // console.log(">>> getLastScheduleInstallers >> action.payload >>", action.payload)
        state.lastScheduleInstallers = action?.payload
        state.status = "idle"
        
      })
      .addCase(getLastScheduleInstallers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || 'Error al actualizar la distancia';
      })
      
      
      
    // setCalendarVisits
      .addCase(setCalendarVisits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setCalendarVisits.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(">>> setCalendarVisits >> action.payload >>", action.payload.data)
        state.calendarVisits = action?.payload
        state.message = action?.payload?.message
        state.cartId = action?.payload?.cartId
        //  "message": "visita agendada exitosamente",
        //   "cartId": "b7fddb24-b4d4-42fb-9bc4-e46cfbbe0442"
        
      })
      .addCase(setCalendarVisits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar la distancia';
      })
      
      
      /** TODO:  FALYTA IMPLEMENTAR setCalendarNotPay en el front */
    // setCalendarNotPay
      .addCase(setCalendarNotPay.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(setCalendarNotPay.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        // console.log(">>> setCalendarNotPay >> action.payload >>", action.payload.data)
        // state.calendarVisits = action?.payload
        // state.message = action?.payload?.message
        // state.cartId = action?.payload?.cartId
        //  "message": "visita agendada exitosamente",
        //   "cartId": "b7fddb24-b4d4-42fb-9bc4-e46cfbbe0442"
        
      })
      .addCase(setCalendarNotPay.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar la agenda';
      });
  },
});


export const {
    setStep,
    setLoadingCalendar,
    setInstaller,
    decrement,
    increment,
    setDataForm,
    cleanData,
    setLoading
  } = calendarVisitsSlice.actions;
  
export const selectCalendarVisits = (state: RootState) => state.calendarVisits;

export default calendarVisitsSlice.reducer;
