import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import imgSource from './bg.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from './data.js';
import {createContext, useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DetailPage from './pages/Detail';
import NotFoundPage from './pages/404';
import About from './pages/About';
import Cart from './pages/Cart';
import { EventPage, EventOne, EventTwo } from './pages/Event';
import axios from 'axios';

// context는 state들을 보관함
export let Context1 = createContext();

function App() {
  let [goods, setGoods] = useState(data);
  let navigate = useNavigate();
  let [goodsInquireCnt, setGoodsInquireCnt] = useState(0);
  let [showLoading, setShowLoading] = useState(false);
  let [inventory, setInventory] = useState([10, 11, 12])

  function InsertGoods(data)
  {
    let copy = [...goods];

    let dataConvert = [];
    data.forEach(eachData => {
      let newObj = {
        "id" : eachData.id,
        "title" : eachData.title,
        "content" : eachData.content,
        "price" : eachData.price,
        "imgUrl" : 'https://codingapple1.github.io/shop/shoes' + eachData.id + '.jpg'
      };
      dataConvert.push(newObj);
    });

    let newGoods = [...goods, ...dataConvert];
    setGoods(newGoods);
  }

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
                        goodsContent={obj.content}
                        goodsPrice={obj.price}
                        key={idx} />
                    )
                  })
                }
              </Row>
            </Container>
            <Container>
              <button onClick={(btn) => {
                let dataUrl = 'https://codingapple1.github.io/shop/data' + (goodsInquireCnt + 2) + '.json'
                if (goodsInquireCnt >= 2) {
                  alert('더 이상 불러올 자료가 없습니다.')
                }
                else {
                  setShowLoading(true);
                  axios.get(dataUrl)
                    .then((result) => {
                      InsertGoods(result.data);
                      setGoodsInquireCnt(goodsInquireCnt + 1);
                    })
                    .catch(() => {
                      console.log('result is not inquired')
                    })
                  setShowLoading(false);
                }

              }} width='20px'>버튼</button>
              { showLoading ? <Row><p>불러오는 중...</p></Row> : null }
            </Container>
          </>
        } />
        <Route path='/detail/:id' element={
            <Context1.Provider value={{ inventory, goods }}><DetailPage shoes= { goods }/></Context1.Provider>
        }
        />
        <Route path='/about' element={ <About/>}>
          <Route path='member' element={ <div>멤버</div> }/>
          <Route path='location' element={ <div>장소</div> }/>
        </Route>
        <Route path='/event' element={ <EventPage/> }>
          <Route path='one' element={ <EventOne/> }/>
          <Route path='two' element={ <EventTwo/> }/>
        </Route>
        <Route path='/cart' element={ <Cart/>} />
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
      <p>{ props.goodsPrice }</p>
      <p>{ props.goodsContent }</p>
    </Col>
  );
}


export default App;
