'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

/** Format a number to CLP thousands string: 12000000 → "12.000.000" */
function formatThousands(raw: number | ''): string {
  if (raw === '' || raw === 0 && String(raw) === '') return '';
  const n = typeof raw === 'string' ? parseFloat(raw) : raw;
  if (isNaN(n)) return '';
  return Math.round(n).toLocaleString('es-CL');
}

/** Strip formatting and return plain numeric string: "$ 12.000.000" → "12000000" */
function stripFormatting(display: string): string {
  return display.replace(/[^\d]/g, '');
}

interface CurrencyTextFieldProps extends Omit<TextFieldProps, 'value' | 'onChange' | 'type'> {
  /** Numeric value (the real formik value) */
  value: number | '';
  /** Called with the parsed numeric value whenever the user edits */
  onValueChange: (numericValue: number | '') => void;
}

/**
 * Text input that displays CLP-formatted amounts ($ 12.000.000)
 * while keeping the underlying value as a plain number.
 * Safe to use with Formik — does NOT mutate the event.
 */
export default function CurrencyTextField({
  value,
  onValueChange,
  ...rest
}: CurrencyTextFieldProps) {
  const [display, setDisplay] = useState<string>(formatThousands(value));
  const isFocused = useRef(false);

  // Sync display when external value changes (e.g. auto-lookup fills the field)
  useEffect(() => {
    if (!isFocused.current) {
      setDisplay(formatThousands(value));
    }
  }, [value]);

  const handleFocus = () => {
    isFocused.current = true;
    // Show raw number without formatting on focus so the user can edit easily
    setDisplay(value === '' ? '' : String(Math.round(value as number)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = stripFormatting(e.target.value);
    setDisplay(raw); // keep plain digits while typing

    if (raw === '') {
      onValueChange('');
    } else {
      const numeric = parseInt(raw, 10);
      onValueChange(isNaN(numeric) ? '' : numeric);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    isFocused.current = false;
    setDisplay(formatThousands(value));
    // Forward blur to any existing onBlur prop
    (rest as TextFieldProps).onBlur?.(e as React.FocusEvent<HTMLInputElement>);
  };

  return (
    <TextField
      {...rest}
      type="text"
      inputMode="numeric"
      value={display}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">$</InputAdornment>
          ),
        },
      }}
    />
  );
}
