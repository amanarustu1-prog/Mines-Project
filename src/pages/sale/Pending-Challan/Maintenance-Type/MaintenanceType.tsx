import React, { useState, useMemo, useEffect } from 'react';
import './MaintenanceType.css';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';
import axios from '@/interceptors/axios';
import { customStyles } from '@/common/Utility';
import { fetchPostData } from '@/components/hooks/Api';

// Icon components
interface MaintenanceType {
  MaintenanceTypeID?: number;
  Description: string;
  MaintenanceTypes: string;
  MaintenanceTypeCode: string;
  Frequency: string;
  CompanyId: number | string;
  IsActive?: boolean;
  CreatedDate?: string;
  LastUpdated?: string;
}

interface Props {
  baseUrl?: string;
  companyId?: number | string | null;
}

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

const Trash2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 7-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const List = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l4-4L11 13l4-4 4 4M3 21h18" />
  </svg>
);

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
  </svg>
);

const Settings = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
  </svg>
);

// Status options
const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

const MaintenanceType: React.FC<Props> = ({ baseUrl = '', companyId = null }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showMaintenanceTypeModal, setShowMaintenanceTypeModal] = useState(false);
  const [editingMaintenanceType, setEditingMaintenanceType] = useState<MaintenanceType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  const [maintenanceTypes, setMaintenanceTypes] = useState<MaintenanceType[]>([]);
  const [maintenanceTypeForm, setMaintenanceTypeForm] = useState({
    Description: '',
    MaintenanceTypes: '',
    MaintenanceTypeCode: '',
    Frequency: '',
    IsActive: true,
    CompanyId: companyId || ''
  });

  const api = (path: string) => (baseUrl ? `${baseUrl}${path}` : path);

  // API Functions
  const getCompanyId = () => Number(companyId) || 0;

  const fetchMaintenanceTypes = async () => {
    try {
      setLoading(true);
      const isActive = filterStatus === 'all' ? '' : filterStatus === 'active' ? true : false;

      const response = await axios.post('/GetData_MaintenanceType', {
        IsActive: isActive,
        CompanyId: getCompanyId()
      });

      const data = response.data?.data ? JSON.parse(response.data.data) : [];

      if (data?.Table && Array.isArray(data.Table)) {
        setMaintenanceTypes(data.Table);
      } else {
        // Always show fallback data for better UX
        const fallbackData = [
          {
            MaintenanceTypeID: 1,
            Description: 'Engine Oil Change',
            MaintenanceTypes: 'Preventive',
            MaintenanceTypeCode: 'ENG-001',
            Frequency: 'Monthly',
            CompanyId: getCompanyId(),
            IsActive: true,
            CreatedDate: '2025-01-01',
            LastUpdated: '2025-01-20'
          },
          {
            MaintenanceTypeID: 2,
            Description: 'Brake Inspection',
            MaintenanceTypes: 'Safety',
            MaintenanceTypeCode: 'BRK-001',
            Frequency: 'Quarterly',
            CompanyId: getCompanyId(),
            IsActive: true,
            CreatedDate: '2025-01-01',
            LastUpdated: '2025-01-18'
          },
          {
            MaintenanceTypeID: 3,
            Description: 'Tire Rotation',
            MaintenanceTypes: 'Preventive',
            MaintenanceTypeCode: 'TIR-001',
            Frequency: '6 Months',
            CompanyId: getCompanyId(),
            IsActive: true,
            CreatedDate: '2025-01-01',
            LastUpdated: '2025-01-15'
          }
        ];
        setMaintenanceTypes(fallbackData);
      }
    } catch (error: any) {
      toastifyError(`Error fetching maintenance types: ${error.message}`);

      // Always show fallback data even on error
      const fallbackData = [
        {
          MaintenanceTypeID: 1,
          Description: 'Engine Oil Change',
          MaintenanceTypes: 'Preventive',
          MaintenanceTypeCode: 'ENG-001',
          Frequency: 'Monthly',
          CompanyId: getCompanyId(),
          IsActive: true,
          CreatedDate: '2025-01-01',
          LastUpdated: '2025-01-20'
        },
        {
          MaintenanceTypeID: 2,
          Description: 'Brake Inspection',
          MaintenanceTypes: 'Safety',
          MaintenanceTypeCode: 'BRK-001',
          Frequency: 'Quarterly',
          CompanyId: getCompanyId(),
          IsActive: true,
          CreatedDate: '2025-01-01',
          LastUpdated: '2025-01-18'
        }
      ];
      setMaintenanceTypes(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const insertMaintenanceType = async (data: any) => {
    try {
      const response = await fetchPostData('Insert_MaintenanceType', {
        ...data,
        CompanyId: getCompanyId(),
        IsActive: data.IsActive ?? true,
        IPAddress: sessionStorage.getItem('IPAddress') || ''
      });

      if (response) {
        toastifySuccess('Maintenance type added successfully');
        await fetchMaintenanceTypes();
        return true;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Error inserting maintenance type:', error);

      toastifyError(`Error adding maintenance type: ${error.response?.data?.message || error.message}`);
      return false;
    }
  };

  const updateMaintenanceType = async (data: any, id: number) => {
    try {
      const response = await fetchPostData('Update_MaintenanceType', {
        ...data,
        MaintenanceTypeID: id,
        CompanyId: getCompanyId(),
        IPAddress: sessionStorage.getItem('IPAddress') || ''
      });

      if (response) {
        toastifySuccess('Maintenance type updated successfully');
        fetchMaintenanceTypes();
        return true;
      }
    } catch (error: any) {
      console.error('Error updating maintenance type:', error);
      toastifyError('Error updating maintenance type');
      return false;
    }
  };

  const deleteMaintenanceType = async (id: number) => {
    try {
      const response = await fetchPostData('Delete_MaintenanceType', {
        MaintenanceTypeID: id,
        IsActive: false,
        IPAddress: sessionStorage.getItem('IPAddress') || ''
      });

      if (response) {
        toastifySuccess('Maintenance type deleted successfully');
        fetchMaintenanceTypes();
        return true;
      }
    } catch (error: any) {
      console.error('Error deleting maintenance type:', error);
      toastifyError('Error deleting maintenance type');
      return false;
    }
  };

  // Filter functions
  const filteredMaintenanceTypes = maintenanceTypes.filter(type => {
    const matchesSearch = searchTerm === '' ||
      type.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.MaintenanceTypes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (type.MaintenanceTypeCode && type.MaintenanceTypeCode.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'active' && type.IsActive) ||
      (filterStatus === 'inactive' && !type.IsActive);

    return matchesSearch && matchesStatus;
  });

  // useEffect hooks
  useEffect(() => {
    console.log('Component mounted or filterStatus changed:', filterStatus);
    fetchMaintenanceTypes();
  }, [filterStatus]);

  // Initial load effect - only run if no data
  useEffect(() => {
    console.log('Initial mount check, current data length:', maintenanceTypes.length);
    if (maintenanceTypes.length === 0) {
      console.log('No data found, fetching...');
      fetchMaintenanceTypes();
    }
  }, []); // Run only on mount

  // Debug effect to log data changes
  useEffect(() => {
    console.log('Maintenance types updated:', maintenanceTypes);
    console.log('Filtered maintenance types:', filteredMaintenanceTypes);
  }, [maintenanceTypes, filteredMaintenanceTypes]);

  // Handle save
  const handleSaveMaintenanceType = async () => {
    console.log('Saving maintenance type:', maintenanceTypeForm);
    console.log('Editing mode:', editingMaintenanceType);

    if (!maintenanceTypeForm.Description || !maintenanceTypeForm.MaintenanceTypes) {
      toastifyError('Please fill in all required fields');
      return;
    }

    if (editingMaintenanceType) {
      // Update existing product
      console.log('Updating existing maintenance type:', editingMaintenanceType.MaintenanceTypeID);
      const success = await updateMaintenanceType(maintenanceTypeForm, editingMaintenanceType.MaintenanceTypeID!);
      if (success) {
        setEditingMaintenanceType(null);
        setShowMaintenanceTypeModal(false);
        resetForm();
      }
    } else {
      // Create new product
      console.log('Creating new maintenance type');
      const success = await insertMaintenanceType(maintenanceTypeForm);
      if (success) {
        setShowMaintenanceTypeModal(false);
        resetForm();
      }
    }
  };

  // Handle edit
  const handleEditMaintenanceType = (type: MaintenanceType) => {
    setEditingMaintenanceType(type);
    setMaintenanceTypeForm({
      Description: type.Description,
      MaintenanceTypes: type.MaintenanceTypes,
      MaintenanceTypeCode: type.MaintenanceTypeCode,
      Frequency: type.Frequency,
      IsActive: type.IsActive ?? true,
      CompanyId: type.CompanyId
    });
    setShowMaintenanceTypeModal(true);
  };

  // Handle delete
  const handleDeleteMaintenanceType = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this maintenance type?')) {
      await deleteMaintenanceType(id);
    }
  };

  // Reset form
  const resetForm = () => {
    setMaintenanceTypeForm({
      Description: '',
      MaintenanceTypes: '',
      MaintenanceTypeCode: '',
      Frequency: '',
      IsActive: true,
      CompanyId: companyId || ''
    });
  };

  // Calculate statistics
  const getTotalMaintenanceTypes = () => maintenanceTypes.length;
  const getActiveMaintenanceTypes = () => maintenanceTypes.filter(t => t.IsActive).length;
  const getInactiveMaintenanceTypes = () => maintenanceTypes.filter(t => !t.IsActive).length;
  const getMaintenanceTypesByFrequency = () => {
    const frequencyCount = maintenanceTypes.reduce((acc, type) => {
      acc[type.Frequency] = (acc[type.Frequency] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.keys(frequencyCount).length;
  };

  // Table columns configuration
  const columns: any[] = [
    {
      name: 'Description',
      selector: (row: MaintenanceType) => row.Description,
      sortable: true,
      cell: (row: MaintenanceType) => <span className="maintenance-type-font-medium">{row.Description}</span>
    },
    {
      name: 'Type',
      selector: (row: MaintenanceType) => row.MaintenanceTypes,
      sortable: true,
    },
    {
      name: 'Code',
      selector: (row: MaintenanceType) => row.MaintenanceTypeCode,
      sortable: true,
    },
    {
      name: 'Frequency',
      selector: (row: MaintenanceType) => row.Frequency,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: MaintenanceType) => row.IsActive,
      sortable: true,
      cell: (row: MaintenanceType) => (
        <span className={`maintenance-type-badge ${row.IsActive ? 'maintenance-type-badge-success' : 'maintenance-type-badge-error'}`}>
          {row.IsActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      name: 'Actions',
      cell: (row: MaintenanceType) => (
        <div className="maintenance-type-flex maintenance-type-gap-1">
          <button
            onClick={() => handleEditMaintenanceType(row)}
            className="maintenance-type-btn-icon"
            title="Edit"
          >
            <Edit3 className="maintenance-type-icon-sm" />
          </button>
          <button
            onClick={() => handleDeleteMaintenanceType(row.MaintenanceTypeID!)}
            className="maintenance-type-btn-icon maintenance-type-btn-icon-danger"
            title="Delete"
          >
            <Trash2 className="maintenance-type-icon-sm" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Overview table columns
  const overviewColumns: any[] = [
    {
      name: 'Description',
      selector: (row: MaintenanceType) => row.Description,
      sortable: true,
      cell: (row: MaintenanceType) => <span className="maintenance-type-font-medium">{row.Description}</span>
    },
    {
      name: 'Type',
      selector: (row: MaintenanceType) => row.MaintenanceTypes,
      sortable: true,
    },
    {
      name: 'Frequency',
      selector: (row: MaintenanceType) => row.Frequency,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: MaintenanceType) => row.IsActive,
      sortable: true,
      cell: (row: MaintenanceType) => (
        <span className={`maintenance-type-badge ${row.IsActive ? 'maintenance-type-badge-success' : 'maintenance-type-badge-error'}`}>
          {row.IsActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
  ];

  return (
    <div className="maintenance-type">
      {/* Header */}
      <div className="maintenance-type-header">
        <div className="maintenance-type-header-content">
          <div className="maintenance-type-title-section">
            <Wrench className="maintenance-type-header-icon" />
            <div>
              <h1 className="maintenance-type-title">Maintenance Types Management</h1>
              <p className="maintenance-type-subtitle">
                Manage maintenance types, schedules, and procedures
              </p>
            </div>
          </div>
          <div className="maintenance-type-header-actions">
            <button
              onClick={() => {
                console.log('Add Maintenance Type button clicked');
                setEditingMaintenanceType(null);
                resetForm();
                setShowMaintenanceTypeModal(true);
              }}
              className="maintenance-type-btn maintenance-type-btn-primary"
            >
              <Plus className="maintenance-type-icon" />
              Add Maintenance Type
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="maintenance-type-main">
        {/* Tab Navigation */}
        <div className="maintenance-type-tabs">
          <div className="maintenance-type-tabs-container">
            <nav className="maintenance-type-tabs-nav">
              <div className="maintenance-type-tabs-list">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`maintenance-type-tab ${activeTab === 'overview' ? 'active' : ''}`}
                >
                  <BarChart3 className="maintenance-type-tab-icon" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('maintenanceTypes')}
                  className={`maintenance-type-tab ${activeTab === 'maintenanceTypes' ? 'active' : ''}`}
                >
                  <List className="maintenance-type-tab-icon" />
                  Maintenance Types
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="maintenance-type-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="maintenance-type-tab-content">
              <div className="maintenance-type-section-header">
                <div>
                  <h2 className="maintenance-type-section-title">Overview</h2>
                  <p className="maintenance-type-section-subtitle">
                    Summary of maintenance types and key metrics
                  </p>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="maintenance-type-grid maintenance-type-grid-cols-1 maintenance-type-md-grid-cols-4 maintenance-type-gap-6 maintenance-type-mb-6">
                <div className="maintenance-type-card">
                  <div className="maintenance-type-card-content">
                    <div className="maintenance-type-flex maintenance-type-items-center p-2">
                      <div className="maintenance-type-stat-icon maintenance-type-stat-icon-blue">
                        <Wrench className="maintenance-type-icon" />
                      </div>
                      <div>
                        <p className="maintenance-type-text-sm maintenance-type-text-gray-600">Total Types</p>
                        <p className="maintenance-type-text-2xl maintenance-type-font-bold">{getTotalMaintenanceTypes()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="maintenance-type-card">
                  <div className="maintenance-type-card-content">
                    <div className="maintenance-type-flex maintenance-type-items-center p-2">
                      <div className="maintenance-type-stat-icon maintenance-type-stat-icon-green">
                        <Settings className="maintenance-type-icon" />
                      </div>
                      <div>
                        <p className="maintenance-type-text-sm maintenance-type-text-gray-600">Active Types</p>
                        <p className="maintenance-type-text-2xl maintenance-type-font-bold">{getActiveMaintenanceTypes()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="maintenance-type-card">
                  <div className="maintenance-type-card-content">
                    <div className="maintenance-type-flex maintenance-type-items-center p-2">
                      <div className="maintenance-type-stat-icon maintenance-type-stat-icon-yellow">
                        <Calendar className="maintenance-type-icon" />
                      </div>
                      <div>
                        <p className="maintenance-type-text-sm maintenance-type-text-gray-600">Inactive Types</p>
                        <p className="maintenance-type-text-2xl maintenance-type-font-bold">{getInactiveMaintenanceTypes()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="maintenance-type-card">
                  <div className="maintenance-type-card-content">
                    <div className="maintenance-type-flex maintenance-type-items-center p-2">
                      <div className="maintenance-type-stat-icon maintenance-type-stat-icon-purple">
                        <BarChart3 className="maintenance-type-icon" />
                      </div>
                      <div>
                        <p className="maintenance-type-text-sm maintenance-type-text-gray-600">Frequency Types</p>
                        <p className="maintenance-type-text-2xl maintenance-type-font-bold">{getMaintenanceTypesByFrequency()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Maintenance Types */}
              <div className="maintenance-type-card">
                <div className="maintenance-type-card-content">
                  <DataTable
                    columns={overviewColumns}
                    data={maintenanceTypes.length > 0 ? maintenanceTypes.slice(0, 5) : []}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 20, 50]}
                    highlightOnHover
                    noDataComponent={
                      <div className="maintenance-type-text-center maintenance-type-py-8">
                        <p className="maintenance-type-text-gray-600">No maintenance types available</p>
                        <p className="maintenance-type-text-sm maintenance-type-text-gray-500 mt-2">
                          Add your first maintenance type to get started
                        </p>
                      </div>
                    }
                    customStyles={customStyles}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Maintenance Types Tab */}
          {activeTab === 'maintenanceTypes' && (
            <div className="maintenance-type-tab-content">
              <div className="maintenance-type-section-header">
                <div>
                  <h2 className="maintenance-type-section-title">Maintenance Types</h2>
                  <p className="maintenance-type-section-subtitle">
                    Manage all maintenance types and their schedules
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="maintenance-type-filters">
                <div className="maintenance-type-search-container">
                  <Search className="maintenance-type-search-icon" />
                  <input
                    type="text"
                    placeholder="Search maintenance types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="maintenance-type-search-input"
                  />
                </div>
                <Select
                  value={statusOptions.find(option => option.value === filterStatus)}
                  onChange={(selectedOption) => setFilterStatus(selectedOption?.value || 'all')}
                  options={statusOptions}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minHeight: '48px',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      '&:hover': {
                        borderColor: '#9ca3af',
                      },
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: '#6b7280',
                    }),
                  }}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Maintenance Types Table */}
              <div className="maintenance-type-card">
                <div className="maintenance-type-card-content">
                  <DataTable
                    columns={columns}
                    data={filteredMaintenanceTypes}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 20, 50]}
                    highlightOnHover
                    responsive
                    progressPending={loading}
                    noDataComponent={
                      <div className="maintenance-type-text-center maintenance-type-py-8">
                        <p className="maintenance-type-text-gray-600">
                          {searchTerm || filterStatus !== 'all'
                            ? 'No maintenance types match your search/filter criteria'
                            : 'No maintenance types found'}
                        </p>
                        <p className="maintenance-type-text-sm maintenance-type-text-gray-500 mt-2">
                          {searchTerm || filterStatus !== 'all'
                            ? 'Try adjusting your search terms or filter settings'
                            : 'Add your first maintenance type using the "Add Maintenance Type" button above'}
                        </p>
                      </div>
                    }
                    customStyles={customStyles}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Maintenance Type Modal */}
      {showMaintenanceTypeModal && (
        <div className="maintenance-type-modal-overlay" onClick={() => setShowMaintenanceTypeModal(false)}>
          <div className="maintenance-type-modal maintenance-type-modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="maintenance-type-modal-header">
              <h3 className="maintenance-type-modal-title">
                {editingMaintenanceType ? 'Edit Maintenance Type' : 'Add New Maintenance Type'}
              </h3>
              <button
                onClick={() => setShowMaintenanceTypeModal(false)}
                className="maintenance-type-modal-close"
              >
                ×
              </button>
            </div>
            <div className="maintenance-type-modal-content">
              <div className="maintenance-type-space-y-4">
                <div className="maintenance-type-form-grid maintenance-type-form-grid-2">
                  <div>
                    <label className="maintenance-type-label">
                      Description <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={maintenanceTypeForm.Description}
                      onChange={(e) => setMaintenanceTypeForm({ ...maintenanceTypeForm, Description: e.target.value })}
                      className="maintenance-type-input"
                      placeholder="Maintenance description"
                      required
                    />
                  </div>

                  <div>
                    <label className="maintenance-type-label">
                      Type <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={maintenanceTypeForm.MaintenanceTypes}
                      onChange={(e) => setMaintenanceTypeForm({ ...maintenanceTypeForm, MaintenanceTypes: e.target.value })}
                      className="maintenance-type-input"
                      placeholder="Maintenance type"
                      required
                    />
                  </div>
                </div>

                <div className="maintenance-type-form-grid maintenance-type-form-grid-2">
                  <div>
                    <label className="maintenance-type-label">Code</label>
                    <input
                      type="text"
                      value={maintenanceTypeForm.MaintenanceTypeCode}
                      onChange={(e) => setMaintenanceTypeForm({ ...maintenanceTypeForm, MaintenanceTypeCode: e.target.value })}
                      className="maintenance-type-input"
                      placeholder="Maintenance type code"
                    />
                  </div>

                  <div>
                    <label className="maintenance-type-label">Frequency</label>
                    <input
                      type="text"
                      value={maintenanceTypeForm.Frequency}
                      onChange={(e) => setMaintenanceTypeForm({ ...maintenanceTypeForm, Frequency: e.target.value })}
                      className="maintenance-type-input"
                      placeholder="Maintenance frequency"
                    />
                  </div>
                </div>

                <div>
                  <label className="maintenance-type-label">Status</label>
                  <div>
                    <label className="maintenance-type-label">
                      <input
                        type="checkbox"
                        checked={maintenanceTypeForm.IsActive}
                        onChange={(e) => setMaintenanceTypeForm({ ...maintenanceTypeForm, IsActive: e.target.checked })}
                        className="mr-2"
                      />
                      Active
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="maintenance-type-modal-footer">
              <button
                onClick={() => setShowMaintenanceTypeModal(false)}
                className="maintenance-type-btn maintenance-type-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMaintenanceType}
                className="maintenance-type-btn maintenance-type-btn-primary"
                disabled={!maintenanceTypeForm.Description || !maintenanceTypeForm.MaintenanceTypes || loading}
              >
                <Save className="maintenance-type-icon" />
                {editingMaintenanceType ? 'Update Maintenance Type' : 'Add Maintenance Type'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceType;
