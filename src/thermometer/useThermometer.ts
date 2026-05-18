import { type KeyboardEvent, type PointerEvent, useRef, useState } from "react";
import {
    MAX_CELCIUS,
    MAX_FARENHEIT,
    MIN_CELCIUS,
    MIN_FARENHEIT,
    SCALE_VALUES,
    convertCelciusToFarenheit,
    convertFarToCelcius,
    formatTemperature,
    getCelciusFromPointerPosition,
    getCelciusKeyboardChange,
    getLevelPercent,
    getPositionFromCelcius,
    getScaleTopPosition,
    getTemperatureCondition,
    getTemperatureClass,
    isValidNumber,
    roundTemperature,
} from "../helper";

export const useThermometer = () => {
    const scaleRef = useRef<HTMLDivElement>(null);
    const [celciusVal, setCelciusVal] = useState(0);
    const [celciusInput, setCelciusInput] = useState(formatTemperature(0));
    const [farInput, setFarInput] = useState(formatTemperature(convertCelciusToFarenheit(0)));
    const [celciusErrorMessage, setCelciusErrorMessage] = useState("");
    const [farenheitErrorMessage, setFarenheitErrorMessage] = useState("");
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const levelPercent = getLevelPercent(celciusVal);
    const temperatureClass = getTemperatureClass(celciusVal);
    const temperatureCondition = getTemperatureCondition(celciusVal);
    const scaleValues = SCALE_VALUES.map((celcius) => ({
        celcius,
        farenheit: roundTemperature(convertCelciusToFarenheit(celcius)),
        topPosition: getScaleTopPosition(celcius),
    }));
    const hasCelciusError = celciusErrorMessage !== "";
    const hasFarenheitError = farenheitErrorMessage !== "";

    const setFromCelcius = (nextCelcius: number) => {
        const roundedCelcius = roundTemperature(nextCelcius);
        const roundedFar = roundTemperature(convertCelciusToFarenheit(roundedCelcius));

        setCelciusVal(roundedCelcius);
        setCelciusInput(formatTemperature(roundedCelcius));
        setFarInput(formatTemperature(roundedFar));
        setCelciusErrorMessage("");
        setFarenheitErrorMessage("");
    }

    const changeCelcius = (value: string) => {
        setCelciusInput(value);
        setFarenheitErrorMessage("");

        if (!isValidNumber(value)) {
            setCelciusErrorMessage("Please enter a valid Celsius number.");
            return;
        }

        const nextCelcius = Number(value);

        if (nextCelcius < MIN_CELCIUS || nextCelcius > MAX_CELCIUS) {
            setCelciusErrorMessage(`Celsius must be between ${MIN_CELCIUS}°C and ${MAX_CELCIUS}°C.`);
            return;
        }

        setFromCelcius(nextCelcius);
    }

    const changeFarenheit = (value: string) => {
        setFarInput(value);
        setCelciusErrorMessage("");

        if (!isValidNumber(value)) {
            setFarenheitErrorMessage("Please enter a valid Fahrenheit number.");
            return;
        }

        const nextFar = Number(value);
        const nextCelcius = convertFarToCelcius(nextFar);

        if (nextCelcius < MIN_CELCIUS || nextCelcius > MAX_CELCIUS) {
            setFarenheitErrorMessage(
                `Fahrenheit must be between ${formatTemperature(MIN_FARENHEIT)}°F and ${formatTemperature(MAX_FARENHEIT)}°F.`
            );
            return;
        }

        setFromCelcius(nextCelcius);
    }

    const changeLevel = (positionFromTop: number) => {
        const nextCelcius = getCelciusFromPointerPosition(positionFromTop);

        setFromCelcius(nextCelcius);
    }

    const updateLevelFromPointer = (event: PointerEvent<HTMLDivElement>) => {
        const scaleElement = scaleRef.current;

        if (!scaleElement) {
            return;
        }

        const rect = scaleElement.getBoundingClientRect();
        const positionFromTop = (event.clientY - rect.top) / rect.height;

        changeLevel(positionFromTop);
    }

    const startDrag = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateLevelFromPointer(event);
    }

    const dragLevel = (event: PointerEvent<HTMLDivElement>) => {
        if (event.buttons === 1) {
            updateLevelFromPointer(event);
        }
    }

    const changeLevelByKey = (event: KeyboardEvent<HTMLDivElement>) => {
        const change = getCelciusKeyboardChange(event.key, celciusVal);

        if (change === null) {
            return;
        }

        event.preventDefault();
        const nextCelcius = celciusVal + change;
        const nextPositionFromTop = getPositionFromCelcius(nextCelcius);

        changeLevel(nextPositionFromTop);
    }

    const resetTemperature = () => {
        setFromCelcius(0);
    }

    const openHelpModal = () => {
        setIsHelpOpen(true);
    }

    const closeHelpModal = () => {
        setIsHelpOpen(false);
    }

    return {
        scaleRef,
        celciusVal,
        celciusInput,
        farInput,
        celciusErrorMessage,
        farenheitErrorMessage,
        hasCelciusError,
        hasFarenheitError,
        isHelpOpen,
        levelPercent,
        temperatureClass,
        temperatureCondition,
        scaleValues,
        minCelcius: MIN_CELCIUS,
        maxCelcius: MAX_CELCIUS,
        minFarenheit: MIN_FARENHEIT,
        maxFarenheit: MAX_FARENHEIT,
        changeCelcius,
        changeFarenheit,
        startDrag,
        dragLevel,
        changeLevelByKey,
        resetTemperature,
        openHelpModal,
        closeHelpModal,
    }
}
