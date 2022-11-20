import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";

const ImageListElement = ({id, url, altText, onModify, onRemove, onUndo}: ImageListProps) => {
  const [markedForDeletion, markForDeletion] = useState(false);
  const [displayUrl, setDisplayUrl] = useState(url);
  let imageUrlChange;

  useEffect(() => {
  }, [markedForDeletion, displayUrl]);

  const onAltTextChange = (event) => {
    onModify(id, {
      altText: event.target.value
    });
  }

  const onDelete = () => {
    markForDeletion(true);
    onRemove(id);
  }

  const onUndoDelete = () => {
    markForDeletion(false);
    onUndo(id);
  }

  const onImageUrlChange = (event) => {
    if (imageUrlChange) {
      clearTimeout(imageUrlChange);
    }
    imageUrlChange = setTimeout(() =>{
      setDisplayUrl(event.target.value);
      onModify(id, {
        url: event.target.value
      });
    }, 2000);
  }

  return (
    <div className="imageRow">
      <img src={displayUrl} alt={altText} onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src="/not-found.svg";
      }}/>
      <div className="imageRowControls">
        <div className="imageUrlControl">
          <label className="textLabel">Image URL: </label>
          <input id="url" type="text" name="url" defaultValue={displayUrl} onChange={onImageUrlChange}></input>
        </div>
        <div className="altTextControl">
          <label className="textLabel">Alt Text: </label>
          <textarea className="altTextBox" id="altText" name="altText" defaultValue={altText} onChange={onAltTextChange}></textarea>
        </div>
        <div className="deleteIcon">
          <DeleteButton onDelete={onDelete} onUndo={onUndoDelete} />
        </div>
      </div>
      <style jsx>{`
        .altTextBox {
          flex: 1 0 max-content;
        }

        .altTextControl {
          display: flex;
          flex-direction: column;
          flex: 1 0 auto;
        }

        .textLabel {
          display: inline;
          vertical-align: top;
        }

        .imageRow {
          padding: 1em;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          background-color: ${markedForDeletion ? "#ffadad" : "#e8e6fa"};
          border-radius: 2rem;
          margin-bottom: 1rem;
          border: 2px solid #241a30;
          height: 20rem;
          min-width: 40rem;
        }

        .imageRow img {
          max-height: 20rem;
          width: auto;
          margin-right: 2rem;
        }

        .imageUrlControl {
          display: flex;
          flex-direction: column;
        }

        .imageRowControls {
          display: flex;
          flex-direction: column;
          flex: 1 0 auto;
        }

        .deleteIcon {
          margin-top: auto;
          margin-left: auto;
          padding-top: 1rem;
        }
      `}</style>
    </div>
  )
}

export type ImageListProps = {
  id: string;
  url: string;
  altText: string;
  onModify: Function;
  onRemove: Function;
  onUndo: Function
}

export default ImageListElement;