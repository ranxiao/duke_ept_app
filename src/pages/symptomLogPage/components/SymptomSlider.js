import { Slider } from "@material-ui/core";
import React from "react";

const valuetext = (value) => {
  return `${value}°C`;
};

export default function SymptomSlider({
  theme,
  value,
  setValue,
  label,
  text1,
  text2,
  paddingBottom,
}) {
  return (
    <div style={{ paddingBottom: paddingBottom || 10 }}>
      <h5
        style={{
          color: theme.textColor3,
          fontSize: 14,
          fontWeight: 600,
          marginTop: 10,
        }}
      >
        {label}
      </h5>
      <Slider
        // defaultValue={5}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
        value={value}
        onChange={(e, v) => setValue(v)}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h6 style={{ color: theme.textColor3, fontWeight: 500 }}>
          {text1 || "Not at all"}
        </h6>
        <h6 style={{ color: theme.textColor3, fontWeight: 500 }}>
          {text2 || "Worst possible way"}
        </h6>
      </div>
    </div>
  );
}
