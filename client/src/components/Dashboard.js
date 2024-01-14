import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/context';

const Dashboard = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    // console.log(logindata.ValidUserOne)
    console.log(logindata.ValidUserOne?.email)

    const history = useNavigate();


    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();
        // console.log(data);
        if (data.status == 401 || !data) {
            // console.log('error page redirect')

            history("*");
        } else {
            console.log('user verify');
            setLoginData(data)
            history("/dashboard");

        }


    }



    useEffect(() => {
        DashboardValid();
    }, [])


    return (
        <>
            <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>

                <img src='./man.png' style={{ width: '200px', marginTop: 20 }} alt='' />
                <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>

            </div>
        </>
    )
}
export default Dashboard