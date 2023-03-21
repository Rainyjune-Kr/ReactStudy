import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';

function DetailPage (props) {
  let { id } = useParams();
  
  let shoes = props.shoes.find(x => x.id == id);

  let YellowBtn = styled.button`
    background : ${ props => props.bg };
    color : black;
    padding : 10px
  `;

  let BlackBox = styled.div`
    background : grey;
    padding : 20px;
  `;

  if (shoes == null)
    return(
      <NotFound/>
    );
  else
    return(
    <div className="container">
      <YellowBtn bg ="blue">버튼</YellowBtn>
      
      <div className="row">
        <div className="col-md-6">
          <img src={ shoes.photo } width="100%" />
        </div>
        <div className="col-md-6">
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