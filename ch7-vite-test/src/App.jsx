import React, { Component } from 'react';
import LifeCycleSample from './Components/LifeCycleSample';

// 랜덤 색상을 생성하는 함수
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

class App extends Component {
  state = {
    color: '#000000', // 초기 색상 설정
  };

  // "랜덤 색상" 버튼 클릭 시 색상 변경
  handleClick = () => {
    this.setState({
      color: getRandomColor(), // 새로운 랜덤 색상 설정
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        {/* LifeCycleSample 컴포넌트에 색상 전달 */}
        <LifeCycleSample color={this.state.color} />
      </div>
    );
  }
}

export default App;