import {Component, useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { Context1 } from './../App.js';
import { useSelector, useDispatch } from "react-redux";
import { addCart } from '../store/cartItemsSlice.js';

class DetailPage2 extends Component {
  componentDidMount() {
    // Mount시 실행되는 코드
  }

  componentDidUpdate() {
    // Update시 실행되는 코드
  }

  componentWillUnmount() {
    // Unmount시 실행되는 코드
  }
}

function DetailPage (props) {
  let [textVal, setTextVal] = useState("");
  let [alertText, setAlertText] = useState(false);
  let { id } = useParams();
  let [alertVisible, setAlertVisible] = useState(true);
  let [currTab, setCurrTab] = useState(0);
  
  let shoes = props.shoes.find(x => x.id == id);
  let [loadEnd, setLoadEnd] = useState('');

  let dispatch = useDispatch();
  let states = useSelector((state) => state);
  
  useEffect(() => {
    // Mount/Update시 실행된다.
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000)

    setTimeout(() => {
      setLoadEnd('fade-in-end');
    }, 100);

    let watched = JSON.parse(localStorage.getItem('watched'))
    
    if (watched !== null && typeof watched !== 'undefined'
        && shoes !== null && typeof shoes !== 'undefined') {
          console.log(shoes)
      let foundItem = watched.find((x) => { return x === id })
      if (foundItem === null || typeof foundItem === 'undefined') {
        watched.push(id)
        localStorage.setItem('watched', JSON.stringify(watched))
      }
    }
    
    return () => {
      // clean up function
      // useEffect 내용보다 먼저 실행된다.
      // mount시엔 삭제되지 않고, unmount시에는 실행된다.

      setLoadEnd('');
    }
  }, [])

  useEffect(() => {
    if (Number.isNaN(Number(textVal)) === true)
      setAlertText(true);
    else
      setAlertText(false);
  }, [textVal]);

  if (shoes == null)
    return(
      <NotFound/>
    );
  else
    return(
      <div className={`container fade-in-start ${loadEnd}`}>
        {
          alertVisible === true ? <div className="alert alert-warning"> 2초 이내 구매시 할인 </div> : null
        }

        <div className="row">
          <div className="col-md-6">
            <img src={shoes.photo} width="100%" />
          </div>
          <div className="col-md-6">
            {
              alertText === true ? <div className="alert alert-warning">그러지 마세요</div> : null
            }
            <input onChange={(e) => { setTextVal(e.target.value) }}></input>
            <h4 className="pt-5">{shoes.title}</h4>
            <p>{shoes.content}</p>
            <p>{shoes.price} 원</p>
            <button className="btn btn-danger" onClick={() => {
              dispatch(addCart({id:shoes.id, name:shoes.content, count:1}))
              console.log('cart Items : ' + states.cartItems);
            }}>주문하기</button>
          </div>
        </div>
        {/* defaultActiveKey : 기본으로 눌려 있을 NavItem */}
        <Nav className="mt-5" variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={ () => { setCurrTab(0) } }>Button0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={ () => { setCurrTab(1) } }>Button1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={ () => { setCurrTab(2) } }>Button2</Nav.Link>
          </Nav.Item>
        </Nav>
        {/* <TabContent tabIdx={currTab}></TabContent>
        <TabContentSimple tabIdx= {currTab}/> */}
        <TabContentSimple2 tabIdx={currTab} shoes={shoes}/>
      </div> 
    );
}

function TabContent(props) {
  if (props.tabIdx === 0) {
    return <div>내용0</div>
  } else if (props.tabIdx === 1) {
    return <div>내용1</div>
  } else if (props.tabIdx === 2) {
    return <div>내용2</div>
  }
}

function TabContentSimple({tabIdx}) {
  if (tabIdx === 0) {
    return <div>내용0</div>
  } else if (tabIdx === 1) {
    return <div>내용1</div>
  } else if (tabIdx === 2) {
    return <div>내용2</div>
  }
}

function TabContentSimple2({tabIdx, shoes}) {
  let [fade, setFade] = useState('');
  let { inventory } = useContext(Context1);

  useEffect(() => {
    setTimeout(() => {
      setFade('fade-in-end')
    }, 10);
    return ()=>{
      setFade('')
    }
  }, [tabIdx])

  return <div className={`fade-in-start ${fade}`}>{[<div>{shoes.title}</div>,<div>{inventory}</div>,<div>내용2</div>][tabIdx]}
  </div>
}

function NotFound() {
  return(
    <h3>페이지를 찾을 수 없습니다.</h3>
  )
}

export default DetailPage;