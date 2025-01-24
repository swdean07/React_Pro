import React, { useContext } from 'react';
import ColorContext from '../contexts/color';

const ColorBox = () => {
    const { state } = useContext(ColorContext);

    // 스타일 객체를 분리하여 관리
    const styles = {
        firstBox: {
            width: '100px',
            height: '100px',
            background: state.color,
        },
        secondBox: {
            width: '64px',
            height: '64px',
            background: state.subcolor,
        },
        thirdBox: {
            width: '32px',
            height: '32px',
            background: 'violet', // 하드코딩된 색상
        },
    };

    return (
        <>
            {/* 첫 번째 사각형: 전역 상태 state.color를 활용 */}
            <div style={styles.firstBox} />

            {/* 두 번째 사각형: 전역 상태 state.subcolor를 활용 */}
            <div style={styles.secondBox} />

            {/* 세 번째 사각형: 하드코딩된 배경색을 사용 */}
            <div style={styles.thirdBox} />
        </>
    );
};

export default ColorBox;
