import { useState } from "react"

export default function PropTest({propType, propVal}) {
    const [type, setType] = useState(propType);
    const [val, setVal] = useState(propVal);
    return <>
        <input style={{verticalAlign : "top", width : "128px"}}
            type="text"
            maxLength={30}
            value={type}
            onChange={e => setType(e.target.value)}
		    required
        />
        {" : "}
        <textarea style={{verticalAlign : "top", width : "256px"}}
            value={val}
            onChange={e => setVal(e.target.value)}
            maxLength={255}
        />
    </>
}