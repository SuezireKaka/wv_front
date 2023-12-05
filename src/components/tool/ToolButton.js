export default function ToolButton({tool, onSelect = f => f, children}) {
    return <button onClick={() => onSelect(tool)}>{children}</button>
}