import React, { useState } from "react";
import './mix.css';
import { NavLink } from "react-router-dom";

const Login =() => {
        const  [passShow, setpassShow]= useState(false)
        const  [cpassShow, setcpassShow]= useState(false)

        const [inpval, setInpval]=useState({
            fname:"",
            email:"",
            password:"",
            cpassword:"",

        })



        const setVal = (e) => {
            // console.log(e.target.value);

            const {name,value}=e.target;

            setInpval(()=>{
                return{ 
                    ...inpval,
                    [name]:value
                }
            })

        }


        const addUserdata = async (e) => {
            e.preventDefault();
            
            const { fname, email, password, cpassword } = inpval;

           if(fname===''){
            alert('Please Enter Name');
           } else if(email===''){
            alert("Please Enter email");
           } else if(!email.includes('@')){
            alert('Please Enter valid email');
           }else if(password===''){
            alert('Please Enter  password');
           }else if(password.length<6){
            alert('password must be 6 char!');
           }else if(cpassword===''){
            alert('Please Enter password');
           }else if(cpassword.length<6){
            alert('password must be 6 char!');
           } else if(password!==cpassword){
            alert('password and confirm password not match');   

           }else{
            // console.log('succesfful')
            const data = await fetch("/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    fname, email, password, cpassword 
                })
            })

            const res = await data.json()

            if (res.status === 201) {
                alert("Registration Successfully done 😃!");
                setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });
            }
           }
        
        
        }


   return( 
   
   <>
        <section>
            <div className="form_data">
                <div className="form_heading">
                <h1>Sign Up</h1>
                <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
                    your tasks! We hope that you will get like it.</p>
                </div>

                <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" value={inpval.fname} onChange={setVal} name="fname" id="fname" placeholder='Enter Your Name' />
                        </div>

                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>


                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={()=>setpassShow(!passShow)}>
                                        {!passShow?"Show" : "Hide"}
                                </div>

                            </div>

                        </div>


                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='confirm password' />
                                <div className="showpass" onClick={()=>setcpassShow(!cpassShow)}>
                                        {!cpassShow?"Show" : "Hide"}
                                </div>

                            </div>

                        </div>

                        <button className="btn"  onClick={addUserdata}>Sign up</button>
                        <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
                        
                    </form>

            </div>

            

            
        </section>
    </>
    )
}

export default Login