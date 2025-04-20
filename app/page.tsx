"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BatteryHealthChecker() {
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [health, setHealth] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReportFile(file);
      setError(null);
      setHealth(null);
    }
  };

  const parseBatteryReport = async () => {
    if (!reportFile) return;

    try {
      const text = await reportFile.text();
      const designCapacityMatch = text.match(/DESIGN CAPACITY\s*([^\n]*)/i);
      const fullChargeCapacityMatch = text.match(/FULL CHARGE CAPACITY\s*([^\n]*)/i);

      if (designCapacityMatch && fullChargeCapacityMatch) {
        const designCapacity = parseCapacity(designCapacityMatch[1]);
        const fullChargeCapacity = parseCapacity(fullChargeCapacityMatch[1]);

        if (!designCapacity || !fullChargeCapacity) {
          setError("Could not parse capacity values correctly.");
          return;
        }

        const calculatedHealth = (fullChargeCapacity / designCapacity) * 100;
        setHealth(Number(calculatedHealth.toFixed(2)));
      } else {
        setError("Capacity values not found in file.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to read or parse the report file.");
    }
  };

  const parseCapacity = (str: string): number | null => {
    const match = str.replace(/,/g, "").match(/(\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Battery Health Checker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Run the following command in your Windows terminal:
            <code className="block bg-gray-200 p-2 mt-1">powercfg /batteryreport /output &quot;C:\\battery-report.html&quot;</code>
            After the file is generated, upload it below.
            You will find this in your Local Disk(c:)
          </p>

          <Input type="file" accept=".html" onChange={handleFileChange} />
          <Button onClick={parseBatteryReport}>Calculate Health</Button>

          {health !== null && (
            <div className="text-green-700 font-semibold text-lg">
              Battery Health: {health}%
            </div>
          )}

          {error && <div className="text-red-600">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
