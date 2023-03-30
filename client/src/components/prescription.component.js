import React, {useState} from 'react';
import PDF from './pdf.component';

function Prescription() {

  const [formFields, setFormFields] = useState([
    { Name: '', 
      Morning: '', 
      Evening: '', 
      Night: ''}]) 
  
  const [remarks, setRemarks] = useState("");
  const [postSubmitted, setPostSubmitted] = useState(0);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const handleRadio = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = !data[index][event.target.name];
    setFormFields(data);
  }


  const addFields = () => {
    let object = {
      Name: '', 
      Morning: '', 
      Evening: '', 
      Night: ''
    }
    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(-1)
    setFormFields(data)
  }
  
  const submitPost = (e) =>{  
            console.log("abc")
            setPostSubmitted(true);
    }

      return(
          <div>
          <form>
            {formFields.map((form, index) => {
              return (
                <div key={index}>
                    <input
                    name='Name'
                    placeholder='Name'
                    onChange={event => handleFormChange(event, index)}
                    value={form.name}
                    />
                    <br></br><br></br>
                    <input
                    name='Morning'
                    type='checkbox'
                    onChange={event => handleRadio(event, index)}
                    ></input>
                    <label>Morning</label>
                    <input
                    name='Evening'
                    type='checkbox'
                    onChange={event => handleRadio(event, index)}
                    ></input>
                    <label>Evening</label>
                    <input
                    name='Night'
                    type='checkbox'
                    onChange={event => handleRadio(event, index)}
                    ></input>
                    <label>Night</label> 
                    <br></br>
                    <br></br>
                </div>
              )
            })}
          </form>
          <button onClick={removeFields}>Remove</button>
          <button onClick={addFields}>Add More..</button>
          <br></br>
          <textarea onChange={(e)=>{setRemarks(e.target.value)}} placeholder='Remarks'></textarea>
          <br></br>
          <button onClick={submitPost}>Submit</button>
          {postSubmitted ? <PDF remarks={remarks} formFields={formFields}></PDF>:null}   
        </div>
        );
    }
export default Prescription;