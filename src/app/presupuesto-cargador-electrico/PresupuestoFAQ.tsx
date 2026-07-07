'use client'

import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface FAQ {
  q: string
  a: string
}

export default function PresupuestoFAQ({ faqs }: { faqs: FAQ[] }) {
  return (
    <>
      {faqs.map((faq, i) => (
        <Accordion
          key={i}
          disableGutters
          elevation={0}
          sx={{
            mb: 2,
            border: '1px solid #E2E8F0',
            borderRadius: '12px !important',
            '&:before': { display: 'none' },
            bgcolor: '#fff',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#0898b9' }} />} sx={{ px: 3, py: 1 }}>
            <Typography sx={{ fontWeight: 600, color: '#2A3547', fontSize: '0.95rem' }}>{faq.q}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pt: 0, pb: 2.5 }}>
            <Typography sx={{ color: '#64748B', lineHeight: 1.75, fontSize: '0.9rem' }}>{faq.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}
