import { Button } from "react-bootstrap";

const EditButton = ({ variant, onClick, isEditMode }) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {isEditMode ? "Cancel" : "Edit"}
    </Button>
  );
};

export default EditButton;