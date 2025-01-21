import React, { Component } from 'react';

class LifeCycleSample extends Component {
    state = {
        number: 0,
        color: null,
    };

    myRef = null; // ref를 설정할 부분

    constructor(props) {
        super(props);
        console.log('constructor');
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('getDerivedStateFromProps');
        if (nextProps.color !== prevState.color) {
            return { color: nextProps.color };
        }
        return null;
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps, nextState);
        return nextState.number % 10 !== 4; // 숫자의 마지막 자리가 4일 때 리렌더링을 하지 않음
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    handleClick = () => {
        this.setState({
            number: this.state.number + 1,
        });
    };

    // getSnapshotBeforeUpdate에서 이전 색상 반환
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate');
        if (prevProps.color !== this.props.color) {
            // 색상이 변경되었으면 이전 색상을 반환
            return this.myRef.style.color;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate', prevProps, prevState);
        if (snapshot) {
            // getSnapshotBeforeUpdate에서 반환된 이전 색상을 콘솔에 출력
            console.log('업데이트되기 직전 색상:', snapshot);
        }
    }

    render() {
        console.log('render');
        const style = {
            color: this.props.color, // 부모 컴포넌트로부터 받은 색상 적용
        };

        return (
            <div>
                <h1 style={style} ref={(ref) => (this.myRef = ref)}>
                    {this.state.number}
                </h1>
                <p>color: {this.state.color}</p>
                <button onClick={this.handleClick}>더하기</button>
            </div>
        );
    }
}

export default LifeCycleSample;
