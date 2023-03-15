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
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  let [goods] = useState(data);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Rainyjune Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/deals">핫딜</Nav.Link>
            <Nav.Link href="/cart">장바구니</Nav.Link>
            <Nav.Link href="/orders">구매내역</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path='/' element={
          <>
            <div>메인페이지</div>
            <div className='main-bg' style={{ backgroundImage: 'url(' + imgSource + ')' }}></div>
            <Container>
              <Row>
                {
                  goods.map(function (obj, idx) {
                    let imgUrl = "https://codingapple1.github.io/shop/shoes" + (idx + 1) + ".jpg";
                    return (
                      <GoodsCol imgUrl={imgUrl}
                        goodsTitle={obj.title}
                        goodsContent={obj.content} />
                    )
                  })
                }
              </Row>
            </Container>
          </>
        } />
        <Route path='/detail' element={
          <>
          <div>상세페이지</div>
          <DetailPage/>
          </>
        }
        />
        <Route path='/about' element={<div>어바웃페이지</div>}/>
      </Routes>
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

function DetailPage (props) {
  return(
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div> 
  );
}

export default App;
