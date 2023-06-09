import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [show, setShow] = useState(false);

  //fetchData to fetch data from url
  const fetchData = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const jsonData = await res.json();
    setData(jsonData);
  };

  //handleSort function to sort data in ascending order
  const handleSort = () => {
    data.sort((a, b) => {
      return a.population - b.population;
    });
    setSorting(data);
    //toggling the show
    setShow((prev) => !prev);
  };

  useEffect(() => {
    //using fetchData() when useEffect() executes
    fetchData();
    //component re-renders when show is updated
  }, [show]);

  return (
    <>
      <button onClick={handleSort}>Sort Data</button>
      {/* a toggle show is used in handleSort to show sorted data and previous data */}
      {show ? (
        <ol>
          {sorting &&
            sorting.map((item) => (
              <li key={item.flag}>
                Name:{item.name.common} -- Population: {item.population}
              </li>
            ))}
        </ol>
      ) : (
        <ol>
          {/* only when data is present data is shown and
            using map() to iterate over data and display data in list form*/}
          {data &&
            data.map((item) => (
              //key is used to avoid error of duplicate children in lists.
              <li key={item.flag}>
                Name:{item.name.common} -- Population: {item.population}
              </li>
            ))}
        </ol>
      )}
    </>
  );
}

export default App;
