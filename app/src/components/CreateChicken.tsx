import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Link } from "react-router-dom";

const CreateChicken = () => {
  // Variables for the chicken data that will be posted
  const [newName, setNewName] = useState<string>("");
  const [newBirthday, setNewBirthday] = useState<string>("");
  const [newWeight, setNewWeight] = useState<string>("");
  const [newSteps, setNewSteps] = useState<string>("0");
  let [newStatus, setNewStatus] = useState<boolean>(false);

  // Variables for the error and success messages displayed on the create chicken menu
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Function to post the data of the new chicken
  const createChicken = async (): Promise<void> => {
    const url = `http://localhost:3001/chicken`;
    const data = {
      name: newName,
      birthday: newBirthday,
      weight: newWeight,
      steps: newSteps,
      isRunning: newStatus,
    };

    try {
      setSuccessMessage(null);
      setErrorMessage(null);

      // Check if every required field is filled
      if (!data.name || ! data.weight) {
        setErrorMessage("Your chicken needs a name and a weight");
        return;
      }
      const res: AxiosResponse = await axios.post(url, data);

      // If the request worked as expected
      if (res.status === 201) {
        setSuccessMessage("Your chicken is born!");
        setNewName("");
        setNewBirthday("");
        setNewWeight("");
        setNewSteps("");
        setNewStatus(false);
      } else {
        setErrorMessage("Your chicken could not be born.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        // If there is a duplicate entry
        if (status === 412) {
          setErrorMessage("This chicken already exists.");
        // Check for the correct data format
        } else if (status === 403) {
          setErrorMessage("Please use the requested birthday date format.");
        // Check for the correct data format
        } else if (status === 400) {
          setErrorMessage("Please use an integer or float number for the wheigt and the steps.");
        } else {
          console.log("Error in the request :", error);
        }
      }
    }
  };

  // Function to handle the button Runnning/Waiting
  const switchChickenStatus = async (): Promise<boolean> => {
    setNewStatus(!newStatus);
    return newStatus;
  };

  return (
    <div className="app">
      {/* Pop-up messages for the chicken creation */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Link to="/chicken">
        <button className="button-back">Go back</button>
      </Link>
      {/* Chicken creation form */}
      <div className="create-chicken-wrapper">
        <div className="create-chicken-card">
          <div className="create-chicken-info">
            <form className="create-chicken-form">
              <p className="name">
                Name :{" "}
                <input
                  placeholder="Name"
                  className="chicken-input"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </p>
              <p className="birthday">
                Brithday :{" "}
                <input
                  placeholder="MM-DD-YY"
                  className="chicken-input"
                  value={newBirthday}
                  onChange={(e) => setNewBirthday(e.target.value)}
                />
              </p>
              <p className="weight">
                Weight :{" "}
                <input
                  placeholder="Interger or Float number"
                  className="chicken-input"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                />
                kg
              </p>
              <p className="steps">
                Steps :{" "}
                <input
                  placeholder="Integer number"
                  className="chicken-input"
                  value={newSteps}
                  onChange={(e) => setNewSteps(e.target.value)}
                />
              </p>
              {/* Button Running/Waiting handling */}
              {newStatus === true ? (
                <div className="button" onClick={switchChickenStatus}>
                  Running
                </div>
              ) : (
                <div className="button" onClick={switchChickenStatus}>
                  Waiting
                </div>
              )}
              <div className="button" onClick={createChicken}>
                Submit
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChicken;
