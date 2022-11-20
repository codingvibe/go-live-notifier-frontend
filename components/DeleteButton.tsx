import { useEffect, useState } from "react";
import Image from "next/image";

const DeleteButton = ({ initialState = true, onDelete, onUndo }) => {
  const [deleteState, setDeleteState] = useState(initialState)
  useEffect(() => {
  }, [deleteState]);

  const markForDeletion = () => {
    setDeleteState(false);
    onDelete();
  }

  const undoMarkForDeletion = () => {
    setDeleteState(true);
    onUndo();
  }

  return (
    <div className="deleteButton">
      <span className="tooltiptext">{deleteState ? "Mark for Deletion" : "Undo"}</span>
      <Image
      id="trash"
      alt={deleteState ? "mark image for deletion" : "undo mark for deletion"}
      src={deleteState ? "/trash-can.svg" : "/undo.svg"}
      width="50"
      height="50"
      onClick={deleteState ? markForDeletion : undoMarkForDeletion}></Image>
      <style jsx>{`
        .deleteButton {
          cursor: pointer;
          position: relative;
          display: inline-block;
        }

        .deleteButton .tooltiptext {
          visibility: hidden;
          width: 120px;
          background-color: black;
          color: #fff;
          text-align: center;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 6px;
          bottom: 100%;
          left: 50%;
          margin-left: -60px;
          transition: opacity 0.3s;
          opacity: 0;
        }

        .deleteButton:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export default DeleteButton;