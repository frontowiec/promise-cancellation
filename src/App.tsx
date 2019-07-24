import React, { useEffect, useState } from "react";
import "./App.css";
import { Router, Link, RouteComponentProps } from "@reach/router";

// import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'

const Home = (props: RouteComponentProps) => {
  const [joke, setJoke] = useState<any>();

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.chucknorris.io/jokes/random`, {
      signal: controller.signal
    })
      .then(response => response.json())
      .then(setJoke)
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return <pre>{JSON.stringify(joke, null, 2)}</pre>;
};
const Dash = (props: RouteComponentProps) => <div>Dash</div>;

const App = () => {
  return (
    <div style={{padding: 24}}>
      <nav>
        <Link to="/">Home</Link> | <Link to="dashboard">Dashboard</Link>
      </nav>
      <Router>
        <Home path="/" />
        <Dash path="dashboard" />
      </Router>
    </div>
  );
};

export default App;
