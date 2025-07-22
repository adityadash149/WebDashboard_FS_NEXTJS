'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OtaManager } from '@/components/ota-manager';
import { AiTestingEnvironment } from '@/components/ai-testing-environment';
import { Car, TestTube } from 'lucide-react';

export default function Home() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeTab, setActiveTab] = useState('ota-manager');

  const handleSelectModuleForTesting = (module) => {
    setSelectedModule(module);
    setActiveTab('ai-testing');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-primary"
              >
                <path d="M14 16.5 5.5-1.5 5.5-1.5-1.5 2-2 2.5-2.5 3-4.5 3-7 3-10 3-13 3-16.5" />
                <path d="M12 5.5 22 5.5 22 18.5 12 18.5 z" />
                <path d="M12 12 h10m-10 4h10m-10-8h10" />
                <path d="m5 16-3 3 3 3" />
              </svg>
              <h1 className="text-2xl font-bold text-primary">AutoSim AI</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="ota-manager">
              <TestTube className="mr-2 h-4 w-4" />
              OTA Manager
            </TabsTrigger>
            <TabsTrigger value="ai-testing">
              <Car className="mr-2 h-4 w-4" />
              AI Testing &amp; Simulation
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ota-manager" className="mt-6">
            <OtaManager onTestModule={handleSelectModuleForTesting} />
          </TabsContent>
          <TabsContent value="ai-testing" className="mt-6">
            <AiTestingEnvironment module={selectedModule} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
