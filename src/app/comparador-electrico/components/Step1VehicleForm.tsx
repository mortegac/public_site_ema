'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentVehicle, nextStep, selectComparador } from '@/store/Comparador/slice';
import { lookupGasVehicle } from '../data/vehicles';

const PR = '#0B1F3A';
const AC = '#00C47C';
const BD = '#E2E8F0';
const MU = '#64748B';
const BG = '#F5F7FA';

const validationSchema = Yup.object({
  marca: Yup.string().trim().required('Ingresa la marca de tu auto'),
  modelo: Yup.string().trim().required('Ingresa el modelo de tu auto'),
  anio: Yup.number()
    .integer('Debe ser un año válido')
    .min(2005, 'Año mínimo 2005')
    .max(new Date().getFullYear() + 1, 'Año inválido')
    .required('Ingresa el año de fabricación'),
  combustible: Yup.string().oneOf(['bencina', 'diesel']).required(),
  valorMercadoCLP: Yup.number()
    .min(500000, 'El valor debe ser mayor a $500.000')
    .required('Ingresa el valor de mercado de tu auto'),
  consumoL100km: Yup.number()
    .min(4, 'Mínimo 4 L/100km')
    .max(25, 'Máximo 25 L/100km')
    .required('Ingresa el consumo'),
  precioCombustibleCLP: Yup.number()
    .min(600, 'Precio mínimo $600/L')
    .max(2000, 'Precio máximo $2.000/L')
    .required(),
});

interface Step1Props {
  onNext?: () => void;
}

