import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Prescription from "./prescription.component";


function PatientDocuments({ doctor }) {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  var interval;

  

  useEffect(() => {
    setLoading(true);
    try {
      
      interval = setInterval(() => {
        AuthService.getPatientDocuments(setDocuments);
      }, 10000);

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

      Documents
      <ListGroup>
        {documents.map((document) => (
          <div className="d-grid gap-2 m-3">
            <Button
              size="lg"
              onClick={() => AuthService.downloadPatientDocument(document.id)}
            >
              {document.name}
            </Button>
          </div>
        ))}
      </ListGroup>
    </div>
  );
}
export default PatientDocuments;
