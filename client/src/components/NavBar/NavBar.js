import "./NavBar.css"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
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
                    <Nav.Link href="/addEvent">New Event</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown className="navigation" title={loggedinUser} menuVariant="dark">
                        <NavDropdown.Item href="/connections">Friends</NavDropdown.Item>
                        <NavDropdown.Item href="/connreqs">Friends requests</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/profile">Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item  onClick={onLogout}>Log out</NavDropdown.Item>
                    </NavDropdown>                    
                </Nav>
            </>)
        }
    }

    return (
        <Navbar className="navigation" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">EvenWish</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">

                    {checkIfLoggedIn()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;