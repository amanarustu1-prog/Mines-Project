import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'

// Import all pages
import Dashboard from './pages/Dashboard'
import Form from './pages/Form'
import Form2 from './pages/Form2'
import Form3 from './pages/Form3'
import Form4 from './pages/Form4'

// Accounts pages
import AccountsDashboard from './pages/accounts/Dashboard'
import ChallanHistory from './pages/accounts/ChallanHistory'
import CreateChallan from './pages/accounts/CreateChallan'

// Dashboard pages
import ActiveAssets from './pages/dashboard/ActiveAssets'
import MachineUsage from './pages/dashboard/MachineUsage'
import MaintenanceAlerts from './pages/dashboard/MaintenanceAlerts'
import MaterialStock from './pages/dashboard/MaterialStock'
import ProductionSummary from './pages/dashboard/ProductionSummary'

// Equipment pages
import FleetManagement from './pages/equipment/Fleet'
import MaintenanceManagement from './pages/equipment/Maintenance'
import PerformanceManagement from './pages/equipment/Performance'

// Mining pages
import DrillingOperations from './pages/mining/Drilling'
import ExtractionOperations from './pages/mining/Extraction'
import ProcessingOperations from './pages/mining/Processing'
import TransportOperations from './pages/mining/Transport'

// Crusher pages
import CrusherDailyLogs from './pages/crusher/DailyLogs'
import CrusherUnits from './pages/crusher/Units'
import CrusherReports from './pages/crusher/Reports'
// import LeaveType_Master from './pages/Hr/LeaveType_Master';
import EmployeeMaster from './pages/Hr/employee-master/EmployeeMaster'
import AttendanceManagement from './pages/Hr/attendance-management/AttendanceManagement'
import LeaveManagement from './pages/Hr/leave-management/LeaveManagement'
import EmployeeBelongingsManagement from './pages/Hr/employee-belongings/EmployeeBelongingsManagement'
import SalaryCalculation from './pages/Hr/salary-calculation/SalaryCalculation'
import FormThree from './pages/FormThree'
import FormFour from './pages/FormFour'
import ListManagement from './pages/Hr/listmanagement/ListManagement'
import FuelManagement from './pages/Fuel/fuel-management/FuelManagement'
import ShiftManagement from './pages/Hr/shift-management/ShiftManagement'
import FuelVendor from './pages/Fuel/fuel-vendor/FuelVendor'
import PitBlock from './pages/mining/pitblock/PitBlock'
import ExplosiveEntry from './pages/mining/explosive-entry/ExplosiveEntry'
import EntryExplosive from './pages/mining/entry-explosive/EntryExplosive'
import BlastEntry from './pages/mining/blast-entry/BlastEntry'
import DrillingEntry from './pages/mining/drilling-entry/DrillingEntry'



function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Main Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* HR Forms */}
          <Route path="/form" element={<Form />} />
          <Route path="/formthree" element={<FormThree />} />
          <Route path="/formfour" element={<FormFour />} />
          <Route path="/form2" element={<Form2 />} />
          <Route path="/form3" element={<Form3 />} />
          <Route path="/form4" element={<Form4 />} />

          {/* Accounts */}
          <Route path="/accounts/dashboard" element={<AccountsDashboard />} />
          <Route path="/accounts/challan-history" element={<ChallanHistory />} />
          <Route path="/accounts/create-challan" element={<CreateChallan />} />

          {/* Dashboard */}
          <Route path="/dashboard/active-assets" element={<ActiveAssets />} />
          <Route path="/dashboard/machine-usage" element={<MachineUsage />} />
          <Route path="/dashboard/maintenance-alerts" element={<MaintenanceAlerts />} />
          <Route path="/dashboard/material-stock" element={<MaterialStock />} />
          <Route path="/dashboard/production-summary" element={<ProductionSummary />} />

          {/* Equipment */}
          <Route path="/equipment/fleet" element={<FleetManagement />} />
          <Route path="/equipment/maintenance" element={<MaintenanceManagement />} />
          <Route path="/equipment/performance" element={<PerformanceManagement />} />

          {/* Mining */}
          <Route path="/mining/drilling" element={<DrillingOperations />} />
          <Route path="/mining/extraction" element={<ExtractionOperations />} />
          <Route path="/mining/processing" element={<ProcessingOperations />} />
          <Route path="/mining/transport" element={<TransportOperations />} />

          {/* Crusher */}
          <Route path="/crusher/entries/daily-logs" element={<CrusherDailyLogs />} />
          <Route path="/crusher/masters/units" element={<CrusherUnits />} />
          <Route path="/crusher/reports/daily-log" element={<CrusherReports />} />

          {/* Hr */}
          <Route path="/employee-master" element={<EmployeeMaster />} />
          <Route path="/attendance-management" element={<AttendanceManagement />} />
          <Route path="/leave-management" element={<LeaveManagement />} />
          <Route path="/employee-belonging-management" element={<EmployeeBelongingsManagement />} />
          <Route path="/salary-calculation" element={<SalaryCalculation />} />
          <Route path="/list-management" element={<ListManagement />} />
          <Route path="/shift-management" element={<ShiftManagement />} />

          {/* <Route path="/LeaveType_Master" element={<LeaveType_Master />} /> */}

          {/* Fuel */}
          <Route path="/fuel-management" element={<FuelManagement />} />
          <Route path="/fuel-stock-vendor" element={<FuelVendor />} />


          {/* Mining */}
          <Route path="/pit-block" element={<PitBlock />} />
          <Route path="/explosive-entry" element={<ExplosiveEntry />} />
          <Route path="/entry-explosive" element={<EntryExplosive />} />
          <Route path="/blast-entry" element={<BlastEntry />} />
          <Route path="/drilling-entry" element={<DrillingEntry />} />



        </Routes>
      </main>
    </div>
  )
}

export default App
