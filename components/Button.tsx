const Button = ({ disabled=false, logo = null, text, onClick}) => {
  let buttonFill;
  if (logo) {
    buttonFill = (
      <div>
        <img className="logo" src={logo}></img> {text}
        <style jsx>{`
          .logo {
            max-height: 1.5em;
            padding-right: .2em;
          }
        `}</style>  
      </div>
    )
  } else {
    buttonFill = text;
  }
  return (
    <div>
      <button className="connectButton" onClick={ onClick } disabled={disabled}>
        { buttonFill }
      </button>

      <style jsx>{`
        .connectButton {
          height: 2.5rem;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default Button;