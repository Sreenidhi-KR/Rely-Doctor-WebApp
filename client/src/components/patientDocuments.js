import { useEffect, useState } from "react";
import authService from "../services/auth.service";
function PatientDocuments({ consultationId }) {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    consultationDocs();
  }, []);

  async function consultationDocs() {
    authService
      .getPatientDocuments(consultationId)
      .then((json) => {
        setDocuments(json);
        console.log("Data fetched is :");
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const docItem = documents.map((document) => (
    <li key={document.id}>{document.name};</li>
  ));

  return (
    <div>
      Documents
      <ul>{docItem}</ul>
    </div>
  );
}
export default PatientDocuments;
