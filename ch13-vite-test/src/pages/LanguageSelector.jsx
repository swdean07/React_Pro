import { useSearchParams } from 'react-router-dom';

const LanguageSelector = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // 현재 선택된 lang 읽기
    const selectedLang = searchParams.get('lang') || '없음';

    // 언어 변경 함수
    const changeLanguage = (lang) => {
        setSearchParams({ lang });
    };

    return (
        <div>
            <h1>언어 선택</h1>
            <p>현재 선택된 언어: {selectedLang}</p>
            <button onClick={() => changeLanguage('ko')}>한국어</button>
            <button onClick={() => changeLanguage('en')}>영어</button>
            <button onClick={() => changeLanguage('jp')}>일본어</button>
        </div>
    );
};

export default LanguageSelector;