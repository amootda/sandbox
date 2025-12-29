# Progress Bar Testing Environment

서버 응답 속도를 조절하면서 다양한 Progress bar 컴포넌트를 실시간으로 테스트할 수 있는 UI 환경입니다.

## 기술 스택

- **클라이언트**: React + Vite
- **서버**: Node.js + Express
- **통신**: Server-Sent Events (SSE)
- **패키지 매니저**: pnpm

## 주요 기능

- 슬라이더로 서버 응답 속도 조절 (1-10배속, 10초~1초)
- 5가지 스타일의 Progress bar 컴포넌트:
  1. **Basic Progress Bar** - 상태별 색상 변화
  2. **Percentage Progress Bar** - 퍼센트 오버레이 표시
  3. **Time Estimate Progress Bar** - 경과/남은/총 시간 표시
  4. **Circular Progress Bar** - SVG 기반 원형 디자인
  5. **Multi-Segment Progress Bar** - 10개 세그먼트 방식
- 실시간 진행률 업데이트 (Server-Sent Events)
- 예상 시간 자동 계산
- 개별 또는 전체 Progress bar 시작/리셋 기능

## 실행 방법

```bash
# 루트 디렉토리에서 의존성 설치 (최초 1회)
pnpm install

# ProgressBar 프로젝트 실행
pnpm dev:progressBar

# 또는 개별 실행
pnpm dev:progressBar:client  # http://localhost:5173
pnpm dev:progressBar:server  # http://localhost:3001
```

## 접속

- **클라이언트**: http://localhost:5173
- **서버 헬스체크**: http://localhost:3001/api/progress/health

## 프로젝트 구조

```
progressBar/
├── client/              # React + Vite 클라이언트
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProgressBars/    # 5가지 Progress bar 컴포넌트
│   │   │   ├── Controls/        # 속도 조절 슬라이더
│   │   │   └── Layout/          # Dashboard, TestCard
│   │   ├── hooks/
│   │   │   ├── useProgressStream.js   # SSE 연결 관리
│   │   │   └── useTimeEstimate.js     # 시간 계산
│   │   └── styles/
│   └── vite.config.js   # API 프록시 설정
└── server/              # Express 서버
    └── src/
        ├── controllers/
        │   └── progressController.js   # SSE 스트리밍 로직
        ├── routes/
        │   └── progress.js
        ├── app.js       # Express 설정, CORS
        └── index.js     # 진입점
```

## API 엔드포인트

- `GET /api/progress/simulate?speed={1-10}` - SSE 스트림으로 진행률 전송
- `GET /api/progress/health` - 헬스 체크

## 핵심 구현

### Server-Sent Events (SSE)
서버는 100ms마다 진행률 업데이트를 SSE 스트림으로 전송합니다.
```javascript
// speed에 따라 총 duration 조정: 10000ms / speed
// 예: speed=5 → 2초, speed=10 → 1초, speed=1 → 10초
```

### 시간 계산
실시간으로 경과 시간과 남은 시간을 계산합니다.
```javascript
// rate = currentProgress / elapsed
// remaining = (100 - currentProgress) / rate
```

## 사용 예시

1. 슬라이더를 조절하여 원하는 속도 설정 (1-10)
2. "Start All" 버튼으로 모든 Progress bar 동시 시작
3. 또는 각 카드의 "Start" 버튼으로 개별 테스트
4. 다양한 속도로 Progress bar의 애니메이션과 시간 계산 확인
