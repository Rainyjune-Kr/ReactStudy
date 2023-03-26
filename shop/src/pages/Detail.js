import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';

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
  
  useEffect(() => {
    // Mount/Update시 실행된다.
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000)

    return () => {
      // clean up function
      // useEffect 내용보다 먼저 실행된다.
      // mount시엔 삭제되지 않고, unmount시에는 실행된다.
    }
  }, [])

  useEffect(() => {
    if (Number.isNaN(Number(textVal)) === true)
      setAlertText(true);
    else
      setAlertText(false);
  }, [textVal]);
  
  let [count, setCount] = useState(0);
  let { id } = useParams();
  let [alertVisible, setAlertVisible] = useState(true);
  
  let shoes = props.shoes.find(x => x.id == id);

  let YellowBtn = styled.button`
    background : ${ props => props.bg };
    color : black;
    padding : 10px
  `;

  if (shoes == null)
    return(
      <NotFound/>
    );
  else
    return(
    <div className="container">
      {
        alertVisible === true ? <div className="alert alert-warning"> 2초 이내 구매시 할인 </div> : null
      }
      <YellowBtn bg ="blue" onClick={() => { setCount(count + 1) }}>버튼</YellowBtn>
      
      <div className="row">
        <div className="col-md-6">
          <img src={ shoes.photo } width="100%" />
        </div>
        <div className="col-md-6">
          {
            alertText === true ? <div className="alert alert-warning">그러지 마세요</div> : null
          }
          <input onChange={(e) => { setTextVal(e.target.value) }}></input>
          <h4 className="pt-5">{ shoes.title }</h4>
          <p>{ shoes.content }</p>
          <p>{ shoes.price } 원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div> 
  );
}

function NotFound() {
  return(
    <h3>페이지를 찾을 수 없습니다.</h3>
  )
}

export default DetailPage;