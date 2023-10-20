import LoginButton from "login/LoginButton";
import { Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AxiosPost, Fetch } from "toolbox/Fetch";



export default function TestNav() {
  const boardListUri = `/bb/anonymous/listAll`;
  const originalFileUri =`/attach/anonymous/getOriginalFile`;
  const thumbFileFileUri =`/attach/anonymous/displayThumbnail`;


  const navMenu = {
    color:"grey",
    textDecoration:"none"

}
  return <>
   <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><Link style={navMenu}to='/'>WonderVatory</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto  my-2 my-lg-0">
            <LoginButton  className="me-auto  my-2 my-lg-0"/>
            <Fetch uri={boardListUri} renderSuccess={renderSuccess} />
            <Nav.Link><Link style={navMenu} to="/memberList/0000">회원정보</Link></Nav.Link>
            <Nav.Link><Link style={navMenu} to="/test1">테스트용</Link></Nav.Link>
            <Nav.Link><Link style={navMenu} to="/test2">테스트용2</Link></Nav.Link>
            <Nav.Link><Link style={navMenu} to="/Showcase0" state={{ boardId: "0002", page: 1 }}>테스트용3</Link></Nav.Link>
            <Nav.Link><Link style={navMenu} to="/test4" state={{seriesId: "0000"}}>테스트용4</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>;
  
  function renderSuccess(boardList) {
    console.log("=======boardList=========");
    console.log(boardList);
    return <>
          {boardList.map(board => (
                <Nav.Link>
                    <Link style={navMenu}  key={board.id} to={`/board/${board.id}`}
                    state={{ boardId: board.id, page: 1 }}>{board.name}</Link>
                </Nav.Link>
            ))}
    </>
  }
  function renderSuccess1(originalFile) {
    console.log("=======originalFile=========");
    console.log(originalFile);
    return (<>

    </>)
  }
}


