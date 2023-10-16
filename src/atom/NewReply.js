import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap';
import Row from 'react-bootstrap';
import Col from 'react-bootstrap';

function NewReply({ auth, reply, replayOnReply, onInputReplyContent, mngReply=f=>f }) {
    if (!auth.userNick)
        return;
    return (<>
 <input placeholder='댓글 달기'
                        value={replayOnReply.get(reply.id)}
                        style={{ height: "100%", width: "100%" }}
                        onInput={(e) => onInputReplyContent(e, reply.id)} />
        
        
        <Container>
            <Row>
                <Col>댓글 달기</Col>
            </Row>
            <Row>
                <Col sm={10}>
                    <input placeholder='댓글 달기'
                        value={replayOnReply.get(reply.id)}
                        style={{ height: "100%", width: "100%" }}
                        onInput={(e) => onInputReplyContent(e, reply.id)} />
                </Col>
                <Col sm><Button variant="primary" onClick={(e) => { mngReply(e, reply, reply.id) }}>적용</Button></Col>
            </Row>
        </Container>
    

   </> );
}

export default NewReply;