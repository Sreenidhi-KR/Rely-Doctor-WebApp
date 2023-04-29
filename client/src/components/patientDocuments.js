import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import Prescription from "./prescription.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/fontawesome-free-solid";

function PatientDocuments({ doctor }) {
  const [isLoading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);

  // useEffect(() => {
  //   var interval;
  //   setLoading(true);
  //   try {
  //     interval = setInterval(() => {
  //       AuthService.getPatientDocuments(setDocuments);
  //     }, 1000);

  //     return () => {
  //       console.log("Interval Cleared");
  //       clearInterval(interval);
  //     };
  //   } catch (err) {
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  return isLoading ? (
    <div> LOADING</div>
  ) : (
    <div>
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
        <Prescription doctor={doctor}></Prescription>
        <br></br>
        <div
          class="card text-white mb-3"
          style={{
            width: "340px",
            height: "805px",
            marginTop: "0px",
            borderRadius: "10px",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <div class="card-header" style={{ display: "inline-flex" }}>
            <h1
              style={{
                alignSelf: "center",
                fontWeight: "bolder",
                fontSize: "20px",
                display: "flex",
                color: "#5e17eb",
                marginLeft: "5%",
              }}
            >
              Documents Shared{" "}
              <FontAwesomeIcon
                icon={faSyncAlt}
                onClick={() => {
                  try {
                    AuthService.getPatientDocuments(setDocuments);
                  } catch (err) {
                    console.log(err);
                  }
                }}
                style={{
                  fontSize: "25px",
                  color: "#5e17eb",
                  marginLeft: "15px",
                  marginRight: "5px",
                  float: "right",
                }}
              />
            </h1>
          </div>
          {documents.length ? (
            documents
              .sort((a, b) => a.id - b.id)
              .map((document) => (
                <div
                  class="card text-white mb-3"
                  style={{
                    width: "270px",
                    marginLeft: "1px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    height: "fit-content",
                    display: "inline-flex",
                  }}
                >
                  {" "}
                  <p style={{ color: "#5e17eb" }}>{document.name}</p>
                  <button
                    class="btn btn-outline-success"
                    style={{ marginTop: "5px" }}
                    onClick={() => {
                      AuthService.downloadPatientDocument(document.id);
                    }}
                  >
                    Download
                  </button>
                </div>
              ))
          ) : (
            <div>
              <p
                style={{
                  marginLeft: "17%",
                  marginTop: "25%",
                  fontWeight: "bold",
                }}
              >
                - No Available Documents -
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default PatientDocuments;
