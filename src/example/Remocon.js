import { useState } from "react"

export default function Remocon({funcArray, index = 0, setNowIndex = f => f}) {

    return <div style={{marginBottom : "5px"}}>
        <p>지금 선택된 기능은 {funcArray ? funcArray[index] + "입니다" : "없습니다"}.</p>
        {funcArray?.map((func, index) => <button onClick={() => setNowIndex(index)}>{func}</button>)}
    </div>
}