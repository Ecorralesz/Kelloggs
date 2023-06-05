import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import styles from "./NoteList.module.css";
import Banner from "./component/Banner";
import Chat from "./component/Chat";


type SimplifiedNote = {
  subject: string;
  id: string;
};

type NoteListProps = {
  notes: SimplifiedNote[];
};

export function NoteList({ notes }: NoteListProps) {
  const [subject, setSubject] = useState("");

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
            <Button style={{ backgroundColor: "#D31245", border: "none" }}>
              Create
            </Button>
          </Link>
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
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} subject={note.subject} />
          </Col>
        ))}
      </Row>
      <Chat />
    </>
  );
}

function NoteCard({ id, subject }: SimplifiedNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{subject}</span>
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
