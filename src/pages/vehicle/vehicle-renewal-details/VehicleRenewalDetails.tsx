import React, { useState } from 'react';
import './VehicleRenewalDetails.css';

// Icon components
const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 4v6h6m16 10v-6h-6M2 20l2.5-2.5M22 4l-2.5 2.5M5 12A7 7 0 1 1 12 5" />
  </svg>
);

const Car = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DollarSign = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const Printer = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);

const Truck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const Award = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

// Types
interface VehicleRenewalDetail {
  id: string;
  registrationNumber: string;
  insuranceDetails: {
    policyNo: string;
    newPolicyNo: string;
    policyRenewDate: string;
    policyCost: number;
    doneFrom: string;
    expiresOn: string;
  };
  pucDetails: {
    pucRenewDate: string;
    pucExpiryDate: string;
  };
  roadTaxDetails: {
    roadTaxAmount: number;
    roadTaxRenewDate: string;
    roadTaxExpiryDate: string;
  };
  fitnessDetails: {
    fitnessRenewDate: string;
    fitnessExpDate: string;
    fitnessRenewed: boolean;
  };
  permitDetails: {
    permitRenewDate: string;
    permitExpiryDate: string;
    permitRenewed: boolean;
  };
  vehicleInfo: {
    make: string;
    vehicleIdentificationNo: string;
    model: string;
    emptyVehicleWeight: number;
    engineChasisNo: string;
  };
  modifiedDate: string;
}

// Sample data
const sampleVehicleData: VehicleRenewalDetail[] = [
  {
    id: '1',
    registrationNumber: 'DG-18',
    insuranceDetails: {
      policyNo: 'INS-2024-001',
      newPolicyNo: 'INS-2024-002',
      policyRenewDate: '2024-06-15',
      policyCost: 25000,
      doneFrom: 'ABC Insurance Company',
      expiresOn: '2025-06-15'
    },
    pucDetails: {
      pucRenewDate: '2024-03-15',
      pucExpiryDate: '2025-03-15'
    },
    roadTaxDetails: {
      roadTaxAmount: 15000,
      roadTaxRenewDate: '2024-04-01',
      roadTaxExpiryDate: '2025-03-31'
    },
    fitnessDetails: {
      fitnessRenewDate: '2024-05-01',
      fitnessExpDate: '2025-04-30',
      fitnessRenewed: true
    },
    permitDetails: {
      permitRenewDate: '2024-02-01',
      permitExpiryDate: '2025-01-31',
      permitRenewed: true
    },
    vehicleInfo: {
      make: 'MAHINDRA',
      vehicleIdentificationNo: 'VIN123456789',
      model: 'BOLERO',
      emptyVehicleWeight: 2500,
      engineChasisNo: 'ENG123456'
    },
    modifiedDate: '2024-07-18'
  },
  {
    id: '2',
    registrationNumber: 'EX-01',
    insuranceDetails: {
      policyNo: 'INS-2024-003',
      newPolicyNo: '',
      policyRenewDate: '2024-08-01',
      policyCost: 45000,
      doneFrom: 'XYZ Insurance Ltd',
      expiresOn: '2025-08-01'
    },
    pucDetails: {
      pucRenewDate: '2024-01-15',
      pucExpiryDate: '2025-01-15'
    },
    roadTaxDetails: {
      roadTaxAmount: 35000,
      roadTaxRenewDate: '2024-07-01',
      roadTaxExpiryDate: '2025-06-30'
    },
    fitnessDetails: {
      fitnessRenewDate: '2024-06-01',
      fitnessExpDate: '2025-05-31',
      fitnessRenewed: false
    },
    permitDetails: {
      permitRenewDate: '2024-03-01',
      permitExpiryDate: '2025-02-28',
      permitRenewed: false
    },
    vehicleInfo: {
      make: 'CATERPILLAR',
      vehicleIdentificationNo: 'CAT987654321',
      model: '320D',
      emptyVehicleWeight: 22000,
      engineChasisNo: 'CAT987654'
    },
    modifiedDate: '2024-07-18'
  }
];

