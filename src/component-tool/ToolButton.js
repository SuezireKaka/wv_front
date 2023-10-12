export default function ToolButton({tool, onSelect = f => f, children}) {
    console.log(tool.id)
    return <button onClick={e => onSelect(tool.id)}>{children}</button>
}