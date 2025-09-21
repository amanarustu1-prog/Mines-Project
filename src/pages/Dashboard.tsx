import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Factory,
  Users,
  Package,
  Shield,
  TrendingUp,
  Truck,
  AlertTriangle,
  Calendar,
  Activity,
  Gauge,
  Wrench,
  BarChart3,
  PieChart,
  Zap,
  Target,
  Clock,
  Settings,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Box,
  Fuel,
  HardHat,
  Cog,
  Eye,
  ChevronRight,
  Warehouse,
  MapPin,
  DollarSign,
  Timer,
  LineChart
} from 'lucide-react';

import { Navbar } from '../components/Navbar';
import { MetricCard } from '../components/MetricCard';
import { ProductionOverview } from '../components/ProductionOverview';
import { InventorySnapshot } from '../components/InventorySnapshot';
import { EquipmentStatus } from '../components/EquipmentStatus';
import { SafetyAlerts } from '../components/SafetyAlerts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockDashboardData } from '@/lib/data';
import { formatNumber, formatPercentage, cn, formatClientSafeTime, formatClientSafeDateTime } from '@/lib/utils';
import useNoBackNavigation from '@/useNoBackNavigation';

// Comprehensive dashboard data
const comprehensiveDashboardData = {
  // Production Summary Data
  production: {
    dailyProduction: 2850,
    productionTarget: 3000,
    efficiency: 94.7,
    activeLines: 8,
    totalLines: 10,
    qualityScore: 96.2,
    oee: 89.3,
    energyConsumption: 4250,
    costPerTon: 45.80
  },

  // Machine Usage Data
  machines: {
    totalMachines: 45,
    activeMachines: 38,
    utilizationRate: 84.4,
    avgUptime: 92.3,
    maintenanceQueue: 7,
    criticalMachines: 3
  },

  // Active Assets Data
  assets: {
    totalAssets: 156,
    activeAssets: 142,
    assetUtilization: 91.0,
    highValueAssets: 28,
    depreciation: 2.3,
    assetsNeedingMaintenance: 12
  },

  // Maintenance Alerts Data
  maintenance: {
    totalAlerts: 15,
    criticalAlerts: 3,
    pendingMaintenance: 8,
    overdueMaintenance: 2,
    scheduledToday: 5,
    maintenanceCost: 125000
  },

  // Material Stock Data
  materialStock: {
    totalItems: 1250,
    lowStockItems: 28,
    criticalItems: 5,
    stockValue: 2450000,
    turnoverRate: 4.2,
    warehouseUtilization: 78.5
  },

  // Real-time metrics
  realTimeMetrics: {
    currentShift: 'Day Shift',
    shiftProgress: 75,
    activeWorkers: 245,
    safetyIncidents: 0,
    powerConsumption: 890,
    waterUsage: 1250
  }
};