export default function Step1VehicleForm({ onNext }: Step1Props) {
  const dispatch = useAppDispatch();
  const { currentVehicle } = useAppSelector(selectComparador);
  const lookupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [lookupStatus, setLookupStatus] = React.useState<'idle' | 'found' | 'notfound'>('idle');
  const [kmMensuales, setKmMensuales] = React.useState(currentVehicle.kmMensuales || 1000);

  const formik = useFormik({
    initialValues: {
      marca: currentVehicle.marca,
      modelo: currentVehicle.modelo,
      anio: currentVehicle.anio || new Date().getFullYear() - 3,
      combustible: currentVehicle.combustible,
      valorMercadoCLP: currentVehicle.valorMercadoCLP || ('' as unknown as number),
      consumoL100km: currentVehicle.consumoL100km || 10,
      precioCombustibleCLP: currentVehicle.precioCombustibleCLP || 1100,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setCurrentVehicle({
        ...values,
        marca: values.marca.trim(),
        modelo: values.modelo.trim(),
        valorMercadoCLP: Number(values.valorMercadoCLP),
        kmMensuales,
      }));
      dispatch(nextStep());
      onNext?.();
    },
  });

  const tryLookup = useCallback(() => {
    if (lookupTimerRef.current) clearTimeout(lookupTimerRef.current);
    lookupTimerRef.current = setTimeout(() => {
      const { marca, modelo, anio, combustible } = formik.values;
      if (!marca.trim() || !modelo.trim() || !anio || String(anio).length < 4) return;

      const result = lookupGasVehicle(marca.trim(), modelo.trim(), anio, combustible);
      if (result) {
        formik.setFieldValue('valorMercadoCLP', result.precio);
        if (result.consumoRef !== null) {
          formik.setFieldValue('consumoL100km', result.consumoRef);
        }
        setLookupStatus('found');
      } else {
        setLookupStatus('notfound');
      }
    }, 600);
  }, [formik]);

  useEffect(() => {
    tryLookup();
    return () => {
      if (lookupTimerRef.current) clearTimeout(lookupTimerRef.current);
    };
  }, [formik.values.marca, formik.values.modelo, formik.values.anio, formik.values.combustible]);

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: AC },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: AC },
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ background: '#fff', borderRadius: 2, p: { xs: 2.5, sm: 3.5 }, border: `1px solid ${BD}`, boxShadow: '0 2px 20px rgba(11,31,58,.07)' }}
    >
      <Typography variant="h6" fontWeight={700} color={PR} mb={0.5} letterSpacing="-0.3px">
        Tu auto actual
      </Typography>
      <Typography fontSize={14} color={MU} mb={2.5} lineHeight={1.5}>
        Ingresa los datos de tu vehículo para estimar su valor de mercado actual
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Marca"
          placeholder="ej. Toyota"
          {...formik.getFieldProps('marca')}
          error={formik.touched.marca && Boolean(formik.errors.marca)}
          helperText={formik.touched.marca && formik.errors.marca}
          sx={inputSx}
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Modelo"
          placeholder="ej. Corolla"
          {...formik.getFieldProps('modelo')}
          error={formik.touched.modelo && Boolean(formik.errors.modelo)}
          helperText={formik.touched.modelo && formik.errors.modelo}
          sx={inputSx}
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Año"
          type="number"
          placeholder="ej. 2020"
          inputProps={{ min: 2005, max: new Date().getFullYear() + 1 }}
          {...formik.getFieldProps('anio')}
          error={formik.touched.anio && Boolean(formik.errors.anio)}
          helperText={formik.touched.anio && formik.errors.anio}
          sx={inputSx}
        />
        <FormControl fullWidth sx={inputSx}>
          <InputLabel>Combustible</InputLabel>
          <Select
            label="Combustible"
            {...formik.getFieldProps('combustible')}
          >
            <MenuItem value="bencina">Bencina</MenuItem>
            <MenuItem value="diesel">Diésel</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Market value */}
      <Box mb={2}>
        <TextField
          fullWidth
          label="Valor de mercado actual (CLP)"
          type="number"
          placeholder="ej. 12000000"
          inputProps={{ step: 100000, min: 500000 }}
          {...formik.getFieldProps('valorMercadoCLP')}
          error={formik.touched.valorMercadoCLP && Boolean(formik.errors.valorMercadoCLP)}
          sx={{
            ...inputSx,
            ...(lookupStatus === 'found' && {
              '& .MuiOutlinedInput-root': {
                background: '#F0FDF7',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: AC },
              },
            }),
          }}
        />
        {lookupStatus === 'found' && (
          <Typography fontSize={12} color={AC} fontWeight={600} mt={0.5}>
            ✓ Estimado desde base de datos — puedes editar el valor
          </Typography>
        )}
        {lookupStatus === 'notfound' && (
          <Typography fontSize={12} color="#F59E0B" fontWeight={600} mt={0.5}>
            Modelo no encontrado — ingresa el valor manualmente
          </Typography>
        )}
        {lookupStatus === 'idle' && (
          <Typography fontSize={12} color={MU} mt={0.5}>
            Ingresa marca + modelo + año para estimar automáticamente
          </Typography>
        )}
        {formik.touched.valorMercadoCLP && formik.errors.valorMercadoCLP && (
          <FormHelperText error>{formik.errors.valorMercadoCLP}</FormHelperText>
        )}
      </Box>

      {/* KM slider */}
      <Box mb={2.5}>
        <Typography fontSize={12} fontWeight={700} color={PR} textTransform="uppercase" letterSpacing="0.3px" mb={1}>
          Kilómetros al mes
        </Typography>
        <Typography fontSize={24} fontWeight={800} color={PR} textAlign="center" letterSpacing="-0.5px" mb={1}>
          {kmMensuales.toLocaleString('es-CL')} km / mes
        </Typography>
        <Slider
          value={kmMensuales}
          min={300}
          max={5000}
          step={100}
          onChange={(_, val) => setKmMensuales(val as number)}
          sx={{
            color: AC,
            '& .MuiSlider-thumb': { border: '3px solid #fff', boxShadow: '0 1px 6px rgba(0,0,0,.18)' },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontSize={11} color={MU}>300 km</Typography>
          <Typography fontSize={11} color={MU}>5.000 km</Typography>
        </Box>
      </Box>

      {/* Consumption + fuel price */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Consumo (L/100 km)"
          type="number"
          inputProps={{ step: 0.5, min: 4, max: 25 }}
          {...formik.getFieldProps('consumoL100km')}
          error={formik.touched.consumoL100km && Boolean(formik.errors.consumoL100km)}
          helperText={(formik.touched.consumoL100km && formik.errors.consumoL100km) || 'Típico: 9–12 L/100km'}
          sx={inputSx}
        />
        <TextField
          fullWidth
          label="Precio combustible ($/L)"
          type="number"
          inputProps={{ step: 10, min: 600, max: 2000 }}
          {...formik.getFieldProps('precioCombustibleCLP')}
          helperText="Referencia Chile 2025"
          sx={inputSx}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 700,
            px: 4,
            py: 1.5,
            borderRadius: '10px',
            textTransform: 'none',
            fontSize: 15,
            '&:hover': { transform: 'translateY(-1px)' },
          }}
        >
          Continuar →
        </Button>
      </Box>
    </Box>
  );
}
