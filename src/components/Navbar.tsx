import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Factory,
  Truck,
  Package,
  Users,
  Shield,
  BarChart3,
  Settings,
  ChevronDown,
  Bell,
  User,
  Menu,
  X,
  Pickaxe,
  Drill,
  Wrench,
  CheckCircle,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  UserCheck,
  MapPin,
  ShoppingCart,
  GraduationCap,
  Scale,
  FlaskConical,
  Award,
  Sliders,
  DollarSign,
  Target,
  Building,
  PieChart,
  Activity,
  Warehouse,
  HardHat,
  FileText,
  Cog,
  Search,
  LogOut,
  HelpCircle,
  Hammer,
  Calculator,
  Receipt,
  CreditCard,
  Banknote,
  TrendingDown,
  ArrowUpDown,
  Coins,
  Building2,
  ClipboardList,
  BookOpen,
  Briefcase,
  Zap,
  Lightbulb,
  Database,
  Leaf,
  Link2,
  MoreHorizontal,
  Edit,
  Star,
  Send,
  Layers,
  Package2,
  RefreshCw,
  Tag,
  Navigation,
  Recycle,
  Headphones,
  Lock,
  GitBranch,
  ExternalLink,
  AlertTriangle,
  Globe,
  List,
  Folder,
  Trash
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { useAppDispatch } from '@/redux/store';
import { logoutUser } from '@/redux/actions/authActions';

interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
  }[];
  sections?: {
    title: string;
    items: {
      title: string;
      href: string;
      icon?: React.ComponentType<{ className?: string }>;
      description?: string;
      badge?: string;
    }[];
  }[];
  featured?: {
    title: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: Home,
    sections: [
      {
        title: 'Overview',
        items: [
          {
            title: 'Main Dashboard',
            href: '/',
            icon: Home,
            description: 'Complete overview of all mining operations'
          },
          {
            title: 'Production Summary',
            href: '/dashboard/production-summary',
            icon: BarChart3,
            description: 'Key production metrics and trends'
          },
          {
            title: 'Operations Overview',
            href: '/dashboard/operations',
            icon: Factory,
            description: 'Real-time operations status and monitoring'
          },
        ]
      },
      {
        title: 'Performance',
        items: [
          {
            title: 'Machine Usage',
            href: '/dashboard/machine-usage',
            icon: Activity,
            description: 'Equipment utilization and performance'
          },
          {
            title: 'Active Assets',
            href: '/dashboard/active-assets',
            icon: MapPin,
            description: 'Track and monitor all active equipment'
          },
          {
            title: 'Efficiency Metrics',
            href: '/dashboard/efficiency',
            icon: Target,
            description: 'Overall operational efficiency tracking'
          },
        ]
      },
      {
        title: 'Status Reports',
        items: [
          {
            title: 'Maintenance Alerts',
            href: '/dashboard/maintenance-alerts',
            icon: AlertCircle,
            description: 'Critical maintenance issues and tasks',
            badge: 'New'
          },
          {
            title: 'Material Stock',
            href: '/dashboard/material-stock',
            icon: Warehouse,
            description: 'Inventory levels and supply tracking'
          },
          {
            title: 'Safety Status',
            href: '/dashboard/safety-status',
            icon: Shield,
            description: 'Safety metrics and incident tracking'
          },
        ]
      },
      {
        title: 'Analytics',
        items: [
          {
            title: 'KPI Dashboard',
            href: '/dashboard/kpi',
            icon: TrendingUp,
            description: 'Key performance indicators and metrics'
          },
          {
            title: 'Cost Analysis',
            href: '/dashboard/cost-analysis',
            icon: DollarSign,
            description: 'Cost breakdown and financial insights'
          },
          {
            title: 'Trend Analysis',
            href: '/dashboard/trends',
            icon: BarChart3,
            description: 'Historical trends and forecasting',
            badge: 'Pro'
          },
        ]
      },
      {
        title: 'Reporting',
        items: [
          {
            title: 'Daily Reports',
            href: '/dashboard/daily-reports',
            icon: FileText,
            description: 'Automated daily operation reports'
          },
          {
            title: 'Executive Summary',
            href: '/dashboard/executive',
            icon: Building2,
            description: 'High-level executive dashboard'
          },
          {
            title: 'Custom Views',
            href: '/dashboard/custom-views',
            icon: Sliders,
            description: 'Personalized dashboard configurations',
            badge: 'Custom'
          },
        ]
      },
    ]
  },


  {
    title: 'Sale & Purchase',
    icon: Factory,
    sections: [
      {
        title: 'MASTER TABLES',
        items: [
          {
            title: 'Udhar Party (Sundry debitor)',
            href: '/sundry-debtors',
            icon: Pickaxe,
            description: 'Ore extraction operations and planning'
          },
          {
            title: 'Product Master',
            href: '/product-masonry',
            icon: Drill,
            description: 'Drilling operations and site management'
          },
          {
            title: 'Vehicle Type',
            href: '/vehicle-type',
            icon: Drill,
            description: 'Drilling operations and site management'
          },
          {
            title: 'Loading Charge',
            href: '/loading-charge',
            icon: Drill,
            description: 'Drilling operations and site management'
          },
          {
            title: 'TP Charge',
            href: '/tp-charges',
            icon: Drill,
            description: 'Drilling operations and site management'
          },
        ]
      },
      {
        title: 'Sale',
        items: [
          {
            title: 'Challan',
            href: '/create-challan',
            icon: Wrench,
            description: 'Material processing and refinement'
          },

          {
            title: 'Pending Challan',
            href: '/pending-challan',
            icon: Wrench,
            description: 'Material processing and refinement'
          },
          {
            title: 'Approved Challan',
            href: '/approved-challan',
            icon: Wrench,
            description: 'Material processing and refinement'
          },

          {
            title: 'Extra TP',
            href: '/extra-tp',
            icon: Truck,
            description: 'Material transport and logistics'
          },

          {
            title: 'Scrape GST Bill',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },

          {
            title: 'E-Invoice',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },

          {
            title: 'E-Way Bill',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },


        ]
      },

      {
        title: 'Purchase',
        items: [
          {
            title: 'Puchase',
            href: '/purchase',
            icon: Wrench,
            description: 'Material processing and refinement'
          },
          {
            title: 'Purchase with Ravanna',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },
          {
            title: 'Lease wise Purchase',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },

        ]
      },

      {
        title: 'Setting',
        items: [
          {
            title: 'Challan setting',
            href: '/mining/processing',
            icon: Wrench,
            description: 'Material processing and refinement'
          },
          {
            title: 'Party Rate',
            href: '/party-rate',
            icon: Truck,
            description: 'Material transport and logistics'
          },
          {
            title: 'Merge Party',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },

        ]
      },


      {
        title: 'REPORTS',
        items: [
          {
            title: 'Challan Report',
            href: '/mining/planning',
            icon: MapPin,
            description: 'Mine site planning and development'

          },
          {
            title: 'Bill Report',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },
          {
            title: 'Lease Wise Purchase Report',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },
          {
            title: 'Purchase Report',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },
          {
            title: 'Party wise Sale Report',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },
        ]
      },
    ]

  },

  {
    title: 'Accounts',
    icon: Calculator,
    sections: [
      {
        title: 'MASTER TABLES',
        items: [
          {
            title: 'Ledger Group',
            href: '/ledger-group',
            icon: Briefcase,
            description: 'Create new sales orders and quotes'
          },
          {
            title: 'Ledger Creation',
            href: '/group-creation',
            icon: Briefcase,
            description: 'Create new sales orders and quotes'
          },
          {
            title: 'Ledger Master',
            href: '/accounts/sales-dashboard',
            icon: TrendingUp,
            description: 'Sales performance and revenue overview'
          },
          {
            title: 'Merge Ledger',
            href: '/accounts/customers',
            icon: Users,
            description: 'Manage customer database and relationships'
          },

          {
            title: 'Opening Balance',
            href: '/accounts/customers',
            icon: Users,
            description: 'Manage customer database and relationships'
          },

        ]
      },

      {
        title: 'Vouchers',
        items: [
          {
            title: 'Payment',
            href: '/payment-voucher',
            icon: Receipt,
            description: 'Create new delivery challans and receipts'

          },
          {
            title: 'Receipt',
            href: '/accounts/challan-history',
            icon: Receipt,
            description: 'Track all delivery challans and receipts'
          },
          {
            title: 'Contra',
            href: '/accounts/invoices',
            icon: FileText,
            description: 'Create and manage customer invoices'
          },
          {
            title: 'Journal',
            href: '/accounts/payments',
            icon: CreditCard,
            description: 'Track customer payments and receipts'
          },
        ]
      },
      {
        title: 'Financial Reports',
        items: [
          {
            title: 'Profit & Loss',
            href: '/accounts/profit-loss',
            icon: TrendingUp,
            description: 'P&L statements and financial performance'
          },
          {
            title: 'Cash Book',
            href: '/accounts/revenue-analysis',
            icon: Coins,
            description: 'Revenue breakdown and analysis',
          },
          {
            title: 'Day Book',
            href: '/accounts/cash-flow',
            icon: ArrowUpDown,
            description: 'Cash flow statements and projections'
          },
          {
            title: 'Payment Report',
            href: '/accounts/tax-reports',
            icon: Building2,
            description: 'Tax calculations and compliance reports'
          },
          {
            title: 'Contra Report',
            href: '/accounts/monthly-closing',
            icon: Calendar,
            description: 'Monthly financial closing and reconciliation'
          },
          {
            title: 'Journal Report',
            href: '/accounts/monthly-closing',
            icon: Calendar,
            description: 'Monthly financial closing and reconciliation'
          },
        ]
      },
    ]
  },


  {
    title: 'Inventory',
    icon: Package,
    sections: [
      {
        title: 'MASTER TABLES',
        items: [
          {
            title: 'Material Group',
            href: '/inventory/material-group',
            icon: Package,
            description: 'Current inventory and stock levels'
          },
          {
            title: 'Material Type',
            href: '/inventory/material-type',
            icon: TrendingUp,
            description: 'Predictive inventory modeling'
          },
          {
            title: 'Unit of Measurement',
            href: '/inventory/unit-of-measurement',
            icon: TrendingUp,
            description: 'Predictive inventory modeling'
          },
        ]
      },
      {
        title: 'Request & Approval',
        items: [
          {
            title: 'Material Request Entry',
            href: '/material-request-entry',
            icon: ShoppingCart,
            description: 'Purchase orders and requisitions'
          },
          {
            title: 'Request Approval',
            href: '/request-approval',
            icon: UserCheck,
            description: 'Supplier management and relationships'
          },
          {
            title: 'Reject Requests(Approved)',
            href: '/Reject-Approved-Requests',
            icon: UserCheck,
            description: 'Supplier management and relationships'
          },

        ]
      },

      {
        title: 'Quotation',
        items: [
          {
            title: 'Request for Quotation (RFQ)',
            href: '/Request-Quotation',
            icon: Truck,
            description: 'Sent to multiple vendors'
          },
          {
            title: 'Quotation Entry',
            href: '/Quotation-Entry',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },
          {
            title: 'Quotation Comparison',
            href: '/Quotation-Comparison',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },
          {
            title: 'Quotation Approve',
            href: '/Quotation-Approve',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },
        ]
      },
      {
        title: 'Purchase Order',
        items: [
          {
            title: 'Create Purchase Order',
            href: '/Create-Purchase-Order',
            icon: Truck,
            description: 'Sent to multiple vendors'
          },
          {
            title: 'PO Approval',
            href: '/inventory/warehousing',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },
          {
            title: 'Modify PO',
            href: '/inventory/warehousing',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },
          {
            title: 'PO Print / Email to Vendor',
            href: '/inventory/warehousing',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },

        ]
      },

      {
        title: 'Goods Receipt Note',
        items: [
          {
            title: 'GRN Against PO',
            href: '/grn-against-po',
            icon: Truck,
            description: 'Sent to multiple vendors'
          },
          {
            title: 'Direct GRN',
            href: '/a-direct-grn',
            icon: Warehouse,
            description: 'without PO – for urgent purchases',

          },
          {
            title: 'Material Inspection Entry',
            href: '/material-inspection-entry',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },

          {
            title: 'Serial Number/Unique Part Code Entry',
            href: '/serial-number-unique-part-code-entry',
            icon: Warehouse,
            description: 'Serial Number/Unique Part Code Entry Section for Items with Warranty',

          },


          {
            title: 'Stock Update Post-GRN',
            href: '/stock-update-post-grn',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },

        ]
      },

      {
        title: 'Issue & Transfer',
        items: [
          {
            title: 'Material Issue',
            href: '/material-issue',
            icon: Truck,
            description: 'Issue to Machine/Vehicle/Department'
          },
          {
            title: 'Store to Store Transfer',
            href: '/store-to-store',
            icon: Warehouse,
            description: 'without PO – for urgent purchases',

          },
          {
            title: 'Inter-Department Transfer',
            href: '/inter-department-transfer',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },
          {
            title: 'Purchase Bill Entry',
            href: '/purchase-bill-entry',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },

        ]
      },

      {
        title: 'Gate Pass',
        items: [
          {
            title: 'RGP Entry',
            href: '/RGP-Entry',
            icon: Truck,
            description: 'Issue to Machine/Vehicle/Department'
          },
          {
            title: 'RGP Return',
            href: '/RGP-Return',
            icon: Warehouse,
            description: 'without PO – for urgent purchases',

          },
          {
            title: 'NRGP Entry',
            href: '/NRGP-Entry',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },
          {
            title: 'In-Entry Against NRGP',
            href: '/In-EntryAgainst-NRGP',
            icon: Warehouse,
            description: 'Warehouse management and organization',

          },

        ]
      },
    ]
  },

  {
    title: 'Plant & Vehicle',
    icon: Factory,
    sections: [
      {
        title: 'MASTER TABLES',
        items: [


          {
            title: 'Machine/Vehicle Master',
            // href: '/vehicle-job-details',
            href: '/vehicle-master-entry',
            icon: Wrench,
            description: 'Material processing and refinement'
          },
          {
            title: 'Check-List Setup',
            href: '/daily-check-list',
            icon: Wrench,
            description: 'Material processing and refinement'
          },
          {
            title: 'Group Wise Check-List',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },


          {
            title: 'Maintenance Type Master',
            href: '/mining/processing',
            icon: Wrench,
            description: 'Material processing and refinement'
          },

          {
            title: 'Spare Parts Master',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },
          {
            title: 'Service Vendor Master',
            href: '/vehicle-renewal-details',
            icon: Truck,
            description: 'Material transport and logistics'
          },

          {
            title: 'Vehicle Service Type',
            href: '/vehicle-service-type',
            icon: Truck,
            description: 'Material transport and logistics'
          },

          {
            title: 'Service Process Master',
            href: '/vehicle-renewal-details',
            icon: Truck,
            description: 'Material transport and logistics'
          },

        ]
      },
      {
        title: 'Check-List',
        items: [

          {
            title: 'Check-List Enter Detail',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },

          {
            title: 'Job Card prep',
            href: '/vehicle-job-details',
            icon: Truck,
            description: 'Material transport and logistics'
          },


        ]
      },

      {
        title: 'Service',
        items: [
          {
            title: 'Vehicle Service Entry',
            href: '/vehicle-service-entry',
            icon: Truck,
            description: 'Material transport and logistics'
          },
          {
            title: 'Plant Service Entry',
            href: '/vehicle-service-types',
            icon: Truck,
            description: 'Material transport and logistics'
          },

          {
            title: 'Vehicle Daily Running',
            href: '/daily-running',
            icon: Truck,
            description: 'Material transport and logistics'
          },

          {
            title: 'Vehicle Job Completion',
            href: '/vehicle-job-completion',
            icon: Truck,
            description: 'Material transport and logistics'
          },

          {
            title: 'Vehicle Policy Udate',
            href: '/crusher/maintenance/preventive',
            icon: Shield,
            description: 'Preventive maintenance for crusher units'
          },


        ]
      },


      {
        title: 'Maintenance Schedule',
        items: [
          {
            title: 'Planned Maintenance Entry',
            href: '/mining/planning',
            icon: MapPin,
            description: 'Mine site planning and development'

          },
          {
            title: 'Maintenance Job Card',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },
          {
            title: 'Breakdown Maintenance',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },

          {
            title: 'AMC & Warranty',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },

          {
            title: 'Repair Log',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },

          {
            title: 'Spare Part Movement Log',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },

        ]
      },


      {
        title: 'Reports',
        items: [
          {
            title: 'Daily/Monthly Plant Maintenance Report',
            href: '/mining/planning',
            icon: MapPin,
            description: 'Mine site planning and development',
            badge: 'New'
          },
          {
            title: 'Plant Grease Report',
            href: '/mining/planning',
            icon: MapPin,
            description: 'Mine site planning and development',
            badge: 'New'
          },
          {
            title: 'Vehicle Service Report',
            href: '/mining/planning',
            icon: MapPin,
            description: 'Mine site planning and development',
            badge: 'New'
          },
          {
            title: 'Downtime Summary',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },
          {
            title: 'Cost Analysis Report',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },

        ]
      },


    ]
  },
  {
    title: 'Fuel',
    icon: CheckCircle,
    sections: [
      {
        title: 'Master Setup',
        items: [
          {
            title: 'Fuel Type Master',
            href: '/fuel/fuel-type-master',
            icon: Target,
            description: 'Third-Party Integrations',
          },
          {
            title: 'Vehicle / Equipment Master with Tank Capacity',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
          {
            title: 'Fuel Pump Master',
            href: '/quality/certifications',
            icon: Award,
            description: 'Fuel Pump Master (with location & staff)'
          },
          {
            title: 'Threshold / Alert Configuration',
            href: '/quality/certifications',
            icon: Award,
            description: 'Fuel Pump Master (with location & staff)'
          },
          {
            title: 'Unit of Measurement Settings',
            href: '/quality/certifications',
            icon: Award,
            description: 'Unit of Measurement Settings (Liters, Gallons, etc.)'
          },
        ]
      },

      {
        title: 'Fuel Stock Management',
        items: [
          {
            title: 'Fuel Stock Inward Entry',
            href: '/fuel-stock-vendor',
            icon: CheckCircle,
            description: 'Name, Logo, Address, Contact Info'
          },
          {
            title: 'Fuel Transfer Entry',
            href: '/quality/trends',
            icon: TrendingUp,
            description: 'Historical quality data and trends'
          },

          {
            title: 'Fuel Adjustment / Reconciliation',
            href: '/quality/trends',
            icon: TrendingUp,
            description: 'Historical quality data and trends'
          },

          {
            title: 'Fuel Vendor Master',
            href: '/quality/trends',
            icon: TrendingUp,
            description: 'Historical quality data and trends'
          },

          {
            title: 'Fuel Pricing Setup',
            href: '/quality/trends',
            icon: TrendingUp,
            description: 'Historical quality data and trends'
          },

        ]
      },
      {
        title: 'Fuel Issuance',
        items: [
          {
            title: 'Fuel Issue Entry',
            // href: '/quality/testing',
            href: '/fuel-management',
            icon: FlaskConical,
            description: 'Vehicle/Machine-wise'
          },
          {
            title: 'Issuance Approvals',
            href: '/quality/lab-results',
            icon: FileText,
            description: 'Laboratory testing outcomes'
          },
          {
            title: 'Daily Fuel Issuance Register',
            href: '/quality/lab-results',
            icon: FileText,
            description: 'Laboratory testing outcomes'
          },
        ]
      },
      {
        title: 'Consumption & Monitoring',
        items: [
          {
            title: 'Machine-wise Fuel Consumption',
            href: '/quality/standards',
            icon: Target,
            description: 'Quality standards and specifications',
          },
          {
            title: 'Vehicle-wise Fuel Consumption',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
          {
            title: 'Daily Fuel Usage Summary',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
          {
            title: 'Overconsumption Alerts / Exception Logs',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
        ]
      },
      {
        title: 'Reports',
        items: [
          {
            title: 'Fuel Stock Ledger',
            href: '/quality/standards',
            icon: Target,
            description: 'Quality standards and specifications',
          },
          {
            title: 'Fuel Issue vs Consumption Report',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
          {
            title: 'Fuel Cost Report ',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
          {
            title: 'Fuel Price History',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
        ]
      },


    ]

  },

  {
    title: 'Mining',
    icon: CheckCircle,
    sections: [
      {
        title: 'MASTER TABLES',
        items: [
          {
            title: 'Mines & Locations Master',
            href: '/mining/extraction',
            icon: Pickaxe,
            description: 'Ore extraction operations and planning'
          },
          {
            title: 'Blasting Zone Master',
            href: '/mining/drilling',
            icon: Drill,
            description: 'Drilling operations and site management'
          },
          {
            title: 'Permit & Lease Master',
            href: '/mining/drilling',
            icon: Drill,
            description: 'Drilling operations and site management'
          },
          // {
          //   title: 'Crusher Unit Master',
          //   href: '/mining/drilling',
          //   icon: Drill,
          //   description: 'Drilling operations and site management'
          // },
          {
            title: 'Explosive Type',
            href: '/mining/drilling',
            icon: Drill,
            description: 'Drilling operations and site management'
          },
        ]
      },
      // {
      //   title: 'Cruher',
      //   items: [
      //     {
      //       title: 'Crusher Unit Setup',
      //       href: '/mining/processing',
      //       icon: Wrench,
      //       description: 'Material processing and refinement'
      //     },
      //     {
      //       title: 'Daily Crushing Logs',
      //       href: '/mining/transport',
      //       icon: Truck,
      //       description: 'Material transport and logistics'
      //     },
      //     {
      //       title: 'Output Quality (Grading)',
      //       href: '/mining/transport',
      //       icon: Truck,
      //       description: 'Material transport and logistics'
      //     },
      //     {
      //       title: 'Downtime Logs',
      //       href: '/mining/transport',
      //       icon: Truck,
      //       description: 'Material transport and logistics'
      //     },
      //     {
      //       title: 'Power & Fuel Consumption',
      //       href: '/mining/transport',
      //       icon: Truck,
      //       description: 'Material transport and logistics'
      //     },
      //     {
      //       title: 'Maintenance Schedule',
      //       href: '/crusher/maintenance/schedule',
      //       icon: Calendar,
      //       description: 'Crusher maintenance planning and scheduling'
      //     },
      //     {
      //       title: 'Preventive Maintenance',
      //       href: '/crusher/maintenance/preventive',
      //       icon: Shield,
      //       description: 'Preventive maintenance for crusher units'
      //     },
      //   ]
      // },

      {
        title: 'Mining',
        items: [
          {
            title: ' Mine Sites & Pits',
            href: '/pit-block',
            icon: Wrench,
            description: 'Material processing and refinement'
          },
          {
            title: 'Blast Entry',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },
          {
            title: 'Blasting Schedules',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },
          {
            title: 'Drilling Logs',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },
          {
            title: 'Raw Material Loading',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },
          {
            title: 'Safety & Compliance Logs',
            href: '/mining/transport',
            icon: Truck,
            description: 'Material transport and logistics'
          },

          {
            title: 'Explosive Entry',
            href: '/explosive-entry',
            icon: Truck,
            description: 'Material transport and logistics'
          },

          {
            title: 'Explosive Used Entry',
            href: '/entry-explosive',
            icon: Truck,
            description: 'Material transport and logistics'
          },
        ]
      },


      {
        title: 'REPORTS',
        items: [
          {
            title: 'Site Planning',
            href: '/mining/planning',
            icon: MapPin,
            description: 'Mine site planning and development',
            badge: 'New'
          },
          {
            title: 'Material Extraction Report',
            href: '/mining/resources',
            icon: Target,
            description: 'Resource estimation and modeling'
          },
          {
            title: 'Blasting Schedule & Log Summary',
            href: '/blast-entry',
            icon: Target,
            description: 'Resource estimation and modeling'
          },
          {
            title: 'Drilling Activity Log Report',
            href: '/drilling-entry',
            icon: Target,
            description: 'Resource estimation and modeling'
          },
        ]
      },


    ]

  },

  {
    title: 'HR',
    icon: Users,
    sections: [
      {
        title: 'MASTER TABLES',
        items: [
          {
            title: 'Department',
            href: '/hr/department',
            icon: Users,
            description: 'Employee records and management'
          },
          {
            title: 'Designation',
            href: '/workforce/contractors',
            icon: UserCheck,
            description: 'Contractor records and agreements'
          },
          {
            title: 'Shift Master',
            href: '/workforce/contractors',
            icon: UserCheck,
            description: 'Contractor records and agreements'
          },
          {
            title: 'DepartMent Master',
            href: '/Department-Master',
            icon: UserCheck,
            description: 'Contractor records and agreements'
          },
          {
            title: 'ID Proof',
            href: '/ID-Proof',
            icon: UserCheck,
            description: 'Contractor records and agreements'
          },
          {
            title: 'Maritial Status',
            href: '/Maritial-Status',
            icon: UserCheck,
            description: 'Contractor records and agreements'
          },
          {
            title: 'Leave Type Master',
            href: '/leave-type-master',

            icon: UserCheck,
            description: 'Contractor records and agreements'
          },
        ]
      },
      {
        title: 'Employee',
        items: [
          {
            title: 'Employee',
            href: '/employee-master',

            icon: Clock,
            description: 'Shift schedules and planning'
          },
          {
            title: 'Employee Status',
            href: '/workforce/shifts',
            icon: Clock,
            description: 'Shift schedules and planning'
          },
          {
            title: 'Employee Document',
            href: '/workforce/shifts',
            icon: Clock,
            description: 'Shift schedules and planning'
          },
          {
            title: 'Reporting Manager Setup',
            href: '/workforce/time-tracking',
            icon: Calendar,
            description: 'Time and attendance tracking'
          },

          {
            title: 'Contractors',
            href: '/workforce/time-tracking',
            icon: Calendar,
            description: 'Contractor records and agreements'
          },

          {
            title: 'Item Issue',
            href: '/employee-belonging-management',
            icon: Calendar,
            description: 'Contractor records and agreements'
          },

        ]
      },
      {
        title: 'Attendance & Shift',
        items: [
          {
            title: 'Daily Attendance Entry',
            href: '/attendance-management',
            icon: GraduationCap,
            description: 'Employee training and certifications'
          },
          {
            title: 'Biometric/Manual Attendance Import',
            href: '/workforce/performance',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },
          {
            title: 'Shift Allocation',
            href: '/shift-management',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },
          {
            title: 'Shift Roaster',
            href: '/workforce/performance',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },
        ]
      },

      {
        title: 'Leave Management',
        items: [
          {
            title: 'Apply for Leave',
            // href: '/workforce/training',
            href: '/leave-management',
            icon: GraduationCap,
            description: 'Employee training and certifications'
          },
          {
            title: 'Leave Approval',
            href: '/workforce/performance',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },
          {
            title: 'Leave Balance & History',
            href: '/workforce/performance',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },
          {
            title: 'Holiday Master',
            href: '/workforce/performance',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },
        ]
      },

      {
        title: 'Payroll',
        items: [
          {
            title: 'Salary Structure Setup',
            href: '/workforce/training',
            icon: GraduationCap,
            description: 'Employee training and certifications'
          },
          {
            title: 'Monthly Salary Process',
            href: '/salary-calculation',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },
          {
            title: 'Salary Slip Generation',
            href: '/workforce/performance',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },
          {
            title: 'Bonus / Incentive Entry',
            href: '/workforce/performance',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },
        ]
      },

      {
        title: 'HR Reports',
        items: [
          {
            title: 'Employee Master Report',
            href: '/workforce/performance',
            icon: GraduationCap,
            description: 'Employee training and certifications'
          },
          {
            title: 'Attendance Summary',
            href: '/workforce/performance',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },
          {
            title: 'Leave Report',
            href: '/workforce/performance',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },
          {
            title: 'Salary Register',
            href: '/workforce/performance',
            icon: TrendingUp,
            description: 'Performance reviews and metrics',

          },

        ]
      },


    ]
  },

  {
    title: 'Safety & Legal',
    icon: CheckCircle,
    sections: [
      {
        title: 'MASTER TABLES',
        items: [
          {
            title: 'Court Location',
            href: '/safety/court',
            icon: Target,
            description: 'Quality standards and specifications',

          },
          {
            title: 'Type of Case',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
          {
            title: 'Thana',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },

          {
            title: 'Case Stage',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },

          {
            title: 'Case Status',
            href: '/safetyLegal/case-status', //masterTable/case-status
            icon: Award,
            description: 'Quality certifications and compliance'
          },

          {
            title: 'Injury Type',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },

        ]
      },

      {
        title: 'Safety Incident Reporting',
        items: [
          {
            title: 'Incident/Accident Report Entry',
            href: '/quality/dashboard',
            icon: CheckCircle,
            description: 'Overall quality metrics and KPIs'
          },
          {
            title: 'Investigation & Root Cause Analysis',
            href: '/quality/trends',
            icon: TrendingUp,
            description: 'Historical quality data and trends'
          },
          {
            title: 'Incident Closure & Review',
            href: '/quality/trends',
            icon: TrendingUp,
            description: 'Historical quality data and trends'
          },
        ]
      },
      {
        title: 'Safety Audit & Inspection',
        items: [
          {
            title: 'Internal Safety Audit Checklist',
            href: '/quality/testing',
            icon: FlaskConical,
            description: 'Quality testing procedures and results'
          },
          {
            title: 'Site Inspection Report',
            href: '/quality/lab-results',
            icon: FileText,
            description: 'Laboratory testing outcomes'
          },
          {
            title: 'Unsafe Condition Reporting',
            href: '/quality/lab-results',
            icon: FileText,
            description: 'Laboratory testing outcomes'
          },
        ]
      },
      {
        title: 'Legal & Compliance',
        items: [
          {
            title: 'Legal Master(Court Case)',
            href: '/quality/standards',
            icon: Target,
            description: 'Quality standards and specifications',

          },
          {
            title: 'Follow Up Court Case',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
          {
            title: 'Court Case Report',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
          {
            title: 'Agreement',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
          {
            title: 'Agreement Reminder',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
          {
            title: 'Document',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
        ]
      },

    ],
    featured: [
      {
        title: 'Quality Improvement Projects',
        description: 'Active initiatives to enhance quality processes',
        href: '/quality/improvement',
        icon: TrendingUp
      }
    ]
  },

  {
    title: 'Reports',
    icon: BarChart3,
    sections: [
      {
        title: 'Operations',
        items: [
          {
            title: 'Production Reports',
            href: '/reports/production',
            icon: BarChart3,
            description: 'Production output and efficiency reports'
          },
          {
            title: 'Equipment Usage',
            href: '/reports/equipment',
            icon: Truck,
            description: 'Equipment utilization and efficiency'
          },
          {
            title: 'Operations Summary',
            href: '/reports/operations',
            icon: Factory,
            description: 'Daily and weekly operations summaries'
          },
        ]
      },
      {
        title: 'Financial',
        items: [
          {
            title: 'Financial Reports',
            href: '/reports/financial',
            icon: DollarSign,
            description: 'Cost analysis and financial performance'
          },
          {
            title: 'Budget Analysis',
            href: '/reports/budget',
            icon: PieChart,
            description: 'Budget tracking and variance analysis'
          },
          {
            title: 'Cost Reports',
            href: '/reports/cost',
            icon: Coins,
            description: 'Detailed cost breakdowns and analysis'
          },
        ]
      },
      {
        title: 'Analytics',
        items: [
          {
            title: 'Performance Analytics',
            href: '/reports/analytics',
            icon: TrendingUp,
            description: 'Advanced data analytics and trends',
            badge: 'Pro'
          },
          {
            title: 'Custom Reports',
            href: '/reports/custom',
            icon: FileText,
            description: 'Build and save custom reports'
          },
          {
            title: 'Trend Analysis',
            href: '/reports/trends',
            icon: Activity,
            description: 'Historical trend analysis and forecasting'
          },
        ]
      },
      {
        title: 'Compliance',
        items: [
          {
            title: 'Regulatory Reports',
            href: '/reports/regulatory',
            icon: Scale,
            description: 'Regulatory compliance and audit reports'
          },
          {
            title: 'Environmental Reports',
            href: '/reports/environmental',
            icon: Leaf,
            description: 'Environmental impact and sustainability'
          },
          {
            title: 'Safety Reports',
            href: '/reports/safety',
            icon: Shield,
            description: 'Safety performance and incident reports'
          },
        ]
      },
      {
        title: 'Management',
        items: [
          {
            title: 'Executive Dashboard',
            href: '/reports/executive',
            icon: Target,
            description: 'Executive-level KPIs and metrics'
          },
          {
            title: 'Performance Scorecards',
            href: '/reports/scorecards',
            icon: Award,
            description: 'Departmental performance scorecards'
          },
          {
            title: 'Strategic Reports',
            href: '/reports/strategic',
            icon: Building2,
            description: 'Strategic planning and business intelligence'
          },
        ]
      },
    ]
  },
  {
    title: 'Master Tables',
    icon: CheckCircle,
    sections: [
      {
        title: 'HR',
        items: [
          { title: 'Blood Group', href: '/hr/blood-group', icon: CheckCircle, description: 'Manage employee blood groups' },
          { title: 'Department', href: '/hr/department', icon: CheckCircle, description: 'Department information' },
          { title: 'Designation', href: '/masterTable/designation', icon: CheckCircle, description: 'Employee designations' },
          { title: 'Employee Leave Status', href: '/masterTable/employee-leave-status', icon: CheckCircle, description: 'Leave status management' },
          { title: 'Emp Leave Type', href: '/masterTable/employee-leave-type', icon: CheckCircle, description: 'Leave type settings' },
          { title: 'Employement Status', href: '/masterTable/employement-status', icon: CheckCircle, description: 'Employement Status' },
          { title: 'Emp Status', href: '/masterTable/employee-status', icon: CheckCircle, description: 'Employee status tracking' },
          { title: 'Gender', href: '/masterTable/gender', icon: CheckCircle, description: 'Gender categories' },
        ]
      },
      {
        title: 'HR',
        items: [
          { title: 'ID Proof', href: '/masterTable/id-proof', icon: CheckCircle, description: 'Employee identification proof types' },
          { title: 'Qualification', href: '/masterTable/qualification', icon: CheckCircle, description: 'Employee qualification details' },
          { title: 'Relation', href: '/masterTable/relation', icon: CheckCircle, description: 'Relationship types' },
          { title: 'Religion', href: '/masterTable/religion', icon: CheckCircle, description: 'Religions list' },
          { title: 'State', href: '/masterTable/state', icon: CheckCircle, description: 'State details' },
          { title: 'Martial', href: '/masterTable/marital-status', icon: CheckCircle, description: 'Marital status' },
          { title: 'District', href: '/masterTable/district', icon: CheckCircle, description: 'District details' },
        ]
      },
      {
        title: 'Inventory',
        items: [
          { title: 'Equipment Type', href: '/masterTable/equipment-type', icon: TrendingUp, description: 'Types of equipment' },
          { title: 'Maintenance Type', href: '/inventory/maintenance-type', icon: TrendingUp, description: 'Types of maintenance' },
          { title: 'Material Group', href: '/masterTable/material-group', icon: TrendingUp, description: 'Material grouping' },
          { title: 'Material Name', href: '/masterTable/material-name', icon: TrendingUp, description: 'Material names' },
          { title: 'Material Specification', href: '/masterTable/material-specification', icon: TrendingUp, description: 'Specifications for materials' },
          { title: 'Material SubType', href: '/masterTable/material-sub-type', icon: TrendingUp, description: 'Material subtypes' },
          { title: 'Material Type', href: '/masterTable/material-type', icon: TrendingUp, description: 'Material types' },
          { title: 'Unit Type', href: '/masterTable/unit-type', icon: TrendingUp, description: 'Unit measurements' },
          { title: 'Fuel Type', href: '/masterTable/fuel-type', icon: TrendingUp, description: 'Types of fuels' },
          { title: 'Vehicle Service Type', href: '/masterTable/vehicle-service-type', icon: TrendingUp, description: 'Types of vehicle services' },
          { title: 'Company Unit', href: '/masterTable/company-units', icon: TrendingUp, description: 'Company Units' },
        ]
      },
      {
        title: 'Crusher and Mines',
        items: [
          { title: 'Loading charge', href: '/masterTable/loading-charge', icon: FlaskConical, description: 'Loading charges list' },
          { title: 'Product', href: '/product-masonry', icon: FlaskConical, description: 'Product list' },
          { title: 'Tp Amount', href: '/masterTable/tp-amount', icon: FlaskConical, description: 'TP amount details' },
          { title: 'Vehicle Type', href: '/masterTable/vehicle-type', icon: FlaskConical, description: 'Vehicle types' },
          { title: 'Explosive Type', href: '/masterTable/explosive-type', icon: FlaskConical, description: 'Explosive types' },
        ]
      },
      {
        title: 'Safety and Legal',
        items: [
          { title: 'Case Status', href: '/masterTable/case-status', icon: FileText, description: 'Case statuses' },
          { title: 'Case Type', href: '/masterTable/case-type', icon: FileText, description: 'Case types' },
          { title: 'Court Location', href: '/masterTable/court-location', icon: FileText, description: 'Court locations' },
          { title: 'Injury Type', href: '/masterTable/injury-type', icon: FileText, description: 'Types of injuries' },
          { title: 'Thana', href: '/masterTable/thana', icon: FileText, description: 'Police station list' },
        ]
      },
      {
        title: 'Account',
        items: [
          { title: 'Financial Year', href: '/account/financial-year', icon: Target, description: 'Financial year list' },
        ]
      }
    ]
  },
  {
    title: 'Setting',
    icon: CheckCircle,
    sections: [
      {
        title: 'General Settings',
        items: [
          {
            title: 'Company Profile',
            href: '/quality/dashboard',
            icon: CheckCircle,
            description: 'Name, Logo, Address, Contact Info'
          },
          {
            title: 'Shift Timing',
            href: '/quality/trends',
            icon: TrendingUp,
            description: 'Historical quality data and trends'
          },
          {
            title: 'E-Invoice Detail',
            href: '/quality/trends',
            icon: TrendingUp,
            description: 'Historical quality data and trends'
          },
          {
            title: 'E-Way Bill Detail',
            href: '/quality/trends',
            icon: TrendingUp,
            description: 'Historical quality data and trends'
          },
        ]
      },
      {
        title: 'User & Access Settings',
        items: [
          {
            title: 'User Management',
            href: '/quality/testing',
            icon: FlaskConical,
            description: 'Quality testing procedures and results'
          },
          {
            title: 'Roles & Permissions',
            href: '/quality/lab-results',
            icon: FileText,
            description: 'Laboratory testing outcomes'
          },
          {
            title: 'Password Policy',
            href: '/quality/lab-results',
            icon: FileText,
            description: 'Laboratory testing outcomes'
          },
          {
            title: 'Login History / Audit Log',
            href: '/quality/lab-results',
            icon: FileText,
            description: 'Laboratory testing outcomes'
          },
        ]
      },
      {
        title: 'Weigh bridge',
        items: [
          {
            title: 'BAAT MAAP Certificate',
            href: '/quality/standards',
            icon: Target,
            description: 'Quality standards and specifications',
          },
          {
            title: 'Weight Setting',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
        ]
      },
      {
        title: 'CCTV',
        items: [
          {
            title: 'CCTV IP',
            href: '/quality/standards',
            icon: Target,
            description: 'Quality standards and specifications',
          },
          {
            title: 'CCTV Urls',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
        ]
      },

      {
        title: 'System Configuration',
        items: [
          {
            title: 'API Keys',
            href: '/quality/standards',
            icon: Target,
            description: 'Third-Party Integrations',
          },
          {
            title: 'SMTP / Email Settings',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
          {
            title: 'SMS Gateway Settings',
            href: '/quality/certifications',
            icon: Award,
            description: 'Quality certifications and compliance'
          },
        ]
      },

    ]

  },





];


// More menu items - you can add more items here
const moreMenuItems: NavItem[] = [
  {
    title: 'Analytics',
    icon: TrendingUp,
    sections: [
      {
        title: 'Business Intelligence',
        items: [
          {
            title: 'Data Analytics',
            href: '/analytics/data',
            icon: BarChart3,
            description: 'Advanced data analysis and insights'
          },
          {
            title: 'Predictive Analytics',
            href: '/analytics/predictive',
            icon: Target,
            description: 'Predictive modeling and forecasting'
          },
          {
            title: 'Performance Metrics',
            href: '/analytics/performance-metrics',
            icon: Activity,
            description: 'Key performance indicators and metrics'
          },
        ]
      },
      {
        title: 'Reporting',
        items: [
          {
            title: 'Custom Dashboards',
            href: '/analytics/dashboards',
            icon: PieChart,
            description: 'Build custom analytical dashboards'
          },
          {
            title: 'Data Visualization',
            href: '/analytics/visualization',
            icon: Activity,
            description: 'Interactive charts and graphs'
          },
          {
            title: 'Executive Reports',
            href: '/analytics/executive',
            icon: FileText,
            description: 'High-level reports for management'
          },
        ]
      },
      {
        title: 'AI & ML',
        items: [
          {
            title: 'Machine Learning',
            href: '/analytics/ml',
            icon: Zap,
            description: 'ML models for operations optimization',
            badge: 'Beta'
          },
          {
            title: 'AI Insights',
            href: '/analytics/ai-insights',
            icon: Lightbulb,
            description: 'AI-powered business insights'
          },
          {
            title: 'Predictive Maintenance',
            href: '/analytics/predictive-maintenance',
            icon: Wrench,
            description: 'AI-powered equipment maintenance forecasting'
          },
        ]
      },
      {
        title: 'Operational Analytics',
        items: [
          {
            title: 'Production Analysis',
            href: '/analytics/production',
            icon: Factory,
            description: 'Production performance and analytics'
          },
          {
            title: 'Equipment Efficiency',
            href: '/analytics/equipment',
            icon: Truck,
            description: 'Equipment utilization analysis'
          },
          {
            title: 'Resource Optimization',
            href: '/analytics/resources',
            icon: Target,
            description: 'Resource allocation and optimization',
            badge: 'New'
          },
        ]
      },
      {
        title: 'Financial Analytics',
        items: [
          {
            title: 'Cost Analysis',
            href: '/analytics/cost',
            icon: DollarSign,
            description: 'Operational cost analysis and trends'
          },
          {
            title: 'Revenue Forecasting',
            href: '/analytics/revenue',
            icon: TrendingUp,
            description: 'Revenue projections and analysis'
          },
          {
            title: 'Budget Analytics',
            href: '/analytics/budget',
            icon: PieChart,
            description: 'Budget performance and variance analysis'
          },
        ]
      },
    ]
  },
  {
    title: 'Administration',
    icon: Settings,
    sections: [
      {
        title: 'User Management',
        items: [
          {
            title: 'User Accounts',
            href: '/admin/users',
            icon: Users,
            description: 'Manage user accounts and profiles'
          },
          {
            title: 'Role Management',
            href: '/admin/roles',
            icon: Shield,
            description: 'Define user roles and access levels'
          },
          {
            title: 'Permission Settings',
            href: '/admin/permissions',
            icon: Lock,
            description: 'Configure detailed user permissions'
          },
        ]
      },
      {
        title: 'System Configuration',
        items: [
          {
            title: 'General Settings',
            href: '/admin/settings',
            icon: Sliders,
            description: 'Core system configuration options'
          },
          {
            title: 'Notifications',
            href: '/admin/notifications',
            icon: Bell,
            description: 'Configure system notifications and alerts'
          },
          {
            title: 'Workflow Rules',
            href: '/admin/workflows',
            icon: GitBranch,
            description: 'Define business process workflows'
          },
        ]
      },
      {
        title: 'Integration',
        items: [
          {
            title: 'API Management',
            href: '/admin/api',
            icon: Link2,
            description: 'Manage API connections and keys'
          },
          {
            title: 'Data Import/Export',
            href: '/admin/data-transfer',
            icon: Database,
            description: 'Import and export system data'
          },
          {
            title: 'Third-party Services',
            href: '/admin/integrations',
            icon: ExternalLink,
            description: 'Connect with external services and tools'
          },
        ]
      },
      {
        title: 'System Maintenance',
        items: [
          {
            title: 'Backup & Recovery',
            href: '/admin/backup',
            icon: Database,
            description: 'Data backup and recovery tools',
            badge: 'Critical'
          },
          {
            title: 'System Logs',
            href: '/admin/logs',
            icon: FileText,
            description: 'System activity and error logs'
          },
          {
            title: 'Performance Monitoring',
            href: '/admin/performance',
            icon: Activity,
            description: 'Monitor system performance metrics'
          },
        ]
      },
      {
        title: 'Security',
        items: [
          {
            title: 'Security Settings',
            href: '/admin/security',
            icon: Shield,
            description: 'Configure security policies and settings'
          },
          {
            title: 'Audit Logs',
            href: '/admin/audit',
            icon: Search,
            description: 'Review user activity and system changes'
          },
          {
            title: 'Threat Detection',
            href: '/admin/threats',
            icon: AlertTriangle,
            description: 'Security monitoring and threat alerts'
          },
        ]
      },
    ]
  },
  {
    title: 'Compliance',
    icon: Scale,
    sections: [
      {
        title: 'Regulatory Compliance',
        items: [
          {
            title: 'Environmental',
            href: '/compliance/environmental',
            icon: Leaf,
            description: 'Environmental regulations and reporting'
          },
          {
            title: 'Safety Standards',
            href: '/compliance/safety',
            icon: Shield,
            description: 'Safety standards and regulations'
          },
          {
            title: 'Legal Requirements',
            href: '/compliance/legal',
            icon: FileText,
            description: 'Legal compliance and documentation'
          },
        ]
      },
      {
        title: 'Standards & Certifications',
        items: [
          {
            title: 'ISO Certification',
            href: '/compliance/iso',
            icon: Award,
            description: 'ISO standards and certification management',
            badge: 'Active'
          },
          {
            title: 'Quality Standards',
            href: '/compliance/quality',
            icon: CheckCircle,
            description: 'Quality assurance standards compliance'
          },
          {
            title: 'Industry Standards',
            href: '/compliance/industry',
            icon: Globe,
            description: 'Industry-specific compliance requirements'
          },
        ]
      },
      {
        title: 'Documentation',
        items: [
          {
            title: 'Policy Management',
            href: '/compliance/policies',
            icon: FileText,
            description: 'Create and manage company policies'
          },
          {
            title: 'Procedures',
            href: '/compliance/procedures',
            icon: List,
            description: 'Standard operating procedures'
          },
          {
            title: 'Documentation Control',
            href: '/compliance/document-control',
            icon: Folder,
            description: 'Document version control and management'
          },
        ]
      },
      {
        title: 'Audits & Assessments',
        items: [
          {
            title: 'Internal Audits',
            href: '/compliance/internal-audits',
            icon: Search,
            description: 'Schedule and manage internal audits'
          },
          {
            title: 'External Audits',
            href: '/compliance/external-audits',
            icon: Users,
            description: 'External audit management and findings'
          },
          {
            title: 'Risk Assessments',
            href: '/compliance/risk',
            icon: AlertTriangle,
            description: 'Compliance risk identification and mitigation'
          },
        ]
      },
      {
        title: 'Training & Awareness',
        items: [
          {
            title: 'Compliance Training',
            href: '/compliance/training',
            icon: GraduationCap,
            description: 'Employee compliance training programs'
          },
          {
            title: 'Certification Tracking',
            href: '/compliance/certifications',
            icon: CheckCircle,
            description: 'Employee certification management'
          },
          {
            title: 'Awareness Programs',
            href: '/compliance/awareness',
            icon: Bell,
            description: 'Compliance awareness campaigns'
          },
        ]
      },
    ]
  },
  {
    title: 'Setting',
    icon: CheckCircle,
    sections: [
      {
        title: 'General Settings',
        items: [
          { title: 'Company Profile', href: '/quality/dashboard', icon: CheckCircle, description: 'Name, Logo, Address, Contact Info' },
          { title: 'Shift Timing', href: '/quality/trends', icon: TrendingUp, description: 'Historical quality data and trends' },
        ]
      },
      {
        title: 'User & Access Settings',
        items: [
          { title: 'User Management', href: '/quality/testing', icon: FlaskConical, description: 'Quality testing procedures and results' },
          { title: 'Roles & Permissions', href: '/quality/lab-results', icon: FileText, description: 'Laboratory testing outcomes' },
          { title: 'Password Policy', href: '/quality/lab-results', icon: FileText, description: 'Laboratory testing outcomes' },
          { title: 'Login History / Audit Log', href: '/quality/lab-results', icon: FileText, description: 'Laboratory testing outcomes' },
        ]
      },
      {
        title: 'Weigh bridge',
        items: [
          { title: 'BAAT MAAP Certificate', href: '/quality/standards', icon: Target, description: 'Quality standards and specifications' },
          { title: 'Weight Setting', href: '/quality/certifications', icon: Award, description: 'Quality certifications and compliance' },
        ]
      },
      {
        title: 'CCTV',
        items: [
          { title: 'CCTV IP', href: '/quality/standards', icon: Target, description: 'Quality standards and specifications' },
          { title: 'CCTV Urls', href: '/quality/certifications', icon: Award, description: 'Quality certifications and compliance' },
        ]
      },
      {
        title: 'System Configuration',
        items: [
          { title: 'API Keys', href: '/quality/standards', icon: Target, description: 'Third-Party Integrations' },
          { title: 'SMTP / Email Settings', href: '/quality/certifications', icon: Award, description: 'Quality certifications and compliance' },
          { title: 'SMS Gateway Settings', href: '/quality/certifications', icon: Award, description: 'Quality certifications and compliance' },
        ]
      },
    ]
  },
];

export function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [hoveredMoreItem, setHoveredMoreItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);


  // 🔎 search state
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ✅ flatten all routes from navigationItems + moreMenuItems
  const allRoutes = useMemo(() => {
    type Route = { title: string; href: string; description?: string };

    const routes: Route[] = [];

    const collectFromNav = (items: NavItem[]) => {
      items.forEach((item) => {
        if (item.href) {
          routes.push({ title: item.title, href: item.href });
        }

        if (item.children) {
          item.children.forEach((child) =>
            routes.push({
              title: child.title,
              href: child.href,
              description: child.description,
            })
          );
        }

        if (item.sections) {
          item.sections.forEach((section) => {
            section.items.forEach((sub) =>
              routes.push({
                title: sub.title,
                href: sub.href,
                description: sub.description,
              })
            );
          });
        }
      });
    };

    collectFromNav(navigationItems);
    collectFromNav(moreMenuItems);

    return routes;
  }, []);

  const closeAllMenus = () => {
    setOpenDropdown(null);
    setUserMenuOpen(false);
    setMoreMenuOpen(false);
    setHoveredMoreItem(null);
  };

  const handleSearchNavigate = (value: string) => {
    const q = value.trim().toLowerCase();
    if (!q) return;

    // simple match on title or description
    const match = allRoutes.find((r) => {
      if (r.title.toLowerCase().includes(q)) return true;
      if (r.description && r.description.toLowerCase().includes(q)) return true;
      return false;
    });

    if (match) {
      navigate(match.href);
      setSearchQuery("");
      closeAllMenus();
    }
  };





  const isActiveLink = (href: string) => {
    // Only return true for exact path matches
    return pathname === href;
  };

  const isActiveParent = (item: NavItem) => {
    if (item.href && isActiveLink(item.href)) return true;

    // Check direct children
    const hasActiveChild = item.children?.some(child => isActiveLink(child.href));
    if (hasActiveChild) return true;

    // Check items in sections
    const hasActiveSectionItem = item.sections?.some(section =>
      section.items?.some(subItem => isActiveLink(subItem.href))
    );

    return hasActiveSectionItem || false;
  };

  const handleDropdownToggle = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
    setUserMenuOpen(false);
    setMoreMenuOpen(false);
    setHoveredMoreItem(null);
  };

  const handleMoreMenuToggle = () => {
    setMoreMenuOpen(!moreMenuOpen);
    setOpenDropdown(null); // Close any open main dropdown
    setUserMenuOpen(false);
    setHoveredMoreItem(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setUserMenuOpen(false);
    setMoreMenuOpen(false);
    setHoveredMoreItem(null);
  };

  const [userMenusOpen, setUserMenusOpen] = useState(false);
  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };


  // Close menus when clicking outside
  const dropdownRef1 = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // if click is outside both dropdown and button → close
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    // console.log("Logout clicked 🚀");

    dispatch(logoutUser());

    // console.log("Storage after logout:");

    navigate("/");
  };


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="w-full pt-2">
        {/* Top Bar - Search and Actions */}
        <div className="flex items-center justify-between h-16  px-4 sm:px-6 lg:px-8 border-b border-gray-50">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 flex-shrink-0 max-w-[320px]">
            <Link to="/dashboard-page" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                  <Factory className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-extrabold text-gray-900 leading-tight whitespace-nowrap tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900">Saraswati Stone Crusher</span>
                </div>
                <div className="text-sm font-medium text-gray-600 -mt-0.5 whitespace-nowrap tracking-wide">Kalahar Bhusawar, Bharatpur</div>
              </div>
            </Link>
          </div>

          {/* Wide Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-md ml-6 mr-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchNavigate(searchQuery);
                  }
                }}
                placeholder="Search operations, equipment, reports..."
                className="w-full pl-12 pr-12 py-3 bg-gray-50/80 border border-gray-200/60 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 hover:bg-gray-50"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <kbd className="inline-flex items-center px-2 py-1 border border-gray-200 rounded text-xs font-mono bg-white text-gray-400 shadow-sm">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Actions - Right */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Mobile Search Button */}
            <button className="md:hidden p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Search className="h-5 w-5 text-gray-500" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 group relative">
                <Bell className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-medium">
                  3
                </span>
              </button>
            </div>

            {/* Settings */}
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 group">
              <Settings className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-1.5 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
              >
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">Admin User</span>
                  <span className="text-xs text-gray-500">Operations Manager</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
                  <User className="h-4 w-4 text-white" />
                </div>
                <ChevronDown className={cn(
                  "h-3 w-3 text-gray-400 hidden lg:block transition-transform duration-200",
                  userMenuOpen ? "rotate-180" : "rotate-0"
                )} />
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div ref={dropdownRef} className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-[60] overflow-hidden">
                  <div className="p-4 border-b border-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900">Admin User</div>
                        <div className="text-sm text-gray-500">admin@saraswatistonecrushers.com</div>
                        <div className="text-xs text-gray-400 mt-1">Operations Manager</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <span>View Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Settings className="h-4 w-4 text-gray-500" />
                      </div>
                      <span>Settings</span>
                    </Link>
                    <Link
                      to="/help"
                      className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                      </div>
                      <span>Help & Support</span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-50 p-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200" onClick={handleLogout}>
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <LogOut className="h-4 w-4 text-red-500" />
                      </div>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 ml-2"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Menu Bar */}
        <div className="hidden lg:block container bg-white/60 backdrop-blur-sm relative border-b border-gray-50" ref={dropdownRef}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-2">
              <div className="flex items-center space-x-1 px-1 bg-gray-50/80 rounded-xl p-1.5 shadow-sm border border-gray-200/50">
                {navigationItems.map((item) => (
                  <div key={item.title} className="">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center  py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                          isActiveLink(item.href)
                            ? "bg-white text-blue-700 shadow-md"
                            : "text-gray-600 hover:text-gray-900 hover:bg-white/70 hover:shadow-sm"
                        )}
                      >
                        {/* { <item.icon className="h-4 w-4" /> } */}
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="default" className="text-xs px-1.5 py-0.5 ml-1">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleDropdownToggle(item.title)}
                        className={cn(
                          "flex items-center space-x-1 px-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                          isActiveParent(item) || openDropdown === item.title
                            ? "bg-white text-blue-700 shadow-md"
                            : "text-gray-600 hover:text-gray-900 hover:bg-white/70 hover:shadow-sm"
                        )}
                      >
                        {/* <item.icon className="h-4 w-4" /> */}
                        <span>{item.title}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            openDropdown === item.title ? "rotate-180" : "rotate-0"
                          )}
                        />
                      </button>
                    )}

                    {/* Mega Menu Dropdown */}
                    {openDropdown === item.title && (
                      <div className={cn(
                        "absolute top-full w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-[60]  navbar-dropdown custom-scrollbar",
                        // Smart positioning - ensure dropdown stays within screen bounds
                        item.title === 'Dashboard' || item.title === 'Plant & Vehicle' || item.title === 'Sale & Purchase' || item.title === 'Accounts'
                          ? "left-0"
                          : item.title === 'Inventory' || item.title === 'Machines & Vehicles' || item.title === 'HR'
                            ? "left-0"
                            : item.title === 'Workforce' || item.title === 'Safety'
                              ? "left-0"
                              : item.title === 'Reports' || item.title === 'Setting' || item.title === 'Fuel'
                                ? "left-0"
                                : "left-0",
                        // Consistent sizing for all menus to fit content
                        "w-[min(1290px,95vw)]"
                        //  "w-[min(1000px,95vw)]"
                      )}>
                        <div className="p-6">
                          {/* Header */}
                          <div className="border-b border-gray-100 pb-4 mb-6">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-50 rounded-lg">
                                <item.icon className="h-6 w-6 text-blue-600" />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            </div>
                          </div>

                          {/* Content Grid - Responsive layout for menus */}
                          <div className="grid grid-cols-12 gap-6">
                            {/* Main Menu Sections - Full width for inventory and dashboard, dynamic for others */}
                            <div className={cn(
                              "grid gap-6",
                              (item.title === 'Inventory' || item.title === 'Dashboard' ||
                                item.title === 'Crusher' || item.title === 'Accounts' || item.title === 'Workforce' ||
                                item.title === 'Safety & Legal' || item.title === 'Reports' || item.title === 'Setting' || item.title === 'Fuel') ? "col-span-12" :
                                !item.featured ? "col-span-12" : "col-span-9",
                              item.title === 'Inventory' && item.sections && item.sections.length === 7 ? "grid-cols-6" :
                                item.title === 'Dashboard' && item.sections && item.sections.length === 5 ? "grid-cols-5" :
                                  item.title === 'Plant & Vehicle' && item.sections && item.sections.length === 5 ? "grid-cols-5" :
                                    item.title === 'Mining' && item.sections && item.sections.length === 3 ? "grid-cols-3" :
                                      item.title === 'Sale & Purchase' && item.sections ? "grid-cols-5" :
                                        item.title === 'Accounts' && item.sections ? "grid-cols-3" :
                                          item.title === 'HR' && item.sections ? "grid-cols-6" :
                                            item.title === 'Machines & Vehicles' && item.sections ? "grid-cols-5" :
                                              item.title === 'Workforce' && item.sections ? "grid-cols-5" :
                                                item.title === 'Safety & Legal' && item.sections ? "grid-cols-4" :
                                                  item.title === 'Reports' && item.sections ? "grid-cols-5" :
                                                    item.title === 'Master Tables' && item.sections ? "grid-cols-6" :
                                                      item.title === 'Setting' && item.sections ? "grid-cols-5" :
                                                        item.title === 'Fuel' && item.sections ? "grid-cols-5" :
                                                          item.title === 'Accounts1' && item.sections ? "grid-cols-3" :
                                                            item.sections && item.sections.length > 6 ? "grid-cols-4" :
                                                              item.sections && item.sections.length > 4 ? "grid-cols-3" :
                                                                "grid-cols-2"
                            )}>
                              {item.sections?.map((section, idx) => (
                                <div key={idx} className="space-y-3">
                                  <h4 className={cn(
                                    "text-sm font-semibold text-gray-700 uppercase tracking-wide border-b-2 border-blue-100 pb-2 mb-1",
                                    (item.title === 'Inventory' || item.title === 'Dashboard' || item.title === 'Mining' || item.title === 'Sale & Purchase' || item.title === 'Accounts' || item.title === 'Plant & Vehicle' || item.title === 'HR' || item.title === 'Workforce' || item.title === 'Safety & Legal' || item.title === 'Reports' || item.title === 'Setting' || item.title === 'Fuel' || item.title === 'Accounts') && "text-sm font-bold text-blue-800 border-b-2 border-blue-200"
                                  )}>
                                    {section.title}
                                  </h4>
                                  <div className="space-y-1.5">
                                    {section.items.map((subItem) => (
                                      <Link
                                        key={subItem.href}
                                        to={subItem.href}
                                        onClick={() => setOpenDropdown(null)}
                                        className={cn(
                                          "flex flex-col space-y-1 p-2.5 rounded-lg transition-all duration-200",
                                          isActiveLink(subItem.href)
                                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        )}
                                      >
                                        <div className="flex items-center space-x-2">
                                          {subItem.icon && (
                                            <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                          )}
                                          <span className="font-medium text-sm">{subItem.title}</span>
                                          {subItem.badge && (
                                            <Badge variant="secondary" className="text-xs px-1.5 py-0.5 ml-1">
                                              {subItem.badge}
                                            </Badge>
                                          )}
                                        </div>
                                        {subItem.description && (
                                          <p className="text-xs text-gray-500 line-clamp-2 pl-5">{subItem.description}</p>
                                        )}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>                                  {/* Featured Section - Only show for items that have featured and are not Inventory, Dashboard or Mining Operations */}
                            {item.featured && item.title !== 'Inventory' && item.title !== 'Dashboard' && item.title !== 'Plant & Mining' && item.title !== 'Crusher' && item.title !== 'Accounts' && item.title !== 'Workforce' && item.title !== 'Safety & Legal' && item.title !== 'Reports' && item.title !== 'Quality' && (
                              <div className="col-span-3 bg-gray-50 rounded-xl p-4">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                  Featured
                                </h4>
                                <div className="space-y-3">
                                  {item.featured.map((feature, idx) => (
                                    <Link
                                      key={idx}
                                      to={feature.href}
                                      onClick={() => setOpenDropdown(null)}
                                      className="block group"
                                    >
                                      <div className="flex items-start space-x-3 p-3 rounded-lg bg-white border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-200">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                          <feature.icon className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                          <h5 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                            {feature.title}
                                          </h5>
                                          <p className="text-xs text-gray-500 mt-1">
                                            {feature.description}
                                          </p>
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50/80 py-3 px-6 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">
                              {new Date().toLocaleDateString()} | Mining Plant ERP
                            </p>
                            <div className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">
                              View All {item.title}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Simple Dropdown Fallback (if no sections defined but children exist) */}
                    {item.children && !item.sections && openDropdown === item.title && (
                      <div className={cn(
                        "absolute top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-[60] overflow-hidden",
                        // Dynamic positioning based on menu item position
                        item.title === 'Dashboard' || item.title === 'Plant & Mining' || item.title === 'Crusher'
                          ? "left-0"
                          : item.title === 'Accounts' || item.title === 'Inventory' || item.title === 'Workforce' || item.title === 'Safety & Legal' || item.title === 'Reports' || item.title === 'Quality' || item.title === 'Accounts1'
                            ? "right-0"
                            : "left-1/2 transform -translate-x-1/2"
                      )}>
                        <div className="p-3">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-2 border-b border-gray-50">
                            {item.title}
                          </div>
                          <div className="space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                onClick={() => setOpenDropdown(null)}
                                className={cn(
                                  "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm transition-all duration-200 group",
                                  isActiveLink(child.href)
                                    ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                )}
                              >
                                <div className={cn(
                                  "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                                  isActiveLink(child.href) ? "bg-blue-100" : "bg-gray-100 group-hover:bg-gray-200"
                                )}>
                                  {child.icon && <child.icon className="h-4 w-4" />}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{child.title}</div>
                                  {child.description && (
                                    <p className="text-xs text-gray-500 line-clamp-2">{child.description}</p>
                                  )}
                                </div>
                                {isActiveLink(child.href) && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* More Menu Button */}
                <div className="relative">
                  <button
                    onClick={handleMoreMenuToggle}
                    className={cn(
                      "flex items-center space-x-2 px-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                      moreMenuOpen
                        ? "bg-white text-blue-700 shadow-md"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/70 hover:shadow-sm"
                    )}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span>More</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        moreMenuOpen ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>

                  {/* More Menu Dropdown */}
                  {moreMenuOpen && (
                    <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-[60] overflow-hidden">
                      <div className="p-3">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-2 border-b border-gray-50">
                          More Options
                        </div>
                        <div className="space-y-1">
                          {moreMenuItems.map((item) => (
                            <div
                              key={item.title}
                              className="relative"
                              onMouseEnter={() => setHoveredMoreItem(item.title)}
                              onMouseLeave={() => setHoveredMoreItem(null)}
                            >
                              <button
                                className={cn(
                                  "w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm transition-all duration-200 group text-left",
                                  hoveredMoreItem === item.title
                                    ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                )}
                              >
                                <div className={cn(
                                  "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                                  hoveredMoreItem === item.title ? "bg-blue-100" : "bg-gray-100 group-hover:bg-gray-200"
                                )}>
                                  <item.icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{item.title}</div>
                                  <p className="text-xs text-gray-500">
                                    {item.sections ? `${item.sections.length} sections` : 'Multiple options'}
                                  </p>
                                </div>
                                <ChevronDown className="h-4 w-4 -rotate-90" />
                              </button>

                              {/* Mega Menu for More Items */}
                              {hoveredMoreItem === item.title && (
                                <div className="fixed top-20 left-0 w-[min(980px,90vw)]  bg-white rounded-xl shadow-xl border border-gray-100 z-[70] overflow-hidden">
                                  <div className="p-6">
                                    {/* Header */}
                                    <div className="border-b border-gray-100 pb-4 mb-6">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                          <item.icon className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                      </div>
                                    </div>

                                    {/* Content Grid - Consistent layout for all menus */}
                                    <div className="grid grid-cols-12 gap-6">
                                      {/* Main Menu Sections - Full width for all more menu items */}
                                      <div className="col-span-12 grid gap-6 grid-cols-4">
                                        {item.sections?.map((section, idx) => (
                                          <div key={idx} className="space-y-3">
                                            <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wide border-b-2 border-blue-200 pb-2 mb-1">
                                              {section.title}
                                            </h4>
                                            <div className="space-y-1.5">
                                              {section.items.map((subItem) => (
                                                <Link
                                                  key={subItem.href}
                                                  to={subItem.href}
                                                  onClick={() => {
                                                    setMoreMenuOpen(false);
                                                    setHoveredMoreItem(null);
                                                  }}
                                                  className={cn(
                                                    "flex flex-col space-y-1 p-2.5 rounded-lg transition-all duration-200",
                                                    isActiveLink(subItem.href)
                                                      ? "bg-blue-50 text-blue-700 border border-blue-100"
                                                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                                  )}
                                                >
                                                  <div className="flex items-center space-x-2">
                                                    {subItem.icon && (
                                                      <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                                    )}
                                                    <span className="font-medium text-sm">{subItem.title}</span>
                                                    {subItem.badge && (
                                                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5 ml-1">
                                                        {subItem.badge}
                                                      </Badge>
                                                    )}
                                                  </div>
                                                  {subItem.description && (
                                                    <p className="text-xs text-gray-500 line-clamp-2 pl-5">{subItem.description}</p>
                                                  )}
                                                </Link>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Footer */}
                                  <div className="bg-gray-50/80 py-3 px-6 border-t border-gray-100">
                                    <div className="flex justify-between items-center">
                                      <p className="text-xs text-gray-500">
                                        Mining Plant ERP
                                      </p>
                                      <div className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">
                                        View All {item.title}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3 max-h-96 overflow-y-auto">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search operations, equipment, reports..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              {navigationItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  {item.href ? (
                    <Link
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActiveLink(item.href)
                          ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200",
                        isActiveLink(item.href) ? "bg-blue-100" : "bg-gray-100"
                      )}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="flex-1">{item.title}</span>
                      {isActiveLink(item.href) && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.title)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                          isActiveParent(item) || openDropdown === item.title
                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200",
                            isActiveParent(item) || openDropdown === item.title ? "bg-blue-100" : "bg-gray-100"
                          )}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            openDropdown === item.title ? "rotate-180" : "rotate-0"
                          )}
                        />
                      </button>

                      {openDropdown === item.title && (
                        <div className="ml-4 mt-2 border-l-2 border-blue-100 pl-4">
                          {/* Display sections for mobile */}
                          {item.sections && (
                            <div className="space-y-4">
                              {item.sections.map((section, idx) => (
                                <div key={idx} className="mb-3">
                                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                                    {section.title}
                                  </div>
                                  <div className="space-y-1">
                                    {section.items.map((subItem) => (
                                      <Link
                                        key={subItem.href}
                                        to={subItem.href}
                                        onClick={closeMobileMenu}
                                        className={cn(
                                          "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                                          isActiveLink(subItem.href)
                                            ? "bg-blue-50 text-blue-700 font-medium border border-blue-100"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        )}
                                      >
                                        <div className={cn(
                                          "w-8 h-8 rounded-lg flex items-center justify-center",
                                          isActiveLink(subItem.href) ? "bg-blue-100" : "bg-gray-100"
                                        )}>
                                          {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                        </div>
                                        <div className="flex-1">
                                          <div className="font-medium flex items-center">
                                            {subItem.title}
                                            {subItem.badge && (
                                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 ml-2">
                                                {subItem.badge}
                                              </Badge>
                                            )}
                                          </div>
                                          {subItem.description && (
                                            <p className="text-xs text-gray-500">{subItem.description}</p>
                                          )}
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* If no sections but has children array, display children */}
                          {!item.sections && item.children && (
                            <div className="space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  onClick={closeMobileMenu}
                                  className={cn(
                                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                                    isActiveLink(child.href)
                                      ? "bg-blue-50 text-blue-700 font-medium border border-blue-100"
                                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                  )}
                                >
                                  <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center",
                                    isActiveLink(child.href) ? "bg-blue-100" : "bg-gray-100"
                                  )}>
                                    {child.icon && <child.icon className="h-4 w-4" />}
                                  </div>
                                  <span>{child.title}</span>
                                </Link>
                              ))}
                            </div>
                          )}

                          {/* Featured items for mobile */}
                          {item.featured && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                                Featured
                              </div>
                              <div className="space-y-2">
                                {item.featured.map((feature, idx) => (
                                  <Link
                                    key={idx}
                                    to={feature.href}
                                    onClick={closeMobileMenu}
                                    className="flex items-center space-x-3 px-3 py-2.5 bg-gray-50 rounded-lg text-sm transition-all duration-200"
                                  >
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <feature.icon className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium">{feature.title}</div>
                                      <p className="text-xs text-gray-500 line-clamp-1">{feature.description}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* More Menu Items in Mobile */}
              <div className="space-y-2">
                <div className="px-4 py-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    More Options
                  </div>
                </div>
                {moreMenuItems.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(`more-${item.title}`)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                          openDropdown === `more-${item.title}`
                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200",
                            openDropdown === `more-${item.title}` ? "bg-blue-100" : "bg-gray-100"
                          )}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <span className="flex-1">{item.title}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            openDropdown === `more-${item.title}` ? "rotate-180" : "rotate-0"
                          )}
                        />
                      </button>

                      {openDropdown === `more-${item.title}` && (
                        <div className="ml-4 mt-2 border-l-2 border-blue-100 pl-4">
                          {/* Sections */}
                          {item.sections && (
                            <div className="space-y-4">
                              {item.sections.map((section, idx) => (
                                <div key={idx} className="space-y-2">
                                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
                                    {section.title}
                                  </div>
                                  <div className="space-y-1">
                                    {section.items.map((subItem) => (
                                      <Link
                                        key={subItem.href}
                                        to={subItem.href}
                                        onClick={closeMobileMenu}
                                        className={cn(
                                          "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                                          isActiveLink(subItem.href)
                                            ? "bg-blue-50 text-blue-700 font-medium border border-blue-100"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        )}
                                      >
                                        <div className={cn(
                                          "w-8 h-8 rounded-lg flex items-center justify-center",
                                          isActiveLink(subItem.href) ? "bg-blue-100" : "bg-gray-100"
                                        )}>
                                          {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                        </div>
                                        <div className="flex-1">
                                          <div className="font-medium">{subItem.title}</div>
                                          {subItem.description && (
                                            <p className="text-xs text-gray-500">{subItem.description}</p>
                                          )}
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Featured items for mobile */}
                          {item.featured && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                                Featured
                              </div>
                              <div className="space-y-2">
                                {item.featured.map((feature, idx) => (
                                  <Link
                                    key={idx}
                                    to={feature.href}
                                    onClick={closeMobileMenu}
                                    className="flex items-center space-x-3 px-3 py-2.5 bg-gray-50 rounded-lg text-sm transition-all duration-200"
                                  >
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <feature.icon className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium">{feature.title}</div>
                                      <p className="text-xs text-gray-500 line-clamp-1">{feature.description}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile User Section */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">Operations Manager</p>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-200">
                    <Settings className="h-4 w-4 text-gray-500" />
                  </button>
                </div>

                <div className="mt-3 space-y-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200">
                    <Bell className="h-4 w-4" />
                    <span className="text-sm flex-1 text-left">Notifications</span>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">3</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200">
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm flex-1 text-left">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
