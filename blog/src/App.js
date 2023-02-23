import logo from './logo.svg';
import './App.css';

function App() {
  let post = "강남 우동 맛집";
  // document.querySelector("h4").innerHTML = post; => <h4>{post}</h4> => data binding.
  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={ { color : 'red', fontSize : '16px'}}>Rainyjune Blog</h4>
      </div>
      <h4>{ post }</h4>
    </div>
  );
}

export default App;
