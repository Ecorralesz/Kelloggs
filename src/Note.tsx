import {   Button, Col, Row, Stack } from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import parse from "html-react-parser";
import { useRef } from "react";

type NoteProps = {
  onDelete: (id: string) => void
} 

export function Note({onDelete}: NoteProps) {
  const note = useNote()
  const navigate = useNavigate()
  const divRef = useRef<HTMLDivElement>(null);

  return <>
    <Row className="align-items-center mb-4">
      <Col>
      <h1>{note.subject}</h1>
      </Col>
      <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button style={{backgroundColor: "#D31245", border: "none"}}>Edit</Button>
            </Link>
            <Button 
            onClick={() => {
              onDelete(note.id)
              navigate("/")
            }}
            variant="outline-warning">Delete</Button>
            <Link to="/">
            <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
    </Row>
    <div ref={divRef} style={{fontSize: "0.8rem"}}>{parse(note.markdown)}</div>
  </>
}