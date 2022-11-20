import Image from "next/image";

const PlusButton = ({onClick}) => {
  return (
    <div className="plusButton">
      <span className="tooltiptext">{"Add another potential image to post"}</span>
      <Image
      id="add"
      alt="Add another potential image to post"
      src="/plus.svg"
      style={{"cursor": "pointer"}}
      width="50"
      height="50"
      onClick={onClick}></Image>
      <style jsx>{`
        .plusButton {
          position: relative;
          display: inline-block;
          filter: invert(82%) sepia(5%) saturate(1687%) hue-rotate(195deg) brightness(88%) contrast(84%);
        }

        .plusButton:hover {
          filter: invert(100%) sepia(99%) saturate(944%) hue-rotate(181deg) brightness(100%) contrast(96%);
        }

        .plusButton:active {
          filter: invert(49%) sepia(13%) saturate(584%) hue-rotate(195deg) brightness(100%) contrast(90%);
        }

        .plusButton .tooltiptext {
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

        .plusButton:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
        }

        .plusButton:active .tooltiptext {
          visibility: hidden;
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export default PlusButton;