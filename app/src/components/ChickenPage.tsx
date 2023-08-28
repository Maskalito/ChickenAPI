import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosResponse, AxiosError } from "axios";

import ChickenData from "../types/ChickenData";

const ChickenPage = () => {
  // Variables for the chicken data fetched from the server and for the error messages
  const [chickenData, setChickenData] = useState<ChickenData[]>([]);
  const [errorChickenMessage, setErrorChickenMessage] = useState<string>("");

  // Function to fetch the chicken data from the server
  const getChickens = async (): Promise<void> => {
    try {
      const res: AxiosResponse = await axios.get(
        "http://localhost:3001/chicken"
      );

      // Update the state of chicken data with the fetched data
      setChickenData(res.data);
      // Clear any error message
      setErrorChickenMessage("");
      console.log("Fetch data : ", res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle errors and update the error message to log it
        setErrorChickenMessage("Cannot find chickens : " + error);
        console.log(errorChickenMessage);
      }
    }
  };

  // Use useEffect to call the function that fetch the data when the user navigate to the main page
  useEffect(() => {
    getChickens();
  }, []);

  return (
    <div className="app">
      <p className="title">Welcome farmer, here are your chickens!</p>
      <div className="chicken-wrapper">
        {/* Loop through each chicken object to render the chicken cards */}
        {chickenData.map((chicken) => (
          <div className="chicken-card">
            <img src="assets/chicken.png" className="chicken-pic" alt="" />
            <div className="chicken-parameters">
              <p className="id">Id : {chicken.id}</p>
              <p className="name">Name : {chicken.name}</p>
              <p className="birthday">Brithday : {chicken.birthday}</p>
              <p className="weight">Weight : {chicken.weight}kg</p>
              <p className="steps">Steps : {chicken.steps}</p>
              {chicken.isrunning ? (
                <p className="isRunning">Chicken currently running</p>
              ) : (
                <p className="isRunning">Chicken currently waiting</p>
              )}
              <Link to={`/chicken/${chicken.id}`}>
                <button className="button">Choose this chicken</button>
              </Link>
            </div>
          </div>
        ))}
        {/* Render the create chicken card */}
        <div className="chicken-card">
          <img src="assets/chicken.png" className="chicken-pic" alt="" />
          <div className="chicken-parameters">
            <Link to={`/chicken/create`}>
              <button className="button">Create a chicken</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChickenPage;
