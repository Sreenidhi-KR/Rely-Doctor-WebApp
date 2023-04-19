import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import ListGroup from "react-bootstrap/ListGroup";

function DoctorQueue() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
    <div style={{marginLeft:"63px"}}>
      <h1 style={{fontWeight:"bold", fontSize:"25px",color:"#5e17eb"}}>Patients Queue</h1>
      <ListGroup>
        {patients.map((patient) => (
          <div
        class="card text-white bg-info mb-3"
        style={{width:"250px",marginLeft:"1px", height:"150px", marginTop:"10px"}}
      >
        <div class="card-header" style={{fontWeight:"bolder", fontSize:"20px"}}>{patient.fname} {patient.lname}</div>
        {/* <div class="card-body">
          <h5 class="card-title">Patient Details</h5>
          <p class="card-text">
            Sex: {patient.sex}
          </p>
        </div> */}
      </div>
        ))}
      </ListGroup>
    </div>
  );
}

export default DoctorQueue;
