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
        </Routes>
      </main>
    </div>
  )
}

export default App
