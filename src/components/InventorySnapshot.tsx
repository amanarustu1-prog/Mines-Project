import { Package, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { formatNumber, formatTime, getStatusColor } from '@/lib/utils';
import { InventoryItem } from '@/types';

interface InventorySnapshotProps {
  items: InventoryItem[];
}

export function InventorySnapshot({ items }: InventorySnapshotProps) {
  const criticalItems = items.filter(item => item.status === 'low');
  const totalItems = items.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Inventory Snapshot</span>
          </div>
          {criticalItems.length > 0 && (
            <Badge variant="error" className="flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3" />
              <span>{criticalItems.length} Critical</span>
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900">Total Items</p>
            <p className="text-xl font-bold text-blue-600">{totalItems}</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-900">Normal</p>
            <p className="text-xl font-bold text-green-600">
              {items.filter(item => item.status === 'normal').length}
            </p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="text-sm font-medium text-red-900">Low Stock</p>
            <p className="text-xl font-bold text-red-600">{criticalItems.length}</p>
          </div>
        </div>

        {/* Inventory Items List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Recent Updates</h4>
          {items.slice(0, 4).map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h5 className="text-sm font-medium text-foreground">{item.name}</h5>
                  <Badge 
                    variant={item.status === 'low' ? 'error' : item.status === 'normal' ? 'success' : 'warning'}
                    className="text-xs"
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Stock: {formatNumber(item.currentStock)} {item.unit}</span>
                  <span>Min: {formatNumber(item.minThreshold)} {item.unit}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatTime(item.lastUpdated)}</span>
                </div>
                {item.status === 'low' && (
                  <div className="text-xs text-red-600 font-medium mt-1">
                    Reorder Required
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Critical Items Alert */}
        {criticalItems.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <h4 className="text-sm font-medium text-red-900">Critical Stock Levels</h4>
            </div>
            <div className="space-y-1">
              {criticalItems.map((item) => (
                <div key={item.id} className="text-sm text-red-800">
                  • {item.name}: {formatNumber(item.currentStock)} {item.unit} 
                  (Below minimum of {formatNumber(item.minThreshold)} {item.unit})
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
