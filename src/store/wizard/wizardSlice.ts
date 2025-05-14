import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WizardState {
  currentStep: number;
  steps: {
    id: number;
    title: string;
    subtitle: string;
    completed: boolean;
  }[];
}

const initialState: WizardState = {
  currentStep: 0,
  steps: [
    { id: 1, title: 'Información de contacto', subtitle: '', completed: false },
    { id: 2, title: 'Paso 2', subtitle: 'Tipo de cargador', completed: false },
    { id: 3, title: 'Paso 3', subtitle: 'Información técnica', completed: false },
    { id: 4, title: 'Paso 4', subtitle: 'Resumen cotización', completed: false },
  ],
};

const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setStepCompleted: (state, action: PayloadAction<{ stepId: number; completed: boolean }>) => {
      const step = state.steps.find(s => s.id === action.payload.stepId);
      if (step) {
        step.completed = action.payload.completed;
      }
    },
    resetWizard: (state) => {
      state.currentStep = 0;
      state.steps = state.steps.map(step => ({ ...step, completed: false }));
    },
  },
});

export const { setCurrentStep, setStepCompleted, resetWizard } = wizardSlice.actions;
export default wizardSlice.reducer; 