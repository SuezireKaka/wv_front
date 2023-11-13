import UseGestureElement from "toolbox/UseGestureElement"

export const TRACKER_SIZE = [20, 20]

export default function Tracker({
    mapped = {id : "", xPos : 0, yPos : 0, xSize : 100, ySize : 100},
    minToolSize = {xSize : 50, ySize : 50},
    maxToolSize = {xSize : 200, ySize : 200},
    init, pos, bound, type, index, style,
    onlySize = false, onResize = f => f
}) {

    if (onlySize) {
        return <UseGestureElement
            init = {{...init,
                xPos : init.xPos - TRACKER_SIZE[0] / 2, 
                yPos : init.yPos - TRACKER_SIZE[1] / 2
            }}
            pos = {{...pos,
                xPos : pos.xPos - TRACKER_SIZE[0] / 2, 
                yPos : pos.yPos - TRACKER_SIZE[1] / 2,
                xSize : TRACKER_SIZE[0], 
                ySize : TRACKER_SIZE[1]
            }}
            onMove={onResize}
            type={type}
            index={0}
            bound={{
                left : minToolSize.xSize - init.xPos - TRACKER_SIZE[0] / 2,
                right : maxToolSize.xSize - init.xPos - TRACKER_SIZE[1] / 2,
                top : minToolSize.ySize - init.yPos - TRACKER_SIZE[0] / 2,
                bottom : maxToolSize.ySize - init.yPos - TRACKER_SIZE[1] / 2
            }}
            style={style}
        />
    }
    return <p>?</p>
}