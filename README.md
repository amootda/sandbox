# Sandbox

실험적인 프로젝트들을 위한 샌드박스 저장소입니다.

## 프로젝트 목록

### 1. [Progress Bar Testing Environment](progressBar/)

서버 응답 속도를 조절하면서 다양한 Progress bar 컴포넌트를 실시간으로 테스트할 수 있는 UI 환경입니다.

**기술 스택:** React + Vite, Node.js + Express, SSE

**실행:**
```bash
pnpm install              # 최초 1회
pnpm dev:progressBar      # 실행
```

상세 정보: [progressBar/README.md](progressBar/README.md)

---

## 프로젝트 구조

```
sandbox/
├── progressBar/     # Progress Bar Testing Environment
│   ├── client/      # React + Vite 클라이언트
│   ├── server/      # Express 서버
│   └── README.md    # 프로젝트 상세 설명
├── CLAUDE.md        # Claude Code 작업 가이드
└── README.md        # 이 파일
```

## 새 프로젝트 추가하기

1. 새 디렉토리 생성 (예: `myProject/`)
2. 필요한 하위 구조 구성
3. `pnpm-workspace.yaml`에 패키지 경로 추가 (필요시)
4. 루트 `package.json`에 스크립트 추가 (필요시)
5. 이 README와 CLAUDE.md에 프로젝트 정보 추가

## 라이센스

ISC