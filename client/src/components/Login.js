import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import './mix.css';


const Login =() => {
        const  [passShow, setpassShow]= useState(false)

        const [inpval, setInpval]=useState({
            email:"",
            password:"",

        })

        // console.log(inpval)

        const history = useNavigate();


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

        const loginuser = async (e)=>{
            e.preventDefault()

            const {email, password}= inpval

            if(email===''){
                alert("Please Enter email");
               } else if(!email.includes('@')){
                alert('Please Enter valid email');
               }else if(password===''){
                alert('Please Enter  password');
               }else if(password.length<6){
                alert('password must be 6 char!');
               }else{
                const data = await fetch("/login",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                         email, password
                    })

                })

                const res = await data.json()

                console.log(res)
                if (res.status === 201) {
                    localStorage.setItem("usersdatatoken",res.result.token);

                    history("/dashboard")

                    setInpval({ ...inpval, email: "", password: "" });
                }


                

               }
        }
   return( 
   
   <>
        <section>
            <div className="form_data">
                <div className="form_heading">
                    <h1>Welcome Back, Log In</h1>
                    <p>Hi, we are you glad you are back. Please login.</p>
                </div>

                <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email"  value={inpval.email}  onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"}  value={inpval.password}  onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={()=>setpassShow(!passShow)}>
                                        {!passShow?"Show" : "Hide"}
                                </div>

                            </div>

                        </div>

                        <button className="btn" onClick={loginuser}>Login</button>
                        <p>Don't have any account <NavLink to={"/register"}>Sigunp</NavLink></p>
                        
                    </form>

            </div>

            

            
        </section>
    </>
    )
}

export default Login