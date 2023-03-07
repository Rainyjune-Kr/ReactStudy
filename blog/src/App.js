import './App.css';
import { Component, useState } from 'react';

function App() {
  let [articleTitle, setArticleTitle] = useState(['남자 코트 추천', 
                                                  '강남 우동 맛집', 
                                                  '파이썬독학']);
  let [cntLike, setCntLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState('closed');
  let [showIdx, setShowIdx] = useState(0);
  let [inputTagValue, setInputTagValue] = useState('');

  function updateCntLike(idx, value) {
    let copy = [...cntLike];
    copy[idx] = value;
    setCntLike(copy);
  }

  function updateArticleTitle(idx, value) {
    let copy = [...articleTitle];
    copy[idx] = value;
    setArticleTitle(copy);
  }

  function switchModal() {
    if (modal === 'opened')
      setModal('closed');
    else
      setModal('opened');
  }

  function insertArticleTitle(idx, value) {
    let copy = [...articleTitle];
    let resultArray = [...copy.slice(0, idx), value, ...copy.slice(idx)];
    setArticleTitle(resultArray);
  }

  function deleteArticleTitle(idx) {
    let copy = [...articleTitle];
    if (idx !== -1) {
      copy.splice(idx, 1); // remove at
    }
    setArticleTitle(copy);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>Rainyjune Blog</h4>
      </div>

      <button onClick={ () => { updateArticleTitle(0, '여자 코트 추천') } }>글 수정</button>

      <button onClick={ () => {
        let copy = [...articleTitle].sort();
        setArticleTitle(copy);
      }}>정렬</button>
      
      {
        articleTitle.map(function(title, arrIdx) {
          return (
            <div className="list" key={arrIdx}>
              <h4 onClick={ () => { switchModal(); setShowIdx(arrIdx); } }>{ title } <span onClick={(e) => { e.stopPropagation(); updateCntLike(arrIdx, cntLike[arrIdx] + 1) }}>👍</span> {cntLike[arrIdx]} </h4>
              <p>2월 17일 발행</p>
              <button onClick={ () => { deleteArticleTitle(arrIdx) } }>삭제</button>
            </div>
          )
        })
      }

      <input onChange={ (e) => { setInputTagValue(e.target.value); } }/>
      <button onClick={ () => { insertArticleTitle(0, inputTagValue) } }>글 쓰기</button>

      {
        modal === 'opened' ? <Modal articleIdx={showIdx} updateArticleTitle={ () => { updateArticleTitle(0, '여자 코트 추천') } } articleTitle={ articleTitle }/> : null
      }
    </div>
  );
}

function Modal(props) {
  return(
    <div className='modal'>
      <h4>{ props.articleTitle[props.articleIdx] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={ props.updateArticleTitle }>글 수정</button>
    </div>
  ); 
}

class Modal2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : 'bae',
      age : 32
    }
  }

  render() {
    return (
      <div>안녕 { this.state.name }
        <button onClick={() => this.setState({ age : 33 })}>테스트</button>
      </div>
    )
  }
}

export default App;
