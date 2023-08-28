import { Link, useParams } from "react-router-dom";

import ChickenData from "../types/ChickenData";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect } from "react";

const SingleChickenPage = () => {
  // Id retrived from the url
  const { id } = useParams();

  // Variables for the chicken data fetched from the server and for the error messages
  const [singleChickenData, setSingleChickenData] = useState<ChickenData[]>([]);
  const [errorSingleChickenMessage, setErrorSingleChickenMessage] = useState<string>("");

  // Function to fetch the chicken data from the server
  const getSingleChicken = async (): Promise<void> => {
    try {
      const res: AxiosResponse = await axios.get(
        `http://localhost:3001/chicken/${id}`
      );
      // Update the state of chicken data with the fetched data
      setSingleChickenData(res.data);
      // Clear any error message
      setErrorSingleChickenMessage("");
      console.log("Fetch data : ", res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle errors and update the error message to log it
        setErrorSingleChickenMessage("Cannot find chickens : " + error);
        console.log(errorSingleChickenMessage);
      }
    }
  };

  // Function to update the steps of the choosen chicken
  const runChicken = async () : Promise<void> => {
    try {
      const res: AxiosResponse = await axios.patch(
        `http://localhost:3001/chicken/run`, { chickenId: id }
      )
      if (res.status === 200) {
        console.log('Your chicken has taken a step forward!');
      } else {
        console.log('Your chicken do not wank to walk.');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error in the request :", error);
      }
    }
  }

  // Function to delete the choosen chicken from the database
  const deleteChicken = async () : Promise<void> => {
    try {
      const res: AxiosResponse = await axios.delete(
        `http://localhost:3001/chicken/${id}`
      )
      if (res.status === 200) {
        console.log("You killed your chicken!");
      } else {
        console.log("This chicken do not want to die.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error in the request :", error);
      }
    }
  }

  // Use useEffect to call the function that fetch the data when the user navigate to the single chicken page
  useEffect(() => {
    getSingleChicken();
  });

  return (
    <div className="app">
        {singleChickenData.map((chicken) => (
          <>
            <Link to="/chicken">
              <button className="button-back">Go back</button>
            </Link>
            <div className="single-wrapper">
              <div className="single-card">
                <div className="single-info">
                  <img src="../assets/chicken.png" className="single-pic" alt=""/>
                  <div className="single-parameters">
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
                  </div>
                </div>
                <div className="single-button">
                  <Link to={`/chicken`} className="button-link">
                    <button className="button" onClick={deleteChicken}>Kill Chicken</button>
                  </Link>
                  <button className="button" onClick={runChicken}>Make chicken run</button>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default SingleChickenPage;
