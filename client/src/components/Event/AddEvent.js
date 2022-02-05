import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import {useState} from 'react'
import Axios from 'axios'
import './AddEvent.css'

function AddEvent() {

    const [description, setDescription] = useState("")
    const [avatar, setAvatar] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [username, setUsername] = useState(localStorage.getItem('username'))
    var axios = Axios.create();

    function addEvent() {
        const event = {
            username: username,
            Description: description,
            Avatar: avatar,
            EventDate: eventDate
        }
        axios.post("http://localhost:3002/events/", event).then((response) => {
            if(response.satus === 200){
                alert("Successfully added event.")
            }
        })
    }

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
                                <Form.Control type="text" placeholder="Enter description:" value={description} onChange = {(e) => setDescription(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className='mt-3 mb-3'>
                                <Form.Label>Avatar link</Form.Label>
                                <Form.Control type="text" placeholder="Enter a valid image link:" value={avatar} onChange = {(e) => setAvatar(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className='mt-3 mb-3'>
                                <Form.Label>Date and time: </Form.Label>
                                <Form.Control type="text" placeholder="Enter the event's date:" value={eventDate} onChange = {(e) => setEventDate(e.target.value)}/>
                                <Form.Text style={{color: 'white'}}>Example: 2022-01-31 12:25:01</Form.Text>
                            </Form.Group>
                            <Button className="mt-3" type="submit" onClick={addEvent}>Add event</Button>
                        </Form>
                    </div>
                </Col>
                <Col lg="4">
                </Col>
            </Row>
        </Container>
    </>)
}

export default AddEvent;