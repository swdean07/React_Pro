import React from 'react';
// 유효성 체크 해보는 도구
import PropTypes from 'prop-types';

// const Mycomponent = (props) => {
// 방법2 바로 이름으로 비구조화 할당 문법으로 바로 받기. 
const Mycomponent = ({ name, children, favoriteNumber }) => {

    // 비구조화 할당 , 구조분해,
    // name = props.name, children = props.children
    // 방법1 
    // const { name, children } = props;
    return (
        <div>
            샘플 나의 첫 컴포넌트 만들기.
            <h2>순서1, 부모 컴포넌트에서 전달 받은 props 데이터를 사용하기.</h2>
            {/* <h3>데이터 전달 받기 props.name : {props.name}</h3> */}
            <h3>데이터 전달 받기1 props.name : {name}</h3>
            <h2>순서2, 부모 컴포넌트에서 전달 받은 children 데이터를 사용하기.</h2>
            {/* <h3>데이터 전달 확인 props.children : {props.children}</h3> */}
            <h3>데이터 전달 확인2 props.children : {children}</h3>
            <h3>데이터 전달 확인3 props.favoriteNumber : {favoriteNumber}</h3>
        </div>
    );
};

// 기본 props 값 설정
Mycomponent.defaultProps = {
    name: '기본 이름'
};

// 해당 props 타입 지정. 
// 2번째, isRequired 설정. 
Mycomponent.propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
};

export default Mycomponent;