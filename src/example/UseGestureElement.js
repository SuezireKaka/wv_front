import { useDrag } from 'react-use-gesture';

export default function UseGestureElement({ id,
    canvasSize = [1024, 768], init, pos, set, type, index,
    onMove = f => f, onClick = f => f
}) {

    const bindPos = useDrag((params) => {
        onMove(set, type, index, {
            ...pos,
            xPos: params.offset[0] + init.xPos,
            yPos: params.offset[1] + init.yPos
        })
    }, {
        bounds: {
            left: 0 - init.xPos,
            right: canvasSize[0] - pos.xSize - init.xPos,
            top: 0 - init.yPos,
            bottom: canvasSize[1] - pos.ySize - init.yPos
        }
    });

    return <button id={id}
        {...bindPos()}
        style={{ /*MODIFIED!*/
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