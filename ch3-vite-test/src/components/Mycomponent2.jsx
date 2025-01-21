import React, { Component } from 'react';
// 유효성 체크 해보는 도구
import PropTypes from 'prop-types';

class Mycomponent2 extends Component {
    render() {
        const { name, children, favoriteNumber } = this.props;
        return (
            <div>
                넘어온 데이터 1 name : {name}
                넘어온 데이터 2 children : {children}
                넘어온 데이터 3 favoriteNumber : {favoriteNumber}
            </div>
        );
    }
}
// 기본 props 값 설정
Mycomponent2.defaultProps = {
    name: '기본 이름'
};

// 해당 props 타입 지정. 
// 2번째, isRequired 설정. 
Mycomponent2.propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
};

export default Mycomponent2;