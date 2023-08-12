import React, { useEffect, useState } from "react";
import "./App.css";
import branch1 from "./api/branch1.json";
import branch2 from "./api/branch2.json";
import branch3 from "./api/branch3.json";
import Display from "./components/Display";

function App() {
  const [myData, setMyData] = useState([]);

  const combinedItems = (arr = []) => {
    const res = arr.reduce((acc, obj) => {
      let found = false;
      for (let i = 0; i < acc.length; i++) {
        if (acc[i].id === obj.id) {
          found = true;
          acc[i].sold += obj.sold;
        }
      }
      if (!found) {
        acc.push(obj);
      }
      return acc;
    }, []);
    return res;
  };

  useEffect(() => {
    const arr = [...branch1.products, ...branch2.products, ...branch3.products];
    const data = combinedItems(arr);
    setMyData(data);
  }, []);

  return (
    <div className="App">
      <h1>Revenue aggregator application</h1>
      {myData.length ? <Display myData={myData} /> : <p>"Data is loading"</p>}
    </div>
  );
}

export default App;
