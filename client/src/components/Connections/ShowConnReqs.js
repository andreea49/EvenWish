import { Container, Row, Col, Spinner } from 'react-bootstrap'
import React from "react"
import './Connections.css'
import {checkResponseStatus} from '../Common.js'

class ShowConnReqs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {searchText: '', searchResult: null, requests: null, loading: true, friends: new Map()};
        this.fetchConnections = this.fetchConnections.bind(this);
        this.fetchConnectionsReqs = this.fetchConnectionsReqs.bind(this);
        this.handleTextSearchChange = this.handleTextSearchChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleConnect = this.handleConnect.bind(this);
        this.handleWithdraw = this.handleWithdraw.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }

    handleTextSearchChange(event) {
        console.log("text changed %s -> %s", this.state.searchText, event.target.value)
        this.setState({searchText: event.target.value});
    }

    handleSearch(event) {
        const options = {
            method : "POST",
            body: JSON.stringify({
                username: this.state.searchText?this.state.searchText:""
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/users/search", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("Search returned %O", json);
                this.setState({searchResult: json});
            })
            .catch(err => console.log("Search errored %O", err));
    }

    handleConnect(event) {
        const options = {
            method : "POST",
            body: JSON.stringify({
                Sender: localStorage.getItem("username"),
                Receiver: event.target.name
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/connections/reqsend", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/connections/reqsend returned %O", json);
                this.state.requests["sent"].push(event.target.name);
                this.setState({searchText: "", searchResult: null});
            })
            .catch(err => {
                console.log("/connections/reqsend errored '%O'", err);
            });
    }

    handleWithdraw(event) {
        event.preventDefault();
        const options = {
            method : "POST",
            body: JSON.stringify({
                Sender: localStorage.getItem("username"),
                Receiver: event.target.name
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/connections/reqwithdraw", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/connections/reqwithdraw returned %O", json);
                this.state.requests["sent"].splice(this.state.requests["sent"].indexOf(event.target.name), 1);
                this.setState({searchText: '', searchResult: null, requests: this.state.requests});
            })
            .catch(err => console.log("/connections/reqwithdraw errored %O", err));
    }

    handleAccept(event) {
        event.preventDefault();
        const options = {
            method : "POST",
            body: JSON.stringify({
                Receiver: localStorage.getItem("username"),
                Sender: event.target.name
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/connections/reqaccept", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/connections/reqaccept returned %O", json);
                this.state.requests["received"].splice(this.state.requests["received"].indexOf(event.target.name), 1);
                this.setState({searchText: '', searchResult: null, requests: this.state.requests});
            })
            .catch(err => console.log("/connections/reqaccept errored %O", err));
    }

    handleReject(event) {
        event.preventDefault();
        const options = {
            method : "POST",
            body: JSON.stringify({
                Receiver: localStorage.getItem("username"),
                Sender: event.target.name
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/connections/reqreject", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/connections/reqreject returned %O", json);
                this.state.requests["received"].splice(this.state.requests["received"].indexOf(event.target.name), 1);
                this.setState({searchText: '', searchResult: null, requests: this.state.requests});
            })
            .catch(err => console.log("/connections/reqreject errored %O", err));
    }

    fetchConnections() {
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
                console.log("/connections/list returned %O", json['users']);
                this.setState({friends: new Map(json["users"].map(item => {
                                                    return [item, true];
                                                }))
                });
            })
            .catch(err => console.log("/connections/list errored %O", err));
    };

    fetchConnectionsReqs() {
        const options = {
            method : "POST",
            body: JSON.stringify({
                username: localStorage.getItem("username")
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        
        fetch("/connections/reqs", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/connections/reqs returned %O", json);
                this.setState({requests: json, loading: false});
            })
            .catch(err => console.log("/connections/reqs errored %O", err));
    }

    componentDidMount() {
        this.fetchConnectionsReqs();
        this.fetchConnections();
    };
  render() {
    if (this.state.loading) 
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
    let searchRes;
    if (this.state.searchResult) {
        searchRes = this.state.searchResult["users"].map((user) => {
            if (this.state.friends.has(user)) 
                return (
                    <Row key={user}>
                    <Col lg="3"></Col>
                    <Col lg="4">
                        <span class="egal">{user}</span>
                    </Col>
                    <Col lg="2">
                        <span class="egal">Friend</span>
                    </Col>
                    <Col lg="3"></Col>
                </Row>            
                )
            else
                return (
                    <Row key={user}>
                    <Col lg="3"></Col>
                    <Col lg="4">
                        <span>{user}</span>
                    </Col>
                    <Col lg="2">
                        <button class="btn btn-primary" name={user} onClick={this.handleConnect}>Connect</button>
                    </Col>
                    <Col lg="3"></Col>
                </Row>            
                )
        });
    }
    let sentTitle;
    let sentContent;
    let recTitle;
    let recContent;
    if (this.state.requests){
        if (this.state.requests["sent"].length > 0) {
            sentTitle = <Row><Col lg='4'></Col><Col lg='4'>Requests sent &#40;{this.state.requests["sent"].length}&#41;</Col><Col lg='4'></Col></Row>;
            sentContent = this.state.requests["sent"].map((user) => {
                return (
                    <Row key={user}>
                    <Col lg="3"></Col>
                    <Col lg="4">
                        <span>{user}</span>
                    </Col>
                    <Col lg="2">
                        <button class="btn btn-primary" name={user} onClick={this.handleWithdraw}>Withdraw</button>
                    </Col>
                    <Col lg="3"></Col>
                </Row>            
                )
            });
        }
        if (this.state.requests["received"].length > 0) {
            recTitle = <Row><Col lg='4'></Col><Col lg='4'>Requests received &#40;{this.state.requests["received"].length}&#41;</Col><Col lg='4'></Col></Row>;
            recContent = this.state.requests["received"].map((user) => {
                return (
                    <Row key={user}>
                    <Col lg="3"></Col>
                    <Col lg="4">
                        <span>{user}</span>
                    </Col>
                    <Col lg="2">
                        <button class="btn btn-primary" name={user} onClick={this.handleAccept}>Accept</button>
                    </Col>
                    <Col lg="2">
                        <button class="btn btn-primary" name={user} onClick={this.handleReject}>Reject</button>
                    </Col>
                    <Col lg="1"></Col>
                </Row>            
                )
            });
        }
    }
    return (
        
        <Container>
            <div class="addFormBackground">
            <Row><br/></Row>
            <Row><Col lg='4'></Col><Col lg='4'><h1>Add Friends</h1></Col><Col lg='4'></Col></Row>
            <Row>
                <Col lg="3"></Col>
                <Col lg="4"><input type="text" class="form-control" placeholder="Enter username" value={this.state.searchText} onChange={this.handleTextSearchChange}></input></Col>
                <Col lg="2">
                    <button class="btn btn-primary" onClick={this.handleSearch}>Search</button>
                </Col>
                <Col lg="3"></Col>
            </Row>
            <Row><br/></Row>
            {searchRes}
            {sentTitle}
            {sentContent}
            {recTitle}
            {recContent}
            </div>
        </Container>
    );
     };
  }
  export default ShowConnReqs;
