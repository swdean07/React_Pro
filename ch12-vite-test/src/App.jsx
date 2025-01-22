import { useRef, useCallback, useState } from 'react';
import { produce } from 'immer';
import './App.css';

const App = () => {
  const nextId = useRef(1); // 다음 id를 저장하는 useRef
  const [form, setForm] = useState({ name: '', username: '' });
  // 입력 폼 상태
  const [data, setData] = useState({
    array: [], // 항목 배열
    uselessValue: null, // 필요 없는 값 (유지)
  });

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(
      produce((draft) => {
        draft[name] = value;
      })
    );
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // 유효성 검사: 이름과 아이디가 비어 있는지 확인
      if (!form.name.trim() || !form.username.trim()) {
        alert('이름과 아이디 모두 입력하세요.');
        return;
      }

      // 중복 확인: username과 name 모두 동일한 항목
      const duplicateIndex = data.array.findIndex(
        (info) =>
          info.username === form.username && info.name === form.name
      );

      if (duplicateIndex !== -1) {
        console.log('중복 항목 발견:', data.array[duplicateIndex]);
        // 기존 항목을 완료 상태로 업데이트
        setData(
          produce((draft) => {
            draft.array[duplicateIndex].completed = true;
          })
        );
        alert('이미 등록되었습니다. 다시 확인 바랍니다.');
        return;
      }

      // 새로운 항목 추가
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
        completed: false, // 초기 상태는 미완료
      };

      setData(
        produce((draft) => {
          console.log('새로운 항목 추가:', info);
          draft.array.push(info);
        })
      );

      setForm({
        name: '',
        username: '',
      });

      nextId.current += 1; // id 증가
    },
    [form.name, form.username, data.array]
  );

  const onRemove = useCallback(
    (id) => {
      setData(
        produce((draft) => {
          const index = draft.array.findIndex((info) => info.id === id);
          if (index !== -1) {
            console.log('항목 삭제:', draft.array[index]);
            draft.array.splice(index, 1);
          }
        })
      );
    },
    []
  );

  const onToggle = useCallback(
    (id) => {
      setData(
        produce((draft) => {
          const item = draft.array.find((info) => info.id === id);
          if (item) {
            console.log('상태 토글 전:', item);
            item.completed = !item.completed; // 상태 반전
            console.log('상태 토글 후:', item);
          }
        })
      );
    },
    []
  );

  return (
    <div>
      <h1 className="react">ch12.immer</h1>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id}>
              <span
                onClick={() => onToggle(info.id)}
                style={{
                  color: info.completed ? 'green' : 'red',
                  textDecoration: info.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
              >
                {info.username} ({info.name}){' '}
                {info.completed ? '(완료)' : '(미완료)'}
              </span>
              <button onClick={() => onRemove(info.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
