export default function SeriesSkin({series = {}}) {
    return <div style={{alignItems:"center"}}>
        {"제목: " + series.title} <br/> {"작가: " + series.writer.nick}
    </div>
}