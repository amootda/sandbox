import { useState } from 'react';
import { ControlPanel } from '../Controls/ControlPanel';
import { TestCard } from './TestCard';
import { BasicProgressBar } from '../ProgressBars/BasicProgressBar';
import { PercentageProgressBar } from '../ProgressBars/PercentageProgressBar';
import { TimeEstimateProgressBar } from '../ProgressBars/TimeEstimateProgressBar';
import { CircularProgressBar } from '../ProgressBars/CircularProgressBar';
import { MultiSegmentProgressBar } from '../ProgressBars/MultiSegmentProgressBar';
import { useProgressStream } from '../../hooks/useProgressStream';

export function Dashboard() {
  const [speed, setSpeed] = useState(5);
  const [activeTests, setActiveTests] = useState({
    basic: false,
    percentage: false,
    time: false,
    circular: false,
    multiSegment: false
  });

  const basicProgress = useProgressStream(speed, activeTests.basic);
  const percentageProgress = useProgressStream(speed, activeTests.percentage);
  const timeProgress = useProgressStream(speed, activeTests.time);
  const circularProgress = useProgressStream(speed, activeTests.circular);
  const multiSegmentProgress = useProgressStream(speed, activeTests.multiSegment);

  const handleStartAll = () => {
    setActiveTests({
      basic: true,
      percentage: true,
      time: true,
      circular: true,
      multiSegment: true
    });
  };

  const handleResetAll = () => {
    setActiveTests({
      basic: false,
      percentage: false,
      time: false,
      circular: false,
      multiSegment: false
    });
  };

  const handleStartTest = (testName) => {
    setActiveTests(prev => ({ ...prev, [testName]: true }));
  };

  const handleResetTest = (testName) => {
    setActiveTests(prev => ({ ...prev, [testName]: false }));
  };

  const isAnyRunning = Object.values(activeTests).some(active => active);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Progress Bar Testing Environment</h1>
        <p>Test various progress bar components with adjustable server response speeds</p>
      </header>

      <ControlPanel
        speed={speed}
        onSpeedChange={setSpeed}
        onStart={handleStartAll}
        onReset={handleResetAll}
        isRunning={isAnyRunning}
      />

      <div className="test-grid">
        <TestCard
          title="Basic Progress Bar"
          onStart={() => handleStartTest('basic')}
          onReset={() => handleResetTest('basic')}
          isActive={activeTests.basic}
        >
          <BasicProgressBar
            progress={basicProgress.progress}
            status={basicProgress.status}
          />
        </TestCard>

        <TestCard
          title="Percentage Progress Bar"
          onStart={() => handleStartTest('percentage')}
          onReset={() => handleResetTest('percentage')}
          isActive={activeTests.percentage}
        >
          <PercentageProgressBar
            progress={percentageProgress.progress}
            status={percentageProgress.status}
          />
        </TestCard>

        <TestCard
          title="Time Estimate Progress Bar"
          onStart={() => handleStartTest('time')}
          onReset={() => handleResetTest('time')}
          isActive={activeTests.time}
        >
          <TimeEstimateProgressBar
            progress={timeProgress.progress}
            status={timeProgress.status}
            elapsed={timeProgress.elapsed}
          />
        </TestCard>

        <TestCard
          title="Circular Progress Bar"
          onStart={() => handleStartTest('circular')}
          onReset={() => handleResetTest('circular')}
          isActive={activeTests.circular}
        >
          <CircularProgressBar
            progress={circularProgress.progress}
            status={circularProgress.status}
          />
        </TestCard>

        <TestCard
          title="Multi-Segment Progress Bar"
          onStart={() => handleStartTest('multiSegment')}
          onReset={() => handleResetTest('multiSegment')}
          isActive={activeTests.multiSegment}
        >
          <MultiSegmentProgressBar
            progress={multiSegmentProgress.progress}
            status={multiSegmentProgress.status}
          />
        </TestCard>
      </div>
    </div>
  );
}
