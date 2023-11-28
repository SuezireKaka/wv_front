export default function NumberInput({value, min, max, onChange = f => f, onBlur = f => f}) {
    return <input type="number"
        min={min} max={max}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
    />
}

export function minmax(value, minVal, maxVal) {
    return value > minVal 
    ? value < maxVal 
        ? value
        : maxVal
    : minVal
}