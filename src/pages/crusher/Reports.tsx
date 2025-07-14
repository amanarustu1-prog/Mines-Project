import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export default function CrusherReports() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Crusher Reports</h1>
        <p className="text-gray-600 mt-2">Generate and view crusher performance reports</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Crusher Performance Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Crusher reports functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
