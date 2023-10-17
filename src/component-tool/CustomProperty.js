export default function CustomProperty({propType, propVal}) {
    return <>
        <input style={{verticalAlign : "top", width : "128px"}} type="text" maxLength={255} value={propType}/>
        {" : "}
        <textarea style={{verticalAlign : "top", width : "256px"}} maxLength={255} value={propVal}/>
    </>
}