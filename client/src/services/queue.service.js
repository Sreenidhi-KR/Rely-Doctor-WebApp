// import axios from "axios";
// import authHeader from "./auth-header";

// const API_URL = "http://localhost:8080/api/auth/doctor/";
// const urlBase = "http://localhost:8080/api";

// const config = {
//   headers: authHeader(),
// };

// const getPatientsInQueue = (setPatients) => {
//   console.log("INN");
//   const id = JSON.parse(localStorage.getItem("doctor")).id;
//   axios
//     .get(`${urlBase}/v1/dqueue/${id}`, config)
//     .then((json) => {
//       setPatients(json.data);
//       console.log(
//         "@@@@@@@@@@@@@@@@@@@@@@@@@@@--------------@@@@@@@_@_@_@@_@_@_@_"
//       );
//       console.log(json.data);
//       return json.data;
//     })
//     .catch((error) => {
//       console.log(`ERROR : ${error}`);
//     });
// };

// export { getPatientsInQueue };
