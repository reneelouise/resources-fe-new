import React from "react";
import "../styles/headerStyling/App.css";
import UserList from "./UserList";


const LoggedOutHeader = () => {
    return (
        <>
            <div id="header">
                <nav id="container">
                    <p>Resources</p>
                    <h1>Bibliotech</h1>

                    <div>
                        {/* <UserList /> */}
                        <button id="login-btn">Login</button>

                    </div>
                </nav>

            </div >

        </>
    );
};

export default LoggedOutHeader;







{/* <div className="dropdown"> */ }
{/* <button onClick={()=> props.usersList()} className="dropbtn">Dropdown</button>
                        <div id="myDropdown" className="dropdown-content">
                            <a href="#">Ed</a>
                            <a href="#">Alisa</a>
                            <a href="#">Renee</a> */}
{/* </div> */ }
