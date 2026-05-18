import { useThermometer } from "./useThermometer";

export const Thermometer = () => {
    const {
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
        minCelcius,
        maxCelcius,
        minFarenheit,
        maxFarenheit,
        changeCelcius,
        changeFarenheit,
        startDrag,
        dragLevel,
        changeLevelByKey,
        resetTemperature,
        openHelpModal,
        closeHelpModal,
    } = useThermometer();

    return (
        <section className={`thermometer-app ${temperatureClass}`}>
            <div className="app-header">
                <p className="eyebrow">Temperature Converter</p>
                <button type="button" className="help-button" onClick={openHelpModal}>
                    Help
                </button>
            </div>

            <div className="toolbar">
                <p className="condition-label">
                    Current condition: <span>{temperatureCondition}</span>
                </p>
                <button type="button" className="reset-button" onClick={resetTemperature}>
                    Reset
                </button>
            </div>

            <div className="thermometer-panel">
                <div className="reading-card">
                    <label htmlFor="celcius-input">Celsius</label>
                    <div className={`input-row ${hasCelciusError ? "input-row-error" : ""}`}>
                        <input
                            id="celcius-input"
                            inputMode="decimal"
                            type="number"
                            value={celciusInput}
                            onChange={(event) => changeCelcius(event.target.value)}
                            aria-describedby="celcius-input-error"
                            aria-invalid={hasCelciusError}
                        />
                        <span>°C</span>
                    </div>
                    {hasCelciusError && (
                        <p id="celcius-input-error" className="field-error">
                            {celciusErrorMessage}
                        </p>
                    )}
                    <p className="range-note">Range: {minCelcius}°C to {maxCelcius}°C</p>
                </div>

                <div className="thermometer-stage">
                    <div className="scale scale-celcius" aria-hidden="true">
                        {scaleValues.map((value) => (
                            <span
                                key={value.celcius}
                                style={{ top: `${value.topPosition}%` }}
                            >
                                {value.celcius}°C
                            </span>
                        ))}
                    </div>

                    <div
                        ref={scaleRef}
                        className="thermometer-body"
                        role="slider"
                        aria-label="Thermometer level"
                        aria-valuemin={minCelcius}
                        aria-valuemax={maxCelcius}
                        aria-valuenow={celciusVal}
                        tabIndex={0}
                        onPointerDown={startDrag}
                        onKeyDown={changeLevelByKey}
                        onPointerMove={dragLevel}
                    >
                        <div className="glass-tube">
                            <div className="temperature-fill" style={{ height: `${levelPercent}%` }} />
                            <div className="shine" />
                        </div>
                        <div className="bulb">
                            <div className="bulb-core" />
                        </div>
                        <div className="level-handle" style={{ bottom: `${levelPercent}%` }}>
                            <span>{celciusVal}°C</span>
                        </div>
                    </div>

                    <div className="scale scale-farenheit" aria-hidden="true">
                        {scaleValues.map((value) => (
                            <span
                                key={value.celcius}
                                style={{ top: `${value.topPosition}%` }}
                            >
                                {value.farenheit}°F
                            </span>
                        ))}
                    </div>
                </div>

                <div className="reading-card">
                    <label htmlFor="farenheit-input">Fahrenheit</label>
                    <div className={`input-row ${hasFarenheitError ? "input-row-error" : ""}`}>
                        <input
                            id="farenheit-input"
                            inputMode="decimal"
                            type="number"
                            value={farInput}
                            onChange={(event) => changeFarenheit(event.target.value)}
                            aria-describedby="farenheit-input-error"
                            aria-invalid={hasFarenheitError}
                        />
                        <span>°F</span>
                    </div>
                    {hasFarenheitError && (
                        <p id="farenheit-input-error" className="field-error">
                            {farenheitErrorMessage}
                        </p>
                    )}
                    <p className="range-note">
                        Range: {minFarenheit}°F to {maxFarenheit}°F
                    </p>
                </div>
            </div>

            <div id="temperature-error" className="status-message" aria-live="polite">
                Drag the mercury level or enter a temperature on either side.
            </div>

            {isHelpOpen && (
                <div className="modal-backdrop" role="presentation" onClick={closeHelpModal}>
                    <div
                        className="help-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="help-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2 id="help-modal-title">How to use</h2>
                            <button type="button" className="modal-close-button" onClick={closeHelpModal}>
                                Close
                            </button>
                        </div>
                        <ul className="help-list">
                            <li>Type a Celsius value to update the Fahrenheit field.</li>
                            <li>Type a Fahrenheit value to update the Celsius field.</li>
                            <li>Drag the thermometer level up or down to change both values.</li>
                            <li>Use Reset to return the thermometer to 0°C and 32°F.</li>
                            <li>Values must stay between {minCelcius}°C and {maxCelcius}°C.</li>
                        </ul>
                    </div>
                </div>
            )}
        </section>
    )

}