export default function Dashboard() {
  const data = mockDashboardData;
  const dashData = comprehensiveDashboardData;
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [currentTime, setCurrentTime] = useState<string>('--:--:-- --');
  const [currentDateTime, setCurrentDateTime] = useState<string>('--/--/---- --:-- --');

  useNoBackNavigation();
  // Update time on client-side only
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      setCurrentTime(`${displayHours}:${minutes}:${seconds} ${ampm}`);

      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const year = now.getFullYear();
      setCurrentDateTime(`${month}/${day}/${year} ${displayHours}:${minutes} ${ampm}`);
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate derived metrics
  const activeEquipment = data.equipment.filter(eq => eq.status === 'active').length;
  const totalEquipment = data.equipment.length;
  const criticalInventoryItems = data.inventory.filter(item => item.status === 'low').length;
  const activeAlerts = data.safetyAlerts.filter(alert => !alert.resolved).length;

  const quickActionItems = [
    {
      title: 'Production Summary',
      href: '/dashboard/production-summary',
      icon: BarChart3,
      description: 'Detailed production metrics and performance analysis',
      metrics: { value: `${dashData.production.efficiency}%`, label: 'Efficiency' },
      color: 'blue'
    },
    {
      title: 'Machine Usage',
      href: '/dashboard/machine-usage',
      icon: Activity,
      description: 'Real-time equipment utilization and performance',
      metrics: { value: `${dashData.machines.utilizationRate}%`, label: 'Utilization' },
      color: 'green'
    },
    {
      title: 'Active Assets',
      href: '/dashboard/active-assets',
      icon: MapPin,
      description: 'Asset tracking and performance monitoring',
      metrics: { value: dashData.assets.activeAssets.toString(), label: 'Active' },
      color: 'purple'
    },
    {
      title: 'Maintenance Alerts',
      href: '/dashboard/maintenance-alerts',
      icon: AlertTriangle,
      description: 'Maintenance schedules and critical alerts',
      metrics: { value: dashData.maintenance.criticalAlerts.toString(), label: 'Critical' },
      color: dashData.maintenance.criticalAlerts > 0 ? 'red' : 'green'
    },
    {
      title: 'Material Stock',
      href: '/dashboard/material-stock',
      icon: Warehouse,
      description: 'Inventory levels and stock management',
      metrics: { value: dashData.materialStock.lowStockItems.toString(), label: 'Low Stock' },
      color: dashData.materialStock.criticalItems > 0 ? 'yellow' : 'green'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      green: 'bg-green-50 border-green-200 hover:bg-green-100',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      red: 'bg-red-50 border-red-200 hover:bg-red-100',
      yellow: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      red: 'text-red-600',
      yellow: 'text-yellow-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="main-content pt-20 lg:pt-20">
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="container">

            {/* Enhanced Page Header */}
            <div className="relative overflow-hidden mb-3">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 rounded-xl lg:rounded-2xl" />
              <div className="relative p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-blue-200/50 backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div>
                    <div className="flex items-center gap-3 lg:gap-4 mb-3">
                      <div className="p-2 lg:p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg lg:rounded-xl shadow-lg">
                        <BarChart3 className="h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                          Mining Operations Dashboard
                        </h1>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1">
                          Comprehensive real-time monitoring and control center
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-gray-700">All Systems Operational</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">Last updated: {currentTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end lg:flex-col lg:items-end space-x-4 lg:space-x-0">
                    <div className="text-left lg:text-right">
                      <p className="text-xl lg:text-2xl font-bold text-gray-900">{dashData.realTimeMetrics.currentShift}</p>
                      <p className="text-xs lg:text-sm text-gray-600">Shift Progress: {dashData.realTimeMetrics.shiftProgress}%</p>
                      <div className="w-20 lg:w-24 bg-gray-200 rounded-full h-1.5 lg:h-2 mt-1">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-1.5 lg:h-2 rounded-full transition-all duration-500"
                          style={{ width: `${dashData.realTimeMetrics.shiftProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced KPI Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-2">
              <MetricCard
                title="Production Efficiency"
                value={`${dashData.production.efficiency}%`}
                change={2.3}
                trend="up"
                icon={Factory}
                subtitle={`${dashData.production.dailyProduction}/${dashData.production.productionTarget} tons`}
                variant="success"
              />

              <MetricCard
                title="Machine Utilization"
                value={`${dashData.machines.utilizationRate}%`}
                change={-1.2}
                trend="down"
                icon={Cog}
                subtitle={`${dashData.machines.activeMachines}/${dashData.machines.totalMachines} active`}
                variant="warning"
              />

              <MetricCard
                title="Asset Performance"
                value={`${dashData.assets.assetUtilization}%`}
                change={1.8}
                trend="up"
                icon={Box}
                subtitle={`${dashData.assets.activeAssets} assets operational`}
                variant="success"
              />

              <MetricCard
                title="Maintenance Status"
                value={dashData.maintenance.criticalAlerts}
                trend={dashData.maintenance.criticalAlerts > 0 ? "up" : "stable"}
                icon={Wrench}
                subtitle={`${dashData.maintenance.pendingMaintenance} pending tasks`}
                variant={dashData.maintenance.criticalAlerts > 0 ? "danger" : "success"}
              />

              <MetricCard
                title="Stock Status"
                value={dashData.materialStock.lowStockItems}
                trend={dashData.materialStock.lowStockItems > 20 ? "up" : "stable"}
                icon={Package}
                subtitle={`${dashData.materialStock.criticalItems} critical items`}
                variant={dashData.materialStock.criticalItems > 0 ? "warning" : "success"}
              />

              <MetricCard
                title="Safety Score"
                value={activeAlerts === 0 ? "100%" : "95%"}
                trend={activeAlerts === 0 ? "stable" : "down"}
                icon={Shield}
                subtitle={`${activeAlerts} active incidents`}
                variant={activeAlerts === 0 ? "success" : "warning"}
              />
            </div>

            {/* Quick Access Dashboard Cards */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 space-y-2 sm:space-y-0 mb-3">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Quick Access Dashboards</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Activity className="h-4 w-4" />
                  <span>Real-time data</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-3">
                {quickActionItems.map((item) => (
                  <Link key={item.href} to={item.href}>
                    <Card className={cn(
                      "transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 h-full",
                      getColorClasses(item.color)
                    )}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className={cn("p-2 rounded-lg", getIconColor(item.color))}>
                            <item.icon className="h-5 w-5 lg:h-6 lg:w-6" />
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                        <CardTitle className="text-base lg:text-lg text-gray-900">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs lg:text-sm text-gray-600 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg lg:text-2xl font-bold text-gray-900">{item.metrics.value}</p>
                            <p className="text-xs text-gray-500">{item.metrics.label}</p>
                          </div>
                          <div className={cn(
                            "p-1 rounded text-xs font-medium",
                            item.color === 'red' ? 'bg-red-100 text-red-700' :
                              item.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                          )}>
                            <Eye className="h-3 w-3" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Enhanced Main Dashboard Sections */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-3">

              {/* Production Overview - Enhanced */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 lg:p-6">
                  <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                    <Factory className="h-5 w-5 text-blue-600" />
                    Production Overview
                    <Badge variant="outline" className="ml-auto bg-blue-100 text-blue-800 border-blue-200 text-xs">
                      <Activity className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6">
                  <div className="space-y-4 lg:space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3 lg:gap-4">
                      <div className="p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                        <p className="text-xs text-blue-600 font-medium mb-1">Daily Output</p>
                        <p className="text-lg lg:text-2xl font-bold text-blue-900">
                          {dashData.production.dailyProduction.toLocaleString()}
                        </p>
                        <p className="text-xs text-blue-700 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {((dashData.production.dailyProduction / dashData.production.productionTarget - 1) * 100).toFixed(1)}% vs target
                        </p>
                      </div>
                      <div className="p-3 lg:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                        <p className="text-xs text-green-600 font-medium mb-1">Quality Score</p>
                        <p className="text-lg lg:text-2xl font-bold text-green-900">
                          {dashData.production.qualityScore}%
                        </p>
                        <p className="text-xs text-green-700 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Above standard
                        </p>
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-3 lg:space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700">Production Lines Active</span>
                          <span className="text-blue-600 font-semibold">{dashData.production.activeLines}/{dashData.production.totalLines}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 lg:h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 lg:h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(dashData.production.activeLines / dashData.production.totalLines) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700">Overall Equipment Effectiveness</span>
                          <span className="text-green-600 font-semibold">{dashData.production.oee}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 lg:h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 lg:h-3 rounded-full transition-all duration-500"
                            style={{ width: `${dashData.production.oee}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Metrics */}
                    <div className="grid grid-cols-2 gap-3 lg:gap-4 pt-3 lg:pt-4 border-t border-gray-200">
                      <div className="text-center p-2 lg:p-3 bg-gray-50 rounded-lg">
                        <DollarSign className="h-4 lg:h-5 w-4 lg:w-5 mx-auto mb-1 text-gray-600" />
                        <p className="text-lg lg:text-xl font-bold text-gray-900">${dashData.production.costPerTon}</p>
                        <p className="text-xs text-gray-600">Cost per ton</p>
                      </div>
                      <div className="text-center p-2 lg:p-3 bg-gray-50 rounded-lg">
                        <Zap className="h-4 lg:h-5 w-4 lg:w-5 mx-auto mb-1 text-yellow-600" />
                        <p className="text-lg lg:text-xl font-bold text-gray-900">{dashData.production.energyConsumption.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">kWh consumed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Equipment & Assets - Enhanced */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-green-600" />
                    Equipment & Assets
                    <Badge variant="outline" className="ml-auto bg-green-100 text-green-800 border-green-200">
                      {dashData.machines.activeMachines + dashData.assets.activeAssets} Active
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Machine Status */}
                    <div className="p-4 border-2 border-green-100 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-green-900 flex items-center gap-2">
                          <Cog className="h-4 w-4" />
                          Heavy Machinery
                        </h4>
                        <Badge className="bg-green-200 text-green-800 border-green-300">
                          {dashData.machines.utilizationRate}% Utilized
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-green-600 font-medium">Active</p>
                          <p className="text-lg font-bold text-green-800">{dashData.machines.activeMachines}</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-yellow-600 font-medium">Maintenance</p>
                          <p className="text-lg font-bold text-yellow-700">{dashData.machines.maintenanceQueue}</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-red-600 font-medium">Critical</p>
                          <p className="text-lg font-bold text-red-700">{dashData.machines.criticalMachines}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium">Uptime Performance</span>
                          <span className="font-semibold">{dashData.machines.avgUptime}%</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                            style={{ width: `${dashData.machines.avgUptime}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Asset Status */}
                    <div className="p-4 border-2 border-blue-100 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                          <Box className="h-4 w-4" />
                          Asset Portfolio
                        </h4>
                        <Badge className="bg-blue-200 text-blue-800 border-blue-300">
                          {dashData.assets.assetUtilization}% Utilized
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-blue-600 font-medium">Total</p>
                          <p className="text-lg font-bold text-blue-800">{dashData.assets.totalAssets}</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-purple-600 font-medium">High Value</p>
                          <p className="text-lg font-bold text-purple-700">{dashData.assets.highValueAssets}</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-orange-600 font-medium">Maintenance</p>
                          <p className="text-lg font-bold text-orange-700">{dashData.assets.assetsNeedingMaintenance}</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/equipment/fleet">
                        <button className="w-full p-3 text-sm bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-lg hover:from-green-200 hover:to-green-300 transition-all duration-200 font-medium">
                          <Activity className="h-4 w-4 mx-auto mb-1" />
                          Equipment Details
                        </button>
                      </Link>
                      <Link to="/equipment/performance">
                        <button className="w-full p-3 text-sm bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-lg hover:from-blue-200 hover:to-blue-300 transition-all duration-200 font-medium">
                          <BarChart3 className="h-4 w-4 mx-auto mb-1" />
                          Performance
                        </button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance & Materials - Enhanced */}
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-orange-600" />
                    Maintenance & Inventory
                    <Badge
                      variant={dashData.maintenance.criticalAlerts > 0 ? "destructive" : "outline"}
                      className={cn(
                        "ml-auto",
                        dashData.maintenance.criticalAlerts > 0
                          ? "bg-red-100 text-red-800 border-red-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      )}
                    >
                      {dashData.maintenance.totalAlerts} Alerts
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Maintenance Status */}
                    <div className="p-4 border-2 border-orange-100 rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-orange-900 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Maintenance Queue
                        </h4>
                        <Badge className={cn(
                          "text-xs font-medium",
                          dashData.maintenance.criticalAlerts > 0 ?
                            "bg-red-200 text-red-800 border-red-300" :
                            "bg-green-200 text-green-800 border-green-300"
                        )}>
                          {dashData.maintenance.criticalAlerts} Critical
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-yellow-600 font-medium">Pending</p>
                          <p className="text-lg font-bold text-yellow-700">{dashData.maintenance.pendingMaintenance}</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-red-600 font-medium">Overdue</p>
                          <p className="text-lg font-bold text-red-700">{dashData.maintenance.overdueMaintenance}</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-blue-600 font-medium">Today</p>
                          <p className="text-lg font-bold text-blue-700">{dashData.maintenance.scheduledToday}</p>
                        </div>
                      </div>
                      <div className="text-center p-2 bg-white rounded-lg">
                        <p className="text-xs text-gray-600 font-medium">Monthly Cost</p>
                        <p className="text-lg font-bold text-gray-900">
                          ${(dashData.maintenance.maintenanceCost / 1000).toLocaleString()}K
                        </p>
                      </div>
                    </div>

                    {/* Material Stock */}
                    <div className="p-4 border-2 border-purple-100 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-purple-900 flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Material Inventory
                        </h4>
                        <Badge className={cn(
                          "text-xs font-medium",
                          dashData.materialStock.criticalItems > 0 ?
                            "bg-yellow-200 text-yellow-800 border-yellow-300" :
                            "bg-green-200 text-green-800 border-green-300"
                        )}>
                          {dashData.materialStock.warehouseUtilization}% Capacity
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-purple-600 font-medium">Total Items</p>
                          <p className="text-lg font-bold text-purple-800">{dashData.materialStock.totalItems.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-yellow-600 font-medium">Low Stock</p>
                          <p className="text-lg font-bold text-yellow-700">{dashData.materialStock.lowStockItems}</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-red-600 font-medium">Critical</p>
                          <p className="text-lg font-bold text-red-700">{dashData.materialStock.criticalItems}</p>
                        </div>
                      </div>
                      <div className="text-center p-2 bg-white rounded-lg">
                        <p className="text-xs text-gray-600 font-medium">Stock Value</p>
                        <p className="text-lg font-bold text-gray-900">
                          ${(dashData.materialStock.stockValue / 1000000).toFixed(1)}M
                        </p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/dashboard/maintenance-alerts">
                        <button className="w-full p-3 text-sm bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 rounded-lg hover:from-orange-200 hover:to-orange-300 transition-all duration-200 font-medium">
                          <Wrench className="h-4 w-4 mx-auto mb-1" />
                          Maintenance
                        </button>
                      </Link>
                      <Link to="/dashboard/material-stock">
                        <button className="w-full p-3 text-sm bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 rounded-lg hover:from-purple-200 hover:to-purple-300 transition-all duration-200 font-medium">
                          <Package className="h-4 w-4 mx-auto mb-1" />
                          Inventory
                        </button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Real-time Metrics Bar */}
            <Card className="bg-gradient-to-r from-indigo-100 via-blue-50 to-cyan-100 border-2 border-blue-200/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  Real-time Operations Status
                  <Badge className="bg-blue-600 text-white ml-auto">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    Live Feed
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  <div className="text-center p-4 bg-white/70 rounded-xl border border-blue-200/50">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{dashData.realTimeMetrics.activeWorkers}</p>
                    <p className="text-sm text-gray-600 font-medium">Active Workers</p>
                    <p className="text-xs text-blue-600 mt-1">Current shift</p>
                  </div>

                  <div className="text-center p-4 bg-white/70 rounded-xl border border-green-200/50">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-green-600 mb-1">{dashData.realTimeMetrics.safetyIncidents}</p>
                    <p className="text-sm text-gray-600 font-medium">Safety Incidents</p>
                    <p className="text-xs text-green-600 mt-1">Today</p>
                  </div>

                  <div className="text-center p-4 bg-white/70 rounded-xl border border-yellow-200/50">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Zap className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{dashData.realTimeMetrics.powerConsumption}</p>
                    <p className="text-sm text-gray-600 font-medium">MW Power</p>
                    <p className="text-xs text-yellow-600 mt-1">Current load</p>
                  </div>

                  <div className="text-center p-4 bg-white/70 rounded-xl border border-blue-200/50">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Fuel className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{dashData.realTimeMetrics.waterUsage.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 font-medium">Liters/min</p>
                    <p className="text-xs text-blue-600 mt-1">Water usage</p>
                  </div>

                  <div className="text-center p-4 bg-white/70 rounded-xl border border-purple-200/50">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{dashData.realTimeMetrics.shiftProgress}%</p>
                    <p className="text-sm text-gray-600 font-medium">Shift Progress</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${dashData.realTimeMetrics.shiftProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-center p-4 bg-white/70 rounded-xl border border-gray-200/50">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Clock className="h-6 w-6 text-gray-600" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">06:00</p>
                    <p className="text-sm text-gray-600 font-medium">Hours Remaining</p>
                    <p className="text-xs text-gray-500 mt-1">Until shift end</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Legacy Dashboard Components */}
            <div className="space-y-6 mb-4  ">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Detailed Analytics</h2>
                <Badge variant="outline" className="px-3 py-1">
                  <LineChart className="h-4 w-4 mr-1" />
                  Historical Data
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-1">
                  <ProductionOverview data={data.production} />
                </div>
                <div className="xl:col-span-1">
                  <InventorySnapshot items={data.inventory} />
                </div>
                <div className="xl:col-span-1">
                  <SafetyAlerts
                    alerts={data.safetyAlerts}
                    ppeCompliance={data.ppeCompliance}
                    workforce={data.workforce}
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <EquipmentStatus equipment={data.equipment} />
            </div>

            {/* Enhanced Footer */}
            <div className="mt-16 pt-8 border-t-2 border-gradient-to-r from-blue-200 to-indigo-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Factory className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-gray-900">Mining Plant ERP System</p>
                    <p className="text-sm text-gray-600">v2.1.0 - Enterprise Operations Platform</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <span>Last updated: {currentDateTime}</span>
                  <span>•</span>
                  <span>System Status: ✅ Operational</span>
                  <span>•</span>
                  <span>Uptime: 99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
