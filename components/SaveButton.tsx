const SaveButton = ({onClick}) => {
  return (
    <div className='saveButton' onClick={ onClick }>
      <span style={{fontWeight: "bold"}}>Save</span>
      <style jsx>{`
        .saveButton {
          cursor: pointer;
          height: 2.5rem;
          width: 10rem;
          padding: 0 0.5rem;
          border-radius: 2rem;
          border: 2px solid #241a30;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          background-color: var(--button-color);
          color: #241a30;
        }

        .saveButton:hover {
          background-color: var(--button-color-hover);
        }

        .saveButton:active {
          background-color: var(--button-color-press);
        }
      `}</style>
    </div>
  )
}

export default SaveButton;