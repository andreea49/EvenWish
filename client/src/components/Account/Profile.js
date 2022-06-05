import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import React from "react"
import "./Profile.css"
import {checkResponseStatus} from '../Common.js'

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: localStorage.getItem("username"), password: ""};
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handlePasswordChange(event) {
        console.log("pwd ", event.target.value);
        this.setState({password: event.target.value});
    }

    handleUpdate(event) {
        event.preventDefault();
        const options = {
            method : "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/users/update", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/users/update returned %O", json);
                this.setState({password: event.target.name});
            })
            .catch(err => console.log("/users/update errored %O", err));
    }

    render() {
        return (<>
            <Container>
                <div className="loginContainer">
                    <form>
                        <h1 className="form-title">Settings</h1>
    
                        <div className="form-group mt-3">
                            <label>Your username</label>
                            <input type="text" disabled="true" className="form-control" placeholder="Enter password" value={this.state.username}></input>
                        </div>
                        <div className="form-group mt-3">
                            <label>Your password</label>
                            <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                        </div>
    
                        <button className="btn btn-primary mt-3" onClick={this.handleUpdate}>Update</button>
                    </form>
                </div>
            </Container>
        </>
        )
    }
}

export default Profile;