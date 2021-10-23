import * as React from "react";
import {TextField, TextFieldProps} from "@mui/material";
import {FieldProps} from "formik";

export const FormField: React.FC<FieldProps & TextFieldProps> = ({placeholder, type, field}) => {
  return (
    <TextField type={type} placeholder={placeholder} {...field}/>
  );
}