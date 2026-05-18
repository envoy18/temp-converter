# ThermoScale Temperature Converter

ThermoScale is a React and TypeScript thermometer application that converts temperatures between Celsius and Fahrenheit. It shows both scales beside a thermometer graphic, keeps the gauge level synced with the current value, and uses color to show cold, comfortable, and hot temperature ranges.

## How to Run

1. Install dependencies with `npm install` if they are not already installed.
2. Start the app with `npm run dev`.
3. Open the local URL shown in the terminal.

## How to Use

Enter a value in the Celsius text box to automatically calculate the matching Fahrenheit value.

Enter a value in the Fahrenheit text box to automatically calculate the matching Celsius value.

Drag the thermometer level up or down to change the temperature visually. The Celsius and Fahrenheit text boxes update as the level moves.

The allowed Celsius range is `-30°C` to `200°C`. The matching Fahrenheit range is `-22°F` to `392°F`. If a value outside these limits is entered, the app shows an error message and keeps the last valid thermometer level.

## Conversion Formula

Celsius to Fahrenheit:

```txt
F = (C x 1.8) + 32
```

Fahrenheit to Celsius:

```txt
C = (F - 32) / 1.8
```
