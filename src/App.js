import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [result, setResult] = useState([]);
  const [info, setInfo] = useState("");
  const [value, setValue] = useState("");
  const [newPerson, setNewPerson] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const handleclick = async () => {
    try {
      const { data } = await axios(url);
      console.log(data.results[0]);
      setResult(data.results[0]);
      setInfo(`${data.results[0].name?.first} ${data.results[0].name?.last}`);
      setValue("name");
      setNewPerson({
        name: data.results[0].name.first,
        email: data.results[0].email,
        phone: data.results[0].cell,
        age: data.results[0].dob.age,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleclick();
  }, []);

  const handleover = (e) => {
    if (e.target.alt == "user") {
      setInfo(`${result?.name?.first} ${result?.name?.last}`);
      setValue("name");
    }
    if (e.target.alt == "mail") {
      setInfo(result.email);
      setValue("mail");
    }
    if (e.target.alt == "age") {
      setInfo(result.dob.age);
      setValue("age");
    }
    if (e.target.alt == "map") {
      setInfo(result.location.country);
      setValue("location");
    }
    if (e.target.alt == "phone") {
      setInfo(result.phone);
      setValue("phone");
    }
    if (e.target.alt == "lock") {
      setInfo(result.login.username);
      setValue("username");
    }
  };
  const handleAddClick = () => {
    if (allUsers.some((item) => item.email === newPerson.email)) {
      return;
    } else {
      setAllUsers([newPerson, ...allUsers]);
    }
  };

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img
            src={result?.picture?.large}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">{value} </p>
          <p className="user-value">{info}</p>
          <div className="values-list">
            <button onMouseOver={handleover} className="icon" data-label="name">
              <img
                src={result.gender == "male" ? manSvg : womanSvg}
                alt="user"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleover}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleover}>
              <img
                src={result.gender == "male" ? manAgeSvg : womanAgeSvg}
                alt="age"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleover}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleover}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleover}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button onClick={handleclick} className="btn" type="button">
              new user
            </button>
            <button onClick={handleAddClick} className="btn" type="button">
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((item, id) => (
                <tr className="body-tr" key={id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
