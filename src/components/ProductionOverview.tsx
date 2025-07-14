import { Factory, Target, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { formatNumber, formatPercentage } from '@/lib/utils';
import { ProductionData } from '@/types';

interface ProductionOverviewProps {
  data: ProductionData;
}

export function ProductionOverview({ data }: ProductionOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Factory className="h-5 w-5" />
          <span>Production Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Today's Production */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Ore Mined Today</h3>
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(data.oreMined)} {data.unit}
            </p>
          </div>
          <div className="text-right">
            <Badge 
              variant={data.percentage >= 95 ? "success" : data.percentage >= 80 ? "warning" : "error"}
            >
              {formatPercentage(data.percentage)}
            </Badge>
          </div>
        </div>

        {/* Monthly Target */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Monthly Target</h3>
              <p className="text-lg font-semibold text-foreground">
                {formatNumber(data.target)} {data.unit}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">On Track</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress to Target</span>
            <span className="font-medium">{formatPercentage(data.percentage)}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(data.percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-blue-900">This Month</p>
            <p className="text-lg font-bold text-blue-600">
              {formatNumber(data.oreMined * 15)} {data.unit}
            </p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-green-900">Efficiency</p>
            <p className="text-lg font-bold text-green-600">
              {formatPercentage(data.percentage)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
