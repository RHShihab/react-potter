import loadingGif from "./images/wands.gif";
import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setfilteredData] = useState("");
  const [cardSelected, setCardSelected] = useState(false);

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
    console.log("****START OF SEARCH:*****");
    let tempFileredData = [];
    data.map((data) => {
      if (data.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        console.log(data);
        tempFileredData.push(data);
      }
    });
    setfilteredData(tempFileredData);
    console.log("***********Filtered Data: **************\n");
    console.log(filteredData);
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
        // console.log(actualData);
        setData(actualData);
        setfilteredData(actualData);
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
      <div className="search-bar-container">
        <div className="search-bar">
          <i className="search-icon fa fa-search"></i>
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            onChange={handleSearchInput}
          />
        </div>
      </div>
      {loading && (
        <div className="loading-div">
          <p>Fetching some data. Please wait...</p>
          <img src={loadingGif} />
        </div>
      )}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && (
        <div className="card-container">
          {cardSelected && (
            <div
              className="selectedCardCanvas"
              onClick={() => {
                setCardSelected(false);
              }}
            >
              <div className="selectedCard">
                <img src= {cardSelected.image} alt="" />
                <p>Full Name: {cardSelected.name}</p>
                <p>House: {cardSelected.house}</p>
                <button
                  onClick={() => {
                    setCardSelected(false);
                  }}
                >
                  X
                </button>
              </div>
            </div>
          )}
          <div className="card-gallery">
            {filteredData.map((filteredData) => (
              <Card value={filteredData} setCardSelected={setCardSelected} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
