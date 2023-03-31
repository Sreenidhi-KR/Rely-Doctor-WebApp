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
    <div>
      Patients In Queue
      <ListGroup>
        {patients.map((patient) => (
          <ListGroup.Item>{patient.fname} </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default DoctorQueue;
