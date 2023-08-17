import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import EditList from "./EditList";
import { useContext } from "react";
import { GlobalContext } from "../../GloblaCotext";

function ListCard({ title, body, id }) {
  const { deleteList } = useContext(GlobalContext);
  return (
    <Card style={{ width: "25rem", marginTop: "1rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <EditList id={id} title={title} body={body} name="EDIT" />
        <Button
          onClick={() => {
            deleteList(id);
          }}
          className="m-2"
          variant="danger"
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ListCard;
