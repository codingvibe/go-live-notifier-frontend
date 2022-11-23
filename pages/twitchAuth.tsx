import { forwardTwitchLoginResponse } from './api/backend';
import { setCookie } from 'cookies-next';

export async function getServerSideProps({query, req, res}) {
  const resp = await forwardTwitchLoginResponse(query["state"], query["code"]);
  if (resp.ok) {
    const jwt = await resp.text();
    setCookie('token', jwt, {req, res})
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      loggedIn: resp.ok
    },
  };
}

const TwitchAuthResponse = ( { loggedIn }) => {  
  if (!loggedIn) {
    return (
      <div>
        Error logging in with Twitch
      </div>
    )
  }
  return (
    <div>
      Loading...
    </div>
  )
};

export default TwitchAuthResponse;