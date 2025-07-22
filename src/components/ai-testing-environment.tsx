'use client';

import { useState } from 'react';
import type { Module, SimulationResult } from '@/types';
import { SimulationMap } from './simulation-map';
import { ControlPanel } from './control-panel';
import { ResultsPanel } from './results-panel';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TestTube } from 'lucide-react';

type AiTestingEnvironmentProps = {
  module: Module | null;
};

export function AiTestingEnvironment({ module }: AiTestingEnvironmentProps) {
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const handleSimulationStart = () => {
    setIsSimulating(true);
    setSimulationResult(null);
    setSimulationProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };
  
  const handleSimulationComplete = (result: SimulationResult) => {
    setSimulationResult(result);
    setIsSimulating(false);
    setSimulationProgress(100);
  };

  if (!module) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>AI Testing &amp; Simulation Environment</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <TestTube className="h-4 w-4" />
            <AlertTitle>No Module Selected</AlertTitle>
            <AlertDescription>
              Please select a module from the OTA Manager tab to begin testing.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <SimulationMap 
          isSimulating={isSimulating}
          progress={simulationProgress}
          result={simulationResult}
        />
      </div>
      <div className="flex flex-col space-y-6 lg:col-span-2">
        <ControlPanel
          module={module}
          onSimulationStart={handleSimulationStart}
          onSimulationComplete={handleSimulationComplete}
          isSimulating={isSimulating}
        />
        <ResultsPanel
          isLoading={isSimulating && !simulationResult}
          result={simulationResult}
          module={module}
        />
      </div>
    </div>
  );
}
