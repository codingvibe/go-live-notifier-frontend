import Head from 'next/head'
import { isLoggedIn, getImages, getTwitchLoginUrl, getTwitterLoginUrl, getEnabledPlatforms, getGoLiveText, ImageDetailsWithId, setImages } from './api/backend';
import Button from '../components/Button';
import { GetServerSideProps } from 'next'
import ImageList from '../components/ImageList';
import GoLiveText from '../components/GoLiveText';

export const getServerSideProps: GetServerSideProps = async({req}) => {
  // COME UP WITH AN AUTHED BACKEND USING THE TOKEN/COOKIE
  const authToken = req.cookies['token']
  const loggedIn = await isLoggedIn(authToken);
  if (!loggedIn) {
    return {
      redirect: {
        destination: getTwitchLoginUrl(),
        permanent: false,
      },
    }
  }
  const platforms = await getEnabledPlatforms(authToken);
  const images = await getImages(authToken);
  const goLiveText = await getGoLiveText(authToken);
  return {
    props: {
      loggedIn,
      images,
      goLiveText,
      platforms,
      authToken
    },
  };
}

export default function Home( { images, goLiveText, platforms, authToken } ) {
  return (
    <div className="container">
      <Head>
        <title>CodingVibe's Go Live</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>Step 1: Connect your platforms</h2>
        {platforms && !platforms.includes("twitter") ?
          <Button text="Connect with Twitter" logo="/twitter-logo.svg" onClick={() => {window.location.href = getTwitterLoginUrl()}}/> :
          <Button disabled={true} text="Already connected!" logo="/twitter-logo.svg" onClick={() => {}}/>
        }
        <h2>Step 2: Add your images</h2>
        <ImageList images={images} token={authToken}/>
        <h2>Step 3: Set your go live text</h2>
        <GoLiveText initial={goLiveText} token={authToken}/>
        <h2>Step 4: Go stream and we'll take care of the rest!</h2>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background: linear-gradient(#E6F8FA, #FAE8E6);
          --button-color: #a9afd1;
          --button-color-press: #7C809B;
          --button-color-hover: #e8e6fa;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
