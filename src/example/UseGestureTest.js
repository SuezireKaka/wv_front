import { useState } from 'react';
import {useDrag} from 'react-use-gesture';

export function UseGestureList() {
    const [poses, setPoses] = useState([{x:0, y:0}, {x:100, y:100}])


    return <div style={{position:"relative", width:1024, height:768, margin: "0 auto"}}>
        {poses.map(pos => <UseGestureElement init={pos}/>)}
    </div>
}

export function UseGestureElement(init) {
    const [pos, setPos] = useState(init)

    const bindPos = useDrag((params)=>{
        setPos({
            x: params.offset[0],
            y: params.offset[1],
        })
        
    });

    return <button {...bindPos()}
        style={{ /*MODIFIED!*/
            position:"absolute",
            left: pos.x,
            top: pos.y
        }}
    >
        야호~!
    </button>
}