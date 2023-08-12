import React, { useState } from "react";

const Display = ({ myData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const sortedData = myData
    .filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      ) {
        return val;
      }
      return null;
    })
    .sort((a, b) => {
      let fa = a.name,
        fb = b.name;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

  const total = sortedData.reduce(getSum, 0);
  function getSum(acc, cur) {
    return acc + cur.sold * cur.unitPrice;
  }

  return (
    <>
      <label>
        Search Bar
        <input
          type="text"
          placeholder="enter search product ....."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((elem, i) => (
            <tr key={i}>
              <td>{elem.name}</td>
              <td>₹ {(elem.sold * elem.unitPrice).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td>Total Revenue</td>
            <td>₹ {total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Display;
