import React, { useState, useMemo, useEffect } from 'react';
import './VehicleServiceType.css';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';
import axios from '@/interceptors/axios';
import { customStyles } from '@/common/Utility';
import { fetchPostData } from '@/components/hooks/Api';
import { CloudCog } from 'lucide-react';

// Icon components
const Settings = ({ className }: { className?: string }) => (
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

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 7-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const Download = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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

const Wrench = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
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

// Types
interface VehicleServiceType {
    VehicleServiceTypeID?: number;
    ServiceTypeName: string;
    MaintenanceTypeID: number;
    KMInterval: number;
    Days: number;
    VehicleServiceTypeCode: string;
    CompanyId: number | string;
    IsActive?: boolean;
    CreatedDate?: string;
    LastUpdated?: string;
}

interface MaintenanceType {
    MaintenanceTypeID: number;
    Description: string;
    MaintenanceTypes: string;
    MaintenanceTypeCode: string;
    Frequency: string;
    IsActive: boolean;
}

interface Props {
    baseUrl?: string;
    companyId?: number | string | null;
}

// Status options
const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
];

const VehicleServiceType: React.FC<Props> = ({ baseUrl = '', companyId = null }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showVehicleServiceTypeModal, setShowVehicleServiceTypeModal] = useState(false);
    const [editingVehicleServiceType, setEditingVehicleServiceType] = useState<VehicleServiceType | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(false);

    const [vehicleServiceTypes, setVehicleServiceTypes] = useState<VehicleServiceType[]>([]);
    const [maintenanceTypes, setMaintenanceTypes] = useState<MaintenanceType[]>([]);
    const [vehicleServiceTypeForm, setVehicleServiceTypeForm] = useState({
        ServiceTypeName: '',
        MaintenanceTypeID: 0,
        KMInterval: 0,
        Days: 0,
        VehicleServiceTypeCode: '',
        IsActive: true,
        CompanyId: companyId || ''
    });

    const api = (path: string) => (baseUrl ? `${baseUrl}${path}` : path);

    // API Functions
    const getCompanyId = () => Number(companyId) || 0;

    const fetchMaintenanceTypes = async () => {
        try {
            const response = await fetchPostData('api/VehicleServiceType/GetDataDropDown_MaintenanceType', {
                CompanyId: getCompanyId()
            });

           

            if (response && Array.isArray(response)) {
               
                setMaintenanceTypes(response);
            
            } 
        } catch (error: any) {
            console.error('Error fetching maintenance types:', error);
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
            toastifyError('Error fetching maintenance types');
        }
    };

    const fetchVehicleServiceTypes = async () => {
        try {
            setLoading(true);
            const isActive = filterStatus === 'all' ? '' : filterStatus === 'active' ? true : false;

            const response = await fetchPostData('api/VehicleServiceType/GetData_VehicleServiceType', {
                CompanyId: getCompanyId(),
                IsActive: isActive
            });
        

            if (response && Array.isArray(response)) {
                setVehicleServiceTypes(response);
            }
        } catch (error: any) {
            toastifyError(`Error fetching vehicle service types: ${error.message}`);

            // Always show fallback data even on error
            const fallbackData = [
                {
                    VehicleServiceTypeID: 1,
                    ServiceTypeName: 'Engine Oil Change',
                    MaintenanceTypeID: 1,
                    KMInterval: 5000,
                    Days: 90,
                    VehicleServiceTypeCode: 'ENG-001',
                    CompanyId: getCompanyId(),
                    IsActive: true,
                    CreatedDate: '2025-01-01',
                    LastUpdated: '2025-01-20'
                }
            ];
            setVehicleServiceTypes(fallbackData);
        } finally {
            setLoading(false);
        }
    };

    const insertVehicleServiceType = async (data: any) => {
        try {
            const response = await fetchPostData('api/VehicleServiceType/Insert_VehicleServiceType', {
                CompanyId: getCompanyId(),
                ServiceTypeName: data.ServiceTypeName,
                MaintenanceTypeID: data.MaintenanceTypeID,
                KMInterval: data.KMInterval,
                Days: data.Days,
                VehicleServiceTypeCode: data.VehicleServiceTypeCode,
             
            });

            if (response) {
                toastifySuccess('Vehicle service type added successfully');
               
                setVehicleServiceTypes(prev => [
                    {
                        ...data,
                        VehicleServiceTypeID: response[0]?.VehicleServiceTypeID || Math.random(),
                        IsActive: true
                    },
                    ...prev
                ]);
                await fetchVehicleServiceTypes(); 
                return true;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error: any) {
            console.error('Error inserting vehicle service type:', error);
            toastifyError(`Error adding vehicle service type: ${error.response?.data?.message || error.message}`);
            return false;
        }
    };

    const updateVehicleServiceType = async (data: any, id: number) => {
        try {
            const response = await fetchPostData('api/VehicleServiceType/Update_VehicleServiceType', {
                CompanyId: getCompanyId(),
                ServiceTypeName: data.ServiceTypeName,
                MaintenanceTypeID: data.MaintenanceTypeID,
                KMInterval: data.KMInterval,
                Days: data.Days,
                VehicleServiceTypeCode: data.VehicleServiceTypeCode,
                VehicleServiceTypeID: id,
             
            });

            if (response) {
                toastifySuccess('Vehicle service type updated successfully');
                fetchVehicleServiceTypes();
                return true;
            }
        } catch (error: any) {
            console.error('Error updating vehicle service type:', error);
            toastifyError('Error updating vehicle service type');
            return false;
        }
    };

    const deleteVehicleServiceType = async (id: number) => {
        try {
            const response = await fetchPostData('api/VehicleServiceType/Delete_VehicleServiceType', {
                VehicleServiceTypeID: id,
                IsActive: false,
             
            });

            if (response) {
                toastifySuccess('Vehicle service type deleted successfully');
                fetchVehicleServiceTypes();
                return true;
            }
        } catch (error: any) {
            console.error('Error deleting vehicle service type:', error);
            toastifyError('Error deleting vehicle service type');
            return false;
        }
    };

    const getSingleVehicleServiceType = async (id: number) => {
        try {
            const response = await fetchPostData('api/VehicleServiceType/GetSingleData_VehicleServiceType', {
                VehicleServiceTypeID: id
            });

            if (response && response.length > 0) {
                return response[0];
            }
            return null;
        } catch (error: any) {
            console.error('Error fetching single vehicle service type:', error);
            toastifyError('Error fetching vehicle service type details');
            return null;
        }
    };

    // Filter functions
    const filteredVehicleServiceTypes = vehicleServiceTypes.filter(type => {
        const matchesSearch = searchTerm === '' ||
            type.ServiceTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            type.VehicleServiceTypeCode.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' ||
            (filterStatus === 'active' && type.IsActive) ||
            (filterStatus === 'inactive' && !type.IsActive);

        return matchesSearch && matchesStatus;
    });

    // useEffect hooks
    useEffect(() => {
        console.log('Component mounted or filterStatus changed:', filterStatus);
        fetchVehicleServiceTypes();
    }, [filterStatus]);

    // Initial load effect - only run if no data
    useEffect(() => {
        console.log('Initial mount check, current data length:', vehicleServiceTypes.length);
        if (vehicleServiceTypes.length === 0) {
            console.log('No data found, fetching...');
            fetchVehicleServiceTypes();
        }
        fetchMaintenanceTypes();
    }, []); // Run only on mount

    // Debug effect to log data changes
    useEffect(() => {
        console.log('Vehicle service types updated:', vehicleServiceTypes);
        console.log('Filtered vehicle service types:', filteredVehicleServiceTypes);
    }, [vehicleServiceTypes, filteredVehicleServiceTypes]);

    // Handle save
    const handleSaveVehicleServiceType = async () => {
        console.log('Saving vehicle service type:', vehicleServiceTypeForm);
        console.log('Editing mode:', editingVehicleServiceType);

        if (!vehicleServiceTypeForm.ServiceTypeName || !vehicleServiceTypeForm.MaintenanceTypeID) {
            toastifyError('Please fill in all required fields');
            return;
        }

        if (editingVehicleServiceType) {
            // Update existing vehicle service type
            console.log('Updating existing vehicle service type:', editingVehicleServiceType.VehicleServiceTypeID);
            const success = await updateVehicleServiceType(vehicleServiceTypeForm, editingVehicleServiceType.VehicleServiceTypeID!);
            if (success) {
                setEditingVehicleServiceType(null);
                setShowVehicleServiceTypeModal(false);
                resetForm();
            }
        } else {
            // Create new vehicle service type
            console.log('Creating new vehicle service type');
            const success = await insertVehicleServiceType(vehicleServiceTypeForm);
            if (success) {
                setShowVehicleServiceTypeModal(false);
                resetForm();
            }
        }
    };

    // Handle edit
    const handleEditVehicleServiceType = async (type: VehicleServiceType) => {
        try {
            setLoading(true);
            const singleData = await getSingleVehicleServiceType(type.VehicleServiceTypeID!);

            if (singleData) {
                setEditingVehicleServiceType(singleData);
                setVehicleServiceTypeForm({
                    ServiceTypeName: singleData.ServiceTypeName,
                    MaintenanceTypeID: singleData.MaintenanceTypeID,
                    KMInterval: singleData.KMInterval,
                    Days: singleData.Days,
                    VehicleServiceTypeCode: singleData.VehicleServiceTypeCode,
                    IsActive: singleData.IsActive ?? true,
                    CompanyId: singleData.CompanyId
                });
            } else {
                // Fallback to existing data if API fails
                setEditingVehicleServiceType(type);
                setVehicleServiceTypeForm({
                    ServiceTypeName: type.ServiceTypeName,
                    MaintenanceTypeID: type.MaintenanceTypeID,
                    KMInterval: type.KMInterval,
                    Days: type.Days,
                    VehicleServiceTypeCode: type.VehicleServiceTypeCode,
                    IsActive: type.IsActive ?? true,
                    CompanyId: type.CompanyId
                });
            }
            setShowVehicleServiceTypeModal(true);
        } catch (error) {
            console.error('Error loading vehicle service type for edit:', error);
            toastifyError('Error loading vehicle service type details');
        } finally {
            setLoading(false);
        }
    };

    // Handle delete
    const handleDeleteVehicleServiceType = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this vehicle service type?')) {
            await deleteVehicleServiceType(id);
        }
    };

    // Reset form
    const resetForm = () => {
        setVehicleServiceTypeForm({
            ServiceTypeName: '',
            MaintenanceTypeID: 0,
            KMInterval: 0,
            Days: 0,
            VehicleServiceTypeCode: '',
            IsActive: true,
            CompanyId: getCompanyId()
        });
    };

    // Calculate statistics
    const getTotalVehicleServiceTypes = () => vehicleServiceTypes.length;
    const getActiveVehicleServiceTypes = () => vehicleServiceTypes.filter(t => t.IsActive).length;
    const getInactiveVehicleServiceTypes = () => vehicleServiceTypes.filter(t => !t.IsActive).length;
    const getVehicleServiceTypesByInterval = () => {
        const intervalCount = vehicleServiceTypes.reduce((acc, type) => {
            const interval = `${type.KMInterval} KM`;
            acc[interval] = (acc[interval] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.keys(intervalCount).length;
    };


  


    const overviewColumns: any[] = [
        {
            name: 'Service Type Name',
            selector: (row: VehicleServiceType) => row.ServiceTypeName,
            sortable: true,
            cell: (row: VehicleServiceType) => <span className="vehicle-service-type-font-medium">{row.ServiceTypeName}</span>
        },
        {
            name: 'Maintenance Type',
            selector: (row: VehicleServiceType) => {
                const maintenanceType = maintenanceTypes.find(mt => mt.MaintenanceTypeID === row.MaintenanceTypeID);
                return maintenanceType ? maintenanceType.Description : 'Unknown';
            },
            sortable: true,
        },
        {
            name: 'KM Interval',
            selector: (row: VehicleServiceType) => row.KMInterval,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row: VehicleServiceType) => row.IsActive,
            sortable: true,
            cell: (row: VehicleServiceType) => (
                <span className={`vehicle-service-type-badge ${row.IsActive ? 'vehicle-service-type-badge-success' : 'vehicle-service-type-badge-error'}`}>
                    {row.IsActive ? 'Active' : 'Inactive'}
                </span>
            )
        },
    ];

    return (
        <div className="vehicle-service-type">
            {/* Header */}
            <div className="vehicle-service-type-header">
                <div className="vehicle-service-type-header-content">
                    <div className="vehicle-service-type-title-section">
                        <Wrench className="vehicle-service-type-header-icon" />
                        <div>
                            <h1 className="vehicle-service-type-title">Vehicle Service Type Management</h1>
                            <p className="vehicle-service-type-subtitle">
                                Manage vehicle service types, maintenance schedules, and service intervals
                            </p>
                        </div>
                    </div>
                    <div className="vehicle-service-type-header-actions">
                        <button
                            onClick={() => {
                                console.log('Add Vehicle Service Type button clicked');
                                setEditingVehicleServiceType(null);
                                resetForm();
                                setShowVehicleServiceTypeModal(true);
                            }}
                            className="vehicle-service-type-btn vehicle-service-type-btn-primary"
                        >
                            <Plus className="vehicle-service-type-icon" />
                            Add Vehicle Service Type
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="vehicle-service-type-main">

                <div className="vehicle-service-type-tab-content">
                    <div className="vehicle-service-type-section-header">

                    </div>

                    {/* Statistics Cards */}
                    <div className="vehicle-service-type-grid vehicle-service-type-grid-cols-1 vehicle-service-type-md-grid-cols-4 vehicle-service-type-gap-6 vehicle-service-type-mb-6">
                        <div className="vehicle-service-type-card">

                            <div className="vehicle-service-type-flex vehicle-service-type-items-center p-2">
                                <div className="vehicle-service-type-stat-icon vehicle-service-type-stat-icon-blue">
                                    <Wrench className="vehicle-service-type-icon" />
                                </div>
                                <div>
                                    <p className="vehicle-service-type-text-sm vehicle-service-type-text-gray-600">Total Types</p>
                                    <p className="vehicle-service-type-text-2xl vehicle-service-type-font-bold">{getTotalVehicleServiceTypes()}</p>
                                </div>
                            </div>

                        </div>

                        <div className="vehicle-service-type-card">

                            <div className="vehicle-service-type-flex vehicle-service-type-items-center p-2">
                                <div className="vehicle-service-type-stat-icon vehicle-service-type-stat-icon-green">
                                    <Settings className="vehicle-service-type-icon" />
                                </div>
                                <div>
                                    <p className="vehicle-service-type-text-sm vehicle-service-type-text-gray-600">Active Types</p>
                                    <p className="vehicle-service-type-text-2xl vehicle-service-type-font-bold">{getActiveVehicleServiceTypes()}</p>
                                </div>
                            </div>

                        </div>

                        <div className="vehicle-service-type-card">

                            <div className="vehicle-service-type-flex vehicle-service-type-items-center p-2">
                                <div className="vehicle-service-type-stat-icon vehicle-service-type-stat-icon-yellow">
                                    <Calendar className="vehicle-service-type-icon" />
                                </div>
                                <div>
                                    <p className="vehicle-service-type-text-sm vehicle-service-type-text-gray-600">Inactive Types</p>
                                    <p className="vehicle-service-type-text-2xl vehicle-service-type-font-bold">{getInactiveVehicleServiceTypes()}</p>
                                </div>
                            </div>

                        </div>

                        <div className="vehicle-service-type-card">

                            <div className="vehicle-service-type-flex vehicle-service-type-items-center p-2">
                                <div className="vehicle-service-type-stat-icon vehicle-service-type-stat-icon-purple">
                                    <BarChart3 className="vehicle-service-type-icon" />
                                </div>
                                <div>
                                    <p className="vehicle-service-type-text-sm vehicle-service-type-text-gray-600">Interval Types</p>
                                    <p className="vehicle-service-type-text-2xl vehicle-service-type-font-bold">{getVehicleServiceTypesByInterval()}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Recent Vehicle Service Types */}
                    <div className="vehicle-service-type-card">
                        <div className="vehicle-service-type-card-content">
                            <DataTable
                                columns={overviewColumns}
                                data={vehicleServiceTypes}
                                pagination
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[5, 10, 20, 50]}
                                highlightOnHover
                                customStyles={customStyles}
                            />
                        </div>
                    </div>
                </div>



            </div>

            {/* Vehicle Service Type Modal */}
            {showVehicleServiceTypeModal && (
                <div className="vehicle-service-type-modal-overlay" onClick={() => setShowVehicleServiceTypeModal(false)}>
                    <div className="vehicle-service-type-modal vehicle-service-type-modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="vehicle-service-type-modal-header">
                            <h3 className="vehicle-service-type-modal-title">
                                {editingVehicleServiceType ? 'Edit Vehicle Service Type' : 'Add New Vehicle Service Type'}
                            </h3>
                            <button
                                onClick={() => setShowVehicleServiceTypeModal(false)}
                                className="vehicle-service-type-modal-close"
                            >
                                ×
                            </button>
                        </div>
                        <div className="vehicle-service-type-modal-content">
                            <div className="vehicle-service-type-space-y-4">
                                <div className="vehicle-service-type-form-grid vehicle-service-type-form-grid-2">
                                    <div>
                                        <label className="vehicle-service-type-label">
                                            Service Type Name <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={vehicleServiceTypeForm.ServiceTypeName}
                                            onChange={(e) => setVehicleServiceTypeForm({ ...vehicleServiceTypeForm, ServiceTypeName: e.target.value })}
                                            className="vehicle-service-type-input"
                                            placeholder="Service type name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="vehicle-service-type-label">
                                            Maintenance Type <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Select
                                            value={maintenanceTypes.find(type => type.MaintenanceTypeID === vehicleServiceTypeForm.MaintenanceTypeID)}
                                            onChange={(selectedOption) => setVehicleServiceTypeForm({
                                                ...vehicleServiceTypeForm,
                                                MaintenanceTypeID: selectedOption ? selectedOption.MaintenanceTypeID : 0
                                            })}
                                            options={maintenanceTypes.map(type => ({
                                                value: type.MaintenanceTypeID,
                                                label: `${type.Description} - ${type.MaintenanceTypeCode}`,
                                                ...type
                                            }))}
                                            placeholder="Select Maintenance Type"
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
                                            isSearchable={true}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="vehicle-service-type-form-grid vehicle-service-type-form-grid-2">
                                    <div>
                                        <label className="vehicle-service-type-label">KM Interval</label>
                                        <input
                                            type="number"
                                            value={vehicleServiceTypeForm.KMInterval}
                                            onChange={(e) => setVehicleServiceTypeForm({ ...vehicleServiceTypeForm, KMInterval: Number(e.target.value) })}
                                            className="vehicle-service-type-input"
                                            placeholder="KM interval"
                                        />
                                    </div>

                                    <div>
                                        <label className="vehicle-service-type-label">Days</label>
                                        <input
                                            type="number"
                                            value={vehicleServiceTypeForm.Days}
                                            onChange={(e) => setVehicleServiceTypeForm({ ...vehicleServiceTypeForm, Days: Number(e.target.value) })}
                                            className="vehicle-service-type-input"
                                            placeholder="Days"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="vehicle-service-type-label">Service Type Code</label>
                                    <input
                                        type="text"
                                        value={vehicleServiceTypeForm.VehicleServiceTypeCode}
                                        onChange={(e) => setVehicleServiceTypeForm({ ...vehicleServiceTypeForm, VehicleServiceTypeCode: e.target.value })}
                                        className="vehicle-service-type-input"
                                        placeholder="Service type code"
                                    />
                                </div>

                                <div>
                                    <label className="vehicle-service-type-label">Status</label>
                                    <div>
                                        <label className="vehicle-service-type-label">
                                            <input
                                                type="checkbox"
                                                checked={vehicleServiceTypeForm.IsActive}
                                                onChange={(e) => setVehicleServiceTypeForm({ ...vehicleServiceTypeForm, IsActive: e.target.checked })}
                                                className="mr-2"
                                            />
                                            Active
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vehicle-service-type-modal-footer">
                            <button
                                onClick={() => setShowVehicleServiceTypeModal(false)}
                                className="vehicle-service-type-btn vehicle-service-type-btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveVehicleServiceType}
                                className="vehicle-service-type-btn vehicle-service-type-btn-primary"
                                disabled={!vehicleServiceTypeForm.ServiceTypeName || !vehicleServiceTypeForm.MaintenanceTypeID || loading}
                            >
                                <Save className="vehicle-service-type-icon" />
                                {editingVehicleServiceType ? 'Update Vehicle Service Type' : 'Add Vehicle Service Type'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehicleServiceType;
