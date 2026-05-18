
export const convertCelciusToFarenheit = (celcius: number): number => {
    const convertedVal = (celcius * 1.8) + 32;
    
    return convertedVal;
}


export const convertFarToCelcius = (far: number): number => {
    const convertedVal = (far - 32) / 1.8;

    return convertedVal;
}

export const MIN_CELCIUS = -30;
export const MAX_CELCIUS = 200;
export const MIN_FARENHEIT = convertCelciusToFarenheit(MIN_CELCIUS);
export const MAX_FARENHEIT = convertCelciusToFarenheit(MAX_CELCIUS);
export const SCALE_VALUES = [-30, 0, 50, 100, 150, 200];

export const roundTemperature = (temperature: number): number => {
    return Math.round(temperature * 10) / 10;
}

export const formatTemperature = (temperature: number): string => {
    return roundTemperature(temperature).toString();
}

export const isValidNumber = (value: string): boolean => {
    return value.trim() !== "" && Number.isFinite(Number(value));
}

export const getLevelPercent = (celcius: number): number => {
    return ((celcius - MIN_CELCIUS) / (MAX_CELCIUS - MIN_CELCIUS)) * 100;
}

export const getScaleTopPosition = (celcius: number): number => {
    return 100 - getLevelPercent(celcius);
}

export const getTemperatureClass = (celcius: number): string => {
    if (celcius < 5) {
        return "cold";
    }

    if (celcius > 75) {
        return "hot";
    }

    return "warm";
}

export const getTemperatureCondition = (celcius: number): string => {
    if (celcius <= 0) {
        return "Freezing";
    }

    if (celcius < 15) {
        return "Cold";
    }

    if (celcius < 35) {
        return "Warm";
    }

    if (celcius < 80) {
        return "Hot";
    }

    return "Dangerously Hot";
}

export const getCelciusFromPointerPosition = (positionFromTop: number): number => {
    const boundedPosition = Math.min(Math.max(positionFromTop, 0), 1);

    return MAX_CELCIUS - boundedPosition * (MAX_CELCIUS - MIN_CELCIUS);
}

export const getPositionFromCelcius = (celcius: number): number => {
    return (MAX_CELCIUS - celcius) / (MAX_CELCIUS - MIN_CELCIUS);
}

export const getCelciusKeyboardChange = (key: string, currentCelcius: number): number | null => {
    const smallStep = 1;
    const largeStep = 10;
    const keyChanges: Record<string, number> = {
        ArrowUp: smallStep,
        ArrowRight: smallStep,
        ArrowDown: -smallStep,
        ArrowLeft: -smallStep,
        PageUp: largeStep,
        PageDown: -largeStep,
        Home: MIN_CELCIUS - currentCelcius,
        End: MAX_CELCIUS - currentCelcius,
    };

    return keyChanges[key] ?? null;
}
