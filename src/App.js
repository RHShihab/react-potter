import logo from "./logo.svg";
import loadingGif from "./images/wands.gif"
import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://hp-api.herokuapp.com/api/characters`)
      // fetch(`https://jsonplaceholder.typicode.com/posts?_limit=8`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        console.log(actualData);
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <h1 className="heading">Harry Potter</h1>
      {loading && <div className="loading-div">
          <p>Please wait</p>
          <img src={loadingGif}/>
        </div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && (
        <div class="card-gallery">
          {data.map((data) => (
            <Card value={data} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
