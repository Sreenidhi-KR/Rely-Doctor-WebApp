import React, { useState } from "react";
import PDF from "./pdf.component"

function Prescription(doctor) {

  const [formFields, setFormFields] = useState([
    { Name: "", Morning: "", Evening: "", Night: "" },
  ]);
  const [remarks, setRemarks] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [patientFname, setPatientFname] = useState("");
  const [patientLname, setPatientLname] = useState("");
  const [patientPhoneNo, setPatientPhoneNo] = useState("");
  const [postSubmitted, setPostSubmitted] = useState(0);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const handleRadio = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = !data[index][event.target.name];
    setFormFields(data);
  };

  const addFields = (e) => {
    e.preventDefault()
    let object = {
      Name: "",
      Morning: "",
      Evening: "",
      Night: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (e) => {
    e.preventDefault()
    let data = [...formFields];
    data.splice(-1);
    setFormFields(data);
  };
  const submitPost = (e) => {
    e.preventDefault()
    console.log("abc");
    setPostSubmitted(true);
  };

  return (
    <>
    <section style={{ marginLeft: "500px" }}>
      <div class="row">
        <div class="col-md-8 mb-4">
          <div class="card mb-4">
            <div class="card-header py-3">
              <h5
                class="mb-0"
                style={{ marginLeft: "330px", fontSize: "30px" }}
              >
                Prescription
              </h5>
              <div class="row mb-4">
                <div class="col">
                  <div class="form-outline">
                    <label class="form-label" for="form6Example1">
                      Doctor
                    </label>
                  </div>
                </div>
                <div class="col" style={{ marginLeft: "250px" }}>
                  <div class="form-outline" style={{ fontWeight: "bold" }}>
                    <label class="form-label" for="form6Example2">
                      Name : {doctor.doctor.fname} {doctor.doctor.lname}
                    </label>
                    <label class="form-label" for="form6Example2">
                      Address : {doctor.doctor.clinic_address}
                    </label>
                    <label class="form-label" for="form6Example2">
                      Qualification : {doctor.doctor.qualification}
                    </label>
                    <label class="form-label" for="form6Example2">
                      Phone No : +91 9999888800
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h5 class="mb-0" style={{ fontSize: "30px" }}>
                Patient Details
              </h5>
              <br></br>
              <form>
                <div class="row mb-4">
                  <div class="col">
                    <div class="form-outline">
                    <label class="form-label" for="form6Example1">
                        First name
                      </label>
                      <input
                        type="text"
                        id="form6Example1"
                        class="form-control"
                        onChange={(e)=>setPatientFname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-outline">
                    <label class="form-label" for="form6Example2">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="form6Example2"
                        class="form-control"
                        onChange={(e)=>setPatientLname(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div class="form-outline mb-4">
                <label class="form-label" for="form6Example3">
                    Phone
                  </label>
                  <input
                    type="number"
                    id="form6Example3"
                    class="form-control"
                    onChange={(e)=>setPatientPhoneNo(e.target.value)}
                  />
                </div>

                <hr class="my-4" />
                <br></br>
                <div class="row mb-4">
                <div class="col">
                    <div class="form-outline">
                    <div>
                      <form>
                        {formFields.map((form,index) => {
                          return (
                            <div key={index}>
                            <label class="form-label" for="formCardNumber">
                                Drug Name
                              </label>
                              <input
                                type="text"
                                id="formCardNumber"
                                class="form-control"
                                placeholder="Name"
                                name="Name"
                                onChange={(event) => handleFormChange(event,index)}
                              />
                              <br></br>
                              <div style={{display:"inline-flex"}}>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="checkoutForm1"
                                  name="Morning"
                                  onChange={event => handleRadio(event, index)}
                                  />
                                  <p
                                  class="form-check-label"
                                  for="checkoutForm1"
                                >
                                  Morning
                                </p>
                              </div>
                              <div class="form-check" style={{marginLeft:"20px"}}>
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="checkoutForm1"
                                  name="Evening"
                                  onChange={event => handleRadio(event, index)}
                                />
                                <p
                                  class="form-check-label"
                                  for="checkoutForm1"
                                >
                                  Afternoon
                                </p>
                              </div>
                              <div class="form-check" style={{marginLeft:"20px"}}>
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="checkoutForm1"
                                  name="Night"
                                  onChange={event => handleRadio(event, index)}
                                />
                                <p
                                  class="form-check-label"
                                  for="checkoutForm1"
                                >
                                  Night
                                </p>
                              </div>
                              </div>
                              <br></br>
                              <br></br>
                            </div>
                          );
                        })}
                      </form>
                      <button class="btn btn-outline-primary btn-lg" onClick={e => removeFields(e)}>Remove</button>
                      &nbsp;&nbsp;
                      <button class="btn btn-outline-primary btn-lg" onClick={e => addFields(e)}>Add More</button>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div class="row mb-4">
                  <div class="col">
                    <div class="form-outline">
                      <textarea
                        type="text"
                        id="form6Example1"
                        class="form-control"
                        onChange={(e)=>{setSymptoms(e.target.value)}}
                        style={{ height: "200px" }}
                      ></textarea>
                      <label class="form-label" for="form6Example1">
                        Symptoms
                      </label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-outline">
                      <textarea
                        type="text"
                        id="form6Example1"
                        class="form-control"
                        onChange={(e)=>{setRemarks(e.target.value)}}
                        style={{ height: "200px" }}
                      ></textarea>
                      <label class="form-label" for="form6Example1">
                        Remarks
                      </label>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* <Pdf targetRef={ref} filename="prescription.pdf">
      {({ toPdf }) => <button style={{marginLeft:"500px"}} class="btn btn-primary btn-lg btn-block" type="submit" onClick={toPdf}>
        Generate Prescription
        </button>}
    </Pdf> */}
    <button style={{marginLeft:"500px"}} class="btn btn-primary btn-lg btn-block" type="submit" onClick={submitPost}>
        Generate Preview
    </button>
    {postSubmitted ? <PDF remarks={remarks} formFields={formFields} symptoms={symptoms} patientFname={patientFname} patientLname={patientLname} patientPhoneNo={patientPhoneNo} doctor={doctor}></PDF>:null}

  </>
  );
}
export default Prescription;
