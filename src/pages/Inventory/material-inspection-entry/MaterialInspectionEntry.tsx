import React, { useState } from 'react';
import './styles.css';

// Icon components (simplified SVG icons)
const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const Minus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const AlertTriangle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export default function MaterialInspectionEntry() {
  const [activeTab, setActiveTab] = useState('inspection-overview');
  const [inspectionData, setInspectionData] = useState({
    inspectionId: '',
    grnReference: '',
    inspectionDate: '',
    inspectorName: '',
    vendorName: '',
    inspectionType: 'Incoming',
    overallStatus: 'Pending',
    notes: ''
  });

  const [inspectionItems, setInspectionItems] = useState([{
    id: 1,
    itemName: '',
    specification: '',
    quantityReceived: 0,
    quantityInspected: 0,
    quantityAccepted: 0,
    quantityRejected: 0,
    qualityGrade: 'A',
    defectType: '',
    testResults: '',
    remarks: '',
    inspectionStatus: 'Pending'
  }]);

  // Sample Inspection Records
  const [inspectionRecords, setInspectionRecords] = useState([
    {
      id: 1,
      inspectionId: 'INS-2025-001',
      grnReference: 'GRN-2025-015',
      inspectionDate: '2025-08-10',
      inspectorName: 'Dr. Rajesh Kumar',
      vendorName: 'Quality Steel Ltd.',
      inspectionType: 'Incoming',
      totalItems: 3,
      acceptedItems: 2,
      rejectedItems: 1,
      overallStatus: 'Completed',
      qualityScore: 85
    },
    {
      id: 2,
      inspectionId: 'INS-2025-002',
      grnReference: 'GRN-2025-018',
      inspectionDate: '2025-08-09',
      inspectorName: 'Priya Sharma',
      vendorName: 'Safety Equipment Co.',
      inspectionType: 'Random',
      totalItems: 5,
      acceptedItems: 5,
      rejectedItems: 0,
      overallStatus: 'In Progress',
      qualityScore: 95
    },
    {
      id: 3,
      inspectionId: 'INS-2025-003',
      grnReference: 'DGRN-2025-003',
      inspectionDate: '2025-08-08',
      inspectorName: 'Amit Singh',
      vendorName: 'Electronic Parts Inc.',
      inspectionType: 'Critical',
      totalItems: 2,
      acceptedItems: 1,
      rejectedItems: 1,
      overallStatus: 'Hold',
      qualityScore: 60
    }
  ]);

  const tabs = [
    {
      id: 'inspection-overview',
      label: 'Inspection Overview',
      icon: Search,
    },
    {
      id: 'create-inspection',
      label: 'Create Inspection Entry',
      icon: CheckCircle,
    },
    {
      id: 'inspection-reports',
      label: 'Quality Reports',
      icon: FileText,
    },
  ];

  const addInspectionItem = () => {
    const newItem = {
      id: inspectionItems.length + 1,
      itemName: '',
      specification: '',
      quantityReceived: 0,
      quantityInspected: 0,
      quantityAccepted: 0,
      quantityRejected: 0,
      qualityGrade: 'A',
      defectType: '',
      testResults: '',
      remarks: '',
      inspectionStatus: 'Pending'
    };
    setInspectionItems([...inspectionItems, newItem]);
  };

  const removeInspectionItem = (id: number) => {
    if (inspectionItems.length > 1) {
      setInspectionItems(inspectionItems.filter(item => item.id !== id));
    }
  };

  const updateInspectionItem = (id: number, field: string, value: any) => {
    setInspectionItems(inspectionItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate totals
        if (field === 'quantityAccepted' || field === 'quantityRejected') {
          updatedItem.quantityInspected = updatedItem.quantityAccepted + updatedItem.quantityRejected;
        }
        
        // Auto-set status based on results
        if (updatedItem.quantityRejected > 0) {
          updatedItem.inspectionStatus = 'Rejected';
        } else if (updatedItem.quantityAccepted > 0) {
          updatedItem.inspectionStatus = 'Accepted';
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateQualityMetrics = () => {
    const totalReceived = inspectionItems.reduce((sum, item) => sum + item.quantityReceived, 0);
    const totalAccepted = inspectionItems.reduce((sum, item) => sum + item.quantityAccepted, 0);
    const totalRejected = inspectionItems.reduce((sum, item) => sum + item.quantityRejected, 0);
    const acceptanceRate = totalReceived > 0 ? (totalAccepted / totalReceived * 100) : 0;
    
    return {
      totalReceived,
      totalAccepted,
      totalRejected,
      acceptanceRate: Math.round(acceptanceRate)
    };
  };

  const createInspectionEntry = () => {
    if (!inspectionData.inspectionId || !inspectionData.grnReference || !inspectionData.inspectorName) {
      alert('Please fill all required fields');
      return;
    }

    const metrics = calculateQualityMetrics();
    const newInspection = {
      id: inspectionRecords.length + 1,
      ...inspectionData,
      totalItems: inspectionItems.length,
      acceptedItems: inspectionItems.filter(item => item.inspectionStatus === 'Accepted').length,
      rejectedItems: inspectionItems.filter(item => item.inspectionStatus === 'Rejected').length,
      qualityScore: metrics.acceptanceRate
    };

    setInspectionRecords(prev => [newInspection, ...prev]);
    
    // Reset form
    setInspectionData({
      inspectionId: '',
      grnReference: '',
      inspectionDate: '',
      inspectorName: '',
      vendorName: '',
      inspectionType: 'Incoming',
      overallStatus: 'Pending',
      notes: ''
    });
    setInspectionItems([{
      id: 1,
      itemName: '',
      specification: '',
      quantityReceived: 0,
      quantityInspected: 0,
      quantityAccepted: 0,
      quantityRejected: 0,
      qualityGrade: 'A',
      defectType: '',
      testResults: '',
      remarks: '',
      inspectionStatus: 'Pending'
    }]);
    setActiveTab('inspection-overview');
    
    alert('Material inspection entry created successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inspection-overview':
        return (
          <div className="material-inspection-space-y-4">
            {/* Summary Cards */}
            <div className="material-inspection-grid-4">
              <div className="material-inspection-card">
                <div className="material-inspection-card-content">
                  <div className="material-inspection-summary-card">
                    <div className="material-inspection-summary-content">
                      <div className="material-inspection-summary-icon total">
                        <Search className="material-inspection-icon-sm" />
                      </div>
                      <div>
                        <p className="material-inspection-summary-text">Total Inspections</p>
                        <p className="material-inspection-summary-number total">{inspectionRecords.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="material-inspection-card">
                <div className="material-inspection-card-content">
                  <div className="material-inspection-summary-card">
                    <div className="material-inspection-summary-content">
                      <div className="material-inspection-summary-icon completed">
                        <CheckCircle className="material-inspection-icon-sm" />
                      </div>
                      <div>
                        <p className="material-inspection-summary-text">Completed</p>
                        <p className="material-inspection-summary-number completed">
                          {inspectionRecords.filter(ins => ins.overallStatus === 'Completed').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="material-inspection-card">
                <div className="material-inspection-card-content">
                  <div className="material-inspection-summary-card">
                    <div className="material-inspection-summary-content">
                      <div className="material-inspection-summary-icon pending">
                        <Clock className="material-inspection-icon-sm" />
                      </div>
                      <div>
                        <p className="material-inspection-summary-text">Pending</p>
                        <p className="material-inspection-summary-number pending">
                          {inspectionRecords.filter(ins => ins.overallStatus === 'In Progress' || ins.overallStatus === 'Hold').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="material-inspection-card">
                <div className="material-inspection-card-content">
                  <div className="material-inspection-summary-card">
                    <div className="material-inspection-summary-content">
                      <div className="material-inspection-summary-icon quality">
                        <Eye className="material-inspection-icon-sm" />
                      </div>
                      <div>
                        <p className="material-inspection-summary-text">Avg Quality Score</p>
                        <p className="material-inspection-summary-number quality">
                          {Math.round(inspectionRecords.reduce((sum, ins) => sum + ins.qualityScore, 0) / inspectionRecords.length)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspection Records Table */}
            <div className="material-inspection-card">
              <div className="material-inspection-card-header">
                <h3 className="material-inspection-card-title">
                  <Search className="material-inspection-icon-sm" />
                  Material Inspection Records
                </h3>
              </div>
              <div className="material-inspection-card-content">
                <div className="material-inspection-table-container">
                  <table className="material-inspection-table">
                    <thead className="material-inspection-table-header">
                      <tr>
                        <th>Inspection ID</th>
                        <th>GRN Reference</th>
                        <th>Date</th>
                        <th>Inspector</th>
                        <th>Vendor</th>
                        <th>Type</th>
                        <th>Items</th>
                        <th>Accepted/Rejected</th>
                        <th>Quality Score</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inspectionRecords.map((inspection) => (
                        <tr key={inspection.id} className="material-inspection-table-row">
                          <td className="material-inspection-table-cell inspection-id">{inspection.inspectionId}</td>
                          <td className="material-inspection-table-cell grn-ref">{inspection.grnReference}</td>
                          <td className="material-inspection-table-cell mono">{inspection.inspectionDate}</td>
                          <td className="material-inspection-table-cell inspector">{inspection.inspectorName}</td>
                          <td className="material-inspection-table-cell vendor">{inspection.vendorName}</td>
                          <td className="material-inspection-table-cell">
                            <span className={`material-inspection-badge type ${inspection.inspectionType.toLowerCase()}`}>
                              {inspection.inspectionType}
                            </span>
                          </td>
                          <td className="material-inspection-table-cell center">{inspection.totalItems}</td>
                          <td className="material-inspection-table-cell center">
                            <span className="accepted">{inspection.acceptedItems}</span> / 
                            <span className="rejected"> {inspection.rejectedItems}</span>
                          </td>
                          <td className="material-inspection-table-cell">
                            <div className="quality-score">
                              <span className={`score ${inspection.qualityScore >= 80 ? 'good' : inspection.qualityScore >= 60 ? 'fair' : 'poor'}`}>
                                {inspection.qualityScore}%
                              </span>
                            </div>
                          </td>
                          <td className="material-inspection-table-cell">
                            <span className={`material-inspection-badge status ${inspection.overallStatus.toLowerCase().replace(' ', '')}`}>
                              {inspection.overallStatus}
                            </span>
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

      case 'create-inspection':
        return (
          <div className="material-inspection-space-y-4">
            <div className="material-inspection-card">
              <div className="material-inspection-card-header">
                <h3 className="material-inspection-card-title">
                  <CheckCircle className="material-inspection-icon-sm" />
                  Create Material Inspection Entry
                </h3>
              </div>
              <div className="material-inspection-card-content">
                {/* Basic Information */}
                <div className="material-inspection-form-section">
                  <h4>Inspection Details</h4>
                  <div className="material-inspection-form-grid">
                    <div className="material-inspection-form-group">
                      <label className="material-inspection-form-label">Inspection ID *</label>
                      <input
                        type="text"
                        className="material-inspection-form-input"
                        value={inspectionData.inspectionId}
                        onChange={(e) => setInspectionData(prev => ({ ...prev, inspectionId: e.target.value }))}
                        placeholder="INS-2025-XXX"
                      />
                    </div>

                    <div className="material-inspection-form-group">
                      <label className="material-inspection-form-label">GRN Reference *</label>
                      <input
                        type="text"
                        className="material-inspection-form-input"
                        value={inspectionData.grnReference}
                        onChange={(e) => setInspectionData(prev => ({ ...prev, grnReference: e.target.value }))}
                        placeholder="GRN-2025-XXX or DGRN-2025-XXX"
                      />
                    </div>

                    <div className="material-inspection-form-group">
                      <label className="material-inspection-form-label">Inspection Date *</label>
                      <input
                        type="date"
                        className="material-inspection-form-input"
                        value={inspectionData.inspectionDate}
                        onChange={(e) => setInspectionData(prev => ({ ...prev, inspectionDate: e.target.value }))}
                      />
                    </div>

                    <div className="material-inspection-form-group">
                      <label className="material-inspection-form-label">Inspector Name *</label>
                      <input
                        type="text"
                        className="material-inspection-form-input"
                        value={inspectionData.inspectorName}
                        onChange={(e) => setInspectionData(prev => ({ ...prev, inspectorName: e.target.value }))}
                        placeholder="Qualified inspector name"
                      />
                    </div>

                    <div className="material-inspection-form-group">
                      <label className="material-inspection-form-label">Vendor Name</label>
                      <input
                        type="text"
                        className="material-inspection-form-input"
                        value={inspectionData.vendorName}
                        onChange={(e) => setInspectionData(prev => ({ ...prev, vendorName: e.target.value }))}
                        placeholder="Supplier name"
                      />
                    </div>

                    <div className="material-inspection-form-group">
                      <label className="material-inspection-form-label">Inspection Type</label>
                      <select
                        className="material-inspection-form-select"
                        value={inspectionData.inspectionType}
                        onChange={(e) => setInspectionData(prev => ({ ...prev, inspectionType: e.target.value }))}
                      >
                        <option value="Incoming">Incoming Inspection</option>
                        <option value="Random">Random Quality Check</option>
                        <option value="Critical">Critical Item Inspection</option>
                        <option value="Batch">Batch Quality Test</option>
                        <option value="Pre-delivery">Pre-delivery Check</option>
                      </select>
                    </div>

                    <div className="material-inspection-form-group">
                      <label className="material-inspection-form-label">Overall Status</label>
                      <select
                        className="material-inspection-form-select"
                        value={inspectionData.overallStatus}
                        onChange={(e) => setInspectionData(prev => ({ ...prev, overallStatus: e.target.value }))}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Hold">On Hold</option>
                      </select>
                    </div>
                  </div>

                  <div className="material-inspection-form-group">
                    <label className="material-inspection-form-label">Inspection Notes</label>
                    <textarea
                      className="material-inspection-form-textarea"
                      rows={3}
                      value={inspectionData.notes}
                      onChange={(e) => setInspectionData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="General notes about the inspection..."
                    ></textarea>
                  </div>
                </div>

                {/* Items Inspection */}
                <div className="material-inspection-form-section">
                  <div className="material-inspection-section-header">
                    <h4>Material Items Inspection</h4>
                    <button
                      type="button"
                      className="material-inspection-button success small"
                      onClick={addInspectionItem}
                    >
                      <Plus className="material-inspection-icon-sm" />
                      Add Item
                    </button>
                  </div>

                  <div className="material-inspection-items-container">
                    {inspectionItems.map((item, index) => (
                      <div key={item.id} className="material-inspection-item-card">
                        <div className="material-inspection-item-header">
                          <h5>Item {index + 1} Inspection</h5>
                          {inspectionItems.length > 1 && (
                            <button
                              type="button"
                              className="material-inspection-button danger small"
                              onClick={() => removeInspectionItem(item.id)}
                            >
                              <Minus className="material-inspection-icon-sm" />
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="material-inspection-item-grid">
                          <div className="material-inspection-form-group">
                            <label className="material-inspection-form-label">Item Name *</label>
                            <input
                              type="text"
                              className="material-inspection-form-input"
                              value={item.itemName}
                              onChange={(e) => updateInspectionItem(item.id, 'itemName', e.target.value)}
                              placeholder="Material/item name"
                            />
                          </div>

                          <div className="material-inspection-form-group">
                            <label className="material-inspection-form-label">Specification</label>
                            <input
                              type="text"
                              className="material-inspection-form-input"
                              value={item.specification}
                              onChange={(e) => updateInspectionItem(item.id, 'specification', e.target.value)}
                              placeholder="Technical specifications"
                            />
                          </div>

                          <div className="material-inspection-form-group">
                            <label className="material-inspection-form-label">Quantity Received</label>
                            <input
                              type="number"
                              className="material-inspection-form-input"
                              value={item.quantityReceived}
                              onChange={(e) => updateInspectionItem(item.id, 'quantityReceived', parseInt(e.target.value) || 0)}
                              min="0"
                            />
                          </div>

                          <div className="material-inspection-form-group">
                            <label className="material-inspection-form-label">Quantity Inspected</label>
                            <input
                              type="number"
                              className="material-inspection-form-input readonly"
                              value={item.quantityInspected}
                              readOnly
                              title="Auto-calculated from accepted + rejected"
                            />
                          </div>

                          <div className="material-inspection-form-group">
                            <label className="material-inspection-form-label">Quantity Accepted</label>
                            <input
                              type="number"
                              className="material-inspection-form-input"
                              value={item.quantityAccepted}
                              onChange={(e) => updateInspectionItem(item.id, 'quantityAccepted', parseInt(e.target.value) || 0)}
                              min="0"
                            />
                          </div>

                          <div className="material-inspection-form-group">
                            <label className="material-inspection-form-label">Quantity Rejected</label>
                            <input
                              type="number"
                              className="material-inspection-form-input"
                              value={item.quantityRejected}
                              onChange={(e) => updateInspectionItem(item.id, 'quantityRejected', parseInt(e.target.value) || 0)}
                              min="0"
                            />
                          </div>

                          <div className="material-inspection-form-group">
                            <label className="material-inspection-form-label">Quality Grade</label>
                            <select
                              className="material-inspection-form-select"
                              value={item.qualityGrade}
                              onChange={(e) => updateInspectionItem(item.id, 'qualityGrade', e.target.value)}
                            >
                              <option value="A">Grade A - Excellent</option>
                              <option value="B">Grade B - Good</option>
                              <option value="C">Grade C - Fair</option>
                              <option value="D">Grade D - Poor</option>
                              <option value="F">Grade F - Failed</option>
                            </select>
                          </div>

                          <div className="material-inspection-form-group">
                            <label className="material-inspection-form-label">Inspection Status</label>
                            <select
                              className="material-inspection-form-select"
                              value={item.inspectionStatus}
                              onChange={(e) => updateInspectionItem(item.id, 'inspectionStatus', e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Hold">On Hold</option>
                              <option value="Conditional">Conditional Accept</option>
                            </select>
                          </div>

                          <div className="material-inspection-form-group">
                            <label className="material-inspection-form-label">Defect Type</label>
                            <input
                              type="text"
                              className="material-inspection-form-input"
                              value={item.defectType}
                              onChange={(e) => updateInspectionItem(item.id, 'defectType', e.target.value)}
                              placeholder="Defect description if any"
                            />
                          </div>

                          <div className="material-inspection-form-group full-width">
                            <label className="material-inspection-form-label">Test Results</label>
                            <textarea
                              className="material-inspection-form-textarea"
                              rows={2}
                              value={item.testResults}
                              onChange={(e) => updateInspectionItem(item.id, 'testResults', e.target.value)}
                              placeholder="Detailed test results and measurements..."
                            ></textarea>
                          </div>

                          <div className="material-inspection-form-group full-width">
                            <label className="material-inspection-form-label">Inspection Remarks</label>
                            <textarea
                              className="material-inspection-form-textarea"
                              rows={2}
                              value={item.remarks}
                              onChange={(e) => updateInspectionItem(item.id, 'remarks', e.target.value)}
                              placeholder="Additional remarks and observations..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quality Metrics */}
                  <div className="material-inspection-metrics-section">
                    <div className="material-inspection-metrics-card">
                      <h4>Quality Metrics Summary</h4>
                      <div className="material-inspection-metrics-grid">
                        <div className="metric-item">
                          <span className="metric-label">Total Received:</span>
                          <span className="metric-value">{calculateQualityMetrics().totalReceived}</span>
                        </div>
                        <div className="metric-item">
                          <span className="metric-label">Total Accepted:</span>
                          <span className="metric-value accepted">{calculateQualityMetrics().totalAccepted}</span>
                        </div>
                        <div className="metric-item">
                          <span className="metric-label">Total Rejected:</span>
                          <span className="metric-value rejected">{calculateQualityMetrics().totalRejected}</span>
                        </div>
                        <div className="metric-item">
                          <span className="metric-label">Acceptance Rate:</span>
                          <span className={`metric-value rate ${calculateQualityMetrics().acceptanceRate >= 80 ? 'good' : calculateQualityMetrics().acceptanceRate >= 60 ? 'fair' : 'poor'}`}>
                            {calculateQualityMetrics().acceptanceRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="material-inspection-form-actions">
                  <button
                    type="button"
                    className="material-inspection-button primary"
                    onClick={createInspectionEntry}
                  >
                    Create Inspection Entry
                  </button>
                  <button
                    type="button"
                    className="material-inspection-button outline"
                    onClick={() => {
                      setInspectionData({
                        inspectionId: '',
                        grnReference: '',
                        inspectionDate: '',
                        inspectorName: '',
                        vendorName: '',
                        inspectionType: 'Incoming',
                        overallStatus: 'Pending',
                        notes: ''
                      });
                      setInspectionItems([{
                        id: 1,
                        itemName: '',
                        specification: '',
                        quantityReceived: 0,
                        quantityInspected: 0,
                        quantityAccepted: 0,
                        quantityRejected: 0,
                        qualityGrade: 'A',
                        defectType: '',
                        testResults: '',
                        remarks: '',
                        inspectionStatus: 'Pending'
                      }]);
                    }}
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'inspection-reports':
        return (
          <div className="material-inspection-space-y-4">
            <div className="material-inspection-card">
              <div className="material-inspection-card-header">
                <h3 className="material-inspection-card-title">
                  <FileText className="material-inspection-icon-sm" />
                  Quality Control Reports & Analytics
                </h3>
              </div>
              <div className="material-inspection-card-content material-inspection-space-y-4">
                <div className="material-inspection-reports-grid">
                  <div className="material-inspection-report-card">
                    <Search className="material-inspection-report-icon blue" />
                    <h3 className="material-inspection-report-title">Inspection Summary</h3>
                    <p className="material-inspection-report-description">Comprehensive analysis of all material inspections</p>
                    <button className="material-inspection-button outline small">
                      <Download className="material-inspection-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="material-inspection-report-card">
                    <CheckCircle className="material-inspection-report-icon green" />
                    <h3 className="material-inspection-report-title">Quality Trends</h3>
                    <p className="material-inspection-report-description">Quality score trends and acceptance rates</p>
                    <button className="material-inspection-button outline small">
                      <Download className="material-inspection-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="material-inspection-report-card">
                    <AlertTriangle className="material-inspection-report-icon orange" />
                    <h3 className="material-inspection-report-title">Defect Analysis</h3>
                    <p className="material-inspection-report-description">Analysis of defects and rejection patterns</p>
                    <button className="material-inspection-button outline small">
                      <Download className="material-inspection-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="material-inspection-report-card">
                    <Eye className="material-inspection-report-icon purple" />
                    <h3 className="material-inspection-report-title">Vendor Quality</h3>
                    <p className="material-inspection-report-description">Vendor-wise quality performance analysis</p>
                    <button className="material-inspection-button outline small">
                      <Download className="material-inspection-icon-sm" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Quality Statistics */}
                <div className="material-inspection-stats-section">
                  <h4>Quality Control Statistics</h4>
                  <div className="material-inspection-stats-grid">
                    <div className="material-inspection-stat-item">
                      <span className="material-inspection-stat-label">This Month:</span>
                      <span className="material-inspection-stat-value">{inspectionRecords.length} Inspections</span>
                    </div>
                    <div className="material-inspection-stat-item">
                      <span className="material-inspection-stat-label">Average Quality Score:</span>
                      <span className="material-inspection-stat-value">{Math.round(inspectionRecords.reduce((sum, ins) => sum + ins.qualityScore, 0) / inspectionRecords.length)}%</span>
                    </div>
                    <div className="material-inspection-stat-item">
                      <span className="material-inspection-stat-label">Acceptance Rate:</span>
                      <span className="material-inspection-stat-value">
                        {Math.round((inspectionRecords.reduce((sum, ins) => sum + ins.acceptedItems, 0) / 
                         inspectionRecords.reduce((sum, ins) => sum + ins.totalItems, 0)) * 100)}%
                      </span>
                    </div>
                    <div className="material-inspection-stat-item">
                      <span className="material-inspection-stat-label">Critical Inspections:</span>
                      <span className="material-inspection-stat-value">{inspectionRecords.filter(ins => ins.inspectionType === 'Critical').length}</span>
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
    <div className="material-inspection-container">
      {/* Header */}
      <header className="material-inspection-header">
        <div className="material-inspection-header-content">
          <div className="material-inspection-header-info">
            <div className="material-inspection-header-icon">
              <CheckCircle className="material-inspection-icon-sm" />
            </div>
            <div>
              <h1 className="material-inspection-header-title">MATERIAL INSPECTION ENTRY</h1>
              <p className="material-inspection-header-subtitle">Warehouse Management</p>
            </div>
          </div>
        </div>
      </header>

      <div className="material-inspection-main-container">
        
        {/* Tab Navigation */}
        <div className="material-inspection-tab-navigation">
          <nav className="material-inspection-tab-nav">
            <div className="material-inspection-tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`material-inspection-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="material-inspection-icon-sm" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Content Area */}
        {renderTabContent()}
      </div>
    </div>
  );
}
