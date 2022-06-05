import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { useLocation, useParams } from "react-router-dom";
import React from "react"
import './Event.css'
import {checkResponseStatus} from '../Common.js'

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.location.state.id;
        this.own = this.props.location.state.own;
        this.state = {description: this.props.location.state.description, invites:null, friends: [], wishes: [], wishText: "", keywordText: ""};
        this.handleInvite = this.handleInvite.bind(this);
        this.handleRemoveInvite = this.handleRemoveInvite.bind(this);
        this.handleAssignWish = this.handleAssignWish.bind(this);
        this.handleCancelWish = this.handleCancelWish.bind(this);
        this.handleNewWish = this.handleNewWish.bind(this);
        this.handleGetSuggestion = this.handleGetSuggestion.bind(this);
    }

    handleInvite(event) {
        event.preventDefault();
        const options = {
            method : "POST",
            body: JSON.stringify({
                EventID: this.id,
                username: event.target.name,
                Note: ""
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/invites/add", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/invites/add returned %O", json);
                this.state.friends.splice(this.state.friends.indexOf(event.target.name), 1);
                this.state.invites.set(event.target.name, "");
                this.setState({friends: this.state.friends, invites: this.state.invites});
            })
            .catch(err => console.log("/invites/add errored %O", err));
    }

    handleRemoveInvite(event) {
        event.preventDefault();
        const options = {
            method : "POST",
            body: JSON.stringify({
                EventID: this.id,
                username: event.target.name
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/invites/delete", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/invites/delete returned %O", json);
                this.state.friends.push(event.target.name);
                this.state.invites.delete(event.target.name);
                this.setState({friends: this.state.friends, invites: this.state.invites});
            })
            .catch(err => console.log("/invites/delete errored %O", err));
    }

    handleNewWish(event) {
        event.preventDefault();
        if (!this.state.wishText) return;
        const options = {
            method : "POST",
            body: JSON.stringify({
                EventID: this.id,
                Note: this.state.wishText,
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/wishes/add", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/wishes/add returned %O", json);
                this.state.wishes.push({WishID: json.id, EventID: this.id, Note: this.state.wishText, username: null});
                this.setState({wishes: this.state.wishes});
            })
            .catch(err => console.log("/wishes/add errored %O", err));
    }

    updateWishlist(wl, id, username) {
        wl.forEach(item => {
            if (item.WishID == id) {
                item.username = username;
            }
        })
    }

    handleAssignWish(event) {
        event.preventDefault();
        const options = {
            method : "POST",
            body: JSON.stringify({
                WishID: event.target.name,
                username: localStorage.getItem("username"),
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/wishes/assign", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/wishes/assign returned %O", json);
                this.updateWishlist(this.state.wishes, event.target.name, localStorage.getItem("username"));
                this.setState({wishes: this.state.wishes});
            })
            .catch(err => console.log("/wishes/assign errored %O", err));
    }

    handleCancelWish(event) {
        event.preventDefault();
        const options = {
            method : "POST",
            body: JSON.stringify({
                WishID: event.target.name,
                username: null,
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/wishes/assign", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/wishes/assign returned %O", json);
                this.updateWishlist(this.state.wishes, event.target.name, null);
                this.setState({wishes: this.state.wishes});
            })
            .catch(err => console.log("/wishes/assign errored %O", err));
    }

    getRndInt(max) {
        return Math.floor(Math.random() * max);
      }
      
    handleGetSuggestion(event) {
        event.preventDefault();
        if (!this.state.keywordText) return;
        const options = {
            method : "POST",
            body: JSON.stringify({
                keyword: this.state.keywordText,
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/suggestions/get", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/suggestions/get returned %O", json);
                let len = json['suggestions'].length;
                if (len > 0) {
                    let sg = json['suggestions'][this.getRndInt(len)];
                    this.setState({wishText: sg});
                }
//                this.state.wishes.push({WishID: json.id, EventID: this.id, Note: this.state.wishText, username: null});
            })
            .catch(err => console.log("/suggestions/get errored %O", err));
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
                this.setState({friends: json["users"].filter(item => !this.state.invites.has(item))});
            })
            .catch(err => console.log("/connections/list errored %O", err));
    };

    fetchWishes() {
        const options = {
            method : "POST",
            body: JSON.stringify({
                EventID: this.id,
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/wishes/list", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/wishes/list returned %O", json["wishes"]);
                this.setState({wishes: json["wishes"]});
            })
            .catch(err => console.log("/wishes/list errored %O", err));
    };


    componentDidMount() {
        const options = {
            method : "POST",
            body: JSON.stringify({
                EventID: this.id
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/invites/list", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/invites/list returned %O", json);
                this.state.invites = new Map(json["invites"].map(item => {
                    return [item.username, item.Note];
                    })
                )
                if (this.own)
                    this.fetchConnections();
                this.fetchWishes();
                this.setState({invites: this.state.invites});
            })
            .catch(err => console.log("/invites/list errored %O", err));
    }

    render() {
        if (!this.state.invites) 
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
                            <Col lg="5">
                            <span>Loading invites for {this.state.description} ...</span>
                            </Col>
                            <Col lg="2">
                            </Col>
                        </Row>
                    </Container>
                </>);

        let invitesTitle;
        let invites = [];
        if (this.state.invites.size == 0)
            invitesTitle = <Row><Col lg='4'></Col><Col lg='4'>You have no invitees </Col><Col lg='4'></Col></Row>;
        else {
            invitesTitle = <Row><Col lg='4'></Col><Col lg='4'><h3 className="form-title">Participants</h3></Col><Col lg='4'></Col></Row>;
            this.state.invites.forEach((val, key, map) => {
                if (this.own)
                    invites.push(<Row key={key}><Col lg="2"></Col><Col lg="4"><span>{key}</span></Col><Col lg="2"></Col>
                        <Col lg="2"><button name={key} class="btn btn-primary" onClick={this.handleRemoveInvite}>Cancel invite</button></Col><Col lg="2"></Col></Row>);     
                else 
                    invites.push(<Row key={key}><Col lg="2"></Col><Col lg="4"><span>{key}</span></Col><Col lg="2"></Col>
                        <Col lg="4"></Col></Row>);     
                })
            invites.push(<Row><br/></Row>);
        }

        let friendsTitle;
        let friends = [];
        if (this.state.friends.length > 0) {
            friendsTitle = <Row><Col lg='4'></Col><Col lg='4'><h3 className="form-title">Make new invitations</h3></Col><Col lg='4'></Col></Row>;
            friends = this.state.friends.map((user) => {
                return (
                    <Row key={user}>
                    <Col lg="2"></Col>
                    <Col lg="4">
                        <span>{user}</span>
                    </Col>
                    <Col lg="2"></Col>
                    <Col lg="2">
                        <button class="btn btn-primary" name={user} onClick={this.handleInvite}>Invite</button>
                    </Col>
                    <Col lg="2"></Col>
                </Row>            
                )
            })
            friends.push(<Row><br/></Row>);
        }

        let myname = localStorage.getItem("username");
        return (
        <>
        <Container>
            <div class="addFormBackground">
            <Row><br/></Row>
            <Row><Col lg='4'></Col><Col lg='4'><h2 className="form-title">Event: {this.state.description}</h2></Col><Col lg='4'></Col></Row>
            <Row><br/></Row>
            {invitesTitle}
            {invites}
            {friendsTitle}
            {friends}
            <Row><Col lg='4'></Col><Col lg='4'><h3 className="form-title">Wish list</h3></Col><Col lg='4'></Col></Row>
            {
                this.state.wishes.map((wish) => {
                        return (
                            <Row key={wish.WishID}>
                            <Col lg="2"></Col>
                            <Col lg="4">
                                <span>{wish.Note}</span>
                            </Col>
                            <Col lg="2">
                                <span>{wish.username}</span>
                            </Col>
                            <Col lg="2">{
                                wish.username?(wish.username===myname?<button name={wish.WishID} class="btn btn-primary" onClick={this.handleCancelWish}>Cancel</button>:''):
                                (<button name={wish.WishID} class="btn btn-primary" onClick={this.handleAssignWish}>Assign</button>)}</Col>
                            <Col lg="2"></Col>
                        </Row>            
                        )
                      })
            }
            {this.own?(
                <Row><Col lg="2"></Col>
                    <Col lg="4"><input type="text" className="border-2 rounded form-control" placeholder="Enter wish note" value={this.state.wishText} onChange={(ev) => this.setState({wishText: ev.target.value})}></input></Col>
                    <Col lg="2"></Col>
                    <Col lg="2">
                        <button class="btn btn-primary" onClick={this.handleNewWish}>New wish</button>
                    </Col>
                    <Col lg="2"></Col>
                </Row>):""
            }
            {this.own?(
                <Row><Col lg="2"></Col>
                    <Col lg="4"><input type="text" className="border-2 rounded form-control" placeholder="Enter suggestion keyword" value={this.state.keywordText} onChange={(ev) => this.setState({keywordText: ev.target.value})}></input></Col>
                    <Col lg="2"></Col>
                    <Col lg="2">
                        <button class="btn btn-primary" onClick={this.handleGetSuggestion}>Suggestion</button>
                    </Col>
                    <Col lg="2"></Col>
                </Row>):""
            }
        </div>
        </Container>
    </>);
     };
  }

// export default Event;
// wrap it in functional component to pass props
export default () => (
    <Event params={useParams()} location={useLocation()} />
);
