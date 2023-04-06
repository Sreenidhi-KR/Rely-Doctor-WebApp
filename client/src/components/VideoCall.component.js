import "../App.css";
import axios from "axios";
import AgoraUIKit from "agora-react-uikit";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/fontawesome-free-solid'
import patientDocuments from "../components/patientDocuments";
import authHeader from "../services/auth-header";
import AuthService from "../services/auth.service";
import PatientDocuments from "../components/patientDocuments";
import DoctorQueue from "./queue.component";
window.Buffer = window.Buffer || require("buffer").Buffer;
const {RtcTokenBuilder, RtcRole} = require('agora-access-token')


const urlBase = "https://7d30-103-156-19-229.in.ngrok.io/api/v1";

function VideoCall() {
  const [videoCall, setVideoCall] = useState(false);
  const [tokenA, setTokenA] = useState(0);
  const [doctor, setDoctor] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [userId, setUserId] = useState(0);
  const [consultationId,setConsultationId]=useState(-1);

  const user = JSON.parse(localStorage.getItem("doctor"));
  console.log(user.id);

  const config = {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: "Bearer " + user.accessToken,
    }
  };
  const appId = "5e2ee6c6fc13459caa99cb8c234d42e0";
  const appCertificate = "6529c2900f7442b89b7b46666fdca9de";
  var channelId = "";
  const userAccount="";
  const uid = "0";
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const rtcProps = {
    appId: "5e2ee6c6fc13459caa99cb8c234d42e0",
    channel: "",
    token: "",
  };

  useEffect(()=>{
    rtcProps["token"] = tokenA;
    rtcProps["channel"] = channelName;
  });
  const getDoctor = (setDoctor) => {
    axios
      .get(`${urlBase}/doctor/getDoctorById/${user.id}`, config)
      .then((json) => {
        setDoctor(json.data);
        console.log(json.data);
        return json.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateDoctor = (setDoctor) => {
    axios
      .post(`${urlBase}/doctor/updateDoctor`, doctor, config)
      .then(() => {
        getDoctor(setDoctor);
      })
      .catch((error) => {
        alert("Error While Updating");
        console.log(error);
      });
  };

  window.onload = () => {
    getDoctor(setDoctor);
  };

  const handle = (event) => {
    var strng = doctor.userName + doctor.id;
    setChannelName(strng);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    channelId = channelName.toString();
    const tok = await RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelId, uid, role, privilegeExpiredTs);
    setTokenA(tok);
    doctor.token = tok;
    doctor.channel_name = channelId;
    setDoctor(doctor);
    updateDoctor(setDoctor);
    setVideoCall(true);
  };

  const callbacks = {
    EndCall: () => {
      doctor.channel_name = null;
      doctor.token = null;
      setDoctor(doctor);
      updateDoctor(setDoctor);
      setVideoCall(false);
    },
  };

  async function getConsultationId(){
    let cid= await AuthService.getConsultationId();
    setConsultationId(cid);
    console.log('+++++',cid);
  }

  return videoCall ? (
    <div>
      <Container>
        <Row>
          <Col>
            {" "}
            <DoctorQueue />
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
                width: "50vw",
                height: "90vh",
                border: "5px solid dodgerblue",
                borderRadius: "10px",
              }}
            >
              <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
            </div>
          </Col>
          <Col>
            <PatientDocuments doctor={doctor}></PatientDocuments>
            {/* consultation Id is hardcoded as 1 here */}
          </Col>
        </Row>
      </Container>

    </div>
  ) : (
    <form onSubmit={handleSubmit}>
    {/* hello
    <FontAwesomeIcon icon={faCoffee} /> */}
      <button type="submit" class="btn btn-outline-primary btn-lg" style={{marginLeft:"43%",marginTop:"20%"}} onClick={handle}>
        Join Video Consultation
      </button>
    </form>
  );
}

export default VideoCall;
