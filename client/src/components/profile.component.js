import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

function Profile() {
    const currentUser = AuthService.getCurrentUser();
    
    const [doctor,setDoctor] = useState("");
    window.onload = () => {
      AuthService.getDoctor(setDoctor);
      }
    console.log(doctor);

    return (
      <div>
         <div className="card text-black mb-5" style={{maxWidth: '75rem', height:'37rem', marginLeft:'17%', zIndex:50}}>
          <div className="card-header" style={{color : 'white', backgroundColor:'black'}}>Profile Details
          <button type="button" className="btn-close" onClick={() => props.setIsOpen(false)} aria-label="Close" style={{float : 'right', backgroundColor : 'white'}}></button>
        </div>
        <div className="card-body">
        <img alt="" style={{float:'right', borderRadius:10, boxShadow:'10px', width:'550px', height:'520px'}} src={`data:image/png;base64,${props.image}`}></img>
          <h5 className="card-title">Name</h5>
          <p className="card-text">{props.user.first_name} {props.user.last_name}</p>
          <h5 className="card-title">Roll Number</h5>
          <p className="card-text">{props.user.roll_number}</p>
          <h5 className="card-title">Domain</h5>
          <p className="card-text">{props.user.domain.program}</p>
          <h5 className="card-title">Specialisation</h5>
          <p className="card-text">{props.user.specialization.name}</p>
          <h5 className="card-title">Current CGPA</h5>
          <p className="card-text">{props.user.cgpa}</p>
          <h5 className="card-title">Email ID</h5>
          <p className="card-text">{props.user.email}</p>
          <h5 className="card-title">Graduation Year</h5>
          <p className="card-text">{props.user.graduation_year}</p>
        </div>
        </div>

  </div>
    );
  }

  export default Profile;
