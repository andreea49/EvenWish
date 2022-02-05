import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap"
import { useState } from "react"
import "./Login.css"

function LogIn(props) {
    const { onLogIn } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        executeLogin();
        
    }
  

    function executeLogin() {
        
        const options = {
            method : "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            })
        }

        fetch("http://localhost:3002/users/login", options)
        .then((response) => {
            if(response.status === 200) {
                alert("Successfully logged in.")
                localStorage.setItem("username", username);
                onLogIn(username);
                navigate("../", { replace: true });
            } else {
                alert("Invalid user/ password!")
            }
        })

    }

    return (<>
        <Container>
            <div className="loginContainer">
                <form>
                    <h1 className="form-title">Sign In</h1>

                    <div className="form-group mt-3">
                        <label>Your username</label>
                        <input type="text" className="form-control" placeholder="Enter username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                    </div>
                    <div className="form-group mt-3">
                        <label>Your password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    </div>

                    <button className="btn btn-primary mt-3" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </Container>
    </>
    )
}

export default LogIn;