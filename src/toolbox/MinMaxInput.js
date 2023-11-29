export default function MinMaxInput({type, value, min, max, onChange = f => f, onBlur = f => f}) {
    return <input type={type}
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