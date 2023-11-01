import React from 'react'
import { useState } from 'react';
export default function Test3() {
    const [data, updateData] = useState([
        { firstName: "Irakli", lastName: "Tcigladze" },
        { firstName: "George", lastName: "Smith" },
        { firstName: "Mark", lastName: "Wayans" },
        { firstName: "Michael", lastName: "Simmons" },
        { firstName: "Dirk", lastName: "Johnson" },
        { firstName: "Casey", lastName: "Dawson" }
      ]);
      const onSort = (event, sortKey) => {
        const tempData = [...data];
        updateData(tempData.sort((a, b) => a[sortKey].localeCompare(b[sortKey])));
      };
  return (
    <div>
        <table className="m-table">
        <thead>
          <tr>
            <th onClick={(e) => onSort(e, "firstName")}>First Name</th>
            <th onClick={(e) => onSort(e, "lastName")}>Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map(function (person, index) {
            return (
              <tr key={index} data-item={person}>
                <td data-title="firstName">{person.firstName}</td>
                <td data-title="lastName">{person.lastName}</td>
              </tr>
            );
          })}
        </tbody>
    </table>



    </div>
  )
}
