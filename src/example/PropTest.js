import React, {useRef} from 'react';

export default function PropTest({idx, propType, propVal, lineNum = 1, setType = f => f, setVal = f => f}) {

    const textRef = useRef();

    return <>
        <input style={{verticalAlign : "top", width : "128px"}}
            type="text"
            maxLength={30}
            value={propType}
            onChange={e => setType(idx, e.target.value)}
		    required
        />
        {" : "}
        <textarea ref={textRef}
            style={{verticalAlign : "top", width : "256px", resize : "none"}}
            rows={lineNum}
            value={propVal}
            onChange={e => setVal(idx, e.target.value)}
            maxLength={255}
        />
    </>
}