'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MoreHorizontal, Flag, Send, TestTube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Module } from '@/types';

const modulesData: Module[] = [
  {
    id: 'bms_3.7',
    name: 'Battery Management System',
    target: 'Battery System',
    version: '3.7',
    releaseDate: '2025-07-15',
    isFlagged: false,
    config: {
      moduleName: "Battery Management System",
      version: "v3.7",
      minVoltage: 3.0,
      maxVoltage: 4.2,
      thermalCutoffTemp: 60,
      socEstimationMethod: "coulomb_counting"
    }
  },
  {
    id: 'infotainment_2.1',
    name: 'Infotainment OS',
    target: 'Head Unit',
    version: '2.1',
    releaseDate: '2025-08-01',
    isFlagged: false,
    config: {
      moduleName: "Infotainment OS",
      version: "v2.1",
      cpuCores: 8,
      ramGb: 12,
      displayResolution: "4K"
    }
  },
  {
    id: 'adas_1.9',
    name: 'ADAS Vision Processor',
    target: 'ECU-ADAS',
    version: '1.9',
    releaseDate: '2025-06-20',
    isFlagged: true,
    config: {
      moduleName: "ADAS Vision Processor",
      version: "v1.9",
      cameraInputs: 8,
      maxDetectionRangeMeters: 250,
      supportedObjects: ["vehicle", "pedestrian", "cyclist", "traffic_light"]
    }
  },
  {
    id: 'powertrain_ctrl_4.2',
    name: 'Powertrain Control',
    target: 'VCU',
    version: '4.2',
    releaseDate: '2025-09-10',
    isFlagged: false,
    config: {
      moduleName: "Powertrain Control",
      version: "v4.2",
      motorType: "Permanent Magnet Synchronous Motor",
      maxTorqueNm: 400,
      efficiency: 0.95
    }
  },
];


type OtaManagerProps = {
  onTestModule: (module: Module) => void;
};

export function OtaManager({ onTestModule }: OtaManagerProps) {
  const [modules, setModules] = useState<Module[]>(modulesData);
  const { toast } = useToast();

  const handleFlagModule = (moduleId: string) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId ? { ...m, isFlagged: !m.isFlagged } : m
      )
    );
    const module = modules.find(m => m.id === moduleId);
    if (module) {
        toast({
            title: `Module ${!module.isFlagged ? 'Flagged' : 'Unflagged'}`,
            description: `${module.name} v${module.version} has been marked for review.`,
        });
    }
  };

  const handlePushToSimulator = (module: Module) => {
    toast({
      title: 'Pushing to Simulator',
      description: `${module.name} v${module.version} has been sent to the Car Simulator.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>OTA Module Manager</CardTitle>
        <CardDescription>
          View, manage, and test incoming software-defined vehicle modules.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Module Name</TableHead>
                <TableHead>Targeted Part</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map((module) => (
                <TableRow key={module.id} className={module.isFlagged ? 'bg-amber-100/50 dark:bg-amber-900/20' : ''}>
                  <TableCell>
                    {module.isFlagged && <Badge variant="destructive">Flagged</Badge>}
                  </TableCell>
                  <TableCell className="font-medium">{module.name}</TableCell>
                  <TableCell>{module.target}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{module.version}</Badge>
                  </TableCell>
                  <TableCell>{new Date(module.releaseDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onTestModule(module)}>
                          <TestTube className="mr-2 h-4 w-4" />
                          Proceed to AI Testing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFlagModule(module.id)}>
                          <Flag className="mr-2 h-4 w-4" />
                          {module.isFlagged ? 'Unflag' : 'Flag'} Module
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePushToSimulator(module)}>
                          <Send className="mr-2 h-4 w-4" />
                          Push to Car Simulator
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
