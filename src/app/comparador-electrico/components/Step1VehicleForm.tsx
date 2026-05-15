'use client';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Autocomplete,
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
import { GAS_DB, lookupGasVehicle } from '../data/vehicles';
import { PRECIO_BENCINA_DEFAULT, PRECIO_DIESEL_DEFAULT } from '../utils/tco';
import CurrencyTextField from './CurrencyTextField';

const PR = '#0B1F3A';
const AC = '#00C47C';
const BD = '#E2E8F0';
const MU = '#64748B';

function capitalize(s: string): string {
  return s.replace(/\b\w/g, c => c.toUpperCase());
}

function normalizeStr(s: string): string {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

const validationSchema = Yup.object({
  marca: Yup.string().trim().required('Ingresa la marca de tu auto'),
  modelo: Yup.string().trim().required('Ingresa el modelo de tu auto'),
  combustible: Yup.string().oneOf(['bencina', 'diesel']).required(),
  precioListaCLP: Yup.number()
    .min(5000000, 'El precio debe ser mayor a $5.000.000')
    .required('Ingresa el precio de lista de tu auto'),
  consumoL100km: Yup.number()
    .min(4, 'Mínimo 4 L/100km')
    .max(25, 'Máximo 25 L/100km')
    .required('Ingresa el consumo'),
  precioCombustibleCLP: Yup.number()
    .min(600, 'Precio mínimo $600/L')
    .max(2000, 'Precio máximo $2.000/L')
    .required(),
});

export default function Step1VehicleForm() {
  const dispatch = useAppDispatch();
  const { currentVehicle } = useAppSelector(selectComparador);
  const lookupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [lookupStatus, setLookupStatus] = React.useState<'idle' | 'found' | 'notfound'>('idle');
  const [kmMensuales, setKmMensuales] = React.useState(currentVehicle.kmMensuales || 1000);

  const formik = useFormik({
    initialValues: {
      marca: currentVehicle.marca,
      modelo: currentVehicle.modelo,
      combustible: currentVehicle.combustible,
      precioListaCLP: currentVehicle.precioListaCLP || ('' as unknown as number),
      consumoL100km: currentVehicle.consumoL100km || 10,
      precioCombustibleCLP: currentVehicle.precioCombustibleCLP || PRECIO_BENCINA_DEFAULT,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setCurrentVehicle({
        ...values,
        marca: values.marca.trim(),
        modelo: values.modelo.trim(),
        precioListaCLP: Number(values.precioListaCLP),
        kmMensuales,
      }));
      dispatch(nextStep());
    },
  });

  // All unique brands from the DB, capitalized and sorted
  const allBrands = useMemo(
    () => [...new Set(GAS_DB.map(r => capitalize(r.marca)))].sort(),
    [],
  );

  // Models for the currently typed/selected brand
  const brandModels = useMemo(() => {
    const m = normalizeStr(formik.values.marca);
    if (!m) return [];
    const matches = GAS_DB.filter(r => normalizeStr(r.marca) === m);
    return [...new Set(matches.map(r => capitalize(r.modelo)))].sort();
  }, [formik.values.marca]);

  const marcaSelected = formik.values.marca.trim().length > 0;

  const tryLookup = useCallback(() => {
    if (lookupTimerRef.current) clearTimeout(lookupTimerRef.current);
    lookupTimerRef.current = setTimeout(() => {
      const { marca, modelo, combustible } = formik.values;
      if (!marca.trim() || !modelo.trim()) return;

      const result = lookupGasVehicle(marca.trim(), modelo.trim(), combustible);
      if (result) {
        formik.setFieldValue('precioListaCLP', result.precio);
        if (result.consumoRef !== null) {
          formik.setFieldValue('consumoL100km', result.consumoRef);
        }
        setLookupStatus('found');
      } else {
        setLookupStatus('notfound');
      }
    }, 400);
  }, [formik]);

  useEffect(() => {
    tryLookup();
    return () => {
      if (lookupTimerRef.current) clearTimeout(lookupTimerRef.current);
    };
  }, [formik.values.marca, formik.values.modelo, formik.values.combustible]);

  // Auto-update fuel price when combustible changes (only if still at default)
  useEffect(() => {
    const defaultPrice = formik.values.combustible === 'diesel' ? PRECIO_DIESEL_DEFAULT : PRECIO_BENCINA_DEFAULT;
    const currentPrice = formik.values.precioCombustibleCLP;
    if (currentPrice === PRECIO_BENCINA_DEFAULT || currentPrice === PRECIO_DIESEL_DEFAULT) {
      formik.setFieldValue('precioCombustibleCLP', defaultPrice);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.combustible]);

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
        Compararemos un auto nuevo equivalente al tuyo, para una comparación justa entre precios de mercado actuales
      </Typography>

      {/* Marca + Modelo autocomplete */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
        <Autocomplete
          freeSolo
          options={allBrands}
          value={formik.values.marca}
          onChange={(_, value) => {
            formik.setFieldValue('marca', value ?? '');
            formik.setFieldValue('modelo', '');
            setLookupStatus('idle');
          }}
          onInputChange={(_, value, reason) => {
            if (reason === 'input') {
              formik.setFieldValue('marca', value);
              if (formik.values.modelo) {
                formik.setFieldValue('modelo', '');
                setLookupStatus('idle');
              }
            }
          }}
          onBlur={() => formik.setFieldTouched('marca', true)}
          slotProps={{
            paper: {
              sx: {
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(11,31,58,.12)',
                '& .MuiAutocomplete-option': {
                  fontSize: 14,
                  '&[aria-selected="true"]': { background: `${AC}22` },
                  '&:hover': { background: `${AC}14` },
                },
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Marca"
              placeholder="ej. Toyota"
              error={formik.touched.marca && Boolean(formik.errors.marca)}
              helperText={formik.touched.marca && formik.errors.marca}
              sx={inputSx}
            />
          )}
        />

        <Autocomplete
          freeSolo
          disabled={!marcaSelected}
          options={brandModels}
          value={formik.values.modelo}
          onChange={(_, value) => {
            formik.setFieldValue('modelo', value ?? '');
          }}
          onInputChange={(_, value, reason) => {
            if (reason === 'input') {
              formik.setFieldValue('modelo', value);
            }
          }}
          onBlur={() => formik.setFieldTouched('modelo', true)}
          slotProps={{
            paper: {
              sx: {
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(11,31,58,.12)',
                '& .MuiAutocomplete-option': {
                  fontSize: 14,
                  '&[aria-selected="true"]': { background: `${AC}22` },
                  '&:hover': { background: `${AC}14` },
                },
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Modelo"
              placeholder={marcaSelected ? 'ej. Corolla' : 'Primero selecciona la marca'}
              error={formik.touched.modelo && Boolean(formik.errors.modelo)}
              helperText={formik.touched.modelo && formik.errors.modelo}
              sx={inputSx}
            />
          )}
        />
      </Box>

      <Box mb={2}>
        <FormControl fullWidth sx={inputSx}>
          <InputLabel>Combustible</InputLabel>
          <Select label="Combustible" {...formik.getFieldProps('combustible')}>
            <MenuItem value="bencina">Bencina</MenuItem>
            <MenuItem value="diesel">Diésel</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mb={2}>
        <CurrencyTextField
          fullWidth
          label="Precio de lista nuevo (CLP)"
          placeholder="ej. 18.500.000"
          value={formik.values.precioListaCLP}
          onValueChange={(num) => formik.setFieldValue('precioListaCLP', num)}
          onBlur={formik.handleBlur}
          name="precioListaCLP"
          error={formik.touched.precioListaCLP && Boolean(formik.errors.precioListaCLP)}
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
            ✓ Precio de lista estimado — puedes editar el valor
          </Typography>
        )}
        {lookupStatus === 'notfound' && (
          <Typography fontSize={12} color="#F59E0B" fontWeight={600} mt={0.5}>
            Modelo no encontrado — ingresa el precio manualmente
          </Typography>
        )}
        {lookupStatus === 'idle' && (
          <Typography fontSize={12} color={MU} mt={0.5}>
            Ingresa marca + modelo para estimar automáticamente
          </Typography>
        )}
        {formik.touched.precioListaCLP && formik.errors.precioListaCLP && (
          <FormHelperText error>{formik.errors.precioListaCLP}</FormHelperText>
        )}
      </Box>

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
        <CurrencyTextField
          fullWidth
          label="Precio combustible ($/L)"
          placeholder="ej. 1.545"
          value={formik.values.precioCombustibleCLP}
          onValueChange={(num) => formik.setFieldValue('precioCombustibleCLP', num)}
          onBlur={formik.handleBlur}
          name="precioCombustibleCLP"
          helperText={`Bencina $${PRECIO_BENCINA_DEFAULT.toLocaleString('es-CL')}/L · Diésel $${PRECIO_DIESEL_DEFAULT.toLocaleString('es-CL')}/L`}
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
