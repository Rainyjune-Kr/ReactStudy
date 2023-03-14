import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import imgSource from './bg.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from './data.js';
import { useState } from 'react';

function App() {
  let [goods] = useState(data);

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

      <div className='main-bg'style={ { backgroundImage: 'url('+ imgSource + ')' } }></div>

      <Container>
        <Row>
          {
            goods.map(function(obj, idx) {
              let imgUrl = "https://codingapple1.github.io/shop/shoes" + (idx + 1) + ".jpg";
              return (
                <GoodsCol imgUrl={ imgUrl }
                          goodsTitle={ obj.title }
                          goodsContent={ obj.content}/>
              )
            })
          }
        </Row>
      </Container>
    </div>
  );
}

function GoodsCol (props) {
  return(
    <Col>
      <img src={ props.imgUrl } width="80%" />
      <h4>{ props.goodsTitle }</h4>
      <p>{ props.goodsContent }</p>
    </Col>
  );
}

export default App;
