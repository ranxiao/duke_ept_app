import { IconButton, InputAdornment, OutlinedInput } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./CustomInput.css";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function CustomInput({
  label,
  labelSize,

  placeholder,
  type,
  value,
  setValue,
  theme,
  margin,
  width,

  multiline,
  rows,
  rowsMax,

  error,
  helperText,
  required,
  autoComplete,
}) {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (type && type === "password") setShowText(false);
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowText(!showText);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="CustomInput" style={{ margin: margin, width: width }}>
      <h4 style={{ color: theme.textColor2, fontSize: labelSize || "0.85rem" }}>
        {label}
      </h4>

      <div className="ChangePasswordValue">
        <OutlinedInput
          required={required}
          autoComplete={autoComplete}
          error={error}
          helperText={helperText}
          multiline={multiline}
          rows={rows}
          rowsMax={rowsMax}
          className="InputBase"
          style={{
            height: !multiline && 45,
            paddingRight: 25,
            color: theme.textColor2,
          }}
          placeholder={placeholder}
          type={type === "number" ? "number" : showText ? "text" : "password"}
          value={value}
          onChange={handleChange}
          endAdornment={
            type === "password" && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showText ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </div>
    </div>
  );
}
