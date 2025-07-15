import React, { useState, useEffect } from 'react';
import './styles.css';

// Icon Components
const CalculatorIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={{ width: '16px', height: '16px', ...style }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const UserIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={{ width: '16px', height: '16px', ...style }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const FileTextIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={{ width: '16px', height: '16px', ...style }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const DownloadIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={{ width: '16px', height: '16px', ...style }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const SaveIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={{ width: '16px', height: '16px', ...style }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const TrendingUpIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={{ width: '16px', height: '16px', ...style }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export default function SalaryCalculation() {
  const [activeTab, setActiveTab] = useState('salary-calculation');
  
  // Employee Data
  const [selectedEmployee, setSelectedEmployee] = useState({
    empCode: 'SSC001',
    empName: 'SHUBHAM',
    fatherName: 'ASHOK',
    mobile: '9057241344',
    doj: '01/Mar/20',
    currentSalary: '10000.00'
  });

  // Salary Calculation Data
  const [salaryData, setSalaryData] = useState({
    grossSalary: 0,
    basicPercentage: 50,
    hraPercentage: 20,
    conveyancePercentage: 10,
    medicalPercentage: 5,
    othersPercentage: 15,
    remainingAllowancePercentage: 0,
    exGratiaPercentage: 0,
    licAmount: 0,
    pfPercentage: 12,
    esiPercentage: 1.75,
    otherDeductionsPercentage: 0,
    pfGroup: 'PF Group',
    incrementDate: '',
    incrementAmount: 0,
    joiningSalary: 10000
  });

  // Calculated Values
  const [calculatedValues, setCalculatedValues] = useState({
    basicAmount: 0,
    hraAmount: 0,
    conveyanceAmount: 0,
    medicalAmount: 0,
    othersAmount: 0,
    remainingAllowanceAmount: 0,
    exGratiaAmount: 0,
    pfAmount: 0,
    esiAmount: 0,
    otherDeductionsAmount: 0,
    totalEarnings: 0,
    totalDeductions: 0,
    netSalary: 0
  });

  const employees = [
    { empCode: 'SSC001', empName: 'SHUBHAM', fatherName: 'ASHOK', mobile: '9057241344', doj: '01/Mar/20', currentSalary: '10000.00' },
    { empCode: 'SSC002', empName: 'RAHUL KUMAR', fatherName: 'RAM KUMAR', mobile: '9057241345', doj: '15/Apr/20', currentSalary: '12000.00' },
    { empCode: 'SSC003', empName: 'PRIYA SHARMA', fatherName: 'SURESH SHARMA', mobile: '9057241346', doj: '10/Jan/21', currentSalary: '15000.00' }
  ];

  const tabs = [
    { id: 'salary-calculation', label: 'Salary Calculation', icon: CalculatorIcon },
    { id: 'salary-master', label: 'Salary Master', icon: UserIcon },
    { id: 'salary-reports', label: 'Reports', icon: FileTextIcon }
  ];

  // Handle employee selection
  const handleEmployeeSelect = (empCode: string) => {
    const employee = employees.find(emp => emp.empCode === empCode);
    if (employee) {
      setSelectedEmployee(employee);
      setSalaryData(prev => ({
        ...prev,
        joiningSalary: parseFloat(employee.currentSalary)
      }));
    }
  };

  // Calculate salary components
  const calculateSalary = () => {
    const gross = salaryData.grossSalary || 0;
    
    // Calculate Basic and allowances
    const basicAmount = (gross * salaryData.basicPercentage) / 100;
    const hraAmount = (basicAmount * salaryData.hraPercentage) / 100;
    const conveyanceAmount = (basicAmount * salaryData.conveyancePercentage) / 100;
    const medicalAmount = (basicAmount * salaryData.medicalPercentage) / 100;
    const othersAmount = (gross * salaryData.othersPercentage) / 100;
    const remainingAllowanceAmount = (basicAmount * salaryData.remainingAllowancePercentage) / 100;
    const exGratiaAmount = (basicAmount * salaryData.exGratiaPercentage) / 100;

    // Calculate deductions
    const pfAmount = (basicAmount * salaryData.pfPercentage) / 100;
    const esiAmount = (basicAmount * salaryData.esiPercentage) / 100;
    const otherDeductionsAmount = (basicAmount * salaryData.otherDeductionsPercentage) / 100;
    const licAmount = salaryData.licAmount;

    // Calculate totals
    const totalEarnings = basicAmount + hraAmount + conveyanceAmount + medicalAmount + othersAmount + remainingAllowanceAmount + exGratiaAmount;
    const totalDeductions = pfAmount + esiAmount + otherDeductionsAmount + licAmount;
    const netSalary = totalEarnings - totalDeductions;

    setCalculatedValues({
      basicAmount,
      hraAmount,
      conveyanceAmount,
      medicalAmount,
      othersAmount,
      remainingAllowanceAmount,
      exGratiaAmount,
      pfAmount,
      esiAmount,
      otherDeductionsAmount,
      totalEarnings,
      totalDeductions,
      netSalary
    });
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string | number) => {
    setSalaryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Auto-calculate when values change
  useEffect(() => {
    calculateSalary();
  }, [salaryData]);

  const handleSave = () => {
    alert('Salary calculation saved successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'salary-calculation':
        return (
          <div className="salary-space-y-6">
            {/* Employee Selection */}
            <div className="salary-card">
              <div className="salary-card-header">
                <h3 className="salary-card-title">
                  <UserIcon style={{ width: '16px', height: '16px' }} />
                  Employee Other Details Entry Section
                </h3>
              </div>
              <div className="salary-card-content">
                <div className="salary-grid salary-grid-cols-2 salary-gap-4">
                  <div className="salary-form-group">
                    <label className="salary-label">Employee Code ***</label>
                    <select 
                      className="salary-select"
                      value={selectedEmployee.empCode}
                      onChange={(e) => handleEmployeeSelect(e.target.value)}
                    >
                      {employees.map(emp => (
                        <option key={emp.empCode} value={emp.empCode}>
                          {emp.empCode} - {emp.empName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="salary-form-group">
                    <label className="salary-label">Employee Name ***</label>
                    <input 
                      type="text" 
                      className="salary-input salary-input-readonly" 
                      value={selectedEmployee.empName}
                      readOnly
                    />
                  </div>
                  <div className="salary-form-group">
                    <label className="salary-label">Father Name</label>
                    <input 
                      type="text" 
                      className="salary-input salary-input-readonly" 
                      value={selectedEmployee.fatherName}
                      readOnly
                    />
                  </div>
                  <div className="salary-form-group">
                    <label className="salary-label">Mobile</label>
                    <input 
                      type="text" 
                      className="salary-input salary-input-readonly" 
                      value={selectedEmployee.mobile}
                      readOnly
                    />
                  </div>
                  <div className="salary-form-group">
                    <label className="salary-label">DOJ</label>
                    <input 
                      type="text" 
                      className="salary-input salary-input-readonly" 
                      value={selectedEmployee.doj}
                      readOnly
                    />
                  </div>
                  <div className="salary-form-group">
                    <label className="salary-label">Current Salary</label>
                    <input 
                      type="text" 
                      className="salary-input salary-input-readonly" 
                      value={selectedEmployee.currentSalary}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Salary Master */}
            <div className="salary-card">
              <div className="salary-card-header">
                <h3 className="salary-card-title">
                  <TrendingUpIcon style={{ width: '16px', height: '16px' }} />
                  Salary Master
                </h3>
              </div>
              <div className="salary-card-content">
                <div className="salary-grid salary-grid-cols-3 salary-gap-4 salary-mb-4">
                  <div className="salary-form-group">
                    <label className="salary-label">PF Group</label>
                    <select 
                      className="salary-select"
                      value={salaryData.pfGroup}
                      onChange={(e) => handleInputChange('pfGroup', e.target.value)}
                    >
                      <option value="PF Group">PF Group</option>
                      <option value="Non PF Group">Non PF Group</option>
                    </select>
                  </div>
                  <div className="salary-form-group">
                    <label className="salary-label">Increment Date</label>
                    <input 
                      type="date" 
                      className="salary-input"
                      value={salaryData.incrementDate}
                      onChange={(e) => handleInputChange('incrementDate', e.target.value)}
                    />
                  </div>
                  <div className="salary-form-group">
                    <label className="salary-label">Increment Amount</label>
                    <input 
                      type="number" 
                      className="salary-input"
                      value={salaryData.incrementAmount}
                      onChange={(e) => handleInputChange('incrementAmount', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="salary-form-group">
                  <label className="salary-label">Joining Salary</label>
                  <input 
                    type="number" 
                    className="salary-input"
                    value={salaryData.joiningSalary}
                    onChange={(e) => handleInputChange('joiningSalary', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            {/* Salary Calculation */}
            <div className="salary-grid salary-grid-cols-2 salary-gap-6">
              {/* Gross Salary & Earnings */}
              <div className="salary-card">
                <div className="salary-card-header">
                  <h3 className="salary-card-title">Gross Salary & Earnings</h3>
                </div>
                <div className="salary-card-content salary-space-y-4">
                  <div className="salary-form-group">
                    <label className="salary-label">Gross Salary</label>
                    <input 
                      type="number" 
                      className="salary-input"
                      value={salaryData.grossSalary}
                      onChange={(e) => handleInputChange('grossSalary', parseFloat(e.target.value) || 0)}
                      placeholder="Enter gross salary"
                    />
                  </div>
                  
                  <div className="salary-earnings-grid">
                    <div className="salary-earnings-row">
                      <label className="salary-label">Basic (% of Gross)</label>
                      <div className="salary-flex salary-gap-2">
                        <input 
                          type="number" 
                          className="salary-input salary-input-sm"
                          value={salaryData.basicPercentage}
                          onChange={(e) => handleInputChange('basicPercentage', parseFloat(e.target.value) || 0)}
                        />
                        <span className="salary-percentage">%</span>
                        <input 
                          type="number" 
                          className="salary-input salary-input-readonly"
                          value={calculatedValues.basicAmount.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="salary-earnings-row">
                      <label className="salary-label">HRA (% of Basic)</label>
                      <div className="salary-flex salary-gap-2">
                        <input 
                          type="number" 
                          className="salary-input salary-input-sm"
                          value={salaryData.hraPercentage}
                          onChange={(e) => handleInputChange('hraPercentage', parseFloat(e.target.value) || 0)}
                        />
                        <span className="salary-percentage">%</span>
                        <input 
                          type="number" 
                          className="salary-input salary-input-readonly"
                          value={calculatedValues.hraAmount.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="salary-earnings-row">
                      <label className="salary-label">Conveyance (% of Basic)</label>
                      <div className="salary-flex salary-gap-2">
                        <input 
                          type="number" 
                          className="salary-input salary-input-sm"
                          value={salaryData.conveyancePercentage}
                          onChange={(e) => handleInputChange('conveyancePercentage', parseFloat(e.target.value) || 0)}
                        />
                        <span className="salary-percentage">%</span>
                        <input 
                          type="number" 
                          className="salary-input salary-input-readonly"
                          value={calculatedValues.conveyanceAmount.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="salary-earnings-row">
                      <label className="salary-label">Medical (% of Basic)</label>
                      <div className="salary-flex salary-gap-2">
                        <input 
                          type="number" 
                          className="salary-input salary-input-sm"
                          value={salaryData.medicalPercentage}
                          onChange={(e) => handleInputChange('medicalPercentage', parseFloat(e.target.value) || 0)}
                        />
                        <span className="salary-percentage">%</span>
                        <input 
                          type="number" 
                          className="salary-input salary-input-readonly"
                          value={calculatedValues.medicalAmount.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="salary-earnings-row">
                      <label className="salary-label">Others (% of Gross)</label>
                      <div className="salary-flex salary-gap-2">
                        <input 
                          type="number" 
                          className="salary-input salary-input-sm"
                          value={salaryData.othersPercentage}
                          onChange={(e) => handleInputChange('othersPercentage', parseFloat(e.target.value) || 0)}
                        />
                        <span className="salary-percentage">%</span>
                        <input 
                          type="number" 
                          className="salary-input salary-input-readonly"
                          value={calculatedValues.othersAmount.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="salary-earnings-row">
                      <label className="salary-label">Remaining Allowance (% of Basic)</label>
                      <div className="salary-flex salary-gap-2">
                        <input 
                          type="number" 
                          className="salary-input salary-input-sm"
                          value={salaryData.remainingAllowancePercentage}
                          onChange={(e) => handleInputChange('remainingAllowancePercentage', parseFloat(e.target.value) || 0)}
                        />
                        <span className="salary-percentage">%</span>
                        <input 
                          type="number" 
                          className="salary-input salary-input-readonly"
                          value={calculatedValues.remainingAllowanceAmount.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="salary-earnings-row">
                      <label className="salary-label">Ex-Gratia (% of Basic)</label>
                      <div className="salary-flex salary-gap-2">
                        <input 
                          type="number" 
                          className="salary-input salary-input-sm"
                          value={salaryData.exGratiaPercentage}
                          onChange={(e) => handleInputChange('exGratiaPercentage', parseFloat(e.target.value) || 0)}
                        />
                        <span className="salary-percentage">%</span>
                        <input 
                          type="number" 
                          className="salary-input salary-input-readonly"
                          value={calculatedValues.exGratiaAmount.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div className="salary-card">
                <div className="salary-card-header">
                  <h3 className="salary-card-title">Deductions</h3>
                </div>
                <div className="salary-card-content salary-space-y-4">
                  <div className="salary-deductions-grid">
                    <div className="salary-earnings-row">
                      <label className="salary-label">PF Deductions (% of Basic)</label>
                      <div className="salary-flex salary-gap-2">
                        <input 
                          type="number" 
                          className="salary-input salary-input-sm"
                          value={salaryData.pfPercentage}
                          onChange={(e) => handleInputChange('pfPercentage', parseFloat(e.target.value) || 0)}
                        />
                        <span className="salary-percentage">%</span>
                        <input 
                          type="number" 
                          className="salary-input salary-input-readonly"
                          value={calculatedValues.pfAmount.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="salary-earnings-row">
                      <label className="salary-label">ESI Deductions (% of Basic)</label>
                      <div className="salary-flex salary-gap-2">
                        <input 
                          type="number" 
                          className="salary-input salary-input-sm"
                          value={salaryData.esiPercentage}
                          onChange={(e) => handleInputChange('esiPercentage', parseFloat(e.target.value) || 0)}
                        />
                        <span className="salary-percentage">%</span>
                        <input 
                          type="number" 
                          className="salary-input salary-input-readonly"
                          value={calculatedValues.esiAmount.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="salary-earnings-row">
                      <label className="salary-label">LIC (in Rs)</label>
                      <div className="salary-flex salary-gap-2">
                        <input 
                          type="number" 
                          className="salary-input"
                          value={salaryData.licAmount}
                          onChange={(e) => handleInputChange('licAmount', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="salary-earnings-row">
                      <label className="salary-label">Other Deductions (% of Basic)</label>
                      <div className="salary-flex salary-gap-2">
                        <input 
                          type="number" 
                          className="salary-input salary-input-sm"
                          value={salaryData.otherDeductionsPercentage}
                          onChange={(e) => handleInputChange('otherDeductionsPercentage', parseFloat(e.target.value) || 0)}
                        />
                        <span className="salary-percentage">%</span>
                        <input 
                          type="number" 
                          className="salary-input salary-input-readonly"
                          value={calculatedValues.otherDeductionsAmount.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="salary-card salary-summary-card">
              <div className="salary-card-content">
                <div className="salary-summary-grid">
                  <div className="salary-summary-item">
                    <span className="salary-summary-label">Total Earnings:</span>
                    <span className="salary-summary-value salary-text-green">₹{calculatedValues.totalEarnings.toFixed(2)}</span>
                  </div>
                  <div className="salary-summary-item">
                    <span className="salary-summary-label">Total Deductions:</span>
                    <span className="salary-summary-value salary-text-red">₹{calculatedValues.totalDeductions.toFixed(2)}</span>
                  </div>
                  <div className="salary-summary-item salary-net-salary">
                    <span className="salary-summary-label">Net Salary:</span>
                    <span className="salary-summary-value salary-text-blue">₹{calculatedValues.netSalary.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="salary-flex salary-gap-4 salary-justify-center">
              <button 
                className="salary-btn salary-btn-primary"
                onClick={calculateSalary}
              >
                <CalculatorIcon style={{ width: '16px', height: '16px' }} />
                Calculate
              </button>
              <button 
                className="salary-btn salary-btn-success"
                onClick={handleSave}
              >
                <SaveIcon style={{ width: '16px', height: '16px' }} />
                Save
              </button>
            </div>
          </div>
        );

      case 'salary-master':
        return (
          <div className="salary-space-y-4">
            <div className="salary-card">
              <div className="salary-card-header">
                <h3 className="salary-card-title">
                  <UserIcon style={{ width: '16px', height: '16px' }} />
                  Salary Master Entries
                </h3>
              </div>
              <div className="salary-card-content">
                <div className="salary-table-container">
                  <table className="salary-table">
                    <thead>
                      <tr>
                        <th>Emp Code</th>
                        <th>Name</th>
                        <th>Basic Salary</th>
                        <th>Gross Salary</th>
                        <th>Net Salary</th>
                        <th>PF Group</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SSC001</td>
                        <td>SHUBHAM</td>
                        <td>₹5,000.00</td>
                        <td>₹10,000.00</td>
                        <td>₹8,500.00</td>
                        <td><span className="salary-badge salary-badge-blue">PF Group</span></td>
                        <td>15/Jul/2025</td>
                        <td>
                          <button className="salary-btn salary-btn-ghost salary-btn-xs">Edit</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'salary-reports':
        return (
          <div className="salary-space-y-4">
            <div className="salary-card">
              <div className="salary-card-header">
                <h3 className="salary-card-title">
                  <FileTextIcon style={{ width: '16px', height: '16px' }} />
                  Salary Reports
                </h3>
              </div>
              <div className="salary-card-content salary-space-y-4">
                <div className="salary-grid salary-grid-cols-2 salary-gap-4">
                  <div className="salary-form-group">
                    <label className="salary-label">Report Type</label>
                    <select className="salary-select">
                      <option>Monthly Salary Report</option>
                      <option>Annual Salary Report</option>
                      <option>Department Wise Report</option>
                      <option>PF Report</option>
                      <option>ESI Report</option>
                    </select>
                  </div>
                  <div className="salary-form-group">
                    <label className="salary-label">Month/Year</label>
                    <input type="month" className="salary-input" />
                  </div>
                </div>
                <div className="salary-flex salary-gap-2">
                  <button className="salary-btn salary-btn-primary">
                    <FileTextIcon style={{ width: '16px', height: '16px' }} />
                    Generate Report
                  </button>
                  <button className="salary-btn salary-btn-outline">
                    <DownloadIcon style={{ width: '16px', height: '16px' }} />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="salary-container">
      {/* Header */}
      <div className="salary-header">
        <div className="salary-header-content">
          <div className="salary-header-left">
            <div className="salary-icon">
              <CalculatorIcon style={{ color: 'white' }} />
            </div>
            <div>
              <h1 className="salary-title">Salary Calculation</h1>
              <p className="salary-subtitle">Employee salary calculation and management system</p>
            </div>
          </div>
          <div className="salary-header-actions">
            <button className="salary-btn salary-btn-outline salary-btn-sm">
              <DownloadIcon style={{ width: '16px', height: '16px' }} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="salary-main">
        {/* Tab Navigation */}
        <div className="salary-tabs">
          <div className="salary-tabs-container">
            <nav className="salary-tabs-nav">
              <div className="salary-tabs-list">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`salary-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon style={{ width: '16px', height: '16px' }} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        {renderTabContent()}
      </div>
    </div>
  );
}
