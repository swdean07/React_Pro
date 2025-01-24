import { ColorConsumer } from '../contexts/color';
import React, { useContext } from 'react';
import ColorContext from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const SelectColors = () => {
    const { actions } = useContext(ColorContext);
    return (
        <div>
            <h2>색상을 선택하세요.</h2>
            <ColorConsumer>
                {({ actions }) => (
                    <div style={{ display: 'flex' }}>
                        {colors.map((color) => (
                            <div
                                key={color}
                                style={{
                                    background: color,
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => actions.setColor(color)}
                                onContextMenu={(e) => {
                                    e.preventDefault(); // 마우스 오른쪽 버튼 클릭 시 메뉴 무시
                                    actions.setSubcolor(color);
                                }}
                            />
                        ))}
                    </div>
                )}
            </ColorConsumer>
            <hr />
        </div>
    );
};

export default SelectColors;