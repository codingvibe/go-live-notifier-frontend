import { StringDecoder } from "string_decoder";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export const isLoggedIn = async (token?: string): Promise<boolean> => {
  const options: RequestInit = {
    credentials: 'include'
  };
  if (token) {
    options.headers = {
      'Authorization': token
    };
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

export const getEnabledPlatforms = async (token?: string): Promise<string[]> => {
  const options: RequestInit = {
    credentials: 'include'
  };
  if (token) {
    options.headers = {
      'Authorization': token
    };
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

export const getImages = async (token?: string): Promise<ImageDetailsWithId[]> => {
  const options: RequestInit = {
    credentials: 'include'
  };
  if (token) {
    options.headers = {
      'Authorization': token
    };
  }
  return fetch(`${BACKEND_API_URL}/user/images`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return [];
    });
}

export const getGoLiveText = async (token?: string): Promise<ImageDetailsWithId[]> => {
  const options: RequestInit = {
    credentials: 'include'
  };
  if (token) {
    options.headers = {
      'Authorization': token
    };
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

export const setGoLiveText = async (goLiveText: StringDecoder): Promise<Response> => {
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

export const addImages = async (images: ImageDetails[], token: string): Promise<Response> => {
  return fetch(`${BACKEND_API_URL}/user/images`,{
    method: 'POST',
    body: JSON.stringify(images),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });
}

export const setImages = async (images: ImageDetailsWithId[]): Promise<Response> => {
  return fetch(`${BACKEND_API_URL}/user/images`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(images),
    credentials: 'include',
  });
}

export const getTwitterLoginUrl = (): string => {
  return `${BACKEND_API_URL}/twitterLogin`
}

export const forwardTwitterLoginResponse = async (state: string, code: string, token?: string): Promise<Response> => {
  const options: RequestInit = {
    credentials: 'include'
  };
  if (token) {
    options.headers = {
      'Authorization': token
    };
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