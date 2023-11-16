import { useDrag } from 'react-use-gesture';

export default function UseGestureElement({ id,
    init, pos, set, type, index, bound, style,
    onMove = f => f, onClick = f => f
}) {
    console.log("니 시작 줘 봐", init)
    console.log("니 위치가 그렇게 엄청나다며?", pos)

    const bindPos = useDrag((params) => {
        onMove(set, type, index, {
            ...pos,
            xPos: params.offset[0] + init.xPos,
            yPos: params.offset[1] + init.yPos
        })
    }, {bounds : {
       ...bound
    }});

    return <button id={id}
        {...bindPos()}
        style={{ /*MODIFIED!*/
            ...style,
            position: "absolute",
            left: pos.xPos,
            top: pos.yPos,
            width: pos.xSize,
            height: pos.ySize
        }}
        onClick = {onClick}
    >
        {pos.name}
    </button>
}