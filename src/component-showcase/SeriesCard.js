import SeriesSkin from "./SeriesSkin";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from "react-bootstrap";

export default function SeriesCard({data = []}) {
    const location = useLocation();
    let state = location.state;
    console.log(data)


    return (<> {data.map(series => {
                return <>
                <Col xs={{ order: 12 }}><Card id ={series?.id} style={{ width: '18rem' }}>
                <Link to={`/series/${series.id}`} state={{ seriesId: series.id, post: state?.post, page:1, boardId:state?.boardId}}>
                    <Card.Img variant="top" src="holder.js/100px180" />{series?.id}
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