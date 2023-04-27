import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import imgSource from './bg.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from './data.js';
import { Suspense, createContext, lazy, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, json } from 'react-router-dom';
import { EventPage, EventOne, EventTwo } from './pages/Event';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const DetailPage = lazy(() => import('./pages/Detail'))
const NotFoundPage = lazy(() => import('./pages/404'))
const About = lazy(() => import('./pages/About'))
const Cart = lazy(() => import('./pages/Cart'))

// context는 state들을 보관함
export let Context1 = createContext();

function App() {
  let [goods, setGoods] = useState(data);
  let navigate = useNavigate();
  let [goodsInquireCnt, setGoodsInquireCnt] = useState(0);
  let [showLoading, setShowLoading] = useState(false);
  let [inventory, setInventory] = useState([10, 11, 12])

  useEffect(() => {
    let initWatched = []
    let checkWatched = JSON.parse(localStorage.getItem('watched'))
    // console.log('watched exist:' + checkWatched)
    if (checkWatched !== null && typeof checkWatched !== 'undefined') {
      initWatched = checkWatched
    }
    localStorage.setItem('watched', JSON.stringify(initWatched))
  }, [])

  function InsertGoods(data) {
    let copy = [...goods];

    let dataConvert = [];
    data.forEach(eachData => {
      let newObj = {
        "id": eachData.id,
        "title": eachData.title,
        "content": eachData.content,
        "price": eachData.price,
        "imgUrl": 'https://codingapple1.github.io/shop/shoes' + eachData.id + '.jpg'
      };
      dataConvert.push(newObj);
    });

    let newGoods = [...goods, ...dataConvert];
    setGoods(newGoods);
  }
  let getusernameId = null
  let result = useQuery(['name'], () => {
    try {
      return axios.get('https://codingapple1.github.io/userdata.json')
        .then((a) => { return a.data })
    }
    catch (error) {
      console.error(error)
      throw error
    }
  }, {staleTime: 2000})
  
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}>Rainyjune Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/deals') }}>핫딜</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>장바구니</Nav.Link>
            <Nav.Link onClick={() => { navigate('/orders') }}>구매내역</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about') }}>About</Nav.Link>
            <Nav.Link onClick={() => { navigate('/event') }}>Event</Nav.Link>
          </Nav>
          <Nav className='ms-auto' style={ {color:'white'}}>
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>Loading...</div>}>
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
                          goodsId={obj.id}
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
                {showLoading ? <Row><p>불러오는 중...</p></Row> : null}
              </Container>
              <Container>
                <RecentItem />
              </Container>
            </>
          } />
          <Route path='/detail/:id' element={
            <Context1.Provider value={{ inventory, goods }}><DetailPage shoes={goods} /></Context1.Provider>
          }
          />
          <Route path='/about' element={<About />}>
            <Route path='member' element={<div>멤버</div>} />
            <Route path='location' element={<div>장소</div>} />
          </Route>
          <Route path='/event' element={<EventPage />}>
            <Route path='one' element={<EventOne />} />
            <Route path='two' element={<EventTwo />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function GoodsCol(props) {
  let navigate = useNavigate();
  return (
    <Col>
      <img src={props.imgUrl}
        onClick={() => { navigate('/detail/' + props.goodsId) }}
        width="80%"
        alt={props.goodsTitle}
        style={{ cursor: 'pointer' }} />
      <h4>{props.goodsTitle}</h4>
      <p>{props.goodsPrice}</p>
      <p>{props.goodsContent}</p>
    </Col>
  );
}

function RecentItem(props) {
  let recentItems = JSON.parse(localStorage.getItem('watched'))
  let navigate = useNavigate()
  return (
    <div>
      <h5 className=''>최근 본 상품</h5>
      <Row xs={10}>
        {
          recentItems !== null && typeof recentItems !== 'undefined' ?
            recentItems.map((x, idx) => {

              return (
                <Col className='col ml-auto' key={idx}><img
                  src={"https://codingapple1.github.io/shop/shoes" + (Number(x) + 1) + ".jpg"}
                  onClick={() => { navigate('/detail/' + x) }}
                  width="40"
                  alt={x}
                  style={{ cursor: 'pointer' }}
                />
                </Col>
              )

            }) :
            null
        }
      </Row>
    </div>
  )
}

export default App;
