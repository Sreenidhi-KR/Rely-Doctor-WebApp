import axios from "axios";

const urlBase = "https://localhost:8080/api";
var user = JSON.parse(localStorage.getItem("doctor"));
console.log(urlBase)
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
          localStorage.setItem("doctor", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout = async()=>{
    try{
      const id = JSON.parse(localStorage.getItem("doctor")).id;
      let l = await axios.post(
        `${urlBase}/auth/doctor/signout/${id}`,{},
        config
      );
      console.log("LOGOUT", l);

    } catch (e) {
      console.log(e);
    }
    localStorage.removeItem("doctor");
    }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("doctor"));
  }

  
  refreshTokenGeneration(){
      const parsedJson = JSON.parse(atob(user.accessToken.split(".")[1]));
      let date=new Date();
      let jwtDate = new Date(parsedJson.exp*1000);
      let difference= date.getTime()-jwtDate.getTime();
      if(difference>0){
        console.log("rrrrrrrrrreeeeeeeeeeffrere",user.refreshToken)
        axios.post(`${urlBase}/auth/doctor/refreshtoken`,
          {refreshToken: user.refreshToken})
        .then((response) => {
          if (response.data.accessToken) {
            var doc = localStorage.getItem('doctor');
            console.log("1",JSON.parse(doc))
            var parsedDoc = JSON.parse(doc);
            parsedDoc.accessToken = response.data.accessToken;
            const newDoc = JSON.stringify(parsedDoc);
            localStorage.setItem('doctor', newDoc);
            user = JSON.parse(localStorage.getItem("doctor"));
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
            console.log("2",parsedDoc)
            console.log("DONEEEEEE")
          }
          return response.data;
        })
        .catch((error) => {
            console.log(error)
        });
      }
  }

  getDoctor = (setDoctor) => {
    this.refreshTokenGeneration()
    setTimeout(() => {
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
    }, 1000);

  };

  getPreviousConsultations = async () => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));
    const id = JSON.parse(localStorage.getItem("doctor")).id;
    try {
      const json = await axios.get(
        `${urlBase}/v1/consultation/getPrevConsultationsDoctor/${id}`,
        config
      );

      console.log("***",json.data);
      return json.data;
    } catch (e) {
      console.log(e);
    }
  };

  getPhoto = async(setImg) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

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

  getUserPhoto = async(setImg, id) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

    axios
      .get(`${urlBase}/v1/user/downloadImage/${id}`, configPhoto)
      .then((json) => {
        setImg(json.data);
        console.log(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPatientsInQueue = async(setPatients) => {    
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

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

  getPatientDocuments = async (setDocuments) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

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

  downloadPatientDocument = async(docId, docName) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Downloding document");
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

      const id = JSON.parse(localStorage.getItem("doctor")).id;
      const json = await axios.get(
        `${urlBase}/v1/consultation/getPrevConsultationsStats/${id}`,
        config
      );
      console.log(json.data);
      return json.data;
    } catch (e) {
      console.log(e);
    }
  };

  getConsultationId = async (doctorId) => {
    console.log("docid", doctorId);
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      let qid = await axios.get(
        `${urlBase}/v1/dqueue/getDqueue/${doctorId}`,
        config
      );

      console.log("qid", qid);

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
    console.log("docid", doctorId);
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      let qid = await axios.get(
        `${urlBase}/v1/dqueue/getDqueue/${doctorId}`,
        config
      );

      console.log("qid", qid);

      let cid = await axios.get(
        `${urlBase}/v1/dqueue/getConsultationId/${qid.data}`,
        config
      );

      console.log("cid", cid);

      let pid = await axios.get(
        `${urlBase}/v1/dqueue/getPatientId/${qid.data}`,
        config
      );

      console.log("pid", pid);

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

    console.log(config)
    let l = await axios
    .post(`${urlBase}/v1/doctor/setQueueLimit/${doctorId}/${limit}`, {},config);
    console.log("QUEUE LIMIT",l)
  }
  
  setQueueLimit = async (doctorId, limit) => {
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(config);
      let l = await axios.post(
        `${urlBase}/v1/doctor/setQueueLimit/${doctorId}/${limit}`,
        {},
        config
      );
      console.log(l);
    } catch (e) {
      console.log(e);
    }
  };

  setFollowDate = async (followUpDate) => {
    this.refreshTokenGeneration()
    await new Promise(resolve => setTimeout(resolve, 1000));

    const id = JSON.parse(localStorage.getItem("doctor")).id;

    try {
      let qid = await axios.get(`${urlBase}/v1/dqueue/getDqueue/${id}`, config);

      console.log("qid", qid);

      let cid = await axios.get(
        `${urlBase}/v1/dqueue/getConsultationId/${qid.data}`,
        config
      );

      console.log("cid", cid);

      let followUp = await axios.post(
        `${urlBase}/v1/consultation/setFollowUp/${cid.data}/${followUpDate}`,
        {},
        config
      );

      console.log(followUp);
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
      console.log(remove);
    } catch (e) {
      console.log(e);
    }
  };

  acceptPatient = async (bool) => {
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      const doctorId = JSON.parse(localStorage.getItem("doctor")).id;

      let qid = await axios.get(
        `${urlBase}/v1/dqueue/getDqueue/${doctorId}`,
        config
      );

      let toggle = await axios.get(
        `${urlBase}/v1/dqueue/toggleAcceptPatient/${qid.data}/${bool}`,
        config
      );

      console.log("togggggggling", toggle);
    } catch (e) {
      console.log(e);
    }
  };

  removePatientFromQueue = async (patientId) => {
    try {
      this.refreshTokenGeneration()
      await new Promise(resolve => setTimeout(resolve, 1000));

      
      const doctorId = JSON.parse(localStorage.getItem("doctor")).id;
      console.log("ajsdbajsdbjda", doctorId);
      console.log("ajsdbajsdbjda", patientId);
      let removePatient = await axios.get(
        `${urlBase}/v1/dqueue/removePatient/${doctorId}/${patientId}`,
        config
      );

      console.log("ajsdbajsdbjda", removePatient);
    } catch (e) {
      console.log(e);
    }
  };
}

export default new AuthService();
