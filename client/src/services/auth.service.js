import axios from "axios";
import { json } from "react-router-dom";
import authHeader from "./auth-header";

const API_URL = "https://7d30-103-156-19-229.in.ngrok.io/api/auth/doctor/";
const urlBase = "https://7d30-103-156-19-229.in.ngrok.io/api";
const user = JSON.parse(localStorage.getItem("doctor"));

var config = null;

if (user && user.accessToken) {
config = {
  headers: {
    "ngrok-skip-browser-warning": "true",
    Authorization: "Bearer " + user.accessToken,
  }         
};
}

var configPhoto = null;

if (user && user.accessToken) {
  configPhoto = {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + user.accessToken,
    },
  };
}
var configuration = null;

if (user && user.accessToken) {
  configuration = {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: "Bearer " + user.accessToken,
      Accept: "application/json",
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

  // uploadPrescription = (prescription, Pid, Cid) => {
  //   console.log("Uploading Prescription")
  //   console.log(prescription);
  //   let formData = new FormData();
  //   formData.append("file", prescription);
  //   console.log(`${urlBase}/v1/document/uploadPrescription/${Pid}/${Cid}`)
  //   axios
  //     .post(
  //       `${urlBase}/v1/document/uploadPrescription/${Pid}/${Cid}`,
  //       formData,
  //       configPhoto
  //     )
  //     .then((json) => {
  //       console.log(json.data);
  //       return json.data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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

  getPatientDocuments = async ( setDocuments) => {
    const id = JSON.parse(localStorage.getItem("doctor")).id;
    let cid = await this.getConsultationId(id);
    console.log(cid);
    axios
      .get(`${urlBase}/v1/consultation/getAllDocumentsByCid/${cid}`, config)
      .then((json) => {
        console.log(`My data:s ${json.data}`);
        setDocuments(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log(`My error ${error}`);
        console.log(error);
      });
  };

  downloadPatientDocument = (docId) => {
    console.log("Downloding document");
    axios
      .get(`${urlBase}/v1/document/download/${docId}`, configuration)
      .then((json) => {
        const pdfstr = json.data;
        const linkSource = `data:application/pdf;base64,${pdfstr}`;
        const downloadLink = document.createElement("a");
        const fileName = "file.pdf";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        //<embed src={`data:application/pdf;base64,${pdfstr}`} />;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // getQueueId =  (file) => {
  //   console.log("Getting Queue Id");
  //   const id = JSON.parse( localStorage.getItem("doctor")).id;
  //   axios
  //     .get(`${urlBase}/v1/dqueue/getDqueue/${id}`, config)
  //     .then((json) => {
  //       const qid=json.data;
  //       console.log(qid);
  //       this.getConsultationId(json.data).then((json)=>{
  //           const cid=json.data;
  //           console.log(cid);
  //           this.getPatientId(qid).then((json)=>{
  //             console.log(pid);
  //             const pid=json.data;
  //             this.uploadPrescription(file,pid,cid);
  //           })
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  getConsultationId = async(doctorId) => {
    console.log("docid", doctorId)

    let qid = await axios
    .get(`${urlBase}/v1/dqueue/getDqueue/${doctorId}`, config)

    console.log("qid" , qid)

    let cid =  await  axios
    .get(`${urlBase}/v1/dqueue/getConsultationId/${qid.data}`, config);

    return cid.data;
  }

   uploadPrescription =  async (doctorId, prescription) =>{

    console.log("docid", doctorId)

    let qid = await axios
    .get(`${urlBase}/v1/dqueue/getDqueue/${doctorId}`, config)

    console.log("qid" , qid)

    let cid =  await  axios
    .get(`${urlBase}/v1/dqueue/getConsultationId/${qid.data}`, config);

    console.log("cid" , cid)

    let pid = await axios
      .get(`${urlBase}/v1/dqueue/getPatientId/${qid.data}`, config)


      console.log("pid" , pid)


      let formData = new FormData();
      formData.append("file", prescription);
      
      await axios
        .post(
          `${urlBase}/v1/document/uploadPrescription/${pid.data}/${cid.data}`,
          formData,
          configPhoto
        )

  }

  // getConsultationId = (id) => {
  //   console.log("getting Consultation id");
  //   console.log(id)
  //   console.log(`${urlBase}/v1/dqueue/getConsulationId/${id}`);
  //   axios
  //     .get(`${urlBase}/v1/dqueue/getConsulationId/${id}`, config)
  //     .then((json) => {
  //       const qid=json.data;
  //       console.log(json.data);
  //     }).then((json)=>
  //     this.getConsultationId(qid).then((json)=>{
  //       const cid=json.data;
  //       console.log(cid);
  //   })).then((json)=>this.getPatientId(qid).then((json)=>{
  //     console.log(pid);
  //     const pid=json.data;
  //   })).then((json)=>this.uploadPrescription(file,pid,cid))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // getPatientId = (id) => {
  //   console.log("Getting patient id");
  //   axios
  //     .get(`${urlBase}/v1/dqueue/getPatientId/${id}`, config)
  //     .then((json) => {

  //       console.log(json.data);
  //       return json.data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
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
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
}

export default new AuthService();
