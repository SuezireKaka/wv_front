import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";

function NewReply({
  auth,
  reply,
  replayOnReply,
  onInputReplyContent = (f) => f,
  mngReply = (f) => f,
}) {
  console.log("1111111111111");
  if (!auth.nick) return;
  return (
    <>
      <Container>
        <Row>
          <Col sm={10}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="댓글 달기"
                  value={replayOnReply.get(reply.id)}
                  style={{ height: "100%", width: "100%" }}
                  onInput={(e) => onInputReplyContent(e, reply.id)}
                />
                <Form.Text className="text-muted">
                  매너있게 댓글을 달아주세요.
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>
          <Col sm>
            <Button
              variant="primary"
              onClick={(e) => {
                mngReply(e, reply.id);
              }}
            >
              적용
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default NewReply;
