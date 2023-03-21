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
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import DetailPage from './pages/Detail';
import NotFoundPage from './pages/404';
import About from './pages/About';
import { EventPage, EventOne, EventTwo } from './pages/Event';

function App() {
  let [goods] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href='/'>Rainyjune Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/deals">핫딜</Nav.Link>
            <Nav.Link href="/cart">장바구니</Nav.Link>
            <Nav.Link href="/orders">구매내역</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about') }}>About</Nav.Link>
            <Nav.Link onClick={() => { navigate('/event') }}>Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path='/' element={
          <>
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
        <Route path='/detail/:id' element={ <DetailPage shoes= { goods }/> }
        />
        <Route path='/about' element={ <About/>}>
          <Route path='member' element={ <div>멤버</div> }/>
          <Route path='location' element={ <div>장소</div> }/>
        </Route>
        <Route path='/event' element={ <EventPage/> }>
          <Route path='one' element={ <EventOne/> }/>
          <Route path='two' element={ <EventTwo/> }/>
        </Route>
        <Route path='*' element={ <NotFoundPage/> }/>
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


export default App;
