const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export const isLoggedIn = async (cookie?: string): Promise<boolean> => {
  const options: RequestInit = {
    credentials: 'include'
  };
  if (cookie) {
    options.headers = { cookie };
  }
  const resp = await fetch(`${BACKEND_API_URL}/user/loggedIn`, options);
  if (resp.status == 200) {
    return true;
  }
  return false;
}

export const getTwitchLoginUrl = (): string => {
  return `${BACKEND_API_URL}/twitchLogin`;
}

export const forwardTwitchLoginResponse = async (state: string, code: string): Promise<Response> => {
  return fetch(`${BACKEND_API_URL}/twitchLoginResponse?state=${state}&code=${code}`, { credentials: 'include' })
}

export const getEnabledPlatforms = async (cookie?: string): Promise<string[]> => {
  const options: RequestInit = {
    credentials: 'include'
  };
  if (cookie) {
    options.headers = { cookie };
  }
  return fetch(`${BACKEND_API_URL}/user/connections`, options).then(res => {
    if (res.ok) {
      return res.json();
    }
    return [];
  });
}

export const deletePlatform = async (platform: string): Promise<Response> => {
  return fetch(`${BACKEND_API_URL}/user/connections?platform=${platform}`, {
    method: 'DELETE',
    credentials: 'include'
  });
}

export const getImages = async (cookie?: string): Promise<ImageDetailsWithId[]> => {
  const options: RequestInit = {
    credentials: 'include'
  };
  if (cookie) {
    options.headers = { cookie };
  }
  return fetch(`${BACKEND_API_URL}/user/images`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return [];
    });
}

export const getGoLiveText = async (cookie?: string): Promise<ImageDetailsWithId[]> => {
  const options: RequestInit = {
    credentials: 'include'
  };
  if (cookie) {
    options.headers = { cookie };
  }
  return fetch(`${BACKEND_API_URL}/user/goLiveText`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return [];
    })
    .then(resJson => {
      return resJson.goLiveText
    });
}

export const setGoLiveText = async (goLiveText): Promise<Response> => {
  return fetch(`${BACKEND_API_URL}/user/goLiveText`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      'goLiveText': goLiveText
    }),
    credentials: 'include'
  });
}

export const addImages = async (images: ImageDetails[]): Promise<Response> => {
  return fetch(`${BACKEND_API_URL}/user/images`,{
    method: 'POST',
    body: JSON.stringify(images),
    credentials: 'include'
  });
}

export const setImages = async (images: ImageDetailsWithId[]): Promise<Response> => {
  return fetch(`${BACKEND_API_URL}/user/images`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(images),
    credentials: 'include'
  });
}

export const getTwitterLoginUrl = (): string => {
  return `${BACKEND_API_URL}/user/twitterLogin`
}

export const forwardTwitterLoginResponse = async (state: string, code: string, cookie?: string): Promise<Response> => {
  const options: RequestInit = {
    credentials: 'include'
  };
  console.log(`looking at cookie ${cookie}`)
  if (cookie) {
    options.headers = { cookie };
  }
  return fetch(`${BACKEND_API_URL}/user/twitterLoginResponse?state=${state}&code=${code}`, options)
}

export type ImageDetails = {
  url: string;
  altText: string;
}

export type ImageDetailsWithId = ImageDetails & {
  id?: string;
}