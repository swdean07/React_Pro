import { useState, useMemo, useCallback, useRef } from "react";

// 평균값을 계산하는 함수
const getAverage = (numbers) => {
    console.log("평균값 계산 중.."); // 실습 예제 2: 호출 확인
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
};

const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    const inputEl = useRef(null);

    // 실습 예제 1: 숫자 입력 제한
    // 입력값이 숫자가 아닌 경우 처리하지 않음
    const onChange = useCallback((e) => {
        const value = e.target.value;
        if (!isNaN(value)) { // 숫자인 경우에만 상태 업데이트
            setNumber(value);
        }
    }, []);

    // 숫자 추가 처리
    const onInsert = useCallback(() => {
        const parsedNumber = parseInt(number, 10);

        // 응용 실습 예제 3: 입력값에 최대/최소 제한 추가
        // 1 이상, 1000 이하만 허용
        if (parsedNumber < 1 || parsedNumber > 1000) {
            alert("숫자는 1 이상, 1000 이하만 입력 가능합니다."); // 조건 위반 시 경고 메시지
            return;
        }

        // 실습 예제 3: 입력값 초기화 조건 추가
        if (parsedNumber > 0) { // 0 이하 값은 추가하지 않음
            const nextList = list.concat(parsedNumber);
            setList(nextList);
            setNumber('');
            inputEl.current.focus(); // 입력창에 포커스 유지
        } else {
            alert("숫자는 0보다 커야 합니다."); // 조건 위반 시 경고 메시지
        }
    }, [number, list]);

    // 평균값 계산을 useMemo로 최적화
    const avg = useMemo(() => getAverage(list), [list]); // 실습 예제 2: useMemo로 최적화

    return (
        <div>
            <input
                value={number}
                onChange={onChange}
                ref={inputEl}
                placeholder="숫자를 입력하세요"
            />
            <button onClick={onInsert}>추가</button>
            <ul>
                {/* 응용 실습 예제 1: 최근 입력값 하이라이트 */}
                {list.map((value, index) => (
                    <li
                        key={index}
                        style={{
                            color: index === list.length - 1 ? "purple" : "black", // 최근 값은 보라색으로 표시
                        }}
                    >
                        {value}
                    </li>
                ))}
            </ul>
            <div>
                <b>평균값:</b> {avg}
            </div>
            <div>
                {/* 응용 실습 예제 2: 평균값 기준 필터링 */}
                <h3>평균값보다 큰 숫자들:</h3>
                <ul>
                    {list
                        .filter((value) => value > avg) // 평균값보다 큰 숫자만 필터링
                        .map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Average;
