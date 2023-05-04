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
  const [img, setImg] = useState("");
  var interval;

  const handleRemove = (patientId) => {
    alert("Kicking out patient from the call");
    AuthService.removePatientFromQueue(patientId);
  };

  const getPhoto = (patientId) => {
    AuthService.getUserPhoto(setImg, patientId);
  }

  useEffect(() => {
    setLoading(true);
    try {
      AuthService.getPatientsInQueue(setPatients);
      interval = setInterval(() => {
        AuthService.getPatientsInQueue(setPatients);
      }, 5000);

      return () => {
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
      <div
        class="card text-white mb-3"
        style={{
          width: "400px",
          height: "805px",
          marginTop: "5px",
          borderRadius: "10px",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <div class="card-header">
          <h1
            style={{
              alignSelf: "center",
              fontWeight: "bolder",
              fontSize: "23px",
              display: "flex",
              marginLeft: "25%",
              color: "#5e17eb",
            }}
          >
            Patient Queue
          </h1>
        </div>
        {patients.length ? patients.map((patient, i) => {
          if (i === 0) {

            return (
              <div
                class="card text-white mb-3"
                style={{
                  width: "350px",
                  marginLeft: "1px",
                  marginTop: "10px",
                  borderRadius: "10px",
                }}
              >
                <div
                  class="card-header"
                  style={{
                    fontWeight: "bolder",
                    fontSize: "20px",
                    display: "flex",
                    color: "#5e17eb",
                  }}
                >
                  {patient.fname} {patient.lname}
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    onClick={() => { setDetails(isDetails ? false : true); getPhoto(patient.id); }}
                    style={{
                      fontSize: "25px",
                      color: "#5e17eb",
                      marginLeft: "auto",
                      marginRight: "5px",
                      marginTop: "5px",
                      float: "right",
                    }}
                  />
                </div>

                {isDetails && (
                  <div class="card-body">
                    <h5
                      class="card-title"
                      style={{
                        color: "#5e17eb",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "19px",
                      }}
                    >
                      Patient Details
                    </h5>
                    <div style={{ alignContent: "center" }}>
                      {img ? <img alt="" src={`data:image/png;base64,${img}`} style={{ width: "120px", height: "120px", marginTop: "10px", marginLeft: "65px", marginBottom: "10px" }} class="rounded-circle shadow-4-strong"></img> : <img src={require("./../img/user.png")} style={{ width: "120px", height: "120px", marginTop: "10px", marginLeft: "65px", marginBottom: "10px" }} class="rounded-circle shadow-4-strong"></img>}
                    </div>
                    <p
                      class="card-text"
                      style={{
                        fontWeight: "italic",
                        fontSize: "18px",
                        color: "#5e17eb",
                      }}
                    >
                      Sex: {patient.sex}
                    </p>
                    <p
                      class="card-text"
                      style={{
                        color: "#5e17eb",
                        fontWeight: "italic",
                        fontSize: "18px",
                      }}
                    >
                      Blood Group: {patient.blood_group}
                    </p>
                    <p
                      class="card-text"
                      style={{
                        color: "#5e17eb",
                        fontWeight: "italic",
                        fontSize: "18px",
                      }}
                    >
                      Date Of Birth: {patient.dob}
                    </p>
                  </div>
                )}
                <button
                  class="btn btn-outline-danger btn-md"
                  onClick={() => handleRemove(patient.id)}
                  style={{
                    marginTop: "15px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Remove Patient
                </button>
              </div>
            );
          }
          return (
            <div
              class="card text-white mb-3"
              style={{
                width: "350px",
                marginLeft: "1px",
                marginTop: "10px",
                borderRadius: "10px",
              }}
            >
              <div
                class="card-header"
                style={{
                  fontWeight: "bolder",
                  fontSize: "20px",
                  display: "flex",
                  color: "#5e17eb",
                }}
              >
                {patient.fname} {patient.lname}
              </div>
            </div>
          );
        }) : <div><p style={{ marginLeft: "31%", marginTop: "25%", fontWeight: "bold" }}>- Queue Is Empty -</p></div>}
      </div>
    </div>
  );
}

export default DoctorQueue;
