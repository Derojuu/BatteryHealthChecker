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
      // Try Windows PowerCfg HTML report first
      let designCapacityMatch = text.match(/DESIGN CAPACITY\s*([^\n]*)/i);
      let fullChargeCapacityMatch = text.match(/FULL CHARGE CAPACITY\s*([^\n]*)/i);

      // If not found, try Mac system_profiler TXT report
      if (!designCapacityMatch || !fullChargeCapacityMatch) {
        // Mac: look for lines like "  Design Capacity: 5263 mAh" and "  Full Charge Capacity: 4200 mAh"
        designCapacityMatch = text.match(/Design Capacity:\s*(\d+)/i);
        fullChargeCapacityMatch = text.match(/Full Charge Capacity:\s*(\d+)/i);
      }

      if (designCapacityMatch && fullChargeCapacityMatch) {
        // For Mac, match[1] is the number; for Windows, match[1] is the string with number and unit
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Battery Health Checker</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-sm text-gray-600">
            <strong>For Windows:</strong> Run this command in your terminal:<br />
            <code className="block bg-gray-200 p-2 mt-2 mb-2">
              powercfg /batteryreport /output "C:\battery-report.html"
            </code>
            <strong>For Mac:</strong> Run this command in your terminal:<br />
            <code className="block bg-gray-200 p-2 mt-2 mb-2">
              system_profiler SPPowerDataType &gt; battery-report.txt
            </code>
            Once the file is generated, upload it below. Supported files: <b>battery-report.html</b> (Windows) or <b>battery-report.txt</b> (Mac).
          </p>

          <Input
            type="file"
            accept=".html,.txt"
            onChange={handleFileChange}
            className="w-full cursor-pointer"
            placeholder="Upload Battery Report"
            aria-label="Upload Battery Report"
            aria-describedby="battery-report-upload"
          />

          <Button onClick={parseBatteryReport} className="w-full mt-4">
            Calculate Health
          </Button>


          {health !== null && (
            <div
              className={
                `font-semibold text-lg mt-4 ` +
                (health >= 90
                  ? "text-green-700"
                  : health >= 70
                  ? "text-yellow-500"
                  : health >= 60
                  ? "text-orange-500"
                  : "text-red-600")
              }
            >
              Battery Health: {health}%
            </div>
          )}

          {error && <div className="text-red-600 mt-2">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
