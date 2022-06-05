import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import React from "react"
import './Event.css'
import {checkResponseStatus} from '../Common.js'

class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {description: "", location: "", eventDate: "", eventTime: ""};
        this.handleTextDescriptionChange = this.handleTextDescriptionChange.bind(this);
        this.handleTextLocationChange = this.handleTextLocationChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.addEvent = this.addEvent.bind(this);
    }

    handleTextDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    handleTextLocationChange(event) {
        this.setState({location: event.target.value});
    }

    handleDateChange(event) {
        this.setState({eventDate: event.target.value});
    }

    handleTimeChange(event) {
        console.log(event.target.value);
        this.setState({eventTime: event.target.value});
    }

    addEvent() {
        const options = {
            method : "POST",
            body: JSON.stringify({
                username: localStorage.getItem("username"),
                Description: this.state.description,
                Location: this.state.location,
                EventDate: this.state.eventDate,
                EventTime: this.state.eventTime
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/events/add", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/events/add returned %O", json);
                this.state.content = json;
                this.setState({});
            })
            .catch(err => {
                console.log("/events/add errored %O", err);
                alert(err);
            });
    };

  render() {
    return (<>
        <Container>
            <Row>
                <Col lg="4">
                </Col>
                <Col lg="4">
                    <div className="addFormBackground">
                        <h1>Add event</h1>
                        <Form>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter description:" value={this.state.description} onChange = {this.handleTextDescriptionChange}/>
                            </Form.Group>
                            <Form.Group className='mt-3 mb-3'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter location" value={this.state.location} onChange = {this.handleTextLocationChange}/>
                            </Form.Group>
                            <Form.Group className='mt-3 mb-3'>
                                <Form.Label>Date: </Form.Label>
                                <Form.Control type="date" value={this.state.eventDate} onChange = {this.handleDateChange}/>
                            </Form.Group>
                            <Form.Group className='mt-3 mb-3'>
                                <Form.Label>Time: </Form.Label>
                                <Form.Control type="time" value={this.state.eventTime} onChange = {this.handleTimeChange}/>
                            </Form.Group>
                            <Button className="mt-3" onClick={this.addEvent}>Add event</Button>
                        </Form>
                    </div>
                </Col>
                <Col lg="4">
                </Col>
            </Row>
        </Container>
    </>)
  };
}
export default AddEvent;
