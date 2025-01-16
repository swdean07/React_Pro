import React, { Component } from 'react';

class ScrollBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollTop: 0, // 현재 스크롤 위치
            backgroundColor: 'red', // 초기 배경색
        };
    }

    // 스크롤 이벤트 핸들러
    handleScroll = () => {
        const scrollTop = this.box.scrollTop; // 현재 스크롤 위치
        const { scrollHeight, clientHeight } = this.box;

        // 스크롤 위치를 비율로 계산 (0 ~ 1)
        const scrollRatio = scrollTop / (scrollHeight - clientHeight);

        // 배경색을 비율에 따라 계산
        const red = Math.min(255, Math.floor(scrollRatio * 255));
        const blue = 255 - red;

        this.setState({
            scrollTop,
            backgroundColor: `rgb(${red}, 150, ${blue})`, // 동적으로 배경색 설정
        });
    };

    // 스크롤바를 맨 밑으로 이동
    scrollToBottom = () => {
        const { scrollHeight, clientHeight } = this.box;
        this.box.scrollTop = scrollHeight - clientHeight;
    };

    // 스크롤바를 맨 위로 이동
    scrollToTop = () => {
        this.box.scrollTop = 0;
    };

    // 스크롤바를 중간으로 이동
    scrollToMiddle = () => {
        const { scrollHeight, clientHeight } = this.box;
        this.box.scrollTop = (scrollHeight - clientHeight) / 2;
    };

    render() {
        const { scrollTop, backgroundColor } = this.state;

        const style = {
            border: '1px solid purple',
            height: '300px',
            width: '300px',
            overflow: 'auto',
            position: 'relative',
            backgroundColor, // 배경색 동적 변경
        };

        const innerStyle = {
            width: '100%',
            height: '650px',
            // background: 'linear-gradient(white, purple)',
        };

        return (
            <div>
                <div
                    style={style}
                    ref={(ref) => {
                        this.box = ref;
                    }}
                    onScroll={this.handleScroll} // 스크롤 이벤트 바인딩
                >
                    <div style={innerStyle} />
                </div>
                <div style={{ marginTop: '10px' }}>
                    Current Scroll Position: {scrollTop}px
                </div>
                {/* <div style={{ marginTop: '10px' }}>
                    <button onClick={this.scrollToTop}>Scroll to Top</button>
                    <button onClick={this.scrollToMiddle}>Scroll to Middle</button>
                    <button onClick={this.scrollToBottom}>Scroll to Bottom</button>
                </div> */}
            </div>
        );
    }
}

export default ScrollBox;


