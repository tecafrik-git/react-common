import { PinDrop } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";
import { InputProps, useInput } from "react-admin";
import { useLoadScriptOptions } from "../GoogleMapsLoadScriptOptionsProvider";

export type RACoordsInputValue = {
  lat: number;
  lng: number;
};

type CoordsInputProps = InputProps<RACoordsInputValue>;

const defaultCenter = {
  lat: 14.747146526866961,
  lng: -17.45195390824223,
};

const RACoordsInput = (props: CoordsInputProps) => {
  const { onChange, onBlur, ...rest } = props;
  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
  } = useInput<RACoordsInputValue>({
    // Pass the event handlers to the hook but not the component as the field property already has them.
    // useInput will call the provided onChange and onBlur in addition to the default needed by react-hook-form.
    onChange,
    onBlur,
    ...rest,
  });

  const loadScriptOptions = useLoadScriptOptions();

  const { isLoaded } = useJsApiLoader(loadScriptOptions);

  const [isMapOpen, setIsMapOpen] = useState(false);

  const value = field.value as Partial<RACoordsInputValue> | undefined;

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton
        color="secondary"
        onClick={() => {
          setIsMapOpen(true);
        }}
      >
        <PinDrop />
      </IconButton>
      <TextField
        label="Latitude"
        error={(isTouched || isSubmitted) && invalid}
        helperText={(isTouched || isSubmitted) && invalid ? error?.message : ""}
        required={isRequired}
        onChange={(e) => {
          field.onChange({
            ...field.value,
            lat: Number(e.target.value),
          });
        }}
        value={field.value.lat}
        sx={{
          flex: 1,
        }}
      />
      <TextField
        label="Longitude"
        fullWidth
        error={(isTouched || isSubmitted) && invalid}
        helperText={(isTouched || isSubmitted) && invalid ? error?.message : ""}
        required={isRequired}
        onChange={(e) => {
          field.onChange({
            ...field.value,
            lng: Number(e.target.value),
          });
        }}
        value={field.value.lng}
        sx={{
          flex: 1,
        }}
      />

      <Dialog open={isMapOpen} onClose={() => setIsMapOpen(false)}>
        <DialogTitle>Choisir un point sur la carte</DialogTitle>
        <DialogContent>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{
                height: 400,
                width: 400,
              }}
              center={
                value?.lat && value.lng
                  ? { lat: value.lat, lng: value.lng }
                  : defaultCenter
              }
              zoom={12}
            >
              <MarkerF
                position={{
                  lat: value?.lat || defaultCenter.lat,
                  lng: value?.lng || defaultCenter.lng,
                }}
                draggable
                onDragEnd={(e) => {
                  field.onChange({
                    lat: e.latLng?.lat(),
                    lng: e.latLng?.lng(),
                  });
                }}
              />
            </GoogleMap>
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsMapOpen(false)}>Valider</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default RACoordsInput;
