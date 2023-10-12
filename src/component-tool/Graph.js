import { useState } from "react"

export default function drawGraph({canvas, vertices = [], edges = []}) {
    const [nowVertices, setNowVertices] = useState(vertices)
    const [nowEdges, setNowEdges] = useState(edges)


    
    return canvas
}