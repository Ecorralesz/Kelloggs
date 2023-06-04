import { FormEvent, useRef, useState } from "react";
import { Form, Stack, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NoteData } from "./App";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  subject = "",
  markdown = "",
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(markdown);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      subject: titleRef.current!.value,
      markdown: value,
    });

    navigate("..");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      const selection = window.getSelection();
      const link = selection?.focusNode?.parentElement;
      const href = link?.getAttribute("href");
      if (href) {
        e.preventDefault();
        const url = new URL(href);
        window.open(url.href, "_blank");
      }
    }
  }
  
  

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control ref={titleRef} required defaultValue={subject} />
          </Form.Group>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <ReactQuill
            value={value}
            onChange={(val) => {
              setValue(val);
            }}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
                ["link"],
              ],
            }}
            formats={["header", "bold", "italic", "underline", "link"]}
            onKeyDown={handleKeyDown} // Added event handler for keydown event
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            style={{ backgroundColor: "#D31245", border: "none" }}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
