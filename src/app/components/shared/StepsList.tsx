import { Box, Container, Typography } from '@mui/material'

interface Step {
  title: string
  body: string
}

interface StepsListProps {
  heading: string
  steps: Step[]
}

export default function StepsList({ heading, steps }: StepsListProps) {
  return (
    <Box sx={{ bgcolor: '#0F172A', py: { xs: 7, md: 10 } }}>
      <Container maxWidth="md">
        <Typography
          sx={{
            color: '#fff',
            fontWeight: 800,
            fontSize: { xs: '1.5rem', md: '1.9rem' },
            mb: 6,
            textAlign: 'center',
          }}
        >
          {heading}
        </Typography>

        <Box sx={{ position: 'relative' }}>
          {/* vertical connector line */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 19, md: 23 },
              top: 44,
              bottom: 44,
              width: 2,
              background: 'linear-gradient(180deg, rgba(8,152,185,0.6) 0%, rgba(232,26,104,0.6) 100%)',
              borderRadius: 1,
            }}
          />

          {steps.map((step, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                gap: { xs: 2.5, md: 3 },
                mb: i < steps.length - 1 ? { xs: 4, md: 5 } : 0,
                position: 'relative',
              }}
            >
              {/* Number badge */}
              <Box
                sx={{
                  width: { xs: 40, md: 48 },
                  height: { xs: 40, md: 48 },
                  borderRadius: '50%',
                  background: i % 2 === 0 ? '#0898b9' : '#e81a68',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 0 0 4px rgba(15,23,42,1)',
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: { xs: '1rem', md: '1.15rem' },
                    lineHeight: 1,
                  }}
                >
                  {i + 1}
                </Typography>
              </Box>

              {/* Content */}
              <Box sx={{ pt: { xs: 0.5, md: 0.75 } }}>
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    mb: 0.75,
                    lineHeight: 1.4,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#94A3B8',
                    lineHeight: 1.75,
                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                  }}
                >
                  {step.body}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
