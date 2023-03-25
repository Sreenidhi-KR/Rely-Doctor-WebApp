import '../App.css';
import axios from "axios";
import AgoraUIKit from "agora-react-uikit";
import { useEffect, useState } from 'react';
import authHeader from '../services/auth-header';
window.Buffer = window.Buffer || require("buffer").Buffer;
const {RtcTokenBuilder, RtcRole} = require('agora-access-token');


const urlBase = "http://localhost:8080/api/v1";

function VideoCall() {
  const [videoCall, setVideoCall] = useState(false);
  const [tokenA, setTokenA] = useState(0);
  const [doctor, setDoctor] = useState([]);
  const [channelName, setChannelName] = useState("");


  const config = {
  headers: authHeader()
  };
  const appId = '5e2ee6c6fc13459caa99cb8c234d42e0';
  const appCertificate = '6529c2900f7442b89b7b46666fdca9de';
  let channelId = '';
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

const rtcProps = {
    appId : "5e2ee6c6fc13459caa99cb8c234d42e0", 
    channel : "",
    token : ""
};

const getDoctor = (setDoctor) => {
  axios
    .get(`${urlBase}/doctor/getDoctorById/1`, config)
    .then((json) => {
      setDoctor(json.data);
      console.log(json.data)
      return json.data;
    })
    .catch((error) => {
      console.log(error);
    });
  };

const updateDoctor = (setDoctor) => {
  axios
    .post(`${urlBase}/doctor/updateDoctor`, doctor[0], config)
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
    }

useEffect(() => { 
    rtcProps["channel"] = channelName;
    rtcProps["token"] = tokenA;
  });

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log(doctor[0])
    channelId = channelName;
    let tok = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelId, "", role, privilegeExpiredTs);
    setTokenA(tok);
    doctor[0].channel_name = tok;
    setDoctor(doctor);
    updateDoctor(setDoctor);
    setVideoCall(true);    
};

const handle = (event) => {
    var strng = doctor[0].id+doctor[0].fname;
    setChannelName(strng);
};

const callbacks = {
  EndCall: () => {
    doctor[0].channel_name = null;
    setDoctor(doctor);
    updateDoctor(setDoctor);
    setVideoCall(false);
  }
};

return videoCall ? (
  <div style={{ display: "flex", width: "100vw", height: "100vh", border: "5px solid dodgerblue", borderRadius: "10px"}}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
  </div>
) : (
    <form onSubmit={handleSubmit}>
    <button type="submit" onClick={handle}>Join</button>
  </form>
);
}

export default VideoCall;
