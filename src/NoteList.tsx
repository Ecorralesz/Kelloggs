import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import styles from "./NoteList.module.css";
import Banner from "./component/Banner";
import Chat from "./component/Chat";
import { useLottie } from "lottie-react";
import animationData from "./assets/Loading.json";

type SimplifiedNote = {
  subject: string;
  id: string;
};

type NoteListProps = {
  notes: SimplifiedNote[];
  loading: boolean;
};

const NOTES_PER_PAGE = 16;

export function NoteList({ notes, loading }: NoteListProps) {
  console.log(loading)
  const [subject, setSubject] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(true);
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        subject === "" ||
        note.subject.toLowerCase().includes(subject.toLowerCase())
      );
    });
  }, [subject, notes]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastNote = currentPage * NOTES_PER_PAGE;
  const indexOfFirstNote = indexOfLastNote - NOTES_PER_PAGE;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  const renderNotes = currentNotes.map((note) => (
    <Col key={note.id}>
      <NoteCard id={note.id} subject={note.subject} />
    </Col>
  ));

  const renderPagination = () => {
    const pageNumbers = Math.ceil(filteredNotes.length / NOTES_PER_PAGE);
    if (pageNumbers === 1) return null;

    return (
      <div className="text-center mt-4">
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
          (pageNumber) => (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "danger" : "secondary"}
              onClick={() => paginate(pageNumber)}
              className="me-2"
            >
              {pageNumber}
            </Button>
          )
        )}
      </div>
    );
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { View } = useLottie(lottieOptions);


  return (
    <>
      <Banner />
      <Row className="justify-content-end mb-4">
        <Col xs="auto" style={{ zIndex: '5' }}>
          <Link to="./new">
            <Button style={{ backgroundColor: "#D31245", border: "none"}}>
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
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: 600, height: 600, zIndex: -1 }}>{View}</div>
        </div>
      ) : (
        <>
          <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
            {renderNotes}
          </Row>
          {renderPagination()}
          <Chat />
        </>
      )}
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
