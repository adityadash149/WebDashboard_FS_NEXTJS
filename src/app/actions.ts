'use server';

import { simulateModulePerformance, SimulateModulePerformanceInput } from '@/ai/flows/simulate-module-performance';
import type { Module, SimulationConditions, SimulationResult } from '@/types';

interface RunSimulationParams {
  module: Module;
  conditions: SimulationConditions;
}

export async function runSimulation(params: RunSimulationParams): Promise<SimulationResult> {
  const { module, conditions } = params;

  // Artificial delay to simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  const input: SimulateModulePerformanceInput = {
    moduleConfig: module.config,
    conditions: {
      roadCondition: conditions.roadCondition,
      weatherCondition: conditions.weatherCondition,
      lightingCondition: conditions.lightingCondition,
      vehicleLoad: conditions.vehicleLoad,
      trafficCondition: conditions.trafficCondition,
      vehicleState: conditions.vehicleState,
      infrastructureConnectivity: conditions.infrastructureConnectivity,
    },
    route: {
      length: Math.floor(Math.random() * 200) + 50, // 50-250 km
      elevation: Math.floor(Math.random() * 500), // 0-500 meters
      type: ['Urban', 'Highway', 'Rural'][Math.floor(Math.random() * 3)],
    },
  };
  
  try {
    const result = await simulateModulePerformance(input);
    return result;
  } catch (error) {
    console.error("AI Simulation failed:", error);
    return {
      status: 'fail',
      details: ['The AI simulation service failed to respond. Please try again later.'],
    };
  }
}
