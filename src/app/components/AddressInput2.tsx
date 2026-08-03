"use client";

import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { CHILE_REGIONS } from "@/data/chile-regions";

interface Props {
  onSelectAddress: (addressDetails: {
    StreetAddress: string | null;
    City: string | null;
    State: string | null;
    ZipCode: string | null;
    Country: string | null;
    Latitude: number | null;
    Longitude: number | null;
  } | null) => void;
  onValidationChange?: (isValid: boolean) => void;
  /** Ignored — no single string maps to 3 independent fields. */
  value?: string;
  onAddressChange?: (value: string) => void;
  error?: boolean;
  helperText?: string;
}

const AddressInput: React.FC<Props> = ({
  onSelectAddress,
  onValidationChange,
  onAddressChange,
  error,
  helperText,
}) => {
  const [regionCode, setRegionCode] = useState("");
  const [comuna, setComuna] = useState("");
  const [street, setStreet] = useState("");

  const selectedRegion = CHILE_REGIONS.find((r) => r.code === regionCode);

  const notify = (
    nextRegionCode: string,
    nextComuna: string,
    nextStreet: string,
  ) => {
    if (nextRegionCode && nextComuna && nextStreet.trim()) {
      onSelectAddress({
        StreetAddress: nextStreet.trim(),
        City: nextComuna,
        State: nextRegionCode,
        ZipCode: null,
        Country: "Chile",
        Latitude: null,
        Longitude: null,
      });
      onValidationChange?.(true);
    } else {
      onSelectAddress(null);
      onValidationChange?.(false);
    }
  };

  const handleRegionChange = (e: SelectChangeEvent) => {
    const next = e.target.value;
    setRegionCode(next);
    setComuna("");
    notify(next, "", street);
  };

  const handleComunaChange = (e: SelectChangeEvent) => {
    const next = e.target.value;
    setComuna(next);
    notify(regionCode, next, street);
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setStreet(next);
    onAddressChange?.(next);
    notify(regionCode, comuna, next);
  };

  return (
    <Box>
      <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
        <InputLabel id="region-label">Región</InputLabel>
        <Select
          labelId="region-label"
          value={regionCode}
          label="Región"
          onChange={handleRegionChange}
        >
          {CHILE_REGIONS.map((r) => (
            <MenuItem key={r.code} value={r.code}>
              {r.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" sx={{ mb: 1.5 }} disabled={!regionCode}>
        <InputLabel id="comuna-label">Comuna</InputLabel>
        <Select
          labelId="comuna-label"
          value={comuna}
          label="Comuna"
          onChange={handleComunaChange}
        >
          {selectedRegion?.comunas.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        size="small"
        label="Dirección (calle y número)"
        placeholder="Ej: Av. Providencia 1234"
        value={street}
        onChange={handleStreetChange}
        error={error}
        helperText={error ? helperText : undefined}
      />
    </Box>
  );
};

export default AddressInput;
