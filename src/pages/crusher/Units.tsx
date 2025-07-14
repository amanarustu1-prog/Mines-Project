import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export default function CrusherUnits() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Crusher Units</h1>
        <p className="text-gray-600 mt-2">Manage crusher unit configurations and settings</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Crusher Unit Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Crusher units management functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
