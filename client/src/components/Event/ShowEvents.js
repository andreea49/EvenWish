import { Container, Row, Col } from 'react-bootstrap'
import { Navigate, Link } from "react-router-dom";
import React from "react"
import './Event.css'
import {checkResponseStatus} from '../Common.js'

class ShowEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {events: JSON.parse(localStorage.getItem("events"))};
        console.log("Events ", this.state.events);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(event) {
        event.preventDefault();
        const options = {
            method : "POST",
            body: JSON.stringify({
                EventID: event.target.name
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("events/remove", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("events/remove returned %O", json);
                this.setState({events: this.state.events.filter(item => !(item["event"]["EventID"] == event.target.name))});
                localStorage.setItem("events", JSON.stringify(this.state.events));
            })
            .catch(err => console.log("/events/remove errored %O", err));
    }

    render() {
        if (this.state.events.length === 0) {
            return (
                <>
                <div id="homePage">
                    <Navigate to="/" replace={true} />
                </div>
                </>
            )
        }
        let titleMine;
        let mine = [];
        this.state.events.forEach((ev) => {
            if (ev["mine"]) {
                titleMine = <Row><Col lg='4'></Col><Col lg='4'><h1>My events</h1> </Col><Col lg='4'></Col></Row>;
                mine.push(<Row key={ev["event"]["EventID"]}><Col lg='2'></Col><Col lg='3'>{ev["event"]["Description"]} </Col>
                    <Col lg='2'>({ev["event"]["Location"]})</Col>
                    <Col lg='2'>{ev["event"]["EventTime"]}</Col>
                    <Col lg="1"><Link to={{ pathname: '/event' }} state= {{id: ev["event"]["EventID"], description: ev["event"]["Description"], own: true}} className="btn btn-primary">View</Link></Col>
                    <Col lg="1"><button name={ev["event"]["EventID"]} onClick={this.handleRemove} className="btn btn-primary">Remove</button></Col>
                    <Col lg='1'></Col></Row>);
            }
        })
    
        let titleTheirs;
        let theirs = [];
        this.state.events.forEach((ev) => {
            if (!ev["mine"]) {
                titleTheirs = <Row><Col lg='4'></Col><Col lg='4'>Events invited to </Col><Col lg='4'></Col></Row>;
                theirs.push(<Row key={ev["event"]["EventID"]}><Col lg='2'></Col><Col lg='3'>{ev["event"]["Description"]} </Col>
                    <Col lg='2'>({ev["event"]["Location"]})</Col>
                    <Col lg='2'>{ev["event"]["EventTime"]}</Col>
                    <Col lg="1"><Link to={{ pathname: '/event' }} state= {{id: ev["event"]["EventID"], description: ev["event"]["Description"], own: false}} className="btn btn-primary">View</Link></Col>
                    <Col lg="1"><button name={ev["event"]["EventID"]} onClick={this.handleRemove}>Remove</button></Col>
                    <Col lg='1'></Col></Row>);
            }
        })
    
        return (
        
        <Container>
        <div class="addFormBackground">
            <Row><br/></Row>
            {titleMine}
            {mine}
            {titleTheirs}
            {theirs}
            </div>
        </Container>
    );
     };
  }
  export default ShowEvents;
