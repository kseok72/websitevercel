# 수험 쉼표

학생들의 수험생활 팁과 익명 고민을 받을 수 있는 한국어 우선 웹사이트입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## Vercel 배포 전 환경변수

관리자만 제출 내용을 볼 수 있으려면 Vercel Project Settings의 Environment Variables에 아래 값을 설정해야 합니다.

- `ADMIN_PASSWORD`: 관리자 화면 로그인 비밀번호
- `SESSION_SECRET`: 32자 이상 임의 문자열
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST Token

방문자는 로그인 없이 제출할 수 있고, 제출 목록은 `/admin`에서 관리자 비밀번호로 로그인한 경우에만 보입니다.
