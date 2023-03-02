import './App.css';
import { useState } from 'react';

function App() {
  let [articleTitle, setArticleTitle] = useState(['남자 코트 추천', 
                                                  '강남 우동 맛집', 
                                                  '파이썬독학']);
  let [cntLike, setCntLike] = useState(0);

  let [modal, setModal] = useState('closed');

  function switchModal() {
    if (modal == 'opened')
      setModal('closed');
    else
      setModal('opened');
  }
  
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
        <h4 onClick={() => { switchModal() }}>{ articleTitle[2] }</h4>
        <p>2월 17일 발행</p>
      </div>

      {
        modal == 'opened' ? <Modal/> : null
      }
    </div>
  );
}

function Modal() {
  return(
    <div className='modal'>
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  ); 
}

export default App;
