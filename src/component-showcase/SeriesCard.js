import SeriesSkin from "./SeriesSkin";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from "react-bootstrap";
import ThumbnailList from "atom/ThumbnailList";
import { AxiosPost } from "toolbox/Fetch";
import OriginalFileView from "atom/OriginalFileView";
import OriginalViewList from "atom/OriginalViewList";
import { useEffect } from "react";
import { useState } from "react";
import OriginalViewOne from "atom/OriginalViewOne";

export default function SeriesCard({data = []}) {
    const location = useLocation();
    let state = location.state;
    const seriesDetailsUri = `/work/anonymous/findById/${state.seriesId}`;
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [datae, setDatae] = useState([]);
    console.log(data)
    console.log(state)
    
    



    return (<> {data.map(series => {
        console.log(series)
                return <>
                <Col xs={{ order: 12 }}><Card id ={series?.id} style={{ width: '18rem' }}>
                <Link to={`/series/${series.id}`} state={{ seriesId: series.id, post: state?.post, page:1, boardId:state?.boardId}}>

                <OriginalViewOne imgDtoList={series.listAttachFile} x="200" y="200"/>
                      </Link>
                    <Card.Body>
                      <Card.Title>{series?.title}</Card.Title>
                      <Card.Text>{series?.writer?.nick}</Card.Text>
                    </Card.Body>
                  </Card><br/></Col>
                </>
                })}
    </>)
}