import React from 'react';
import Pdf from "react-to-pdf";

const ref = React.createRef();

const PDF = (props) => {
  console.log(props.formFields)
  return (
    <>
      <div ref={ref}>
        <h2>Prescription</h2>
        {props.formFields.map((data, key)=>{
                    return(
                        <div key={key}>
                        <p style={{fontWeight:"bold"}}>{data.Name}</p>
                        {data.Morning === true ? <input type="checkbox" checked readOnly></input> :
                        <input type="checkbox" readOnly></input>}
                        <label>Morning</label>
                        {data.Evening === true ? <input type="checkbox" checked readOnly></input> :
                        <input type="checkbox" readOnly></input>}
                        <label>Evening</label>
                        {data.Night === true ? <input type="checkbox" checked readOnly></input> :
                        <input type="checkbox" readOnly></input>}
                        <label>Night</label>
                        </div>
                    );
                })}
                <div>
                            <h3>Remarks</h3>
                            <p>{props.remarks}</p>
                </div>
      </div>
      <Pdf targetRef={ref} filename="prescription.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate PDF</button>}
      </Pdf>
    </>
  );
}

export default PDF;