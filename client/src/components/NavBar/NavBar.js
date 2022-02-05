import "./NavBar.css"
import { Navbar, Container, Nav } from "react-bootstrap"
import { useState } from "react"

function NavBar(props) {
    const { loggedinUser, onLogout } = props;
    const [username, setUsername] = useState("");



    function checkIfLoggedIn() {
        if (loggedinUser === "" || loggedinUser === null) {
            return (<>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>               
                </Nav>
                <Nav>
                    <Nav.Link className="float-right" href="/register">Register</Nav.Link>
                    <Nav.Link className="float-right" href="/login">Log in</Nav.Link>
                </Nav>
            </>)
        } else {
            return (<>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/addEvent">Add Event</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="float-right" href="/profile">Welcome, {loggedinUser}!</Nav.Link>
                    <Nav.Link className="float-right" onClick={onLogout}>Log out</Nav.Link>
                </Nav>
            </>)
        }
    }

    return (
        <Navbar className="navigation" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Artilendar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">

                    {checkIfLoggedIn()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;