import express from 'express';
import cors from 'cors';
import progressRouter from './routes/progress.js';

const app = express();

// CORS 설정
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// JSON 파싱
app.use(express.json());

// 라우트
app.use('/api/progress', progressRouter);

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;
