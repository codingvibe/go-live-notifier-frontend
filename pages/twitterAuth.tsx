import { forwardTwitterLoginResponse } from './api/backend';
import { getCookie } from 'cookies-next';

export async function getServerSideProps({query, req, res}) {
  const cookie = `token=${getCookie('token', {req, res})}`
  const resp = await forwardTwitterLoginResponse(query["state"], query["code"], cookie);
  console.log(resp);
  if (resp.ok) {
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

const TwitterAuthResponse = ( { loggedIn }) => {  
  if (!loggedIn) {
    return (
      <div>
        Error logging in with Twitter
      </div>
    )
  }
  return (
    <div>
      Loading...
    </div>
  )
};

export default TwitterAuthResponse;