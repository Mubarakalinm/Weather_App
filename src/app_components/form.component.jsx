import React from 'react';
import './form.style.css';
const Form = props => {
    return (
        <div className='container'>
            <div>{props.error?error():null}</div>
       <form onSubmit={props.loadweather}>
       <div className="row">
             <div className="col-md-2">
                <input type="text" className='form-control' name='city' autoComplete='off' placeholder='Please Enter City'/>
             </div>
             <div className="col-md-3">
             <input type="text" className='form-control' name='country' autoComplete='off' placeholder='Please Enter Country Code   '/>
             </div>
             <div className="col-md-3 mt-md-O py-2 text-md-left">
                 <button className="btn btn-waring ">Get Weather</button>
             </div>
            </div>
           </form>   
        </div>
    );
}

function error(){
    return (
       <div className="alert alert-danger mx-5" role="alert">
           Please Enter City and Country
       </div>
    )
}

export default Form;
