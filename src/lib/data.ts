import { DashboardStats } from '@/types';

export const mockDashboardData: DashboardStats = {
  production: {
    id: 'prod-001',
    oreMined: 2847,
    unit: 'tons',
    target: 3000,
    percentage: 94.9,
    trend: 'up'
  },
  inventory: [
    {
      id: 'inv-001',
      name: 'Explosives',
      currentStock: 45,
      minThreshold: 50,
      unit: 'kg',
      status: 'low',
      lastUpdated: '2025-06-27T10:30:00Z'
    },
    {
      id: 'inv-002',
      name: 'Diesel Fuel',
      currentStock: 8500,
      minThreshold: 5000,
      unit: 'liters',
      status: 'normal',
      lastUpdated: '2025-06-27T09:15:00Z'
    },
    {
      id: 'inv-003',
      name: 'Drill Bits',
      currentStock: 120,
      minThreshold: 100,
      unit: 'pieces',
      status: 'normal',
      lastUpdated: '2025-06-27T08:45:00Z'
    },
    {
      id: 'inv-004',
      name: 'Safety Equipment',
      currentStock: 89,
      minThreshold: 200,
      unit: 'sets',
      status: 'low',
      lastUpdated: '2025-06-27T11:00:00Z'
    }
  ],
  equipment: [
    {
      id: 'eq-001',
      name: 'Excavator XL-450',
      type: 'excavator',
      status: 'active',
      nextMaintenance: '2025-07-15',
      efficiency: 96
    },
    {
      id: 'eq-002',
      name: 'Dump Truck DT-90',
      type: 'truck',
      status: 'maintenance',
      nextMaintenance: '2025-06-30',
      efficiency: 0
    },
    {
      id: 'eq-003',
      name: 'Drill Rig DR-200',
      type: 'drill',
      status: 'active',
      nextMaintenance: '2025-08-10',
      efficiency: 87
    },
    {
      id: 'eq-004',
      name: 'Conveyor Belt CB-1',
      type: 'conveyor',
      status: 'active',
      nextMaintenance: '2025-07-05',
      efficiency: 92
    },
    {
      id: 'eq-005',
      name: 'Crusher Unit CU-500',
      type: 'crusher',
      status: 'inactive',
      nextMaintenance: '2025-07-01',
      efficiency: 0
    }
  ],
  workforce: {
    totalEmployees: 245,
    activeShift: 82,
    attendanceRate: 91.5,
    shifts: {
      morning: 85,
      afternoon: 78,
      night: 82
    }
  },
  safetyAlerts: [
    {
      id: 'alert-001',
      type: 'warning',
      severity: 'medium',
      message: 'Low visibility conditions in Sector 3 due to dust',
      timestamp: '2025-06-27T11:45:00Z',
      resolved: false
    },
    {
      id: 'alert-002',
      type: 'compliance',
      severity: 'high',
      message: 'PPE compliance check required for night shift',
      timestamp: '2025-06-27T10:20:00Z',
      resolved: false
    },
    {
      id: 'alert-003',
      type: 'incident',
      severity: 'low',
      message: 'Minor equipment malfunction reported - Sector 2',
      timestamp: '2025-06-27T09:30:00Z',
      resolved: true
    }
  ],
  ppeCompliance: 87.3
};
