'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { Car } from 'lucide-react';
import { Progress } from './ui/progress';


export function SimulationMap({ isSimulating, progress, result }) {
  const carPosition = {
    left: `${progress}%`,
    transition: 'left 0.2s linear',
  };

  const getTrackColor = () => {
    if (!isSimulating && result) {
      return result.status === 'pass' ? 'bg-green-500' : 'bg-red-500';
    }
    return 'bg-primary';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Simulation Environment</CardTitle>
            <CardDescription>Visualize the test route and conditions.</CardDescription>
          </div>
          <Select defaultValue="sf">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sf">San Francisco</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="la">Los Angeles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-hidden rounded-lg border">
          <Image
            src="https://placehold.co/1200x800.png"
            alt="Map of San Francisco"
            width={1200}
            height={800}
            className="h-full w-full object-cover"
            data-ai-hint="city map"
          />
          {isSimulating && (
            <div
              className="absolute top-1/2 -translate-y-1/2 -ml-3"
              style={carPosition}
            >
              <Car className="h-8 w-8 text-white bg-primary p-1 rounded-full shadow-lg" />
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/80 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Progress:</span>
              <Progress value={progress} className="w-full" indicatorClassName={getTrackColor()} />
              <span className="text-sm font-bold">{progress}%</span>
            </div>
          </div>

          {result && !isSimulating && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className={`rounded-lg p-6 text-center ${result.status === 'pass' ? 'bg-green-500/80' : 'bg-red-500/80'}`}>
                    <h3 className="text-3xl font-bold text-white">
                        Simulation {result.status === 'pass' ? 'Passed' : 'Failed'}
                    </h3>
                </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
