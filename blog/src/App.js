import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [articleTitle, setArticleTitle] = useState(['남자 코트 추천', 
                                                  '강남 우동 맛집', 
                                                  '파이썬독학']);
  let [cntLike, setCntLike] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>Rainyjune Blog</h4>
      </div>
      <div className="list">
        <h4 onClick={ () => { 
          setArticleTitle(['여자 코트 추천', '강남 우동 맛집', '파이썬독학'])
         } }>{ articleTitle[0] } <span onClick={ () => { setCntLike(cntLike + 1) } }>👍</span> { cntLike } </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ articleTitle[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ articleTitle[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
