import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Prescription from "./prescription.component";


function PatientDocuments({ doctor }) {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setLoading] = useState(true);

  

  useEffect(() => {
    var interval;
    setLoading(true);
    try {
      interval = setInterval(() => {
        AuthService.getPatientDocuments(setDocuments);
      }, 1000);

      return () => {
        console.log("Interval Cleared");
        clearInterval(interval);
      };
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, []);

  return isLoading ? (
    <div> LOADING</div>
  ) : (
    <div>
      <Prescription doctor={doctor}></Prescription>
      <br></br>
      <br></br>
      <h1 style={{fontWeight:"bold", fontSize:"25px",color:"#5e17eb"}}>Documents Shared</h1>
      <ListGroup>
        {documents.map((document) => (
          <div className="d-grid gap-2 m-3">
            <a class="btn btn-info" style={{width:"250px", marginLeft:"10px", marginTop:"10px"}}
              size="lg"
              onClick={() => AuthService.downloadPatientDocument(document.id)}
            >
              {document.name}
            </a>
          </div>
        ))}
      </ListGroup>
    </div>
  );
}
export default PatientDocuments;
