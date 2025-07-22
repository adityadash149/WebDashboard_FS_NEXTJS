'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Play, Loader2 } from 'lucide-react';
import type { Module, SimulationResult } from '@/types';
import { runSimulation } from '@/app/actions';

const simulationSchema = z.object({
  roadCondition: z.string().min(1, 'Please select a road condition.'),
  weatherCondition: z.string().min(1, 'Please select a weather condition.'),
  lightingCondition: z.string().min(1, 'Please select a lighting condition.'),
  vehicleLoad: z.string().min(1, 'Please select a vehicle load.'),
  trafficCondition: z.string().min(1, 'Please select a traffic condition.'),
  vehicleState: z.string().min(1, 'Please select a vehicle state.'),
  infrastructureConnectivity: z.string().min(1, 'Please select connectivity.'),
});

type SimulationFormValues = z.infer<typeof simulationSchema>;

const conditions = {
    road: ['Dry', 'Wet', 'Icy', 'Snowy', 'Gravel', 'Potholes', 'Muddy', 'Incline', 'Curves', 'Urban', 'Highway'],
    weather: ['Clear', 'Rain', 'Fog', 'Snow', 'Storm', 'Extreme Heat', 'Freezing', 'Wind', 'Humidity'],
    lighting: ['Daylight', 'Dusk', 'Night', 'Streetlights', 'Glare', 'Tunnel'],
    load: ['Light', 'Medium', 'Full', 'Towing'],
    traffic: ['Free Flow', 'Moderate', 'Heavy', 'Stop-and-Go', 'Accident'],
    vehicleState: ['Low Battery', 'High Battery Drain', 'Regen Braking', 'Manual Parking', 'Self-Parking', 'Cruise Control', 'OTA Interrupted', 'Module Misconfiguration'],
    connectivity: ['Weak GPS', 'Lost Cellular', 'Cloud Disconnect', 'Roadside Beacons']
};

type ControlPanelProps = {
  module: Module;
  onSimulationStart: () => void;
  onSimulationComplete: (result: SimulationResult) => void;
  isSimulating: boolean;
};

export function ControlPanel({ module, onSimulationStart, onSimulationComplete, isSimulating }: ControlPanelProps) {
  const form = useForm<SimulationFormValues>({
    resolver: zodResolver(simulationSchema),
    defaultValues: {
      roadCondition: 'Dry',
      weatherCondition: 'Clear',
      lightingCondition: 'Daylight',
      vehicleLoad: 'Medium',
      trafficCondition: 'Moderate',
      vehicleState: 'Cruise Control',
      infrastructureConnectivity: 'Weak GPS',
    },
  });

  const onSubmit = async (data: SimulationFormValues) => {
    onSimulationStart();
    const result = await runSimulation({ module, conditions: data });
    onSimulationComplete(result);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Test &amp; Control Panel</CardTitle>
        <CardDescription>
          Configure conditions for testing module: <strong>{module.name} v{module.version}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="roadCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Road Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>{conditions.road.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weatherCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weather</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>{conditions.weather.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="lightingCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lighting</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>{conditions.lighting.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleLoad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Load</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>{conditions.load.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trafficCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Traffic</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>{conditions.traffic.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle State</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>{conditions.vehicleState.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="infrastructureConnectivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Infrastructure &amp; Connectivity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>{conditions.connectivity.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <Button type="submit" className="w-full" disabled={isSimulating}>
              {isSimulating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              {isSimulating ? 'Simulating...' : 'Run Simulation'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
