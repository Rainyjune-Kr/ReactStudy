import './App.css';
import { useState } from 'react';

function App() {
  let [articleTitle, setArticleTitle] = useState(['남자 코트 추천', 
                                                  '강남 우동 맛집', 
                                                  '파이썬독학']);
  let [cntLike, setCntLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState('closed');

  function updateCntLike(idx, value) {
    let copy = [...cntLike];
    copy[idx] = value;
    setCntLike(copy);
  }

  function switchModal() {
    if (modal === 'opened')
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
      
      {
        articleTitle.map(function(title, arrIdx) {
          return (
            <div className="list" key={arrIdx}>
              <h4 onClick={() => { switchModal() }}>{ title } <span onClick={() => { updateCntLike(arrIdx, cntLike[arrIdx] + 1) }}>👍</span> {cntLike[arrIdx]} </h4>
              <p>2월 17일 발행</p>
            </div>
          )
        })
      }

      {
        modal === 'opened' ? <Modal/> : null
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
