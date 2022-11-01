import logo from "./logo.svg";
import loadingGif from "./images/wands.gif";
import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
    console.log("****START OF SEARCH:*****");
    data.map(data => {
      if(data.name.toLowerCase().includes(e.target.value.toLowerCase())) console.log(data.name);
    })
    // console.log(e.target.value);
  };

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
      <h1 className="heading">Harry Potter</h1>
      <div className="search-bar">
        <i className="search-icon fa fa-search"></i>
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          onChange={handleSearchInput}
        />
      </div>
      {loading && (
        <div className="loading-div">
          <p>Please wait</p>
          <img src={loadingGif} />
        </div>
      )}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && (
        <div className="card-gallery">
          {data.map((data) => (
            <Card value={data} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
