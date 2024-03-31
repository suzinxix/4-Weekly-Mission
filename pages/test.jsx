import React, { useEffect, useRef, useState } from 'react';

const MyComponent = () => {
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 교차 영역 콜백 함수
        setIsVisible(entry.isIntersecting);
        console.log(entry.isIntersecting)
      },
      {
        // Intersection Observer 옵션 설정
        root: null, // 뷰포트를 root로 사용
        rootMargin: '0px', // 뷰포트와의 거리
        threshold: 0.5 // 교차 영역 비율
      }
    );

    if (targetRef.current) {
      // 요소 관찰 시작
      observer.observe(targetRef.current);
    }

    // 컴포넌트 언마운트 시 옵저버 정리
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []); // useEffect 의존성 배열이 빈 배열이므로 한 번만 실행됨

  return (
    <div>
      <div
        ref={targetRef}
        style={{
          width: '100px',
          height: '100px',
          background: isVisible ? 'green' : 'red',
          marginTop: '200vh' // 스크롤을 내려야 보이도록 함
        }}
      />
      {isVisible ? <p>요소가 보입니다!</p> : <p>요소가 보이지 않습니다.</p>}
    </div>
  );
};

export default MyComponent;
 