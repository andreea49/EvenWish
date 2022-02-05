import { Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import "./Calendar.css"
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5'
function CalendarFeed() {


    const [currentDate, setCurrentDate] = useState(new Date())
    const [firstDay, setFirstDay] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
    const [lastDay, setLastDay] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0))
    const [displayState, setDisplayState] = useState({display: 'none'})
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var daysArray = []
    console.log(currentDate + "\n" + firstDay + "\n" + lastDay)
    var date = new Date();

    //var currentDate = date;



    function populateCalendar() {
        for (let i = 0; i < firstDay.getDay(); i++) {
            //setCalendarBody(calendarBody + "<li></li>")
            daysArray.push(0)
        }

        for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
            daysArray.push(i)
        }

        for (let i = lastDay.getDay(); i < 6; i++) {
            daysArray.push(0)
        }
        console.log(daysArray)
    }

    function decrementMonth() {
        daysArray = []
        currentDate.setMonth(currentDate.getMonth() - 1);
        setFirstDay(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
        setLastDay(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));
        populateCalendar();
    }

    function incrementMonth() {
        daysArray = []
        console.log(currentDate)
        currentDate.setMonth(currentDate.getMonth() + 1);
        console.log(currentDate)
        setFirstDay(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
        setLastDay(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));
        populateCalendar();
    }

    function showTooltip(){
        //alert("OnMouseEnter event triggered")
        setDisplayState({display: 'inline-block'})
        
    }

    function hideTooltip() {
        setDisplayState({display: 'none'})
    }

    populateCalendar();


    return (
        <>
            <div id="homePage">
                <Container id="pageContainer">
                    <Container fluid id="calendarContainer">
                        <Row id="titleRow">
                            <Container fluid>
                                <h1>Calendar</h1>
                                <h3>{months[currentDate.getMonth()] + " " + currentDate.getFullYear()}</h3>
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
                            <button id="prev" onClick={decrementMonth}><IoArrowBackOutline /></button>
                            <Container id="daysContainer">
                                <ul className="calendarList">
                                    {daysArray.map((day) => {
                                        if (day === 0) {
                                            return (<li className='liWithData'><button></button></li>)
                                        } else if (date.getDate() === day && currentDate.getMonth() === date.getMonth()) {
                                            return (<li className='liWithData' id='today'><button onMouseEnter={showTooltip} onMouseLeave={hideTooltip} id={day}>{day}</button></li>)
                                        } else {
                                            return (<li className='liWithData'><button onMouseEnter={showTooltip} onMouseLeave={hideTooltip} id={day}>{day}</button></li>)
                                        }
                                    })}
                                </ul>

                            </Container>
                            <button id="next" onClick={incrementMonth}><IoArrowForwardOutline /></button>
                            
                        </Container>
                       
                    </Container>
                    <span className = 'tooltiptext' style={{ display: displayState.display}}>Ziua de azi</span>
                </Container>
            </div>
        </>
    )
}

export default CalendarFeed;