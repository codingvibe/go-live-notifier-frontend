import { useRouter } from 'next/router'
import { useState } from 'react';
import { setImages, ImageDetailsWithId } from "../lib/backend";
import Button from "./Button";
import ImageListElement from "./ImageListElement";
import PlusButton from './PlusButton';
import SaveButton from './SaveButton';

const ImageList = ({ images }: { images: ImageDetailsWithId[] }) => {let currentImages = images || [];
  const router = useRouter();
  const [imagesForDeletion, setImagesForDeletion] = useState([]);
  const DEFAULT_ALT_TEXT = "Fill me in";
  const DEFAULT_URL = "i.am.invalid";

  const saveUpdate = async () => {
    const imageUpdates = currentImages.filter(image => 
      !imagesForDeletion.includes(image.id) && image.url != DEFAULT_URL
    );
    const resp = await setImages(imageUpdates);
    if (resp.ok) {
      setImagesForDeletion([]);
      router.reload();
    }
  }

  const remove = (imageId) => {
    const curImageLength = currentImages.length;
    currentImages = currentImages.filter(image => image.id != imageId || image.altText != DEFAULT_ALT_TEXT || image.url != DEFAULT_URL);
    if (currentImages.length != curImageLength) {
      setDisplayImages(currentImages.map(toDisplayImage))
    }
    imagesForDeletion.push(imageId);
  }

  const undo = (imageId) => {
    setImagesForDeletion(imagesForDeletion.filter(delImage => !(delImage.id == imageId)));
  }

  const modify = (id, updateValues) => {
    for (let i = 0; i < currentImages.length; i++) {
      if (currentImages[i].id == id) {
        currentImages[i].url = updateValues.url || currentImages[i].url;
        currentImages[i].altText = updateValues.altText || currentImages[i].altText;
      }
    }
  }

  const toDisplayImage = (image) => {
    return <ImageListElement key={image.id} id={image.id} url={image.url} altText={image.altText} onModify={modify} onRemove={remove} onUndo={undo} />
  }
  
  const addRow = () => {
    currentImages.push({
      "id": crypto.randomUUID(),
      "altText": "Fill me in",
      "url": "i.am.invalid"
    });
    setDisplayImages(currentImages.map(toDisplayImage))
  }

  const [displayImages, setDisplayImages] = useState(images.map(toDisplayImage));
  
  return (
    <div>
      { displayImages }
      <div className='addRow'>
        <PlusButton onClick={addRow} />
      </div>
      <div className='saveChanges'>
        <SaveButton onClick={saveUpdate} />
      </div>

      <style jsx>{`
        li {
          list-style-type:none;
          display: flex;
          flex-direction: column;
        }

        .saveChanges {
          display: flex;
          justify-content: center;
        }

        .addRow {
          display: flex;
          justify-content: right;
        }
      `}</style>
    </div>
  )
}

export default ImageList;