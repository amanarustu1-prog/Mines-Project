import React, { useState } from 'react';
import './styles.css';

const CalendarIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg className="leave-management-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = () => (
  <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const SaveIcon = () => (
  <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const Edit3Icon = () => (
  <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const UsersIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg className="leave-management-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const ClockIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg className="leave-management-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function LeaveManagement() {
  const [activeTab, setActiveTab] = useState('leave-overview');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [approvalNote, setApprovalNote] = useState('');

  // Sample leave data
  const [leaveData, setLeaveData] = useState([
    {
      id: 1,
      empNo: 'SSC001',
      name: 'SHUBHAM',
      fatherName: 'ASHOK',
      mobile: '9057241344',
      email: 'SHUBHAM@TIWARIMININGGROUP.COM',
      leaveType: 'EL',
      fromDate: '2025-07-20',
      toDate: '2025-07-22',
      days: 3,
      reason: 'Family function attendance',
      status: 'Pending',
      appliedDate: '2025-07-14',
      approverNote: ''
    },
    {
      id: 2,
      empNo: 'SSC002',
      name: 'RAHUL KUMAR',
      fatherName: 'RAM KUMAR',
      mobile: '9057241345',
      email: 'RAHUL@TIWARIMININGGROUP.COM',
      leaveType: 'SL',
      fromDate: '2025-07-15',
      toDate: '2025-07-16',
      days: 2,
      reason: 'Medical checkup',
      status: 'Approved',
      appliedDate: '2025-07-13',
      approverNote: 'Medical leave approved'
    },
    {
      id: 3,
      empNo: 'SSC003',
      name: 'PRIYA SHARMA',
      fatherName: 'SURESH SHARMA',
      mobile: '9057241346',
      email: 'PRIYA@TIWARIMININGGROUP.COM',
      leaveType: 'CL',
      fromDate: '2025-07-25',
      toDate: '2025-07-25',
      days: 1,
      reason: 'Personal work',
      status: 'Rejected',
      appliedDate: '2025-07-12',
      approverNote: 'Peak project period, cannot approve casual leave'
    }
  ]);

  // New leave form data
  const [newLeave, setNewLeave] = useState({
    empNo: 'SSC001',
    name: 'SHUBHAM',
    fatherName: 'ASHOK',
    mobile: '9057241344',
    email: 'SHUBHAM@TIWARIMININGGROUP.COM',
    leaveType: 'EL',
    fromDate: '',
    toDate: '',
    days: 0,
    reason: '',
    status: 'Pending',
    appliedDate: new Date().toISOString().split('T')[0],
    approverNote: ''
  });

  const tabs = [
    { id: 'leave-overview', label: 'Leave Overview', icon: CalendarIcon },
    { id: 'add-leave', label: 'Add Leave Request', icon: PlusIcon },
    { id: 'leave-reports', label: 'Reports', icon: FileTextIcon }
  ];

  const employees = [
    { empNo: 'SSC001', name: 'SHUBHAM', fatherName: 'ASHOK', mobile: '9057241344', email: 'SHUBHAM@TIWARIMININGGROUP.COM' },
    { empNo: 'SSC002', name: 'RAHUL KUMAR', fatherName: 'RAM KUMAR', mobile: '9057241345', email: 'RAHUL@TIWARIMININGGROUP.COM' },
    { empNo: 'SSC003', name: 'PRIYA SHARMA', fatherName: 'SURESH SHARMA', mobile: '9057241346', email: 'PRIYA@TIWARIMININGGROUP.COM' }
  ];

  const leaveTypes = [
    { code: 'EL', name: 'Earned Leave' },
    { code: 'SL', name: 'Sick Leave' },
    { code: 'CL', name: 'Casual Leave' },
    { code: 'ML', name: 'Maternity Leave' },
    { code: 'PL', name: 'Paternity Leave' },
    { code: 'LWP', name: 'Leave Without Pay' }
  ];

  const handleEmployeeSelect = (empNo: string) => {
    const employee = employees.find(emp => emp.empNo === empNo);
    if (employee) {
      setNewLeave(prev => ({
        ...prev,
        empNo: employee.empNo,
        name: employee.name,
        fatherName: employee.fatherName,
        mobile: employee.mobile,
        email: employee.email
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewLeave(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateLeaveDays = () => {
    if (newLeave.fromDate && newLeave.toDate) {
      const fromDate = new Date(newLeave.fromDate);
      const toDate = new Date(newLeave.toDate);
      const diffTime = toDate.getTime() - fromDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(0, diffDays);
    }
    return 0;
  };

  const handleSaveLeave = () => {
    const days = calculateLeaveDays();
    const newEntry = {
      id: leaveData.length + 1,
      ...newLeave,
      days,
      appliedDate: new Date().toISOString().split('T')[0]
    };

    setLeaveData(prev => [...prev, newEntry]);
    setNewLeave({
      empNo: 'SSC001',
      name: 'SHUBHAM',
      fatherName: 'ASHOK',
      mobile: '9057241344',
      email: 'SHUBHAM@TIWARIMININGGROUP.COM',
      leaveType: 'EL',
      fromDate: '',
      toDate: '',
      days: 0,
      reason: '',
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      approverNote: ''
    });
    alert('Leave request saved successfully!');
  };

  const handleApproveReject = (leave: any, action: string) => {
    setSelectedLeave({ ...leave, action });
    setShowApprovalModal(true);
  };

  const submitApproval = () => {
    if (selectedLeave) {
      const updatedStatus = selectedLeave.action === 'approve' ? 'Approved' : 'Rejected';
      setLeaveData(prev => 
        prev.map(leave => 
          leave.id === selectedLeave.id 
            ? { ...leave, status: updatedStatus, approverNote: approvalNote }
            : leave
        )
      );
      setShowApprovalModal(false);
      setApprovalNote('');
      setSelectedLeave(null);
      alert(`Leave request ${updatedStatus.toLowerCase()} successfully!`);
    }
  };

  const getStatusBadge = (status: string) => {
    const className = `leave-management-badge leave-management-badge-${status.toLowerCase()}`;
    return <span className={className}>{status}</span>;
  };

  const getLeaveTypeBadge = (leaveType: string) => {
    const className = `leave-management-badge leave-management-badge-${leaveType.toLowerCase()}`;
    return <span className={className}>{leaveType}</span>;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'leave-overview':
        return (
          <div className="leave-management-space-y-4">
            {/* Leave Summary Cards */}
            <div className="leave-management-summary-grid">
              <div className="leave-management-summary-card">
                <div className="leave-management-summary-content">
                  <div className="leave-management-summary-item">
                    <div className="leave-management-icon-container leave-management-icon-yellow">
                      <AlertCircleIcon />
                    </div>
                    <div>
                      <p className="leave-management-metric-label">Pending Requests</p>
                      <p className="leave-management-metric-value leave-management-metric-yellow">
                        {leaveData.filter(leave => leave.status === 'Pending').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="leave-management-summary-card">
                <div className="leave-management-summary-content">
                  <div className="leave-management-summary-item">
                    <div className="leave-management-icon-container leave-management-icon-green">
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <p className="leave-management-metric-label">Approved</p>
                      <p className="leave-management-metric-value leave-management-metric-green">
                        {leaveData.filter(leave => leave.status === 'Approved').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="leave-management-summary-card">
                <div className="leave-management-summary-content">
                  <div className="leave-management-summary-item">
                    <div className="leave-management-icon-container leave-management-icon-red">
                      <XCircleIcon />
                    </div>
                    <div>
                      <p className="leave-management-metric-label">Rejected</p>
                      <p className="leave-management-metric-value leave-management-metric-red">
                        {leaveData.filter(leave => leave.status === 'Rejected').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="leave-management-summary-card">
                <div className="leave-management-summary-content">
                  <div className="leave-management-summary-item">
                    <div className="leave-management-icon-container leave-management-icon-blue">
                      <CalendarIcon />
                    </div>
                    <div>
                      <p className="leave-management-metric-label">Total Requests</p>
                      <p className="leave-management-metric-value leave-management-metric-blue">{leaveData.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Leave Requests Table */}
            <div className="leave-management-card">
              <div className="leave-management-card-header">
                <h3 className="leave-management-card-title">
                  <CalendarIcon />
                  Leave Requests - {new Date().getFullYear()}
                </h3>
                <button 
                  className="leave-management-button leave-management-button-primary leave-management-button-sm"
                  onClick={() => setActiveTab('add-leave')}
                >
                  <PlusIcon />
                  Add Leave Request
                </button>
              </div>
              <div className="leave-management-card-content" style={{padding: 0}}>
                <div className="leave-management-table-container">
                  <table className="leave-management-table">
                    <thead>
                      <tr>
                        <th>Emp No</th>
                        <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Days</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Applied Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveData.map((leave) => (
                        <tr key={leave.id}>
                          <td className="leave-management-font-medium leave-management-text-blue-600">{leave.empNo}</td>
                          <td className="leave-management-font-medium">{leave.name}</td>
                          <td>{getLeaveTypeBadge(leave.leaveType)}</td>
                          <td className="leave-management-font-mono">{new Date(leave.fromDate).toLocaleDateString('en-GB')}</td>
                          <td className="leave-management-font-mono">{new Date(leave.toDate).toLocaleDateString('en-GB')}</td>
                          <td className="leave-management-font-medium" style={{textAlign: 'center'}}>{leave.days}</td>
                          <td className="leave-management-text-gray-600 leave-management-max-w-32 leave-management-truncate" title={leave.reason}>
                            {leave.reason}
                          </td>
                          <td>{getStatusBadge(leave.status)}</td>
                          <td className="leave-management-font-mono leave-management-text-xs">{new Date(leave.appliedDate).toLocaleDateString('en-GB')}</td>
                          <td>
                            <div style={{display: 'flex', gap: '0.25rem'}}>
                              {leave.status === 'Pending' && (
                                <>
                                  <button 
                                    className="leave-management-button-ghost"
                                    onClick={() => handleApproveReject(leave, 'approve')}
                                    style={{color: '#059669'}}
                                  >
                                    <CheckCircleIcon />
                                  </button>
                                  <button 
                                    className="leave-management-button-ghost"
                                    onClick={() => handleApproveReject(leave, 'reject')}
                                    style={{color: '#dc2626'}}
                                  >
                                    <XCircleIcon />
                                  </button>
                                </>
                              )}
                              <button className="leave-management-button-ghost">
                                <Edit3Icon />
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

      case 'add-leave':
        return (
          <div className="leave-management-space-y-4">
            <div className="leave-management-card">
              <div className="leave-management-card-header">
                <h3 className="leave-management-card-title">
                  <PlusIcon />
                  HR Module: Leave Entry Form
                </h3>
              </div>
              <div className="leave-management-card-content leave-management-space-y-6">
                {/* Employee Selection */}
                <div className="leave-management-grid leave-management-grid-cols-1 leave-management-md-grid-cols-2">
                  <div className="leave-management-space-y-4">
                    <div className="leave-management-form-group">
                      <label className="leave-management-label">Select Employee Name ***</label>
                      <select 
                        value={newLeave.empNo}
                        onChange={(e) => handleEmployeeSelect(e.target.value)}
                        className="leave-management-select"
                      >
                        {employees.map(emp => (
                          <option key={emp.empNo} value={emp.empNo}>
                            {emp.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="leave-management-form-group">
                      <label className="leave-management-label">Leave Type:-</label>
                      <select 
                        value={newLeave.leaveType}
                        onChange={(e) => handleInputChange('leaveType', e.target.value)}
                        className="leave-management-select"
                      >
                        {leaveTypes.map(type => (
                          <option key={type.code} value={type.code}>
                            {type.code} - {type.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="leave-management-form-group">
                      <label className="leave-management-label">Leave Req From:-</label>
                      <input 
                        type="date"
                        value={newLeave.fromDate}
                        onChange={(e) => handleInputChange('fromDate', e.target.value)}
                        className="leave-management-input"
                      />
                    </div>

                    <div className="leave-management-form-group">
                      <label className="leave-management-label">Leave Req To:-</label>
                      <input 
                        type="date"
                        value={newLeave.toDate}
                        onChange={(e) => handleInputChange('toDate', e.target.value)}
                        className="leave-management-input"
                      />
                    </div>

                    <div className="leave-management-form-group">
                      <label className="leave-management-label">Total Days:-</label>
                      <input 
                        value={`${calculateLeaveDays()} days`}
                        readOnly
                        className="leave-management-input leave-management-font-medium"
                      />
                    </div>
                  </div>

                  <div className="leave-management-space-y-4">
                    <div className="leave-management-form-group">
                      <label className="leave-management-label">Employee Name</label>
                      <input 
                        value={newLeave.name}
                        readOnly
                        className="leave-management-input leave-management-font-medium"
                      />
                    </div>

                    <div className="leave-management-form-group">
                      <label className="leave-management-label">Father Name</label>
                      <input 
                        value={newLeave.fatherName}
                        readOnly
                        className="leave-management-input"
                      />
                    </div>

                    <div className="leave-management-form-group">
                      <label className="leave-management-label">Mobile</label>
                      <input 
                        value={newLeave.mobile}
                        readOnly
                        className="leave-management-input"
                      />
                    </div>

                    <div className="leave-management-form-group">
                      <label className="leave-management-label">Email</label>
                      <input 
                        value={newLeave.email}
                        readOnly
                        className="leave-management-input leave-management-text-xs"
                      />
                    </div>

                    <div className="leave-management-form-group">
                      <label className="leave-management-label">Applied Date</label>
                      <input 
                        value={new Date(newLeave.appliedDate).toLocaleDateString('en-GB')}
                        readOnly
                        className="leave-management-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Reason Section */}
                <div className="leave-management-border-t leave-management-pt-6">
                  <div className="leave-management-form-group">
                    <label className="leave-management-label">Reason For Leave ***</label>
                    <textarea 
                      value={newLeave.reason}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      className="leave-management-input leave-management-textarea"
                      rows={4}
                      placeholder="Please provide detailed reason for leave request..."
                    />
                  </div>

                  <div style={{display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb'}}>
                    <button 
                      onClick={handleSaveLeave}
                      className="leave-management-button leave-management-button-success"
                      disabled={!newLeave.fromDate || !newLeave.toDate || !newLeave.reason.trim()}
                    >
                      <SaveIcon />
                      Save Leave Request Details
                    </button>
                    <button 
                      className="leave-management-button leave-management-button-outline"
                      onClick={() => setActiveTab('leave-overview')}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'leave-reports':
        return (
          <div className="leave-management-space-y-4">
            <div className="leave-management-card">
              <div className="leave-management-card-header">
                <h3 className="leave-management-card-title">
                  <FileTextIcon />
                  Leave Reports & Analytics
                </h3>
              </div>
              <div className="leave-management-card-content leave-management-space-y-4">
                <div className="leave-management-grid leave-management-grid-cols-1 leave-management-md-grid-cols-2" style={{gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'}}>
                  <div className="leave-management-card" style={{border: '1px solid #e5e7eb'}}>
                    <div className="leave-management-card-content" style={{padding: '1rem', textAlign: 'center'}}>
                      <CalendarIcon style={{width: '2rem', height: '2rem', color: '#2563eb', margin: '0 auto 0.5rem'}} />
                      <h3 className="leave-management-font-semibold leave-management-text-gray-900">Monthly Leave Report</h3>
                      <p className="leave-management-text-sm leave-management-text-gray-600" style={{marginBottom: '0.75rem'}}>Generate monthly leave summary</p>
                      <button className="leave-management-button leave-management-button-outline leave-management-button-sm">
                        <DownloadIcon />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="leave-management-card" style={{border: '1px solid #e5e7eb'}}>
                    <div className="leave-management-card-content" style={{padding: '1rem', textAlign: 'center'}}>
                      <UsersIcon style={{width: '2rem', height: '2rem', color: '#059669', margin: '0 auto 0.5rem'}} />
                      <h3 className="leave-management-font-semibold leave-management-text-gray-900">Employee Wise Leave</h3>
                      <p className="leave-management-text-sm leave-management-text-gray-600" style={{marginBottom: '0.75rem'}}>Individual employee leave balance</p>
                      <button className="leave-management-button leave-management-button-outline leave-management-button-sm">
                        <DownloadIcon />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="leave-management-card" style={{border: '1px solid #e5e7eb'}}>
                    <div className="leave-management-card-content" style={{padding: '1rem', textAlign: 'center'}}>
                      <ClockIcon style={{width: '2rem', height: '2rem', color: '#d97706', margin: '0 auto 0.5rem'}} />
                      <h3 className="leave-management-font-semibold leave-management-text-gray-900">Leave Type Analysis</h3>
                      <p className="leave-management-text-sm leave-management-text-gray-600" style={{marginBottom: '0.75rem'}}>Leave type wise breakdown</p>
                      <button className="leave-management-button leave-management-button-outline leave-management-button-sm">
                        <DownloadIcon />
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem'}}>
                  <h4 className="leave-management-font-semibold" style={{color: '#1e40af', marginBottom: '0.5rem'}}>Leave Statistics</h4>
                  <div className="leave-management-grid leave-management-grid-cols-2" style={{gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem', textAlign: 'center'}}>
                    <div>
                      <p className="leave-management-text-lg leave-management-font-bold leave-management-text-blue-600">
                        {leaveData.reduce((sum, leave) => sum + leave.days, 0)}
                      </p>
                      <p className="leave-management-text-sm" style={{color: '#1d4ed8'}}>Total Leave Days</p>
                    </div>
                    <div>
                      <p className="leave-management-text-lg leave-management-font-bold" style={{color: '#059669'}}>
                        {leaveData.filter(leave => leave.status === 'Approved').reduce((sum, leave) => sum + leave.days, 0)}
                      </p>
                      <p className="leave-management-text-sm" style={{color: '#047857'}}>Approved Days</p>
                    </div>
                    <div>
                      <p className="leave-management-text-lg leave-management-font-bold" style={{color: '#d97706'}}>
                        {leaveData.filter(leave => leave.status === 'Pending').reduce((sum, leave) => sum + leave.days, 0)}
                      </p>
                      <p className="leave-management-text-sm" style={{color: '#b45309'}}>Pending Days</p>
                    </div>
                    <div>
                      <p className="leave-management-text-lg leave-management-font-bold" style={{color: '#7c3aed'}}>
                        {Math.round((leaveData.filter(leave => leave.status === 'Approved').length / leaveData.length) * 100)}%
                      </p>
                      <p className="leave-management-text-sm" style={{color: '#6d28d9'}}>Approval Rate</p>
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
    <div className="leave-management-container">
      {/* Header */}
      <div className="leave-management-header">
        <div className="leave-management-header-content">
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <div className="leave-management-logo">
              <CalendarIcon style={{color: 'white'}} />
            </div>
            <div>
              <h1 className="leave-management-title">Leave Management</h1>
              <p className="leave-management-subtitle">Employee leave requests and approval system</p>
            </div>
          </div>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <button className="leave-management-button leave-management-button-outline leave-management-button-sm">
              <DownloadIcon />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="leave-management-main container">
        
        {/* Tab Navigation */}
        <div className="leave-management-tabs">
          <div className="leave-management-tabs-container">
            <nav className="leave-management-nav">
              <div className="leave-management-tab-list">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`leave-management-tab-button ${
                      activeTab === tab.id ? 'active' : ''
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

      {/* Approval/Rejection Modal */}
      {showApprovalModal && selectedLeave && (
        <div className="leave-management-modal-overlay">
          <div className="leave-management-modal leave-management-fade-in">
            <h3 className="leave-management-modal-title">
              {selectedLeave.action === 'approve' ? 'Approve' : 'Reject'} Leave Request
            </h3>
            <div className="leave-management-modal-info">
              <p>Employee: <span className="leave-management-font-medium">{selectedLeave.name}</span></p>
              <p>Leave Type: <span className="leave-management-font-medium">{selectedLeave.leaveType}</span></p>
              <p>Duration: <span className="leave-management-font-medium">{selectedLeave.days} days</span></p>
              <p>Reason: <span className="leave-management-font-medium">{selectedLeave.reason}</span></p>
            </div>
            <div className="leave-management-form-group">
              <label className="leave-management-label">Approver Note</label>
              <textarea
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                className="leave-management-input leave-management-textarea"
                rows={3}
                placeholder={`Add a note for ${selectedLeave.action === 'approve' ? 'approval' : 'rejection'}...`}
              />
            </div>
            <div className="leave-management-modal-actions">
              <button
                onClick={submitApproval}
                className={`leave-management-button ${selectedLeave.action === 'approve' ? 'leave-management-button-success' : 'leave-management-button-danger'}`}
              >
                {selectedLeave.action === 'approve' ? 'Approve' : 'Reject'}
              </button>
              <button
                className="leave-management-button leave-management-button-outline"
                onClick={() => {
                  setShowApprovalModal(false);
                  setApprovalNote('');
                  setSelectedLeave(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
