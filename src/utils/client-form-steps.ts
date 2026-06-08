// ClientForm.currentStep values — see docs/cotizador-flow-states.md
export const CLIENT_FORM_STEPS = {
  DRAFT: '1',
  QUOTE_SENT: '2',
  PENDING_PAYMENT: '3',
  PAID_PENDING_SCHEDULE: '4',
  SCHEDULED: '5',
  OT_ISSUED: '6',
  TECH_ASSIGNED: '7',
  MATERIALS_READY: '8',
  IN_PROGRESS: '9',
  INSTALLED: '10',
  PENDING_TE6: '11',
  COMPLETED_TE6_OK: '12',
  ON_HOLD: '13',
  CANCELLED: '14',
} as const

export type ClientFormStep = typeof CLIENT_FORM_STEPS[keyof typeof CLIENT_FORM_STEPS]
