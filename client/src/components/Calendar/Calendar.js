import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Navigate } from "react-router-dom";
import React from "react"
import './Calendar.css'
import {checkResponseStatus} from '../Common.js'
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5'

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        var now = new Date();
        this.state = {
            firstDay: new Date(now.getFullYear(), now.getMonth(), 1),
            lastDay: new Date(now.getFullYear(), now.getMonth() + 1, 0),
            displayState: {display: 'none'},
            daysArray: [],
            daysArrayEvents: [],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            events: new Map(),
            navigate: null
        };
        this.handleTest = this.handleTest.bind(this);
        this.populateCalendar = this.populateCalendar.bind(this);
        this.incrementMonth = this.incrementMonth.bind(this);
        this.decrementMonth = this.decrementMonth.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.populateEvents = this.populateEvents.bind(this);
        this.handleClick = this.handleClick.bind(this);
//        this. = this..bind(this);
        this.populateCalendar();
    }

    formatDate(year, month, day) {
        var date = "" + year + "-";
        if (month < 10) 
            date += "0";
        date += month + "-";
        if (day < 10) 
            date += "0";
        date += day;
        return date;
    }

    populateCalendar() {
        this.state.daysArray = [];
        this.state.daysArrayEvents = [false /*for day 0*/];
        for (let i = 0; i < this.state.firstDay.getDay(); i++) {
            this.state.daysArray.push(0);
        }

        for (let i = this.state.firstDay.getDate(); i <= this.state.lastDay.getDate(); i++) {
            this.state.daysArray.push(i);
            var date = this.formatDate(this.state.firstDay.getFullYear(), this.state.firstDay.getMonth() + 1, i);
            if (this.state.events.get(date))
                this.state.daysArrayEvents.push(true);
            else 
                this.state.daysArrayEvents.push(false);
        }

        for (let i = this.state.lastDay.getDay(); i < 6; i++) {
            this.state.daysArray.push(0)
            this.state.daysArrayEvents.push(false);
        }
//        console.log(this.state.daysArrayEvents)
        this.setState({daysArray: this.state.daysArray, daysArrayEvents: this.state.daysArrayEvents})
    }

    decrementMonth() {
        this.state.firstDay.setMonth(this.state.firstDay.getMonth() - 1);
        this.state.lastDay = new Date(this.state.firstDay.getFullYear(), this.state.firstDay.getMonth() + 1, 0);
        this.populateCalendar();
    }

    incrementMonth() {
        this.state.firstDay.setMonth(this.state.firstDay.getMonth() + 1);
        this.state.lastDay = new Date(this.state.firstDay.getFullYear(), this.state.firstDay.getMonth() + 1, 0);
        this.populateCalendar();
    }

    showTooltip(event){
        var now = new Date();
        if (event.target.id == now.getUTCDate())
            this.setState({displayState: {display: 'inline-block'}});
    }

    hideTooltip() {
        this.setState({displayState: {display: 'none'}});
    }

    populateEvents(res) {
        this.state.events = new Map();
        res["mine"].forEach((ev) => {
            var date = ev["EventDate"].substring(0,10);
            if (this.state.events.get(date)) 
                this.state.events.get(date).push({mine: true, event: ev});
            else
            this.state.events.set(date, [{mine: true, event: ev}]);
        })
        res["theirs"].forEach((ev) => {
            var date = ev["EventDate"].substring(0,10);
            if (this.state.events.get(date)) 
                this.state.events.get(date).push({mine: false, event: ev});
            else
            this.state.events.set(date, [{mine: false, event: ev}]);
        })
        this.populateCalendar();
        this.setState({events: this.state.events});
    }

    handleClick(event) {
        var date = this.formatDate(this.state.firstDay.getFullYear(), this.state.firstDay.getMonth() + 1, event.target.id)
        if (this.state.events.get(date)) {
            localStorage.setItem("events", JSON.stringify(this.state.events.get(date)));
            this.setState({navigate: "../events"});
        }
    }

    handleTest(event) {
        event.preventDefault();
        const options = {
            method : "POST",
            body: JSON.stringify({
                username: localStorage.getItem("username"),
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch("/events/list", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/connections/list returned %O", json);
                this.setState({content: this.state.content});
            })
            .catch(err => console.log("/connections/list errored %O", err));
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

        fetch("/events/list", options)
            .then(checkResponseStatus)
            .then(res => res.json())
            .then(json => {
                console.log("/events/list returned %O", json);
                this.populateEvents(json);
            })
            .catch(err => console.log("/connections/list errored %O", err));
    };

  render() {
    var date = new Date();
    if (this.state.navigate) {
        return (
            <>
            <div id="homePage">
                <Navigate to={this.state.navigate} replace={false} state={ { 'foo': 'bar23' } }/>
            </div>
            </>
        )
    }
    return (
        <>
            <div id="homePage">
                <Container id="pageContainer">
                    <Container fluid id="calendarContainer">
                        <Row id="titleRow">
                            <Container fluid>
                                <h1>Calendar</h1>
                                <h3>{this.state.months[this.state.firstDay.getMonth()] + " " + this.state.firstDay.getFullYear()}</h3>
                            </Container>
                        </Row>

                        <Container id="weekdaysContainer">
                            <ul className="calendarWeekdaysList">
                                <li className="liWithData">Sun</li>
                                <li className="liWithData">Mon</li>
                                <li className="liWithData">Tue</li>
                                <li className="liWithData">Wed</li>
                                <li className="liWithData">Thu</li>
                                <li className="liWithData">Fri</li>
                                <li className="liWithData">Sat</li>
                            </ul>
                        </Container>
                        <Container fluid id="calendarBodyContainer">
                            <button id="prev" onClick={this.decrementMonth}><IoArrowBackOutline /></button>
                            <Container id="daysContainer">
                                <ul className="calendarList">
                                    {this.state.daysArray.map((day) => {
                                        if (day === 0) {
                                            return (<li className='liWithData'><button></button></li>)
                                        } else {
                                            var star;
                                            if (this.state.daysArrayEvents[day]) {
                                                star = '*';
                                            }
                                            if (date.getDate() === day && this.state.firstDay.getMonth() === date.getMonth()) {
                                                return (<li className='liWithData' id='today'><button onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip} id={day} onClick={this.handleClick}>{day}{star}</button></li>)
                                            } else {
                                                return (<li className='liWithData'><button onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip} id={day} onClick={this.handleClick}>{day}{star}</button></li>)
                                            }
                                        }
                                    })}
                                </ul>

                            </Container>
                            <button id="next" onClick={this.incrementMonth}><IoArrowForwardOutline /></button>
                            
                        </Container>
                       
                    </Container>
                    <span className = 'tooltiptext' style={{ display: this.state.displayState.display}}>Today</span>
                </Container>
            </div>
        </>
    )
    };
}
export default Calendar;
