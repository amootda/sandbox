export const simulateProgress = (req, res) => {
  const speed = parseInt(req.query.speed) || 5;

  // SSE 헤더 설정
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const baseDuration = 10000; // 10초
  const totalDuration = baseDuration / speed;
  const updateInterval = 100; // 100ms마다 업데이트
  const totalUpdates = totalDuration / updateInterval;

  let currentUpdate = 0;
  const startTime = Date.now();

  const interval = setInterval(() => {
    currentUpdate++;
    const progress = Math.min((currentUpdate / totalUpdates) * 100, 100);
    const elapsed = Date.now() - startTime;

    const payload = {
      progress: Math.round(progress * 100) / 100,
      status: progress >= 100 ? 'completed' : 'running',
      timestamp: Date.now(),
      elapsed
    };

    res.write(`data: ${JSON.stringify(payload)}\n\n`);

    if (progress >= 100) {
      clearInterval(interval);
      res.end();
    }
  }, updateInterval);

  // 클라이언트 연결 종료 시 정리
  req.on('close', () => {
    clearInterval(interval);
  });
};

export const healthCheck = (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now()
  });
};
