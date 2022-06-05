import { Container, Row, Col, Spinner } from 'react-bootstrap'
import React from "react"
import './Connections.css'
import {checkResponseStatus} from '../Common.js'

class ShowConnections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: null};
        this.handleUnfriend = this.handleUnfriend.bind(this);
    }

    handleUnfriend(event) {
        event.preventDefault();
        const options = {
            method : "POST",
            body: JSON.stringify({
                Sender: localStorage.getItem("username"),
                Friend: event.target.name
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/connections/unfriend", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/connections/unfriend returned %O", json);
                this.state.content["users"].splice(this.state.content["users"].indexOf(event.target.name), 1);
                this.setState({content: this.state.content});
            })
            .catch(err => console.log("/connections/unfriend errored %O", err));
    }

    componentDidMount() {
        const options = {
            method : "POST",
            body: JSON.stringify({
                username: localStorage.getItem("username"),
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/connections/list", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/connections/list returned %O", json);
                this.state.content = json;
                this.setState({});
            })
            .catch(err => console.log("/connections/list errored %O", err));
    };

  render() {
      if (!this.state.content) 
        return (
            <>
                <Container>
                    <Row><br/></Row>
                    <Row>
                        <Col lg="4">
                        </Col>
                        <Col lg="1">
                            <Spinner animation="border"></Spinner>
                        </Col>
                        <Col lg="2">
                        <span>Loading...</span>
                        </Col>
                        <Col lg="5">
                        </Col>
                    </Row>
                </Container>
            </>);

        let title = <Row><Col lg="4"></Col><Col lg="4"><span>You currently have no friend connections</span></Col><Col lg="2"></Col></Row>;
        if ((this.state.content) && (this.state.content["users"].length > 0)) {
            title = <Row><Col lg='4'></Col><Col lg='4'><h1>Friends &#40;{this.state.content["users"].length}&#41;</h1></Col><Col lg='4'></Col></Row>;
        }
    
        return (
        
        <Container>
            <div class="addFormBackground">
            <Row><br/></Row>
            {title}
            {
                this.state.content["users"].map((user) => {
                        return (
                            <Row key={user} >
                            <Col lg="3"></Col>
                            <Col lg="4">
                                <span>{user}</span>
                            </Col>
                            <Col lg="2">
                                <button class="btn btn-primary" name={user} onClick={this.handleUnfriend}>Unfriend</button>
                            </Col>
                            <Col lg="3"></Col>
                        </Row>            
                        )
                      })
            }
             </div>
        </Container>
   );
     };
  }
  export default ShowConnections;
