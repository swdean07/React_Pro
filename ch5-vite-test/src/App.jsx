// 교체 작업 3
import React, { Component } from 'react';
import './App.css'
import ScrollBox from './component/ScrollBox';

class App extends Component {

  render() {
    return (
      <>
        <h1 className='react'>ch5 ref, DOM 요소에 이름달기</h1>

        <ScrollBox ref={(ref) => this.scrollBox = ref} />
        <button onClick={() => this.scrollBox.scrollToBottom()}>맨밑으로</button>
        <button onClick={() => this.scrollBox.scrollToTop()}>맨위로</button>
        <button onClick={() => this.scrollBox.scrollToMiddle()}>중간</button>
      </>
    )
  }
}

export default App;
