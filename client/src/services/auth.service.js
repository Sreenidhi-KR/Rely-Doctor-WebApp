import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";

const urlBase = "https://c5c5-103-156-19-229.ngrok-free.app/api";
var user = JSON.parse(secureLocalStorage.getItem("doctor"));
var config = null;

if (user && user.accessToken) {
  config = {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: "Bearer " + user.accessToken,
    },
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
      .post(urlBase + "/auth/doctor/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          secureLocalStorage.setItem("doctor", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout = async()=>{
    try{
      const id = JSON.parse(secureLocalStorage.getItem("doctor")).id;
      let l = await axios.post(
        `${urlBase}/auth/doctor/signout/${id}`,{},
        config
      );
    } catch (e) {
      console.log(e);
    }
    secureLocalStorage.removeItem("doctor");
    }

  getCurrentUser() {
    return JSON.parse(secureLocalStorage.getItem("doctor"));
  }

  
  refreshTokenGeneration(){
      const parsedJson = JSON.parse(atob(user.accessToken.split(".")[1]));
      let date=new Date();
      let jwtDate = new Date(parsedJson.exp*1000);
      let difference= date.getTime()-jwtDate.getTime();
      if(difference>0){
        axios.post(`${urlBase}/auth/doctor/refreshtoken`,
          {refreshToken: user.refreshToken})
        .then((response) => {
          if (response.data.accessToken) {
            var doc = secureLocalStorage.getItem('doctor');
            var parsedDoc = JSON.parse(doc);
            parsedDoc.accessToken = response.data.accessToken;
            const newDoc = JSON.stringify(parsedDoc);
            secureLocalStorage.setItem('doctor', newDoc);
            user = JSON.parse(secureLocalStorage.getItem("doctor"));
            if (user && user.accessToken) {
              config = {
                headers: {
                  "ngrok-skip-browser-warning": "true",
                  Authorization: "Bearer " + user.accessToken,
                },
              };
            }

            if (user && user.accessToken) {
              configPhoto = {
                headers: {
                  "ngrok-skip-browser-warning": "true",
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + user.accessToken,
                },
              };
            }

            if (user && user.accessToken) {
              configuration = {
                headers: {
                  "ngrok-skip-browser-warning": "true",
                  Authorization: "Bearer " + user.accessToken,
                  Accept: "application/json",
                },
              };
            }
          }
          return response.data;
        })
        .catch((error) => {
            console.log(error)
        });
      }
  }

  getDoctor = async(setDoctor) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

      const id = JSON.parse(secureLocalStorage.getItem("doctor")).id;
    await axios
      .get(`${urlBase}/v1/doctor/getDoctorById/${id}`, config)
      .then((json) => {
        setDoctor(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPreviousConsultations = async () => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));
    const id = JSON.parse(secureLocalStorage.getItem("doctor")).id;
    try {
      const json = await axios.get(
        `${urlBase}/v1/consultation/getPrevConsultationsDoctor/${id}`,
        config
      );
      return json.data;
    } catch (e) {
      console.log(e);
    }
  };

  getPhoto = async(setImg) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

    const id = JSON.parse(secureLocalStorage.getItem("doctor")).id;
    axios
      .get(`${urlBase}/v1/doctor/getPhotoById/${id}`, configPhoto)
      .then((json) => {
        setImg(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUserPhoto = async(setImg, id) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

    axios
      .get(`${urlBase}/v1/user/downloadImage/${id}`, configPhoto)
      .then((json) => {
        setImg(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPatientsInQueue = async(setPatients) => {    
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

    const id = JSON.parse(secureLocalStorage.getItem("doctor")).id;
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

  getPatientDocuments = async (setDocuments) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

    const id = JSON.parse(secureLocalStorage.getItem("doctor")).id;
    let cid = await this.getConsultationId(id);
    axios
      .get(`${urlBase}/v1/consultation/getAllDocumentsByCid/${cid}`, config)
      .then((json) => {
        setDocuments(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log(`My error ${error}`);
        console.log(error);
      });
  };

  downloadPatientDocument = async(docId, docName) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

    axios
      .get(`${urlBase}/v1/document/download/${docId}`, configuration)
      .then((json) => {
        const pdfstr = json.data;
        const linkSource = `data:application/pdf;base64,${pdfstr}`;
        const downloadLink = document.createElement("a");
        const fileName = docName;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getConsultationGraphData = async () => {
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      const id = JSON.parse(secureLocalStorage.getItem("doctor")).id;
      const json = await axios.get(
        `${urlBase}/v1/consultation/getPrevConsultationsStats/${id}`,
        config
      );
      return json.data;
    } catch (e) {
      console.log(e);
    }
  };

  getConsultationId = async (doctorId) => {
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      let qid = await axios.get(
        `${urlBase}/v1/dqueue/getDqueue/${doctorId}`,
        config
      );

      let cid = await axios.get(
        `${urlBase}/v1/dqueue/getConsultationId/${qid.data}`,
        config
      );

      return cid.data;
    } catch (e) {
      console.log(e);
    }
  };

  uploadPrescription = async (doctorId, prescription) => {
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      let qid = await axios.get(
        `${urlBase}/v1/dqueue/getDqueue/${doctorId}`,
        config
      );

      let cid = await axios.get(
        `${urlBase}/v1/dqueue/getConsultationId/${qid.data}`,
        config
      );

      let pid = await axios.get(
        `${urlBase}/v1/dqueue/getPatientId/${qid.data}`,
        config
      );

      let formData = new FormData();
      formData.append("file", prescription);

      await axios.post(
        `${urlBase}/v1/document/uploadPrescription/${pid.data}/${cid.data}`,
        formData,
        configPhoto
      );
    } catch (e) {
      console.log(e);
    }
  };

  setQueueLimit = async(doctorId, limit) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

    let l = await axios
    .post(`${urlBase}/v1/doctor/setQueueLimit/${doctorId}/${limit}`, {},config);
  }
  
  setQueueLimit = async (doctorId, limit) => {
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      let l = await axios.post(
        `${urlBase}/v1/doctor/setQueueLimit/${doctorId}/${limit}`,
        {},
        config
      );
    } catch (e) {
      console.log(e);
    }
  };

  setFollowDate = async (followUpDate) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

    const id = JSON.parse(secureLocalStorage.getItem("doctor")).id;

    try {
      let qid = await axios.get(`${urlBase}/v1/dqueue/getDqueue/${id}`, config);

      let cid = await axios.get(
        `${urlBase}/v1/dqueue/getConsultationId/${qid.data}`,
        config
      );

      let followUp = await axios.post(
        `${urlBase}/v1/consultation/setFollowUp/${cid.data}/${followUpDate}`,
        {},
        config
      );

    } catch (e) {
      console.log(e);
    }
  };

  removePatients = async (doctorid) => {
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      let remove = await axios.get(
        `${urlBase}/v1/dqueue/removeAllPatient/${doctorid}`,
        config
      );
    } catch (e) {
      console.log(e);
    }
  };

  acceptPatient = async (bool) => {
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      const doctorId = JSON.parse(secureLocalStorage.getItem("doctor")).id;

      let qid = await axios.get(
        `${urlBase}/v1/dqueue/getDqueue/${doctorId}`,
        config
      );

      let toggle = await axios.get(
        `${urlBase}/v1/dqueue/toggleAcceptPatient/${qid.data}/${bool}`,
        config
      );

    } catch (e) {
      console.log(e);
    }
  };

  removePatientFromQueue = async (patientId) => {
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      
      const doctorId = JSON.parse(secureLocalStorage.getItem("doctor")).id;
      let removePatient = await axios.get(
        `${urlBase}/v1/dqueue/removePatient/${doctorId}/${patientId}`,
        config
      );

    } catch (e) {
      console.log(e);
    }
  };
}

export default new AuthService();
