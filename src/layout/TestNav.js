import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import { useContext } from "react";
import AppContext from "context/AppContextProvider";
import UserProfile from "login/UserProfile";
import { Dropdown } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import DropdownButton from 'react-bootstrap/DropdownButton';
import LoginButton from "login/LoginButton";
import NavLink from "react-bootstrap/NavLink";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";


export default function TestNav() {

  const boardListUri = `http://localhost:8080/bb/anonymous/listAll`;
  const navMenu = {
    color:"grey",
    textDecoration:"none"

}
  return <>
   <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">WonderVatory</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto  my-2 my-lg-0">
          <LoginButton />
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link><Link style={navMenu} to="/">Home</Link></Nav.Link>
            <Fetch uri={boardListUri} renderSuccess={renderSuccess} />
            <Nav.Link><Link style={navMenu} to="/memberList/0000">회원정보</Link></Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>

  </>;
  
  function renderSuccess(boardList) {
    return <>
          {boardList.map(board => (
                <Nav.Link>
                    <Link style={navMenu}  key={board.id} to={`/board/${board.id}`}
                    state={{ boardId: board.id, page: 1 }}>{board.name}</Link>
                </Nav.Link>
            ))}
    </>
}
}


