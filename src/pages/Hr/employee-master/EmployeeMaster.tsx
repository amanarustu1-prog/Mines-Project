import React, { useState } from 'react';
import './styles.css';

// import './styles.css';

// Icons as simple SVG components
const UserIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg className="employee-master-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const PlusIcon = () => (
    <svg className="employee-master-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const FileTextIcon = () => (
    <svg className="employee-master-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const UsersIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg className="employee-master-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg className="employee-master-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ClockIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg className="employee-master-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SaveIcon = () => (
    <svg className="employee-master-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const DownloadIcon = () => (
    <svg className="employee-master-icon" fill="none" stroke="black" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const Edit3Icon = () => (
    <svg className="employee-master-icon" fill="none" stroke="black" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const TrendingUpIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg className="employee-master-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

function EmployeeMaster() {
    const [activeTab, setActiveTab] = useState('employee-overview');

    // Sample employee data
    const [employeeData, setEmployeeData] = useState([
        {
            id: 1,
            empNo: 'SSC001',
            name: 'SHUBHAM',
            fatherName: 'ASHOK',
            mobile: '9057241344',
            email: 'SHUBHAM@TIWARIMININGGROUP.COM',
            designation: 'Mining Engineer',
            department: 'Mining Operations',
            joiningDate: '2024-01-15',
            salary: 75000,
            status: 'Active'
        },
        {
            id: 2,
            empNo: 'SSC002',
            name: 'RAHUL KUMAR',
            fatherName: 'RAM KUMAR',
            mobile: '9057241345',
            email: 'RAHUL@TIWARIMININGGROUP.COM',
            designation: 'Safety Officer',
            department: 'Safety & Compliance',
            joiningDate: '2024-02-01',
            salary: 65000,
            status: 'Active'
        },
        {
            id: 3,
            empNo: 'SSC003',
            name: 'PRIYA SHARMA',
            fatherName: 'SURESH SHARMA',
            mobile: '9057241346',
            email: 'PRIYA@TIWARIMININGGROUP.COM',
            designation: 'HR Manager',
            department: 'Human Resources',
            joiningDate: '2023-11-20',
            salary: 80000,
            status: 'Active'
        }
    ]);

    // New employee form data
    const [newEmployee, setNewEmployee] = useState({
        empNo: '',
        name: '',
        fatherName: '',
        mobile: '',
        email: '',
        designation: '',
        department: '',
        joiningDate: new Date().toISOString().split('T')[0],
        salary: 0,
        status: 'Active'
    });

    const tabs = [
        { id: 'employee-overview', label: 'Employee Overview', icon: UsersIcon },
        { id: 'add-employee', label: 'Add Employee', icon: PlusIcon },
        { id: 'employee-reports', label: 'Reports', icon: FileTextIcon }
    ];

    const departments = [
        'Mining Operations',
        'Safety & Compliance',
        'Human Resources',
        'Finance & Accounts',
        'Equipment Maintenance',
        'Quality Control',
        'Administration'
    ];

    const handleInputChange = (field: string, value: string | number) => {
        setNewEmployee(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveEmployee = () => {
        const newEntry = {
            id: employeeData.length + 1,
            ...newEmployee
        };

        setEmployeeData(prev => [...prev, newEntry]);
        setNewEmployee({
            empNo: '',
            name: '',
            fatherName: '',
            mobile: '',
            email: '',
            designation: '',
            department: '',
            joiningDate: new Date().toISOString().split('T')[0],
            salary: 0,
            status: 'Active'
        });
        alert('Employee added successfully!');
    };

    const getStatusBadge = (status: string) => {
        const className = `employee-master-badge employee-master-badge-${status.toLowerCase()}`;
        return <span className={className}>{status}</span>;
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'employee-overview':
                return (
                    <div className="employee-master-space-y-4">
                        {/* Employee Summary Cards */}
                        <div className="employee-master-summary-grid">
                            <div className="employee-master-summary-card">
                                <div className="employee-master-summary-content">
                                    <div className="employee-master-summary-item">
                                        <div className="employee-master-icon-container employee-master-icon-blue">
                                            <UsersIcon />
                                        </div>
                                        <div>
                                            <p className="employee-master-metric-label">Total Employees</p>
                                            <p className="employee-master-metric-value employee-master-metric-blue">{employeeData.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="employee-master-summary-card">
                                <div className="employee-master-summary-content">
                                    <div className="employee-master-summary-item">
                                        <div className="employee-master-icon-container employee-master-icon-green">
                                            <CheckCircleIcon />
                                        </div>
                                        <div>
                                            <p className="employee-master-metric-label">Active Employees</p>
                                            <p className="employee-master-metric-value employee-master-metric-green">
                                                {employeeData.filter(emp => emp.status === 'Active').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="employee-master-summary-card">
                                <div className="employee-master-summary-content">
                                    <div className="employee-master-summary-item">
                                        <div className="employee-master-icon-container employee-master-icon-purple">
                                            <TrendingUpIcon />
                                        </div>
                                        <div>
                                            <p className="employee-master-metric-label">Departments</p>
                                            <p className="employee-master-metric-value employee-master-metric-purple">
                                                {new Set(employeeData.map(emp => emp.department)).size}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="employee-master-summary-card">
                                <div className="employee-master-summary-content">
                                    <div className="employee-master-summary-item">
                                        <div className="employee-master-icon-container employee-master-icon-yellow">
                                            <ClockIcon />
                                        </div>
                                        <div>
                                            <p className="employee-master-metric-label">New Joinings (This Month)</p>
                                            <p className="employee-master-metric-value employee-master-metric-yellow">
                                                {employeeData.filter(emp => {
                                                    const joinDate = new Date(emp.joiningDate);
                                                    const currentDate = new Date();
                                                    return joinDate.getMonth() === currentDate.getMonth() &&
                                                        joinDate.getFullYear() === currentDate.getFullYear();
                                                }).length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Employee List Table */}
                        <div className="employee-master-card">
                            <div className="employee-master-card-header">
                                <h3 className="employee-master-card-title">
                                    <UsersIcon />
                                    Employee Master Records - {new Date().getFullYear()}
                                </h3>
                                <button
                                    className="employee-master-button employee-master-button-primary employee-master-button-sm"
                                    onClick={() => setActiveTab('add-employee')}
                                >
                                    <PlusIcon />
                                    Add Employee
                                </button>
                            </div>
                            <div className="employee-master-card-content" style={{ padding: 0 }}>
                                <div className="employee-master-table-container">
                                    <table className="employee-master-table">
                                        <thead>
                                            <tr>
                                                <th>Emp No</th>
                                                <th>Employee Name</th>
                                                <th>Father's Name</th>
                                                <th>Contact</th>
                                                <th>Designation</th>
                                                <th>Department</th>
                                                <th>Joining Date</th>
                                                <th>Salary</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employeeData.map((employee) => (
                                                <tr key={employee.id}>
                                                    <td className="employee-master-font-medium employee-master-text-blue-600">{employee.empNo}</td>
                                                    <td className="employee-master-font-medium">{employee.name}</td>
                                                    <td>{employee.fatherName}</td>
                                                    <td>
                                                        <div>
                                                            <div className="employee-master-font-mono employee-master-text-sm">{employee.mobile}</div>
                                                            <div className="employee-master-text-xs employee-master-text-gray-500 employee-master-truncate employee-master-max-w-32" title={employee.email}>
                                                                {employee.email}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="employee-master-font-medium">{employee.designation}</td>
                                                    <td className="employee-master-text-sm">{employee.department}</td>
                                                    <td className="employee-master-font-mono">{new Date(employee.joiningDate).toLocaleDateString('en-GB')}</td>
                                                    <td className="employee-master-value">{formatCurrency(employee.salary)}</td>
                                                    <td>{getStatusBadge(employee.status)}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                            <button 
                                                                className="employee-master-button-ghost"
                                                                title="Edit Employee"
                                                                onClick={() => console.log('Edit:', employee.id)}
                                                            >
                                                                <Edit3Icon />
                                                            </button>
                                                            <button 
                                                                className="employee-master-button-ghost"
                                                                title="Delete Employee"
                                                                onClick={() => {
                                                                    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
                                                                        console.log('Delete:', employee.id);
                                                                    }
                                                                }}
                                                            >
                                                                <svg className="employee-master-icon" fill="none" stroke="red" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'add-employee':
                return (
                    <div className="employee-master-space-y-4">
                        <div className="employee-master-card">
                            <div className="employee-master-card-header">
                                <h3 className="employee-master-card-title">
                                    <PlusIcon />
                                    HR Module: Employee Master Entry
                                </h3>
                            </div>
                            <div className="employee-master-card-content employee-master-space-y-6">
                                {/* Employee Details Form */}
                                <div className="employee-master-grid employee-master-grid-cols-1 employee-master-md-grid-cols-2 employee-master-gap-6">
                                    <div className="employee-master-space-y-4">
                                        <div className="employee-master-form-group">
                                            <label className="employee-master-label">Employee Number ***</label>
                                            <input
                                                type="text"
                                                value={newEmployee.empNo}
                                                onChange={(e) => handleInputChange('empNo', e.target.value)}
                                                className="employee-master-input"
                                                placeholder="Enter employee number (e.g., SSC004)"
                                            />
                                        </div>

                                        <div className="employee-master-form-group">
                                            <label className="employee-master-label">Employee Name ***</label>
                                            <input
                                                type="text"
                                                value={newEmployee.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="employee-master-input"
                                                placeholder="Enter full name"
                                            />
                                        </div>

                                        <div className="employee-master-form-group">
                                            <label className="employee-master-label">Father's Name ***</label>
                                            <input
                                                type="text"
                                                value={newEmployee.fatherName}
                                                onChange={(e) => handleInputChange('fatherName', e.target.value)}
                                                className="employee-master-input"
                                                placeholder="Enter father's name"
                                            />
                                        </div>

                                        <div className="employee-master-form-group">
                                            <label className="employee-master-label">Mobile Number ***</label>
                                            <input
                                                type="tel"
                                                value={newEmployee.mobile}
                                                onChange={(e) => handleInputChange('mobile', e.target.value)}
                                                className="employee-master-input"
                                                placeholder="Enter 10-digit mobile number"
                                            />
                                        </div>

                                        <div className="employee-master-form-group">
                                            <label className="employee-master-label">Email Address ***</label>
                                            <input
                                                type="email"
                                                value={newEmployee.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="employee-master-input"
                                                placeholder="Enter email address"
                                            />
                                        </div>
                                    </div>

                                    <div className="employee-master-space-y-4">
                                        <div className="employee-master-form-group">
                                            <label className="employee-master-label">Designation ***</label>
                                            <input
                                                type="text"
                                                value={newEmployee.designation}
                                                onChange={(e) => handleInputChange('designation', e.target.value)}
                                                className="employee-master-input"
                                                placeholder="Enter job designation"
                                            />
                                        </div>

                                        <div className="employee-master-form-group">
                                            <label className="employee-master-label">Department ***</label>
                                            <select
                                                value={newEmployee.department}
                                                onChange={(e) => handleInputChange('department', e.target.value)}
                                                className="employee-master-select"
                                            >
                                                <option value="">Select Department</option>
                                                {departments.map(dept => (
                                                    <option key={dept} value={dept}>
                                                        {dept}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="employee-master-form-group">
                                            <label className="employee-master-label">Joining Date ***</label>
                                            <input
                                                type="date"
                                                value={newEmployee.joiningDate}
                                                onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                                                className="employee-master-input"
                                            />
                                        </div>

                                        <div className="employee-master-form-group">
                                            <label className="employee-master-label">Monthly Salary (₹) ***</label>
                                            <input
                                                type="number"
                                                value={newEmployee.salary}
                                                onChange={(e) => handleInputChange('salary', Number(e.target.value))}
                                                className="employee-master-input"
                                                placeholder="Enter monthly salary"
                                            />
                                        </div>

                                        <div className="employee-master-form-group">
                                            <label className="employee-master-label">Status</label>
                                            <select
                                                value={newEmployee.status}
                                                onChange={(e) => handleInputChange('status', e.target.value)}
                                                className="employee-master-select"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                                <option value="On Leave">On Leave</option>
                                                <option value="Terminated">Terminated</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Section */}
                                <div className="employee-master-stats-container">
                                    <h4 className="employee-master-stats-title">Employee Summary</h4>
                                    <div className="employee-master-stats-grid">
                                        <div className="employee-master-stat-item">
                                            <div className="employee-master-stat-value employee-master-text-blue-600">{newEmployee.empNo || 'Not Set'}</div>
                                            <div className="employee-master-stat-label" style={{ color: '#1d4ed8' }}>Employee Number</div>
                                        </div>
                                        <div className="employee-master-stat-item">
                                            <div className="employee-master-stat-value" style={{ color: '#059669' }}>{newEmployee.name || 'Not Set'}</div>
                                            <div className="employee-master-stat-label" style={{ color: '#047857' }}>Employee Name</div>
                                        </div>
                                        <div className="employee-master-stat-item">
                                            <div className="employee-master-stat-value" style={{ color: '#d97706' }}>{newEmployee.department || 'Not Set'}</div>
                                            <div className="employee-master-stat-label" style={{ color: '#b45309' }}>Department</div>
                                        </div>
                                        <div className="employee-master-stat-item">
                                            <div className="employee-master-stat-value" style={{ color: '#7c3aed' }}>{newEmployee.salary ? formatCurrency(newEmployee.salary) : 'Not Set'}</div>
                                            <div className="employee-master-stat-label" style={{ color: '#6d28d9' }}>Monthly Salary</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="employee-master-border-t employee-master-pt-6">
                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                                        <button
                                            onClick={handleSaveEmployee}
                                            className="employee-master-button employee-master-button-success"
                                            style={{ backgroundColor: 'black', color: 'white' }}
                                            disabled={!newEmployee.empNo || !newEmployee.name || !newEmployee.fatherName || !newEmployee.mobile || !newEmployee.email || !newEmployee.designation || !newEmployee.department}
                                        >
                                            <SaveIcon />
                                            Save Employee Details
                                        </button>
                                        <button
                                            className="employee-master-button employee-master-button-outline"
                                            onClick={() => setActiveTab('employee-overview')}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'employee-reports':
                return (
                    <div className="employee-master-space-y-4">
                        <div className="employee-master-card">
                            <div className="employee-master-card-header">
                                <h3 className="employee-master-card-title">
                                    <FileTextIcon />
                                    Employee Reports & Analytics
                                </h3>
                            </div>
                            <div className="employee-master-card-content employee-master-space-y-4">
                                <div className="employee-master-report-grid">
                                    <div className="employee-master-report-card">
                                        <UsersIcon style={{ width: '2rem', height: '2rem', color: '#2563eb', margin: '0 auto 0.5rem' }} />
                                        <h3 className="employee-master-font-semibold employee-master-text-gray-900">Employee Directory</h3>
                                        <p className="employee-master-text-sm employee-master-text-gray-600" style={{ marginBottom: '0.75rem' }}>Complete employee list with contact details</p>
                                        <button className="employee-master-button employee-master-button-outline employee-master-button-sm">
                                            <DownloadIcon />
                                            Download
                                        </button>
                                    </div>

                                    <div className="employee-master-report-card">
                                        <TrendingUpIcon style={{ width: '2rem', height: '2rem', color: '#059669', margin: '0 auto 0.5rem' }} />
                                        <h3 className="employee-master-font-semibold employee-master-text-gray-900">Department Wise Report</h3>
                                        <p className="employee-master-text-sm employee-master-text-gray-600" style={{ marginBottom: '0.75rem' }}>Employee distribution by department</p>
                                        <button className="employee-master-button employee-master-button-outline employee-master-button-sm">
                                            <DownloadIcon />
                                            Download
                                        </button>
                                    </div>

                                    <div className="employee-master-report-card">
                                        <ClockIcon style={{ width: '2rem', height: '2rem', color: '#d97706', margin: '0 auto 0.5rem' }} />
                                        <h3 className="employee-master-font-semibold employee-master-text-gray-900">Joining Report</h3>
                                        <p className="employee-master-text-sm employee-master-text-gray-600" style={{ marginBottom: '0.75rem' }}>Monthly and yearly joining analysis</p>
                                        <button className="employee-master-button employee-master-button-outline employee-master-button-sm">
                                            <DownloadIcon />
                                            Download
                                        </button>
                                    </div>
                                </div>

                                <div className="employee-master-stats-container">
                                    <h4 className="employee-master-stats-title">Employee Statistics</h4>
                                    <div className="employee-master-stats-grid">
                                        <div className="employee-master-stat-item">
                                            <div className="employee-master-stat-value employee-master-text-blue-600">{employeeData.length}</div>
                                            <div className="employee-master-stat-label" style={{ color: '#1d4ed8' }}>Total Employees</div>
                                        </div>
                                        <div className="employee-master-stat-item">
                                            <div className="employee-master-stat-value" style={{ color: '#059669' }}>
                                                {formatCurrency(employeeData.reduce((sum, emp) => sum + emp.salary, 0))}
                                            </div>
                                            <div className="employee-master-stat-label" style={{ color: '#047857' }}>Total Payroll</div>
                                        </div>
                                        <div className="employee-master-stat-item">
                                            <div className="employee-master-stat-value" style={{ color: '#d97706' }}>
                                                {new Set(employeeData.map(emp => emp.department)).size}
                                            </div>
                                            <div className="employee-master-stat-label" style={{ color: '#b45309' }}>Active Departments</div>
                                        </div>
                                        <div className="employee-master-stat-item">
                                            <div className="employee-master-stat-value" style={{ color: '#7c3aed' }}>
                                                {formatCurrency(employeeData.reduce((sum, emp) => sum + emp.salary, 0) / employeeData.length)}
                                            </div>
                                            <div className="employee-master-stat-label" style={{ color: '#6d28d9' }}>Average Salary</div>
                                        </div>
                                    </div>
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
        <div className="employee-master-container">
            {/* Header */}
            <div className="employee-master-header">
                <div className="employee-master-header-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="employee-master-logo">
                            <UserIcon />
                        </div>
                        <div>
                            <h1 className="employee-master-title">Employee Master</h1>
                            <p className="employee-master-subtitle">Comprehensive employee information management system</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', color: 'black' }}>
                        <button className="employee-master-button employee-master-button-outline employee-master-button-sm" style={{ color: 'black' }}>
                            <DownloadIcon />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Container */}
            {/* container */}
            <div className="employee-master-main ">

                {/* Tab Navigation */}
                <div className="employee-master-tabs">
                    <div className="employee-master-tabs-container">
                        <nav className="employee-master-nav">
                            <div className="employee-master-tab-list">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`employee-master-tab-button ${activeTab === tab.id ? 'active' : ''
                                            }`}
                                    >
                                        <tab.icon />
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

export default EmployeeMaster;
