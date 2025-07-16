import React, { useState } from 'react';
import './styles.css';

// SVG Icon Components for standalone usage
const PackageIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', ...style }}
  >
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const PlusIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', ...style }}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const FileTextIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', ...style }}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

const DownloadIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', ...style }}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const DollarSignIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', ...style }}
  >
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const Edit3Icon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', ...style }}
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const TrashIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', ...style }}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c0-1-1-2-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c0 1 1 2 2 2v2" />
  </svg>
);

const SaveIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', ...style }}
  >
    <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
    <path d="M7 3v4a1 1 0 0 0 1 1h8" />
  </svg>
);

const UsersIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', ...style }}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

function EmployeeBelongingsManagement() {
  const [activeTab, setActiveTab] = useState('belongings-overview');

  // Sample belongings data
  const [belongingsData, setBelongingsData] = useState([
    {
      id: 1,
      empNo: 'SSC001',
      name: 'SHUBHAM',
      fatherName: 'ASHOK',
      mobile: '9057241344',
      doj: '01/Mar/20',
      curSal: '10000.00',
      itemIssued: 'Laptop Dell Inspiron 15',
      itemValue: '45000.00',
      issuedOn: '2025-07-01',
      itemStatus: 'Issued',
      remarks: 'Assigned for development work'
    },
    {
      id: 2,
      empNo: 'SSC002',
      name: 'RAHUL KUMAR',
      fatherName: 'RAM KUMAR',
      mobile: '9057241345',
      doj: '15/Jun/21',
      curSal: '12000.00',
      itemIssued: 'Mobile Phone iPhone 13',
      itemValue: '65000.00',
      issuedOn: '2025-06-15',
      itemStatus: 'Issued',
      remarks: 'Official mobile for field work'
    },
    {
      id: 3,
      empNo: 'SSC003',
      name: 'PRIYA SHARMA',
      fatherName: 'SURESH SHARMA',
      mobile: '9057241346',
      doj: '10/Jan/22',
      curSal: '8000.00',
      itemIssued: 'Monitor Samsung 24 inch',
      itemValue: '15000.00',
      issuedOn: '2025-05-20',
      itemStatus: 'Returned',
      remarks: 'Returned after project completion'
    },
    {
      id: 4,
      empNo: 'SSC004',
      name: 'AMIT SINGH',
      fatherName: 'RAJESH SINGH',
      mobile: '9057241347',
      doj: '05/Aug/21',
      curSal: '11000.00',
      itemIssued: 'Headset Logitech H390',
      itemValue: '3500.00',
      issuedOn: '2025-07-10',
      itemStatus: 'Issued',
      remarks: 'For customer support role'
    }
  ]);

  // New belonging form data
  const [newBelonging, setNewBelonging] = useState({
    empNo: 'SSC001',
    name: 'SHUBHAM',
    fatherName: 'ASHOK',
    mobile: '9057241344',
    doj: '01/Mar/20',
    curSal: '10000.00',
    itemIssued: '',
    itemValue: '',
    issuedOn: new Date().toISOString().split('T')[0],
    itemStatus: 'Issued',
    remarks: ''
  });

  const tabs = [
    { id: 'belongings-overview', label: 'Belongings Overview', icon: PackageIcon },
    { id: 'add-belonging', label: 'Issue Item', icon: PlusIcon },
    { id: 'belongings-reports', label: 'Reports', icon: FileTextIcon }
  ];

  const employees = [
    { empNo: 'SSC001', name: 'SHUBHAM', fatherName: 'ASHOK', mobile: '9057241344', doj: '01/Mar/20', curSal: '10000.00' },
    { empNo: 'SSC002', name: 'RAHUL KUMAR', fatherName: 'RAM KUMAR', mobile: '9057241345', doj: '15/Jun/21', curSal: '12000.00' },
    { empNo: 'SSC003', name: 'PRIYA SHARMA', fatherName: 'SURESH SHARMA', mobile: '9057241346', doj: '10/Jan/22', curSal: '8000.00' },
    { empNo: 'SSC004', name: 'AMIT SINGH', fatherName: 'RAJESH SINGH', mobile: '9057241347', doj: '05/Aug/21', curSal: '11000.00' }
  ];

  const itemCategories = [
    { name: 'Laptop', color: 'belongings-badge-blue' },
    { name: 'Mobile Phone', color: 'belongings-badge-green' },
    { name: 'Monitor', color: 'belongings-badge-purple' },
    { name: 'Headset', color: 'belongings-badge-orange' },
    { name: 'Other', color: 'belongings-badge-gray' }
  ];

  const handleEmployeeSelect = (empNo: string) => {
    const employee = employees.find(emp => emp.empNo === empNo);
    if (employee) {
      setNewBelonging(prev => ({
        ...prev,
        empNo: employee.empNo,
        name: employee.name,
        fatherName: employee.fatherName,
        mobile: employee.mobile,
        doj: employee.doj,
        curSal: employee.curSal
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewBelonging(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveBelonging = () => {
    const newEntry = {
      id: belongingsData.length + 1,
      ...newBelonging,
      issuedOn: newBelonging.issuedOn || new Date().toISOString().split('T')[0]
    };

    setBelongingsData(prev => [...prev, newEntry]);
    setNewBelonging({
      empNo: 'SSC001',
      name: 'SHUBHAM',
      fatherName: 'ASHOK',
      mobile: '9057241344',
      doj: '01/Mar/20',
      curSal: '10000.00',
      itemIssued: '',
      itemValue: '',
      issuedOn: new Date().toISOString().split('T')[0],
      itemStatus: 'Issued',
      remarks: ''
    });
    alert('Item issue details saved successfully!');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: string } = {
      'Issued': 'belongings-badge-green',
      'Returned': 'belongings-badge-blue',
      'Damaged': 'belongings-badge-red',
      'Lost': 'belongings-badge-gray'
    };
    const badgeClass = statusConfig[status] || 'belongings-badge-green';
    return (
      <span className={`belongings-badge ${badgeClass}`}>
        {status}
      </span>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'belongings-overview':
        return (
          <div className="belongings-space-y-4">
            {/* Belongings Summary Cards */}
            <div className="belongings-grid belongings-grid-cols-4 belongings-gap-4 belongings-mb-6">
              <div className="belongings-card">
                <div className="belongings-card-content belongings-p-4">
                  <div className="belongings-flex belongings-items-center belongings-gap-3">
                    <div className="belongings-icon-container belongings-green">
                      <PackageIcon style={{ color: '#059669' }} />
                    </div>
                    <div>
                      <p className="belongings-text-sm belongings-font-medium">Items Issued</p>
                      <p className="belongings-text-2xl belongings-font-bold belongings-text-green">
                        {belongingsData.filter(item => item.itemStatus === 'Issued').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="belongings-card">
                <div className="belongings-card-content belongings-p-4">
                  <div className="belongings-flex belongings-items-center belongings-gap-3">
                    <div className="belongings-icon-container belongings-blue">
                      <DownloadIcon style={{ color: '#2563eb' }} />
                    </div>
                    <div>
                      <p className="belongings-text-sm belongings-font-medium">Items Returned</p>
                      <p className="belongings-text-2xl belongings-font-bold belongings-text-blue">
                        {belongingsData.filter(item => item.itemStatus === 'Returned').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="belongings-card">
                <div className="belongings-card-content belongings-p-4">
                  <div className="belongings-flex belongings-items-center belongings-gap-3">
                    <div className="belongings-icon-container belongings-red">
                      <TrashIcon style={{ color: '#dc2626' }} />
                    </div>
                    <div>
                      <p className="belongings-text-sm belongings-font-medium">Damaged/Lost</p>
                      <p className="belongings-text-2xl belongings-font-bold belongings-text-red">
                        {belongingsData.filter(item => item.itemStatus === 'Damaged' || item.itemStatus === 'Lost').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="belongings-card">
                <div className="belongings-card-content belongings-p-4">
                  <div className="belongings-flex belongings-items-center belongings-gap-3">
                    <div className="belongings-icon-container belongings-purple">
                      <DollarSignIcon style={{ color: '#7c3aed' }} />
                    </div>
                    <div>
                      <p className="belongings-text-sm belongings-font-medium">Total Value</p>
                      <p className="belongings-text-2xl belongings-font-bold belongings-text-purple">
                        ₹{belongingsData.reduce((sum, item) => sum + parseFloat(item.itemValue || '0'), 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Belongings Table */}
            <div className="belongings-card">
              <div className="belongings-card-header belongings-pb-2 belongings-flex belongings-flex-row belongings-items-center belongings-justify-between">
                <div className="belongings-card-title belongings-text-sm belongings-font-medium belongings-flex belongings-items-center belongings-gap-2">
                  <PackageIcon style={{ color: '#2563eb' }} />
                  Employee Belongings - Current Records
                </div>
                <button 
                  onClick={() => setActiveTab('add-belonging')}
                  className="belongings-btn belongings-btn-sm belongings-btn-primary"
                >
                  <PlusIcon />
                  Issue Item
                </button>
              </div>
              <div className="belongings-card-content belongings-p-0">
                <div className="belongings-overflow-x-auto">
                  <table className="belongings-table">
                    <thead className="belongings-table-header">
                      <tr>
                        <th className="belongings-table-th">Emp No</th>
                        <th className="belongings-table-th">Employee Name</th>
                        <th className="belongings-table-th">Item Issued</th>
                        <th className="belongings-table-th">Item Value</th>
                        <th className="belongings-table-th">Issued On</th>
                        <th className="belongings-table-th">Status</th>
                        <th className="belongings-table-th">Remarks</th>
                        <th className="belongings-table-th">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {belongingsData.map((belonging, index) => (
                        <tr key={belonging.id} className={index % 2 === 0 ? 'belongings-table-row-even' : 'belongings-table-row-odd'}>
                          <td className="belongings-table-td belongings-font-medium belongings-text-blue">{belonging.empNo}</td>
                          <td className="belongings-table-td belongings-font-medium">{belonging.name}</td>
                          <td className="belongings-table-td">{belonging.itemIssued}</td>
                          <td className="belongings-table-td belongings-font-mono belongings-text-green">₹{parseFloat(belonging.itemValue || '0').toLocaleString()}</td>
                          <td className="belongings-table-td belongings-font-mono belongings-text-xs">{new Date(belonging.issuedOn).toLocaleDateString('en-GB')}</td>
                          <td className="belongings-table-td">{getStatusBadge(belonging.itemStatus)}</td>
                          <td className="belongings-table-td belongings-max-w-32 belongings-truncate" title={belonging.remarks}>
                            {belonging.remarks}
                          </td>
                          <td className="belongings-table-td">
                            <div className="belongings-flex belongings-gap-1">
                              <button className="belongings-btn belongings-btn-ghost belongings-btn-xs">
                                <Edit3Icon />
                              </button>
                              <button className="belongings-btn belongings-btn-ghost belongings-btn-xs belongings-text-red">
                                <TrashIcon />
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

      case 'add-belonging':
        return (
          <div className="belongings-space-y-4">
            <div className="belongings-card">
              <div className="belongings-card-header belongings-pb-2">
                <div className="belongings-card-title belongings-text-sm belongings-font-medium belongings-flex belongings-items-center belongings-gap-2">
                  <PlusIcon style={{ color: '#059669' }} />
                  HR Module:- Belongings of Employee
                </div>
              </div>
              <div className="belongings-card-content belongings-space-y-6">
                {/* Employee Selection */}
                <div className="belongings-grid belongings-grid-cols-2 belongings-gap-6">
                  <div className="belongings-space-y-4">
                    <div>
                      <label className="belongings-label">Employee Code:-</label>
                      <select 
                        value={newBelonging.empNo}
                        onChange={(e) => handleEmployeeSelect(e.target.value)}
                        className="belongings-select"
                      >
                        {employees.map(emp => (
                          <option key={emp.empNo} value={emp.empNo}>
                            {emp.empNo}
                          </option>
                        ))}
                      </select>
                      <p className="belongings-text-xs belongings-text-gray-500 belongings-mt-1">{newBelonging.empNo}</p>
                    </div>

                    <div>
                      <label className="belongings-label">Item Issued</label>
                      <input 
                        type="text"
                        value={newBelonging.itemIssued}
                        onChange={(e) => handleInputChange('itemIssued', e.target.value)}
                        className="belongings-input"
                        placeholder="Enter item description..."
                      />
                    </div>

                    <div>
                      <label className="belongings-label">Item Value</label>
                      <input 
                        type="number"
                        value={newBelonging.itemValue}
                        onChange={(e) => handleInputChange('itemValue', e.target.value)}
                        className="belongings-input"
                        placeholder="Enter item value in ₹"
                      />
                    </div>

                    <div>
                      <label className="belongings-label">Remarks</label>
                      <textarea 
                        value={newBelonging.remarks}
                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                        className="belongings-textarea"
                        rows={2}
                        placeholder="Enter remarks..."
                      />
                    </div>
                  </div>

                  <div className="belongings-space-y-4">
                    <div>
                      <label className="belongings-label">Employee Name</label>
                      <input 
                        type="text"
                        value={newBelonging.name}
                        readOnly
                        className="belongings-input belongings-input-readonly"
                      />
                      <p className="belongings-text-xs belongings-text-gray-500 belongings-mt-1">、名茶を</p>
                    </div>

                    <div>
                      <label className="belongings-label">Issued On:-</label>
                      <input 
                        type="date"
                        value={newBelonging.issuedOn}
                        onChange={(e) => handleInputChange('issuedOn', e.target.value)}
                        className="belongings-input"
                      />
                    </div>

                    <div>
                      <label className="belongings-label">Item Status</label>
                      <select 
                        value={newBelonging.itemStatus}
                        onChange={(e) => handleInputChange('itemStatus', e.target.value)}
                        className="belongings-select"
                      >
                        <option value="Issued">Issued</option>
                        <option value="Returned">Returned</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Employee Details Card */}
                <div className="belongings-border-t belongings-pt-6">
                  <div className="belongings-card belongings-card-secondary">
                    <div className="belongings-card-content belongings-p-4">
                      <h4 className="belongings-font-semibold belongings-mb-3">Employee Details</h4>
                      <div className="belongings-grid belongings-grid-cols-3 belongings-gap-4 belongings-text-sm">
                        <div>
                          <p className="belongings-text-gray-600">Father Name:</p>
                          <p className="belongings-font-medium">{newBelonging.fatherName}</p>
                        </div>
                        <div>
                          <p className="belongings-text-gray-600">Mobile:</p>
                          <p className="belongings-font-medium">{newBelonging.mobile}</p>
                        </div>
                        <div>
                          <p className="belongings-text-gray-600">DOJ:</p>
                          <p className="belongings-font-medium">{newBelonging.doj}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="belongings-flex belongings-gap-3 belongings-mt-6 belongings-pt-4 belongings-border-t">
                  <button 
                    onClick={handleSaveBelonging}
                    className="belongings-btn belongings-btn-success"
                    disabled={!newBelonging.itemIssued.trim() || !newBelonging.itemValue}
                  >
                    <SaveIcon />
                    Save Issue Details
                  </button>
                  <button 
                    onClick={() => setActiveTab('belongings-overview')}
                    className="belongings-btn belongings-btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'belongings-reports':
        return (
          <div className="belongings-space-y-4">
            <div className="belongings-card">
              <div className="belongings-card-header belongings-pb-2">
                <div className="belongings-card-title belongings-text-sm belongings-font-medium belongings-flex belongings-items-center belongings-gap-2">
                  <FileTextIcon style={{ color: '#7c3aed' }} />
                  Belongings Reports & Analytics
                </div>
              </div>
              <div className="belongings-card-content belongings-space-y-4">
                <div className="belongings-grid belongings-grid-cols-3 belongings-gap-4">
                  <div className="belongings-card belongings-border">
                    <div className="belongings-card-content belongings-p-4 belongings-text-center">
                      <PackageIcon style={{ color: '#2563eb', width: '32px', height: '32px', margin: '0 auto 8px' }} />
                      <h3 className="belongings-font-semibold">Asset Register</h3>
                      <p className="belongings-text-sm belongings-mb-3">Complete asset inventory report</p>
                      <button className="belongings-btn belongings-btn-outline belongings-btn-sm">
                        <DownloadIcon />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="belongings-card belongings-border">
                    <div className="belongings-card-content belongings-p-4 belongings-text-center">
                      <UsersIcon style={{ color: '#059669', width: '32px', height: '32px', margin: '0 auto 8px' }} />
                      <h3 className="belongings-font-semibold">Employee-wise Assets</h3>
                      <p className="belongings-text-sm belongings-mb-3">Assets allocated to each employee</p>
                      <button className="belongings-btn belongings-btn-outline belongings-btn-sm">
                        <DownloadIcon />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="belongings-card belongings-border">
                    <div className="belongings-card-content belongings-p-4 belongings-text-center">
                      <DollarSignIcon style={{ color: '#ea580c', width: '32px', height: '32px', margin: '0 auto 8px' }} />
                      <h3 className="belongings-font-semibold">Value Analysis</h3>
                      <p className="belongings-text-sm belongings-mb-3">Asset value breakdown report</p>
                      <button className="belongings-btn belongings-btn-outline belongings-btn-sm">
                        <DownloadIcon />
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                <div className="belongings-mt-6 belongings-p-4 belongings-bg-blue-50 belongings-rounded-lg">
                  <h4 className="belongings-font-semibold belongings-text-blue-900 belongings-mb-2">Asset Statistics</h4>
                  <div className="belongings-grid belongings-grid-cols-4 belongings-gap-4 belongings-text-center">
                    <div>
                      <p className="belongings-text-2xl belongings-font-bold belongings-text-blue-600">
                        {belongingsData.length}
                      </p>
                      <p className="belongings-text-sm belongings-text-blue-700">Total Assets</p>
                    </div>
                    <div>
                      <p className="belongings-text-2xl belongings-font-bold belongings-text-green-600">
                        {belongingsData.filter(item => item.itemStatus === 'Issued').length}
                      </p>
                      <p className="belongings-text-sm belongings-text-green-700">Active Assets</p>
                    </div>
                    <div>
                      <p className="belongings-text-2xl belongings-font-bold belongings-text-orange-600">
                        {Math.round((belongingsData.filter(item => item.itemStatus === 'Issued').length / belongingsData.length) * 100)}%
                      </p>
                      <p className="belongings-text-sm belongings-text-orange-700">Utilization Rate</p>
                    </div>
                    <div>
                      <p className="belongings-text-2xl belongings-font-bold belongings-text-purple-600">
                        ₹{Math.round(belongingsData.reduce((sum, item) => sum + parseFloat(item.itemValue || '0'), 0) / employees.length).toLocaleString()}
                      </p>
                      <p className="belongings-text-sm belongings-text-purple-700">Avg per Employee</p>
                    </div>
                  </div>
                </div>

                {/* Asset Categories */}
                <div className="belongings-mt-6">
                  <h4 className="belongings-font-semibold belongings-mb-3">Asset Categories</h4>
                  <div className="belongings-grid belongings-grid-cols-3 belongings-gap-3">
                    {itemCategories.map((category, index) => (
                      <div
                        key={index}
                        className={`belongings-p-3 belongings-rounded-lg belongings-border belongings-text-center belongings-cursor-pointer belongings-hover-shadow ${category.color}`}
                      >
                        <PackageIcon style={{ margin: '0 auto 8px', width: '24px', height: '24px' }} />
                        <p className="belongings-font-medium">{category.name}</p>
                        <p className="belongings-text-xs belongings-mt-1">
                          {belongingsData.filter(item => item.itemIssued.toLowerCase().includes(category.name.toLowerCase())).length} items
                        </p>
                      </div>
                    ))}
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
    <div className="belongings-container">
      {/* Header */}
      <div className="belongings-header">
        <div className="belongings-header-content">
          <div className="belongings-header-left">
            <div className="belongings-icon">
              <PackageIcon style={{ color: 'white' }} />
            </div>
            <div>
              <h1 className="belongings-title">Employee Belongings Management</h1>
              <p className="belongings-subtitle">Asset allocation and tracking system</p>
            </div>
          </div>
          <div className="belongings-header-actions">
            <button className="belongings-btn belongings-btn-sm belongings-btn-outline">
              <DownloadIcon />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="belongings-main container">
        
        {/* Tab Navigation */}
        <div className="belongings-tabs">
          <div className="belongings-tabs-container">
            <nav className="belongings-tabs-nav">
              <div className="belongings-tabs-list">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`belongings-tab ${activeTab === tab.id ? 'active' : ''}`}
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

export default EmployeeBelongingsManagement;