export default function VehicleRenewalDetails() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRenewalDetail | null>(null);
  const [formData, setFormData] = useState<VehicleRenewalDetail>({
    id: '',
    registrationNumber: '',
    insuranceDetails: {
      policyNo: '',
      newPolicyNo: '',
      policyRenewDate: '',
      policyCost: 0,
      doneFrom: '',
      expiresOn: ''
    },
    pucDetails: {
      pucRenewDate: '',
      pucExpiryDate: ''
    },
    roadTaxDetails: {
      roadTaxAmount: 0,
      roadTaxRenewDate: '',
      roadTaxExpiryDate: ''
    },
    fitnessDetails: {
      fitnessRenewDate: '',
      fitnessExpDate: '',
      fitnessRenewed: false
    },
    permitDetails: {
      permitRenewDate: '',
      permitExpiryDate: '',
      permitRenewed: false
    },
    vehicleInfo: {
      make: '',
      vehicleIdentificationNo: '',
      model: '',
      emptyVehicleWeight: 0,
      engineChasisNo: ''
    },
    modifiedDate: new Date().toISOString().split('T')[0]
  });

  const handleVehicleSelect = (regNo: string) => {
    const vehicle = sampleVehicleData.find(v => v.registrationNumber === regNo);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      setFormData(vehicle);
    }
  };

  const handleInputChange = (field: string, value: any, section?: string) => {
    setFormData(prev => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...(prev[section as keyof VehicleRenewalDetail] as any),
            [field]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleSave = () => {
    console.log('Saving vehicle renewal details:', formData);
    // Add save logic here
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    console.log('Exporting vehicle renewal details');
    // Add export logic here
  };

  return (
    <div className="vehicle-renewal-details">
      {/* Header */}
      <div className="vehicle-renewal-details-header">
        <div className="vehicle-renewal-details-header-content">
          <div className="vehicle-renewal-details-title-section">
            <RefreshCw className="vehicle-renewal-details-header-icon" />
            <div>
              <h1 className="vehicle-renewal-details-title">Vehicle Renewal Details</h1>
              <p className="vehicle-renewal-details-subtitle">
                Manage vehicle renewal details including insurance, PUC, road tax, fitness, and permit renewals
              </p>
            </div>
          </div>
          <div className="vehicle-renewal-details-header-actions">
            <button 
              className="vehicle-renewal-details-btn vehicle-renewal-details-btn-icon"
              onClick={handlePrint}
            >
              <Printer className="vehicle-renewal-details-icon" />
            </button>
            <button 
              className="vehicle-renewal-details-btn vehicle-renewal-details-btn-icon"
              onClick={handleExport}
            >
              <Download className="vehicle-renewal-details-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="vehicle-renewal-details-main">
        <div className="vehicle-renewal-details-content">
          {/* Vehicle Selection */}
          <div className="vehicle-renewal-details-form-section">
            <div className="vehicle-renewal-details-section-header">
              <h2 className="vehicle-renewal-details-section-title">Select Vehicle</h2>
              <p className="vehicle-renewal-details-section-subtitle">
                Choose a vehicle to view and update renewal details
              </p>
            </div>
            <div className="vehicle-renewal-details-form-grid">
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Registration Number</label>
                <select
                  className="vehicle-renewal-details-form-select"
                  value={formData.registrationNumber}
                  onChange={(e) => {
                    handleInputChange('registrationNumber', e.target.value);
                    handleVehicleSelect(e.target.value);
                  }}
                >
                  <option value="">Select Vehicle</option>
                  {sampleVehicleData.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.registrationNumber}>
                      {vehicle.registrationNumber} - {vehicle.vehicleInfo.make} {vehicle.vehicleInfo.model}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Vehicle Information Display */}
          {selectedVehicle && (
            <div className="vehicle-renewal-details-vehicle-info">
              <div className="vehicle-renewal-details-section-header">
                <h3 className="vehicle-renewal-details-section-title">Vehicle Information</h3>
              </div>
              <div className="vehicle-renewal-details-info-grid">
                <div className="vehicle-renewal-details-info-item">
                  <span className="vehicle-renewal-details-info-label">Vehicle Make</span>
                  <span className="vehicle-renewal-details-info-value">{selectedVehicle.vehicleInfo.make}</span>
                </div>
                <div className="vehicle-renewal-details-info-item">
                  <span className="vehicle-renewal-details-info-label">Vehicle Identification No.</span>
                  <span className="vehicle-renewal-details-info-value">{selectedVehicle.vehicleInfo.vehicleIdentificationNo}</span>
                </div>
                <div className="vehicle-renewal-details-info-item">
                  <span className="vehicle-renewal-details-info-label">Model</span>
                  <span className="vehicle-renewal-details-info-value">{selectedVehicle.vehicleInfo.model}</span>
                </div>
                <div className="vehicle-renewal-details-info-item">
                  <span className="vehicle-renewal-details-info-label">Empty Vehicle Weight (Kgs)</span>
                  <span className="vehicle-renewal-details-info-value">{selectedVehicle.vehicleInfo.emptyVehicleWeight}</span>
                </div>
                <div className="vehicle-renewal-details-info-item">
                  <span className="vehicle-renewal-details-info-label">Engine-Chasis No.</span>
                  <span className="vehicle-renewal-details-info-value">{selectedVehicle.vehicleInfo.engineChasisNo}</span>
                </div>
              </div>
            </div>
          )}

          {/* Insurance Details */}
          <div className="vehicle-renewal-details-renewal-section">
            <div className="vehicle-renewal-details-renewal-header">
              <Shield className="vehicle-renewal-details-renewal-icon" />
              <h3 className="vehicle-renewal-details-renewal-title">Insurance Details</h3>
            </div>
            <div className="vehicle-renewal-details-form-grid">
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Policy No.</label>
                <input
                  type="text"
                  className="vehicle-renewal-details-form-input"
                  value={formData.insuranceDetails.policyNo}
                  onChange={(e) => handleInputChange('policyNo', e.target.value, 'insuranceDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">New Policy No.</label>
                <input
                  type="text"
                  className="vehicle-renewal-details-form-input"
                  value={formData.insuranceDetails.newPolicyNo}
                  onChange={(e) => handleInputChange('newPolicyNo', e.target.value, 'insuranceDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Policy Renew Date</label>
                <input
                  type="date"
                  className="vehicle-renewal-details-form-input"
                  value={formData.insuranceDetails.policyRenewDate}
                  onChange={(e) => handleInputChange('policyRenewDate', e.target.value, 'insuranceDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Policy Cost</label>
                <input
                  type="number"
                  className="vehicle-renewal-details-form-input"
                  value={formData.insuranceDetails.policyCost}
                  onChange={(e) => handleInputChange('policyCost', parseFloat(e.target.value), 'insuranceDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Done From</label>
                <input
                  type="text"
                  className="vehicle-renewal-details-form-input"
                  value={formData.insuranceDetails.doneFrom}
                  onChange={(e) => handleInputChange('doneFrom', e.target.value, 'insuranceDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Expires On</label>
                <input
                  type="date"
                  className="vehicle-renewal-details-form-input"
                  value={formData.insuranceDetails.expiresOn}
                  onChange={(e) => handleInputChange('expiresOn', e.target.value, 'insuranceDetails')}
                />
              </div>
            </div>
          </div>

          {/* PUC Details */}
          <div className="vehicle-renewal-details-renewal-section">
            <div className="vehicle-renewal-details-renewal-header">
              <Zap className="vehicle-renewal-details-renewal-icon" />
              <h3 className="vehicle-renewal-details-renewal-title">PUC Details</h3>
            </div>
            <div className="vehicle-renewal-details-form-grid">
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">PUC Renew Date</label>
                <input
                  type="date"
                  className="vehicle-renewal-details-form-input"
                  value={formData.pucDetails.pucRenewDate}
                  onChange={(e) => handleInputChange('pucRenewDate', e.target.value, 'pucDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">PUC Expiry Date</label>
                <input
                  type="date"
                  className="vehicle-renewal-details-form-input"
                  value={formData.pucDetails.pucExpiryDate}
                  onChange={(e) => handleInputChange('pucExpiryDate', e.target.value, 'pucDetails')}
                />
              </div>
            </div>
          </div>

          {/* Road Tax Details */}
          <div className="vehicle-renewal-details-renewal-section">
            <div className="vehicle-renewal-details-renewal-header">
              <DollarSign className="vehicle-renewal-details-renewal-icon" />
              <h3 className="vehicle-renewal-details-renewal-title">Road Tax Details</h3>
            </div>
            <div className="vehicle-renewal-details-form-grid">
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Road Tax Amount</label>
                <input
                  type="number"
                  className="vehicle-renewal-details-form-input"
                  value={formData.roadTaxDetails.roadTaxAmount}
                  onChange={(e) => handleInputChange('roadTaxAmount', parseFloat(e.target.value), 'roadTaxDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Road Tax Renew Date</label>
                <input
                  type="date"
                  className="vehicle-renewal-details-form-input"
                  value={formData.roadTaxDetails.roadTaxRenewDate}
                  onChange={(e) => handleInputChange('roadTaxRenewDate', e.target.value, 'roadTaxDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Road Tax Expiry Date</label>
                <input
                  type="date"
                  className="vehicle-renewal-details-form-input"
                  value={formData.roadTaxDetails.roadTaxExpiryDate}
                  onChange={(e) => handleInputChange('roadTaxExpiryDate', e.target.value, 'roadTaxDetails')}
                />
              </div>
            </div>
          </div>

          {/* Fitness Renewal Details */}
          <div className="vehicle-renewal-details-renewal-section">
            <div className="vehicle-renewal-details-renewal-header">
              <CheckCircle className="vehicle-renewal-details-renewal-icon" />
              <h3 className="vehicle-renewal-details-renewal-title">Fitness Renewal Details</h3>
            </div>
            <div className="vehicle-renewal-details-form-grid">
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Fitness Renew Date</label>
                <input
                  type="date"
                  className="vehicle-renewal-details-form-input"
                  value={formData.fitnessDetails.fitnessRenewDate}
                  onChange={(e) => handleInputChange('fitnessRenewDate', e.target.value, 'fitnessDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Fitness Exp. Date</label>
                <input
                  type="date"
                  className="vehicle-renewal-details-form-input"
                  value={formData.fitnessDetails.fitnessExpDate}
                  onChange={(e) => handleInputChange('fitnessExpDate', e.target.value, 'fitnessDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Fitness Renewed</label>
                <select
                  className="vehicle-renewal-details-form-select"
                  value={formData.fitnessDetails.fitnessRenewed ? 'true' : 'false'}
                  onChange={(e) => handleInputChange('fitnessRenewed', e.target.value === 'true', 'fitnessDetails')}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Permit Renewal Details */}
          <div className="vehicle-renewal-details-renewal-section">
            <div className="vehicle-renewal-details-renewal-header">
              <Award className="vehicle-renewal-details-renewal-icon" />
              <h3 className="vehicle-renewal-details-renewal-title">Permit Renewal Details</h3>
            </div>
            <div className="vehicle-renewal-details-form-grid">
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Permit Renew Date</label>
                <input
                  type="date"
                  className="vehicle-renewal-details-form-input"
                  value={formData.permitDetails.permitRenewDate}
                  onChange={(e) => handleInputChange('permitRenewDate', e.target.value, 'permitDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Permit Expiry Date</label>
                <input
                  type="date"
                  className="vehicle-renewal-details-form-input"
                  value={formData.permitDetails.permitExpiryDate}
                  onChange={(e) => handleInputChange('permitExpiryDate', e.target.value, 'permitDetails')}
                />
              </div>
              <div className="vehicle-renewal-details-form-group">
                <label className="vehicle-renewal-details-form-label">Permit Renewed</label>
                <select
                  className="vehicle-renewal-details-form-select"
                  value={formData.permitDetails.permitRenewed ? 'true' : 'false'}
                  onChange={(e) => handleInputChange('permitRenewed', e.target.value === 'true', 'permitDetails')}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="vehicle-renewal-details-form-actions">
            <button 
              className="vehicle-renewal-details-btn vehicle-renewal-details-btn-secondary"
              onClick={() => setFormData({
                id: '',
                registrationNumber: '',
                insuranceDetails: {
                  policyNo: '',
                  newPolicyNo: '',
                  policyRenewDate: '',
                  policyCost: 0,
                  doneFrom: '',
                  expiresOn: ''
                },
                pucDetails: {
                  pucRenewDate: '',
                  pucExpiryDate: ''
                },
                roadTaxDetails: {
                  roadTaxAmount: 0,
                  roadTaxRenewDate: '',
                  roadTaxExpiryDate: ''
                },
                fitnessDetails: {
                  fitnessRenewDate: '',
                  fitnessExpDate: '',
                  fitnessRenewed: false
                },
                permitDetails: {
                  permitRenewDate: '',
                  permitExpiryDate: '',
                  permitRenewed: false
                },
                vehicleInfo: {
                  make: '',
                  vehicleIdentificationNo: '',
                  model: '',
                  emptyVehicleWeight: 0,
                  engineChasisNo: ''
                },
                modifiedDate: new Date().toISOString().split('T')[0]
              })}
            >
              <RefreshCw className="vehicle-renewal-details-icon" />
              Reset
            </button>
            <button 
              className="vehicle-renewal-details-btn vehicle-renewal-details-btn-primary"
              onClick={handleSave}
            >
              <Save className="vehicle-renewal-details-icon" />
              Save Renewal Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
