'use client';

import { Truck, Wrench, AlertCircle, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { formatDate, formatPercentage } from '@/lib/utils';
import { Equipment } from '@/types';

interface EquipmentStatusProps {
  equipment: Equipment[];
}

export function EquipmentStatus({ equipment }: EquipmentStatusProps) {
  const activeEquipment = equipment.filter(eq => eq.status === 'active');
  const maintenanceEquipment = equipment.filter(eq => eq.status === 'maintenance');
  const inactiveEquipment = equipment.filter(eq => eq.status === 'inactive');

  const averageEfficiency = equipment
    .filter(eq => eq.status === 'active')
    .reduce((sum, eq) => sum + eq.efficiency, 0) / activeEquipment.length || 0;

  const getEquipmentIcon = (type: Equipment['type']) => {
    switch (type) {
      case 'excavator':
        return '🚜';
      case 'truck':
        return '🚛';
      case 'drill':
        return '⚡';
      case 'conveyor':
        return '📦';
      case 'crusher':
        return '⚙️';
      default:
        return '🔧';
    }
  };

  const getStatusVariant = (status: Equipment['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Truck className="h-5 w-5" />
          <span>Equipment Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Overview */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Activity className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-green-900">Active</p>
            <p className="text-xl font-bold text-green-600">{activeEquipment.length}</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <Wrench className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-yellow-900">Maintenance</p>
            <p className="text-xl font-bold text-yellow-600">{maintenanceEquipment.length}</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-red-900">Inactive</p>
            <p className="text-xl font-bold text-red-600">{inactiveEquipment.length}</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Activity className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-blue-900">Efficiency</p>
            <p className="text-xl font-bold text-blue-600">
              {formatPercentage(averageEfficiency)}
            </p>
          </div>
        </div>

        {/* Equipment List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Equipment Details</h4>
          {equipment.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {getEquipmentIcon(item.type)}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="text-sm font-medium text-foreground">{item.name}</h5>
                    <Badge variant={getStatusVariant(item.status)} className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="capitalize">{item.type}</span>
                    {item.status === 'active' && (
                      <span>Efficiency: {formatPercentage(item.efficiency)}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground mb-1">
                  <Calendar className="h-3 w-3" />
                  <span>Next: {formatDate(item.nextMaintenance)}</span>
                </div>
                {item.status === 'maintenance' && (
                  <div className="text-xs text-yellow-600 font-medium">
                    Under Maintenance
                  </div>
                )}
                {item.status === 'inactive' && (
                  <div className="text-xs text-red-600 font-medium">
                    Needs Attention
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Maintenance Schedule Alert */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <h4 className="text-sm font-medium text-blue-900">Upcoming Maintenance</h4>
          </div>
          <div className="space-y-1">
            {equipment
              .filter(eq => new Date(eq.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
              .map((item) => (
                <div key={item.id} className="text-sm text-blue-800">
                  • {item.name}: {formatDate(item.nextMaintenance)}
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
