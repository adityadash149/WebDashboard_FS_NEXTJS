export type Module = {
  id: string;
  name: string;
  target: string;
  version: string;
  releaseDate: string;
  isFlagged: boolean;
  config: Record<string, any>;
};

export type SimulationResult = {
  status: 'pass' | 'fail';
  details: string[];
};

export type SimulationConditions = {
  roadCondition: string;
  weatherCondition: string;
  lightingCondition: string;
  vehicleLoad: string;
  trafficCondition: string;
  vehicleState: string;
  infrastructureConnectivity: string;
};
