import { useState } from "react";
import { setGoLiveText } from "../pages/api/backend";
import SaveButton from './SaveButton';

const GoLiveText = ({ initial }: { initial: string }) => {
  const [goLiveText, updateGoLiveText] = useState(initial);
  const saveUpdate = async () => {
    const resp = await setGoLiveText(goLiveText);
    if (resp.ok) {
      // display something
    }
  }
  
  return (
    <div className="goLiveText">
      <div>
        Supported variables are:
        <p>{"{{streamTitle}} for your current stream title"}</p>
        <p>{"{{twitchName}} for your Twitch username"}</p>
        <p>{"Example: {{twitchName}} is live with {{streamTitle}} https://twitch.tv/{{twitchName}}"}</p>
      </div>
      <input type="text" id="goLiveText" name="goLiveText" required value={goLiveText} onChange={(e) => updateGoLiveText(e.target.value)} />
      <div className='saveChanges'>
        <SaveButton onClick={saveUpdate} />
      </div>

      <style jsx>{`
        .goLiveText {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .saveChanges {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  )
}

export default GoLiveText;