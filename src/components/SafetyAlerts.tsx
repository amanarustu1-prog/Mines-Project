import { Shield, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { formatTime, formatPercentage } from '@/lib/utils';
import { SafetyAlert, WorkforceData } from '@/types';

interface SafetyAlertsProps {
  alerts: SafetyAlert[];
  ppeCompliance: number;
  workforce: WorkforceData;
}

export function SafetyAlerts({ alerts, ppeCompliance, workforce }: SafetyAlertsProps) {
  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'critical');
  const highAlerts = activeAlerts.filter(alert => alert.severity === 'high');

  const getSeverityVariant = (severity: SafetyAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'error';
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: SafetyAlert['type']) => {
    switch (type) {
      case 'incident':
        return <XCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'compliance':
        return <Shield className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Safety Overview</span>
          </div>
          {activeAlerts.length > 0 && (
            <Badge variant="error" className="flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3" />
              <span>{activeAlerts.length} Active</span>
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Safety Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-green-600" />
              <h4 className="text-sm font-medium text-green-900">PPE Compliance</h4>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {formatPercentage(ppeCompliance)}
            </p>
            <div className="mt-2">
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${ppeCompliance}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <h4 className="text-sm font-medium text-blue-900">Active Workforce</h4>
            </div>
            <p className="text-2xl font-bold text-blue-600">{workforce.activeShift}</p>
            <p className="text-xs text-blue-700 mt-1">
              {formatPercentage(workforce.attendanceRate)} Attendance
            </p>
          </div>
        </div>

        {/* Active Alerts */}
        {activeAlerts.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Active Alerts</h4>
            {activeAlerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="p-3 bg-muted/50 rounded-lg border-l-4 border-l-red-500">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(alert.type)}
                    <Badge variant={getSeverityVariant(alert.severity)} className="text-xs">
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground capitalize">
                      {alert.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(alert.timestamp)}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground">{alert.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="text-sm font-medium text-green-900">All Clear</h4>
            <p className="text-xs text-green-700">No active safety alerts</p>
          </div>
        )}

        {/* Critical Alerts Summary */}
        {(criticalAlerts.length > 0 || highAlerts.length > 0) && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <h4 className="text-sm font-medium text-red-900">Priority Alerts</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-red-600">{criticalAlerts.length}</p>
                <p className="text-xs text-red-800">Critical</p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-600">{highAlerts.length}</p>
                <p className="text-xs text-red-800">High Priority</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <button className="flex-1 px-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
            Report Incident
          </button>
          <button className="flex-1 px-3 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-secondary/90 transition-colors">
            Safety Check
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
