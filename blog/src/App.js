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

      <button onClick={ () => { 
        let copy = [...articleTitle];
        copy[0] = '여자 코트 추천';
        setArticleTitle(copy);
      } }>글 수정</button>

      <button onClick={ () => {
        let copy = [...articleTitle].sort();
        setArticleTitle(copy);
      }}>정렬</button>
      
      <div className="list">
        <h4>{ articleTitle[0] } <span onClick={ () => { setCntLike(cntLike + 1) } }>👍</span> { cntLike } </h4>
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
