import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emptyWebContactForm, webContactFormInput, webContactForm } from './type';
import { RootState } from "../store";
import { createWebContactForm } from './services';

interface WebContactFormState {
  status: "idle" | "loading" | "failed";
  webContactForm: webContactForm;
  existWebContactForm: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: WebContactFormState = {
  status: "idle",
  webContactForm: emptyWebContactForm,
  existWebContactForm: false,
  loading: false,
  error: null,
};

export const setWebContactForm = createAsyncThunk(
    "webContactForm/create",
    async (objFilter: webContactFormInput) => {
      try {
        const response: any = await createWebContactForm({ ...objFilter });
        return response;
      } catch (error) {
        console.log(">>>>ERROR FETCH setWebContactForm", error);
        return Promise.reject(error);
      }
    }
);

const webContactFormSlice = createSlice({
  name: 'webContactForm',
  initialState,
  reducers: {
    setWebContactFormData: (state, action: PayloadAction<webContactForm>) => {
      state.webContactForm = { ...state.webContactForm, ...action.payload };
    },
    resetWebContactForm: (state) => {
      state.webContactForm = emptyWebContactForm;
      state.existWebContactForm = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setWebContactForm.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(setWebContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "idle";
        state.existWebContactForm = Boolean(action.payload?.webContactFormId && action.payload.webContactFormId.trim() !== '');
        state.webContactForm = { ...emptyWebContactForm, ...action.payload };
        console.log(">>> action.payload >>", action.payload);
        console.log(">>> state.webContactForm >>", state.webContactForm);
      })
      .addCase(setWebContactForm.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || 'Error al crear el webContactForm';
        const data: any = action?.payload;
        state.webContactForm = { ...emptyWebContactForm, ...(data || {}) };
      });
  },
});

export const {
  setWebContactFormData,
  resetWebContactForm
} = webContactFormSlice.actions;

export const selectWebContactForm = (state: RootState) => state.webContactForm;

export default webContactFormSlice.reducer;
