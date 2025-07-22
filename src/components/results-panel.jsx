'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';


export function ResultsPanel({ isLoading, result, module }) {
  const handleExport = () => {
    // PDF export logic would go here
    alert('Export to PDF functionality is not implemented in this demo.');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-10 w-full mt-4" />
        </div>
      );
    }

    if (!result) {
      return (
        <div className="text-center text-muted-foreground">
          <p>Run a simulation to see the results.</p>
        </div>
      );
    }

    const isPass = result.status === 'pass';

    return (
      <div>
        <div className="flex items-start justify-between">
            <div>
                 <Badge variant={isPass ? 'default' : 'destructive'} className={isPass ? 'bg-green-600' : ''}>
                    {isPass ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <XCircle className="mr-2 h-4 w-4" />}
                    Status: {isPass ? 'Pass' : 'Fail'}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">Module: {module.name} v{module.version}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
            </Button>
        </div>
        
        {!isPass && (
             <div className="mt-4 rounded-md border border-destructive/50 bg-destructive/10 p-4">
                <h4 className="font-semibold text-destructive flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5"/>
                    Failure Analysis
                </h4>
                <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-destructive/90">
                    {result.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
            </div>
        )}

        {isPass && (
             <div className="mt-4 rounded-md border border-green-500/50 bg-green-500/10 p-4">
                <h4 className="font-semibold text-green-700 flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5"/>
                    Success Details
                </h4>
                <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-green-700/90">
                    {result.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
            </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulation Results</CardTitle>
        <CardDescription>
          Detailed pass/fail analysis from the AI model.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
