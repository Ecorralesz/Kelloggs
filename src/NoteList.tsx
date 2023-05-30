import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import styles from "./NoteList.module.css";
import Banner from "./component/Banner";

type SimplifiedNote = {
  // tags: Tag[];
  subject: string;
  id: string;
};

type NoteListProps = {
  // availableTags: Tag[];
  notes: SimplifiedNote[];
  // onUpdateTag: (id: string, label: string) => void;
  // onDeleteTag: (id: string) => void;
};

// type EditTagsModalProps = {
//   show: boolean;
//   // availableTags: Tag[];
//   handleClose: () => void;
//   // onUpdateTag: (id: string, label: string) => void;
//   // onDeleteTag: (id: string) => void;
// };

export function NoteList({
  // availableTags,
  notes,
}: // onUpdateTag,
// onDeleteTag,
NoteListProps) {
  // const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [subject, setSubject] = useState("");

  // const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        subject === "" ||
        note.subject.toLowerCase().includes(subject.toLocaleLowerCase())
      );
    });
  }, [subject, notes]);

  return (
    <>
      <Banner />

      <Row className="justify-content-end mb-4">
        <Col xs="auto">
          <Link to="./new">
            <Button variant="primary">Create</Button>
          </Link>
          {/* <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-secondary"
            >
              Edit Tags
            </Button> */}
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="subject">
              <Form.Label>Search By Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
          </Col>
          {/* <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
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
              />
            </Form.Group>
          </Col> */}
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} subject={note.subject} />
          </Col>
        ))}
      </Row>
      {/* <EditTagsModal
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      /> */}
    </>
  );
}

function NoteCard({ id, subject }: SimplifiedNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`} // Update the relative path here
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{subject}</span>
          {/* {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )} */}
        </Stack>
      </Card.Body>
    </Card>
  );
}

// function EditTagsModal({
//   // availableTags,
//   handleClose,
//   show,
//   // onDeleteTag,
//   // onUpdateTag,
// }: EditTagsModalProps) {
//   return (
//     <Modal show={show} onHide={handleClose}>
//       {/* <Modal.Header closeButton>
//         <Modal.subject>Edit Tags</Modal.subject>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Stack gap={2}>
//             {availableTags.map((tag) => (
//               <Row key={tag.id}>
//                 <Col>
//                   <Form.Control
//                     type="text"
//                     value={tag.label}
//                     onChange={(e) => onUpdateTag(tag.id, e.target.value)}
//                   />
//                 </Col>
//                 <Col xs="auto">
//                   <Button
//                   onClick={() => onDeleteTag(tag.id)}
//                   variant="outline-danger">&times;</Button>
//                 </Col>
//               </Row>
//             ))}
//           </Stack>
//         </Form>
//       </Modal.Body> */}
//     </Modal>
//   );
// }
