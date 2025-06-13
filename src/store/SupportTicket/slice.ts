import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ClientForm } from '../../utils/imports/graphql/API';
import { emptySupportTicket, supportTicketInput, SupportTicket } from './type';
import { RootState } from "../store";
import { createTicket } from './services';
interface SupportTicketState {
  status: "idle" | "loading" | "failed";
  supportTicket: SupportTicket;
  loading: boolean;
  error: string | null;
}

const initialState: SupportTicketState = {
  status: "idle",
  supportTicket : emptySupportTicket,
  loading: false,
  error: null,
};



export const setSupportTicket = createAsyncThunk(
    "SUPPORT-TICKET/createTicket ",
    async (objFilter: supportTicketInput) => {
      try {
        const response:any = await createTicket({ ...objFilter });
        return response;
      } catch (error) {
        console.log(">>>>ERROR FETCH createTicket", error)
        return Promise.reject(error);
      }
    }
);


const supportTicketSlice = createSlice({
  name: 'supportTicket',
  initialState,
  reducers: {
    // setCustomerData: (state, action: PayloadAction<Customer>) => {
    //   state.customer = {...state.customer, ...action.payload};
    // },
  },
  extraReducers: (builder) => {
    builder
    // setCustomer
      .addCase(setSupportTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setSupportTicket.fulfilled, (state, action) => {
        state.loading = false;
        console.log(">>> action.payload >>", action.payload)
        state.supportTicket = {...action.payload};
        console.log(">>> state.customer >>", action.payload)
        
        // name: name || '-',
        // description: description || '-',
        // email: email || '-',
        // phoneNumber: phoneNumber || '-',
        // level: level || '-',
        // statusTicket: statusTicket || '-',
        // solicitantId: solicitantId || '-'
        
      })
      .addCase(setSupportTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar el customer';
        state.supportTicket={...emptySupportTicket}
      });
  },
});

// export const { setLoading, setError } = clientFormsSlice.actions;
// export default clientFormsSlice.reducer;

// export const {
//     setCustomerData
//   } = customerSlice.actions;
  
export const selectSupportTicket = (state: RootState) => state.supportTicket;

export default supportTicketSlice.reducer;
