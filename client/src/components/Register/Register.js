import { Container } from "react-bootstrap"
import { useState } from "react"
import "./Register.css"

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        executeRegister();
    }

    function executeRegister() {

        const options = {
            method : "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/users/register", options)
        .then((response) => {
            if(response.status === 200) {
                alert("Registered.")
            }
        })

    }

    return (<>
        <Container>
            <div className="registerContainer">
                <form>
                    <h1 className="form-title">Register</h1>

                    <div className="form-group mt-3">
                        <label>Your username</label>
                        <input type="text" className="form-control" placeholder="Enter username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                    </div>
                    <div className="form-group mt-3">
                        <label>Your password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    </div>

                    <button className="btn btn-primary mt-3" onClick = {handleSubmit}>Register</button>
                </form>
            </div>
        </Container>
    </>
    )
}

export default Register;