import { FormEvent, useRef } from "react";
import { Form, Stack, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NoteData } from "./App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  // onAddTag: (tag: Tag) => void;
  // availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  // onAddTag,
  // availableTags,
  subject = "",
  markdown = "",
  // tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  // const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      subject: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      // tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={subject} />
            </Form.Group>
          
          
            {/* <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label> */}
              {/* <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              /> */}
            {/* </Form.Group> */}
          
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            ref={markdownRef}
            required
            as="textarea"
            rows={15}
            defaultValue={markdown}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="danger">
            Save
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
