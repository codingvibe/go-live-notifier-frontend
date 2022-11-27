import { forwardTwitterLoginResponse } from './api/backend';

export async function getServerSideProps({query, req, res}) {
  const resp = await forwardTwitterLoginResponse(query["state"], query["code"], req.cookies['token']);
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