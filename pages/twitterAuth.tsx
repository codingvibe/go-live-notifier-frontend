import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { forwardTwitterLoginResponse } from './api/backend';

const TwitterAuthResponse = () => {
  const router = useRouter();
  const [errorState, setError] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const { state, code, error } = router.query;

  useEffect(() => {
    if(!router.isReady) return;
    setLoading(true);
    if (error) {
      setError(error);
    } else if (!state || !code) {
      setError("Invalid response from Twitch");
    } else {
      forwardTwitterLoginResponse(state as string, code as string)
        .then(resp => {
          setLoading(false);
          if (resp.ok) {
            window.location.href = '/';
          }
        })
        .catch(err => {
          setLoading(false);
          setError(err);
        });
    }
  }, [setLoading, setError, router.query]);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (errorState) {
    return (
      <div>
        Error in Twitch setup: { errorState }
      </div>
    )
  }

  return (
    <div>
      Redirecting back to home...
    </div>
  )
};

export default TwitterAuthResponse;