import React, { useEffect } from "react";
import { useState } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import Student from "./components/Student";
import axios from "axios";

function App() {
  const [age, setAge] = useState(0);

  const [data, setData] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
      { withCredentials: true }
    );

    setData(data);
  };

  useEffect(() => {
    fetchData();
  });

  // const students = [
  //   { name: "hamid", age: 20 },
  //   { name: "hamid", age: 20 },
  //   { name: "hamid", age: 20 },
  //   { name: "hamid", age: 20 },
  //   { name: "hamid", age: 20 },
  // ];

  return (
    <div>
      <h2>{age}</h2>

      <button>Variable Change</button>

      <button onClick={() => setAge(age + 1)}> State Change </button>

      <table>

      {
        data ? data.map((user, i)=> <tr key={i}>
          <td>{user.name}</td>
          <td>{user.email}</td>

        </tr> ) : null
      }

      </table>

      

      {/* {
        students.map((std, index)=> <Student name={std} />)
      } */}

      {/* {students.map((std, i) => (
        <Student name={std.name} age={std.age} num={i} />
      ))} */}

      {/* <table>
        {students.map((std, i) => (
          <tr>
            <td>{i}</td>

            <td>{std.name}</td>
            <td>{std.age}</td>
          </tr>
        ))}
      </table> */}

      {/* <Content age={myAge} name={"Hamid"} />  */}
    </div>
  );
}

export default App;
