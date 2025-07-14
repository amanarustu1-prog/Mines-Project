export interface ProductionData {
  id: string;
  oreMined: number;
  unit: string;
  target: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  minThreshold: number;
  unit: string;
  status: 'low' | 'normal' | 'high';
  lastUpdated: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'excavator' | 'truck' | 'drill' | 'conveyor' | 'crusher';
  status: 'active' | 'maintenance' | 'inactive';
  nextMaintenance: string;
  efficiency: number;
}

export interface WorkforceData {
  totalEmployees: number;
  activeShift: number;
  attendanceRate: number;
  shifts: {
    morning: number;
    afternoon: number;
    night: number;
  };
}

export interface SafetyAlert {
  id: string;
  type: 'incident' | 'warning' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface DashboardStats {
  production: ProductionData;
  inventory: InventoryItem[];
  equipment: Equipment[];
  workforce: WorkforceData;
  safetyAlerts: SafetyAlert[];
  ppeCompliance: number;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  subtitle?: string;
}
