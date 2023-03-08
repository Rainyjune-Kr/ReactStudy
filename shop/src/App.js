import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Rainyjune Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#hotdeal">핫딜</Nav.Link>
            <Nav.Link href="#cart">장바구니</Nav.Link>
            <Nav.Link href="#orders">구매내역</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
