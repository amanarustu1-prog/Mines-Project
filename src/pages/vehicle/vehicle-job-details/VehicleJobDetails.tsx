import React, { useState } from 'react';
import './VehicleJobDetails.css';

// Icon components
const Wrench = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const Printer = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);

const Settings = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Gauge = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const List = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

// Types
interface VehicleJobDetails {
  id: string;
  group: string;
  equipmentId: string;
  serviceType: string;
  process: string;
  supervisorName: string;
  operatorAssigned: string;
  problemRemarks: string;
  meterReading: number;
  inTime: string;
  createdDate: string;
  modifiedDate: string;
}

interface Process {
  id: string;
  name: string;
  description: string;
}

export default function VehicleJobDetails() {
  const [formData, setFormData] = useState<Partial<VehicleJobDetails>>({
    group: '',
    equipmentId: '',
    serviceType: '',
    process: '',
    supervisorName: '',
    operatorAssigned: '',
    problemRemarks: '',
    meterReading: 0,
    inTime: ''
  });

  const [processes, setProcesses] = useState<Process[]>([
    { id: '1', name: 'Routine Maintenance', description: 'Regular maintenance procedures' },
    { id: '2', name: 'Emergency Repair', description: 'Urgent repair work' },
    { id: '3', name: 'Inspection', description: 'Equipment inspection' }
  ]);

  const [showAddProcess, setShowAddProcess] = useState(false);
  const [newProcess, setNewProcess] = useState({ name: '', description: '' });

  // Sample data
  const groups = ['DG', 'Excavator', 'Truck', 'Crusher', 'Conveyor'];
  const equipmentOptions = {
    'DG': ['DG-18', 'DG-25', 'DG-50', 'DG-75'],
    'Excavator': ['EX-001', 'EX-002', 'EX-003'],
    'Truck': ['TR-001', 'TR-002', 'TR-003'],
    'Crusher': ['CR-001', 'CR-002'],
    'Conveyor': ['CV-001', 'CV-002']
  };
  
  const serviceTypes = {
    'DG-18': ['DG-18 KVA', 'DG-18 Service A', 'DG-18 Service B'],
    'DG-25': ['DG-25 KVA', 'DG-25 Service A'],
    'DG-50': ['DG-50 KVA', 'DG-50 Service A'],
    'DG-75': ['DG-75 KVA', 'DG-75 Service A']
  };

  const operators = ['V', 'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];

  const handleInputChange = (field: keyof VehicleJobDetails, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProcess = () => {
    if (newProcess.name.trim()) {
      const process: Process = {
        id: Date.now().toString(),
        name: newProcess.name,
        description: newProcess.description
      };
      setProcesses(prev => [...prev, process]);
      setNewProcess({ name: '', description: '' });
      setShowAddProcess(false);
    }
  };

  const handleSaveProblemDetails = () => {
    // Validate required fields
    if (!formData.group || !formData.equipmentId || !formData.serviceType) {
      alert('Please fill in all required fields');
      return;
    }

    const jobDetails: VehicleJobDetails = {
      id: Date.now().toString(),
      group: formData.group!,
      equipmentId: formData.equipmentId!,
      serviceType: formData.serviceType!,
      process: formData.process || '',
      supervisorName: formData.supervisorName || '',
      operatorAssigned: formData.operatorAssigned || '',
      problemRemarks: formData.problemRemarks || '',
      meterReading: formData.meterReading || 0,
      inTime: formData.inTime || '',
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString()
    };

    console.log('Saving job details:', jobDetails);
    alert('Problem details saved successfully!');
  };

  const handleModifyJobCard = () => {
    console.log('Modifying job card:', formData);
    alert('Job card modified successfully!');
  };

  const handlePrintJobCard = () => {
    console.log('Printing job card:', formData);
    window.print();
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="vehicle-job-details">
      {/* Header */}
      <div className="vehicle-job-details-header">
        <div className="vehicle-job-details-header-content">
          <div className="vehicle-job-details-title-section">
            <Wrench className="vehicle-job-details-header-icon" />
            <div>
              <h1 className="vehicle-job-details-title">Vehicle Job Details</h1>
              <p className="vehicle-job-details-subtitle">Manage vehicle job details and problem tracking</p>
            </div>
          </div>
          <div className="vehicle-job-details-header-actions">
            <button className="vehicle-job-details-btn vehicle-job-details-btn-secondary">
              <FileText className="vehicle-job-details-icon" />
              Reports
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="vehicle-job-details-main">
        <div className="vehicle-job-details-content">
          <div className="vehicle-job-details-tab-content">
            
            {/* Section Header */}
            <div className="vehicle-job-details-section-header">
              <div>
                <h2 className="vehicle-job-details-section-title">Vehicle Job Details Entry Section</h2>
                <p className="vehicle-job-details-section-subtitle">Enter detailed information for vehicle job tracking</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="vehicle-job-details-form-section">
              <div className="vehicle-job-details-form-grid">
                
                {/* Select Group */}
                <div className="vehicle-job-details-form-group">
                  <label className="vehicle-job-details-form-label">
                    <Settings className="vehicle-job-details-icon-sm" />
                    Select Group:
                  </label>
                  <select
                    className="vehicle-job-details-form-select"
                    value={formData.group || ''}
                    onChange={(e) => handleInputChange('group', e.target.value)}
                  >
                    <option value="">Select Group</option>
                    {groups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                {/* Equipment Identification No */}
                <div className="vehicle-job-details-form-group">
                  <label className="vehicle-job-details-form-label">
                    <Wrench className="vehicle-job-details-icon-sm" />
                    Equipment Identification No.:
                  </label>
                  <select
                    className="vehicle-job-details-form-select"
                    value={formData.equipmentId || ''}
                    onChange={(e) => handleInputChange('equipmentId', e.target.value)}
                    disabled={!formData.group}
                  >
                    <option value="">Select Equipment</option>
                    {formData.group && equipmentOptions[formData.group as keyof typeof equipmentOptions]?.map(eq => (
                      <option key={eq} value={eq}>{eq}</option>
                    ))}
                  </select>
                </div>

                {/* Select Service Type */}
                <div className="vehicle-job-details-form-group">
                  <label className="vehicle-job-details-form-label">
                    <Settings className="vehicle-job-details-icon-sm" />
                    Select Service Type:
                  </label>
                  <select
                    className="vehicle-job-details-form-select"
                    value={formData.serviceType || ''}
                    onChange={(e) => handleInputChange('serviceType', e.target.value)}
                    disabled={!formData.equipmentId}
                  >
                    <option value="">Select Service Type</option>
                    {formData.equipmentId && serviceTypes[formData.equipmentId as keyof typeof serviceTypes]?.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                {/* Select Process */}
                <div className="vehicle-job-details-form-group">
                  <label className="vehicle-job-details-form-label">
                    <List className="vehicle-job-details-icon-sm" />
                    Select Process:
                  </label>
                  <div className="vehicle-job-details-process-container">
                    <select
                      className="vehicle-job-details-form-select"
                      value={formData.process || ''}
                      onChange={(e) => handleInputChange('process', e.target.value)}
                    >
                      <option value="">Select Process</option>
                      {processes.map(process => (
                        <option key={process.id} value={process.name}>{process.name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="vehicle-job-details-btn-icon"
                      onClick={() => setShowAddProcess(true)}
                    >
                      <Plus className="vehicle-job-details-icon-sm" />
                    </button>
                  </div>
                </div>

                {/* Supervisor Name */}
                <div className="vehicle-job-details-form-group">
                  <label className="vehicle-job-details-form-label">
                    <User className="vehicle-job-details-icon-sm" />
                    Supervisor Name:
                  </label>
                  <input
                    type="text"
                    className="vehicle-job-details-form-input"
                    value={formData.supervisorName || ''}
                    onChange={(e) => handleInputChange('supervisorName', e.target.value)}
                    placeholder="Enter supervisor name"
                  />
                </div>

                {/* Operator Assigned */}
                <div className="vehicle-job-details-form-group">
                  <label className="vehicle-job-details-form-label">
                    <User className="vehicle-job-details-icon-sm" />
                    Operator Assigned:
                  </label>
                  <select
                    className="vehicle-job-details-form-select"
                    value={formData.operatorAssigned || ''}
                    onChange={(e) => handleInputChange('operatorAssigned', e.target.value)}
                  >
                    <option value="">Select Operator</option>
                    {operators.map(operator => (
                      <option key={operator} value={operator}>{operator}</option>
                    ))}
                  </select>
                </div>

                {/* Meter Reading */}
                <div className="vehicle-job-details-form-group">
                  <label className="vehicle-job-details-form-label">
                    <Gauge className="vehicle-job-details-icon-sm" />
                    Meter Reading:
                  </label>
                  <input
                    type="number"
                    className="vehicle-job-details-form-input"
                    value={formData.meterReading || 0}
                    onChange={(e) => handleInputChange('meterReading', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* In Time */}
                <div className="vehicle-job-details-form-group">
                  <label className="vehicle-job-details-form-label">
                    <Clock className="vehicle-job-details-icon-sm" />
                    In Time:
                  </label>
                  <input
                    type="datetime-local"
                    className="vehicle-job-details-form-input"
                    value={formData.inTime || ''}
                    onChange={(e) => handleInputChange('inTime', e.target.value)}
                  />
                </div>

                {/* Problem Remarks */}
                <div className="vehicle-job-details-form-group vehicle-job-details-form-group-full">
                  <label className="vehicle-job-details-form-label">
                    <FileText className="vehicle-job-details-icon-sm" />
                    Problem Remarks:
                  </label>
                  <textarea
                    className="vehicle-job-details-form-textarea"
                    value={formData.problemRemarks || ''}
                    onChange={(e) => handleInputChange('problemRemarks', e.target.value)}
                    rows={4}
                    placeholder="Enter detailed problem remarks and observations"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="vehicle-job-details-form-actions">
                <button
                  className="vehicle-job-details-btn vehicle-job-details-btn-primary"
                  onClick={handleSaveProblemDetails}
                >
                  <Save className="vehicle-job-details-icon" />
                  Save Problem Details
                </button>
                <button
                  className="vehicle-job-details-btn vehicle-job-details-btn-secondary"
                  onClick={handleModifyJobCard}
                >
                  <Edit3 className="vehicle-job-details-icon" />
                  Modify Job Card
                </button>
                <button
                  className="vehicle-job-details-btn vehicle-job-details-btn-secondary"
                  onClick={handlePrintJobCard}
                >
                  <Printer className="vehicle-job-details-icon" />
                  Print Job Card
                </button>
              </div>
            </div>

            {/* Process List Section */}
            <div className="vehicle-job-details-section-divider">
              <h3>Process List</h3>
            </div>

            <div className="vehicle-job-details-process-list">
              {processes.map(process => (
                <div key={process.id} className="vehicle-job-details-process-item">
                  <div className="vehicle-job-details-process-info">
                    <h4 className="vehicle-job-details-process-name">{process.name}</h4>
                    <p className="vehicle-job-details-process-description">{process.description}</p>
                  </div>
                  <button className="vehicle-job-details-btn-icon vehicle-job-details-btn-icon-danger">
                    <Edit3 className="vehicle-job-details-icon-sm" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Process Modal */}
      {showAddProcess && (
        <div className="vehicle-job-details-modal-overlay">
          <div className="vehicle-job-details-modal">
            <div className="vehicle-job-details-modal-header">
              <h3 className="vehicle-job-details-modal-title">Add New Process</h3>
              <button
                className="vehicle-job-details-modal-close"
                onClick={() => setShowAddProcess(false)}
              >
                ×
              </button>
            </div>
            <div className="vehicle-job-details-modal-content">
              <div className="vehicle-job-details-form-group">
                <label className="vehicle-job-details-form-label">Process Name:</label>
                <input
                  type="text"
                  className="vehicle-job-details-form-input"
                  value={newProcess.name}
                  onChange={(e) => setNewProcess(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter process name"
                />
              </div>
              <div className="vehicle-job-details-form-group">
                <label className="vehicle-job-details-form-label">Description:</label>
                <textarea
                  className="vehicle-job-details-form-textarea"
                  value={newProcess.description}
                  onChange={(e) => setNewProcess(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  placeholder="Enter process description"
                />
              </div>
            </div>
            <div className="vehicle-job-details-modal-footer">
              <button
                className="vehicle-job-details-btn vehicle-job-details-btn-secondary"
                onClick={() => setShowAddProcess(false)}
              >
                Cancel
              </button>
              <button
                className="vehicle-job-details-btn vehicle-job-details-btn-primary"
                onClick={handleAddProcess}
              >
                <Plus className="vehicle-job-details-icon" />
                Add Process
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
