import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/doctor/";
const urlBase = "http://localhost:8080/api";
const user = JSON.parse(localStorage.getItem("doctor"));

const config = {
  // headers: {
  //   "ngrok-skip-browser-warning": "true",

  // },
  headers: authHeader(),
};

var configPhoto = null;

if (user && user.accessToken) {
  configPhoto = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + user.accessToken,
    },
  };
}

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("doctor", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("doctor");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("doctor"));
  }

  getDoctor = (setDoctor) => {
    const id = JSON.parse(localStorage.getItem("doctor")).id;
    axios
      .get(`${urlBase}/v1/doctor/getDoctorById/${id}`, config)
      .then((json) => {
        setDoctor(json.data);
        console.log(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPhoto = (setImg) => {
    const id = JSON.parse(localStorage.getItem("doctor")).id;
    axios
      .get(`${urlBase}/v1/doctor/getPhotoById/${id}`, configPhoto)
      .then((json) => {
        setImg(json.data);
        console.log(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  uploadPrescription = (prescription, Pid, Cid) => {
    console.log(prescription);
    let formData = new FormData();
    formData.append("file", prescription);
    axios
      .post(
        `${urlBase}/v1/document/uploadPrescription/${Pid}/${Cid}`,
        formData,
        configPhoto
      )
      .then((json) => {
        console.log(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPatientsInQueue = (setPatients) => {
    const id = JSON.parse(localStorage.getItem("doctor")).id;
    axios
      .get(`${urlBase}/v1/dqueue/getPatients/${id}`, config)
      .then((json) => {
        setPatients(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log(`MYLOG ERROR : ${error}`);
      });
  };
  getPatientDocuments = (cid) => {
    axios
      .get(`${urlBase}/v1/consultation/getAllDocumentsByCid/${cid}`, config)
      .then((json) => {
        console.log(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log("My error");
        console.log(error);
      });
  };

  downloadPatientDocument = (docId) => {
    axios
      .get(`${urlBase}/v1/document/download/${docId}`, configuration)
      .then((json) => {
        const pdfstr = json.data;

        // const DownloadDir = RNFetchBlob.fs.dirs.DownloadDir;
        // let fileName = "test.pdf";
        // let pdfLocation = DownloadDir + "/" + fileName;
        // console.log(pdfLocation);
        // RNFetchBlob.fs.writeFile(pdfLocation, pdfstr, "base64");
        // const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;
        // RNFetchBlob.fs.cp(filePath, filePath).then(() =>
        //   RNFetchBlob.android.addCompleteDownload({
        //     title: fileName,
        //     description: "Download complete",
        //     mime: "base64",
        //     path: filePath,
        //     showNotification: true,
        //   })
        // );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default new AuthService();
