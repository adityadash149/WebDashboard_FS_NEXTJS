'use server';

/**
 * @fileOverview An AI agent for simulating module performance under specified conditions.
 *
 * - simulateModulePerformance - A function that simulates the performance of a module.
 * - SimulateModulePerformanceInput - The input type for the simulateModulePerformance function.
 * - SimulateModulePerformanceOutput - The return type for the simulateModulePerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateModulePerformanceInputSchema = z.object({
  moduleConfig: z.record(z.any()).describe('The configuration of the module being tested.'),
  conditions: z.object({
    roadCondition: z.string().describe('The road conditions for the simulation (e.g., dry, wet, icy).'),
    weatherCondition: z.string().describe('The weather conditions for the simulation (e.g., clear, rain, fog).'),
    lightingCondition: z.string().describe('The lighting conditions for the simulation (e.g., daylight, night, streetlights).'),
    vehicleLoad: z.string().describe('The vehicle load condition for the simulation (e.g., light, medium, full).'),
    trafficCondition: z.string().describe('The traffic condition for the simulation (e.g., free flow, moderate, heavy).'),
    vehicleState: z.string().describe('The vehicle state condition for the simulation (e.g., Low Battery, High Battery Drain).'),
    infrastructureConnectivity: z.string().describe('The infrastructure and connectivity conditions for the simulation (e.g., weak GPS, lost cellular).'),
  }).describe('The environmental conditions for the simulation.'),
  route: z.object({
    length: z.number().describe('The length of the route.'),
    elevation: z.number().describe('The elevation of the route.'),
    type: z.string().describe('The type of the route.'),
  }).describe('The characteristics of the route being simulated.'),
});


const SimulateModulePerformanceOutputSchema = z.object({
  status: z.enum(['pass', 'fail']).describe('The overall pass/fail status of the module under the given conditions.'),
  details: z.array(z.string()).describe('Detailed reasons for the pass/fail status, including specific conditions that caused failures.'),
});


export async function simulateModulePerformance(input) {
  return simulateModulePerformanceFlow(input);
}

const simulateModulePerformancePrompt = ai.definePrompt({
  name: 'simulateModulePerformancePrompt',
  input: {schema: SimulateModulePerformanceInputSchema},
  output: {schema: SimulateModulePerformanceOutputSchema},
  prompt: `You are an AI expert in software-defined vehicle (SDV) simulation and testing.

You are provided with the configuration of a specific module, the environmental conditions, and the route characteristics under which the module is being tested. Your task is to analyze the module's performance under these conditions and determine whether it passes or fails the test.

Module Configuration:
\`\`\`json
{{{json moduleConfig}}}
\`\`\`

Environmental Conditions:
- Road Condition: {{{conditions.roadCondition}}}
- Weather Condition: {{{conditions.weatherCondition}}}
- Lighting Condition: {{{conditions.lightingCondition}}}
- Vehicle Load: {{{conditions.vehicleLoad}}}
- Traffic Condition: {{{conditions.trafficCondition}}}
- Vehicle State: {{{conditions.vehicleState}}}
- Infrastructure & Connectivity: {{{conditions.infrastructureConnectivity}}}

Route Characteristics:
- Length: {{{route.length}}} km
- Elevation: {{{route.elevation}}} meters
- Type: {{{route.type}}}

Based on this information, determine the 'status' (pass or fail) of the module and provide detailed 'details' explaining the reasons for the result. Consider factors such as thermal limits, voltage ranges, and connectivity issues.
`,
});

const simulateModulePerformanceFlow = ai.defineFlow(
  {
    name: 'simulateModulePerformanceFlow',
    inputSchema: SimulateModulePerformanceInputSchema,
    outputSchema: SimulateModulePerformanceOutputSchema,
  },
  async input => {
    const {output} = await simulateModulePerformancePrompt(input);
    return output;
  }
);
