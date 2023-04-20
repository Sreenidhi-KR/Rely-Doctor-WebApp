import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/fontawesome-free-solid";
import authService from "../services/auth.service";

function DoctorQueue() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isDetails, setDetails] = useState(false);
  var interval;

  useEffect(() => {
    setLoading(true);
    try {
      AuthService.getPatientsInQueue(setPatients);

      interval = setInterval(() => {
        AuthService.getPatientsInQueue(setPatients);
      }, 10000);

      return () => {
        console.log("Interval Cleared");
        clearInterval(interval);
      };
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return isLoading ? (
    <div> LOADING</div>
  ) : (
    <div style={{ marginLeft: "63px" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "25px", color: "#5e17eb" }}>
        Patients Queue
      </h1>
      <ListGroup>
        {patients.map((patient,i ) => {
          if (i === 0) {
            return (
              <div
                class="card text-white bg-info mb-3"
                style={{
                  width: "250px",
                  marginLeft: "1px",
                  height: "200px",
                  marginTop: "10px",
                }}
              >
                <div
                  class="card-header"
                  style={{ fontWeight: "bolder", fontSize: "20px" }}
                >
                  {patient.fname} {patient.lname}
                  <button onClick={() => setDetails(isDetails ? false : true)}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    style={{ fontSize: "25px", color: "#5e17eb" }}
                  />
                </button>
                </div>
                
                {isDetails && (
                  <div class="card-body">
                    <h5 class="card-title" style={{color:"white"}}>Patient Details</h5>
                    <p class="card-text" style={{color:"white"}}>Sex: {patient.sex}</p>
                    <p class="card-text" style={{color:"white"}}>Blood Group: {patient.age}</p>
                  </div>
                )}
              </div>
            );
          }
          return (
            <div
              class="card text-white bg-info mb-3"
              style={{
                width: "250px",
                marginLeft: "1px",
                height: "100px",
                marginTop: "10px",
              }}
            >
              <div
                class="card-header"
                style={{ fontWeight: "bolder", fontSize: "20px" }}
              >
                {patient.fname} {patient.lname}
              </div>
            </div>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default DoctorQueue;
