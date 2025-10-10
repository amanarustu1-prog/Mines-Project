import React, { useState, useMemo, useEffect } from 'react';
import './MaterialName.css';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';
import axios from '@/interceptors/axios';
import { customStyles } from '@/common/Utility';
import { fetchPostData } from '@/components/hooks/Api';
import { Search } from 'lucide-react';

// Icon components
const Package = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l6-3m0 0l6 3M9 9v12l6-3v-12" />
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

const Tag = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
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

// Types
interface MaterialName {
    MaterialNameID?: number;
    MaterialName: string;
    MaterialTypeID: number;
    MaterialGroupID: number;
    UnitMeasurementID: number;
    MaterialNameCode: string;
    CompanyId: number | string;
    IsActive?: boolean;
    CreatedDate?: string;
    LastUpdated?: string;
}

interface MaterialType {
    MaterialTypeID: number;
    MaterialTypeName: string;
    MaterialTypeCode: string;
    IsActive: boolean;
}

interface MaterialGroup {
    MaterialGroupID: number;
    MaterialGroupName: string;
    MaterialGroupCode: string;
    IsActive: boolean;
}

interface UnitMeasurement {
    UnitMeasurementID: number;
    UnitName: string;
    UnitCode: string;
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

const MaterialName: React.FC<Props> = ({ baseUrl = '', companyId = null }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showMaterialNameModal, setShowMaterialNameModal] = useState(false);
    const [editingMaterialName, setEditingMaterialName] = useState<MaterialName | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(false);

    const [materialNames, setMaterialNames] = useState<MaterialName[]>([]);
    const [materialTypes, setMaterialTypes] = useState<MaterialType[]>([]);
    const [materialGroups, setMaterialGroups] = useState<MaterialGroup[]>([]);
    const [unitMeasurements, setUnitMeasurements] = useState<UnitMeasurement[]>([]);
    const [materialNameForm, setMaterialNameForm] = useState({
        MaterialName: '',
        MaterialTypeID: 0,
        MaterialGroupID: 0,
        UnitMeasurementID: 0,
        MaterialNameCode: '',
        IsActive: true,
        CompanyId: companyId || ''
    });

    const api = (path: string) => (baseUrl ? `${baseUrl}${path}` : path);

    // API Functions
    const getCompanyId = () => Number(companyId) || 0;

    const fetchMaterialTypes = async () => {
        try {
            const response = await fetchPostData('api/MaterialName/GetDataDropDown_MaterialType', {
                CompanyId: getCompanyId()
            });

            if (response && Array.isArray(response)) {
                setMaterialTypes(response);
            }
        } catch (error: any) {
            console.error('Error fetching material types:', error);
            toastifyError('Error fetching material types');
        }
    };

    const fetchMaterialGroups = async () => {
        try {
            const response = await fetchPostData('api/MaterialName/GetDataDropDown_MaterialGroup', {
                CompanyId: getCompanyId()
            });

            if (response && Array.isArray(response)) {
                setMaterialGroups(response);
            }
        } catch (error: any) {
            console.error('Error fetching material groups:', error);
            toastifyError('Error fetching material groups');
        }
    };

    const fetchUnitMeasurements = async () => {
        try {
            const response = await fetchPostData('api/MaterialName/GetDataDropDown_UnitMeasurement', {
                CompanyId: getCompanyId()
            });

            if (response && Array.isArray(response)) {
                setUnitMeasurements(response);
            }
        } catch (error: any) {
            console.error('Error fetching unit measurements:', error);
            toastifyError('Error fetching unit measurements');
        }
    };

    const fetchMaterialNames = async () => {
        try {
            setLoading(true);
            const isActive = filterStatus === 'all' ? '' : filterStatus === 'active' ? true : false;

            const response = await fetchPostData('api/MaterialName/GetData_MaterialName', {
                CompanyId: getCompanyId(),
                IsActive: isActive
            });

            if (response && Array.isArray(response)) {
                setMaterialNames(response);
            } else {
                // Fallback data for better UX
                const fallbackData = [
                    {
                        MaterialNameID: 1,
                        MaterialName: 'Steel Rod',
                        MaterialTypeID: 1,
                        MaterialGroupID: 1,
                        UnitMeasurementID: 1,
                        MaterialNameCode: 'STL-001',
                        CompanyId: getCompanyId(),
                        IsActive: true,
                        CreatedDate: '2025-01-01',
                        LastUpdated: '2025-01-20'
                    },
                    {
                        MaterialNameID: 2,
                        MaterialName: 'Cement Bag',
                        MaterialTypeID: 2,
                        MaterialGroupID: 2,
                        UnitMeasurementID: 2,
                        MaterialNameCode: 'CMT-001',
                        CompanyId: getCompanyId(),
                        IsActive: true,
                        CreatedDate: '2025-01-01',
                        LastUpdated: '2025-01-18'
                    }
                ];
                setMaterialNames(fallbackData);
            }
        } catch (error: any) {
            toastifyError(`Error fetching material names: ${error.message}`);

            // Always show fallback data even on error
            const fallbackData = [
                {
                    MaterialNameID: 1,
                    MaterialName: 'Steel Rod',
                    MaterialTypeID: 1,
                    MaterialGroupID: 1,
                    UnitMeasurementID: 1,
                    MaterialNameCode: 'STL-001',
                    CompanyId: getCompanyId(),
                    IsActive: true,
                    CreatedDate: '2025-01-01',
                    LastUpdated: '2025-01-20'
                }
            ];
            setMaterialNames(fallbackData);
        } finally {
            setLoading(false);
        }
    };

    const insertMaterialName = async (data: any) => {
        try {
            const response = await fetchPostData('api/MaterialName/Insert_MaterialName', {
                CompanyId: getCompanyId(),
                MaterialName: data.MaterialName,
                MaterialTypeID: data.MaterialTypeID,
                MaterialGroupID: data.MaterialGroupID,
                UnitMeasurementID: data.UnitMeasurementID,
                MaterialNameCode: data.MaterialNameCode,
                IPAddress: sessionStorage.getItem('IPAddress') || ''
            });

            if (response) {
                toastifySuccess('Material name added successfully');

                setMaterialNames(prev => [
                    {
                        ...data,
                        MaterialNameID: response[0]?.MaterialNameID || Math.random(),
                        IsActive: true
                    },
                    ...prev
                ]);
                await fetchMaterialNames();
                return true;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error: any) {
            console.error('Error inserting material name:', error);
            toastifyError(`Error adding material name: ${error.response?.data?.message || error.message}`);
            return false;
        }
    };

    const updateMaterialName = async (data: any, id: number) => {
        try {
            const response = await fetchPostData('api/MaterialName/Update_MaterialName', {
                CompanyId: getCompanyId(),
                MaterialName: data.MaterialName,
                MaterialTypeID: data.MaterialTypeID,
                MaterialGroupID: data.MaterialGroupID,
                UnitMeasurementID: data.UnitMeasurementID,
                MaterialNameCode: data.MaterialNameCode,
                MaterialNameID: id,
                IPAddress: sessionStorage.getItem('IPAddress') || ''
            });

            if (response) {
                toastifySuccess('Material name updated successfully');
                fetchMaterialNames();
                return true;
            }
        } catch (error: any) {
            console.error('Error updating material name:', error);
            toastifyError('Error updating material name');
            return false;
        }
    };

    const deleteMaterialName = async (id: number) => {
        try {
            const response = await fetchPostData('api/MaterialName/Delete_MaterialName', {
                MaterialNameID: id,
                IsActive: false,
                IPAddress: sessionStorage.getItem('IPAddress') || ''
            });

            if (response) {
                toastifySuccess('Material name deleted successfully');
                fetchMaterialNames();
                return true;
            }
        } catch (error: any) {
            console.error('Error deleting material name:', error);
            toastifyError('Error deleting material name');
            return false;
        }
    };

    const getSingleMaterialName = async (id: number) => {
        try {
            const response = await fetchPostData('api/MaterialName/GetSingleData_MaterialName', {
                MaterialNameID: id
            });

            if (response && response.length > 0) {
                return response[0];
            }
            return null;
        } catch (error: any) {
            console.error('Error fetching single material name:', error);
            toastifyError('Error fetching material name details');
            return null;
        }
    };

    // Filter functions
    const filteredMaterialNames = materialNames.filter(material => {
        const matchesSearch = searchTerm === '' ||
            material.MaterialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.MaterialNameCode.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' ||
            (filterStatus === 'active' && material.IsActive) ||
            (filterStatus === 'inactive' && !material.IsActive);

        return matchesSearch && matchesStatus;
    });

    // useEffect hooks
    useEffect(() => {
        console.log('Component mounted or filterStatus changed:', filterStatus);
        fetchMaterialNames();
    }, [filterStatus]);

    // Initial load effect - only run if no data
    useEffect(() => {
        console.log('Initial mount check, current data length:', materialNames.length);
        if (materialNames.length === 0) {
            console.log('No data found, fetching...');
            fetchMaterialNames();
        }
        fetchMaterialTypes();
        fetchMaterialGroups();
        fetchUnitMeasurements();
    }, []); // Run only on mount

    // Debug effect to log data changes
    useEffect(() => {
        console.log('Material names updated:', materialNames);
        console.log('Filtered material names:', filteredMaterialNames);
    }, [materialNames, filteredMaterialNames]);

    // Handle save
    const handleSaveMaterialName = async () => {
        console.log('Saving material name:', materialNameForm);
        console.log('Editing mode:', editingMaterialName);

        if (!materialNameForm.MaterialName || !materialNameForm.MaterialTypeID || !materialNameForm.MaterialGroupID || !materialNameForm.UnitMeasurementID) {
            toastifyError('Please fill in all required fields');
            return;
        }

        if (editingMaterialName) {
            // Update existing material name
            console.log('Updating existing material name:', editingMaterialName.MaterialNameID);
            const success = await updateMaterialName(materialNameForm, editingMaterialName.MaterialNameID!);
            if (success) {
                setEditingMaterialName(null);
                setShowMaterialNameModal(false);
                resetForm();
            }
        } else {
            // Create new material name
            console.log('Creating new material name');
            const success = await insertMaterialName(materialNameForm);
            if (success) {
                setShowMaterialNameModal(false);
                resetForm();
            }
        }
    };

    // Handle edit
    const handleEditMaterialName = async (material: MaterialName) => {
        try {
            setLoading(true);
            const singleData = await getSingleMaterialName(material.MaterialNameID!);

            if (singleData) {
                setEditingMaterialName(singleData);
                setMaterialNameForm({
                    MaterialName: singleData.MaterialName,
                    MaterialTypeID: singleData.MaterialTypeID,
                    MaterialGroupID: singleData.MaterialGroupID,
                    UnitMeasurementID: singleData.UnitMeasurementID,
                    MaterialNameCode: singleData.MaterialNameCode,
                    IsActive: singleData.IsActive ?? true,
                    CompanyId: singleData.CompanyId
                });
            } else {
                // Fallback to existing data if API fails
                setEditingMaterialName(material);
                setMaterialNameForm({
                    MaterialName: material.MaterialName,
                    MaterialTypeID: material.MaterialTypeID,
                    MaterialGroupID: material.MaterialGroupID,
                    UnitMeasurementID: material.UnitMeasurementID,
                    MaterialNameCode: material.MaterialNameCode,
                    IsActive: material.IsActive ?? true,
                    CompanyId: material.CompanyId
                });
            }
            setShowMaterialNameModal(true);
        } catch (error) {
            console.error('Error loading material name for edit:', error);
            toastifyError('Error loading material name details');
        } finally {
            setLoading(false);
        }
    };

    // Handle delete
    const handleDeleteMaterialName = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this material name?')) {
            await deleteMaterialName(id);
        }
    };

    // Reset form
    const resetForm = () => {
        setMaterialNameForm({
            MaterialName: '',
            MaterialTypeID: 0,
            MaterialGroupID: 0,
            UnitMeasurementID: 0,
            MaterialNameCode: '',
            IsActive: true,
            CompanyId: companyId || ''
        });
    };

    // Calculate statistics
    const getTotalMaterialNames = () => materialNames.length;
    const getActiveMaterialNames = () => materialNames.filter(m => m.IsActive).length;
    const getInactiveMaterialNames = () => materialNames.filter(m => !m.IsActive).length;
    const getMaterialNamesByGroup = () => {
        const groupCount = materialNames.reduce((acc, material) => {
            acc[material.MaterialGroupID] = (acc[material.MaterialGroupID] || 0) + 1;
            return acc;
        }, {} as Record<number, number>);
        return Object.keys(groupCount).length;
    };

    // Table columns configuration
    const columns: any[] = [
        {
            name: 'Material Name',
            selector: (row: MaterialName) => row.MaterialName,
            sortable: true,
            cell: (row: MaterialName) => <span className="material-name-font-medium">{row.MaterialName}</span>
        },
        {
            name: 'Material Type',
            selector: (row: MaterialName) => {
                const materialType = materialTypes.find(mt => mt.MaterialTypeID === row.MaterialTypeID);
                return materialType ? materialType.MaterialTypeName : 'Unknown';
            },
            sortable: true,
        },
        {
            name: 'Material Group',
            selector: (row: MaterialName) => {
                const materialGroup = materialGroups.find(mg => mg.MaterialGroupID === row.MaterialGroupID);
                return materialGroup ? materialGroup.MaterialGroupName : 'Unknown';
            },
            sortable: true,
        },
        {
            name: 'Unit',
            selector: (row: MaterialName) => {
                const unit = unitMeasurements.find(u => u.UnitMeasurementID === row.UnitMeasurementID);
                return unit ? unit.UnitName : 'Unknown';
            },
            sortable: true,
        },
        {
            name: 'Code',
            selector: (row: MaterialName) => row.MaterialNameCode,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row: MaterialName) => row.IsActive,
            sortable: true,
            cell: (row: MaterialName) => (
                <span className={`material-name-badge ${row.IsActive ? 'material-name-badge-success' : 'material-name-badge-error'}`}>
                    {row.IsActive ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            name: 'Actions',
            cell: (row: MaterialName) => (
                <div className="material-name-flex material-name-gap-1">
                    <button
                        onClick={() => handleEditMaterialName(row)}
                        className="material-name-btn-icon"
                        title="Edit"
                    >
                        <Edit3 className="material-name-icon-sm" />
                    </button>
                    <button
                        onClick={() => handleDeleteMaterialName(row.MaterialNameID!)}
                        className="material-name-btn-icon material-name-btn-icon-danger"
                        title="Delete"
                    >
                        <Trash2 className="material-name-icon-sm" />
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
            name: 'Material Name',
            selector: (row: MaterialName) => row.MaterialName,
            sortable: true,
            cell: (row: MaterialName) => <span className="material-name-font-medium">{row.MaterialName}</span>
        },
        {
            name: 'Material Type',
            selector: (row: MaterialName) => {
                const materialType = materialTypes.find(mt => mt.MaterialTypeID === row.MaterialTypeID);
                return materialType ? materialType.MaterialTypeName : 'Unknown';
            },
            sortable: true,
        },
        {
            name: 'Material Group',
            selector: (row: MaterialName) => {
                const materialGroup = materialGroups.find(mg => mg.MaterialGroupID === row.MaterialGroupID);
                return materialGroup ? materialGroup.MaterialGroupName : 'Unknown';
            },
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row: MaterialName) => row.IsActive,
            sortable: true,
            cell: (row: MaterialName) => (
                <span className={`material-name-badge ${row.IsActive ? 'material-name-badge-success' : 'material-name-badge-error'}`}>
                    {row.IsActive ? 'Active' : 'Inactive'}
                </span>
            )
        },
    ];

    return (
        <div className="material-name">
            {/* Header */}
            <div className="material-name-header">
                <div className="material-name-header-content">
                    <div className="material-name-title-section">
                        <Tag className="material-name-header-icon" />
                        <div>
                            <h1 className="material-name-title">Material Name Management</h1>
                            <p className="material-name-subtitle">
                                Manage material names, types, groups, and units
                            </p>
                        </div>
                    </div>
                    <div className="material-name-header-actions">
                        <button
                            onClick={() => {
                                console.log('Add Material Name button clicked');
                                setEditingMaterialName(null);
                                resetForm();
                                setShowMaterialNameModal(true);
                            }}
                            className="material-name-btn material-name-btn-primary"
                        >
                            <Plus className="material-name-icon" />
                            Add Material Name
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="material-name-main">
              

                <div className="material-name-content">
                        <div className="material-name-tab-content">
                            {/* Statistics Cards */}
                            <div className="material-name-grid material-name-grid-cols-1 material-name-md-grid-cols-4 material-name-gap-6 material-name-mb-6">
                                <div className="material-name-card">
                                    <div className="material-name-card-content">
                                        <div className="material-name-flex material-name-items-center p-2">
                                            <div className="material-name-stat-icon material-name-stat-icon-blue">
                                                <Package className="material-name-icon" />
                                            </div>
                                            <div>
                                                <p className="material-name-text-sm material-name-text-gray-600">Total Materials</p>
                                                <p className="material-name-text-2xl material-name-font-bold">{getTotalMaterialNames()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="material-name-card">
                                    <div className="material-name-card-content">
                                        <div className="material-name-flex material-name-items-center p-2">
                                            <div className="material-name-stat-icon material-name-stat-icon-green">
                                                <Tag className="material-name-icon" />
                                            </div>
                                            <div>
                                                <p className="material-name-text-sm material-name-text-gray-600">Active Materials</p>
                                                <p className="material-name-text-2xl material-name-font-bold">{getActiveMaterialNames()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="material-name-card">
                                    <div className="material-name-card-content">
                                        <div className="material-name-flex material-name-items-center p-2">
                                            <div className="material-name-stat-icon material-name-stat-icon-yellow">
                                                <Package className="material-name-icon" />
                                            </div>
                                            <div>
                                                <p className="material-name-text-sm material-name-text-gray-600">Inactive Materials</p>
                                                <p className="material-name-text-2xl material-name-font-bold">{getInactiveMaterialNames()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="material-name-card">
                                    <div className="material-name-card-content">
                                        <div className="material-name-flex material-name-items-center p-2">
                                            <div className="material-name-stat-icon material-name-stat-icon-purple">
                                                <BarChart3 className="material-name-icon" />
                                            </div>
                                            <div>
                                                <p className="material-name-text-sm material-name-text-gray-600">Material Groups</p>
                                                <p className="material-name-text-2xl material-name-font-bold">{getMaterialNamesByGroup()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Material Names */}
                            <div className="material-name-card">
                                <div className="material-name-card-content">
                                    <DataTable
                                        columns={overviewColumns}
                                        data={materialNames.length > 0 ? materialNames.slice(0, 5) : []}
                                        pagination
                                        paginationPerPage={10}
                                        paginationRowsPerPageOptions={[5, 10, 20, 50]}
                                        highlightOnHover
                                        noDataComponent={
                                            <div className="material-name-text-center material-name-py-8">
                                                <p className="material-name-text-gray-600">No material names available</p>
                                                <p className="material-name-text-sm material-name-text-gray-500 mt-2">
                                                    Add your first material name to get started
                                                </p>
                                            </div>
                                        }
                                        customStyles={customStyles}
                                    />
                                </div>
                            </div>
                        </div>
                

                   
                </div>
            </div>

            {/* Material Name Modal */}
            {showMaterialNameModal && (
                <div className="material-name-modal-overlay" onClick={() => setShowMaterialNameModal(false)}>
                    <div className="material-name-modal material-name-modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="material-name-modal-header">
                            <h3 className="material-name-modal-title">
                                {editingMaterialName ? 'Edit Material Name' : 'Add New Material Name'}
                            </h3>
                            <button
                                onClick={() => setShowMaterialNameModal(false)}
                                className="material-name-modal-close"
                            >
                                ×
                            </button>
                        </div>
                        <div className="material-name-modal-content">
                            <div className="material-name-space-y-4">
                                <div className="material-name-form-grid material-name-form-grid-2">
                                    <div>
                                        <label className="material-name-label">
                                            Material Name <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={materialNameForm.MaterialName}
                                            onChange={(e) => setMaterialNameForm({ ...materialNameForm, MaterialName: e.target.value })}
                                            className="material-name-input"
                                            placeholder="Material name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="material-name-label">
                                            Material Type <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Select
                                            value={materialTypes.find(type => type.MaterialTypeID === materialNameForm.MaterialTypeID)}
                                            onChange={(selectedOption) => setMaterialNameForm({
                                                ...materialNameForm,
                                                MaterialTypeID: selectedOption ? selectedOption.MaterialTypeID : 0
                                            })}
                                            options={materialTypes.map(type => ({
                                                value: type.MaterialTypeID,
                                                label: `${type.MaterialTypeName} - ${type.MaterialTypeCode}`,
                                                ...type
                                            }))}
                                            placeholder="Select Material Type"
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

                                <div className="material-name-form-grid material-name-form-grid-2">
                                    <div>
                                        <label className="material-name-label">
                                            Material Group <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Select
                                            value={materialGroups.find(group => group.MaterialGroupID === materialNameForm.MaterialGroupID)}
                                            onChange={(selectedOption) => setMaterialNameForm({
                                                ...materialNameForm,
                                                MaterialGroupID: selectedOption ? selectedOption.MaterialGroupID : 0
                                            })}
                                            options={materialGroups.map(group => ({
                                                value: group.MaterialGroupID,
                                                label: `${group.MaterialGroupName} - ${group.MaterialGroupCode}`,
                                                ...group
                                            }))}
                                            placeholder="Select Material Group"
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

                                    <div>
                                        <label className="material-name-label">
                                            Unit Measurement <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Select
                                            value={unitMeasurements.find(unit => unit.UnitMeasurementID === materialNameForm.UnitMeasurementID)}
                                            onChange={(selectedOption) => setMaterialNameForm({
                                                ...materialNameForm,
                                                UnitMeasurementID: selectedOption ? selectedOption.UnitMeasurementID : 0
                                            })}
                                            options={unitMeasurements.map(unit => ({
                                                value: unit.UnitMeasurementID,
                                                label: `${unit.UnitName} - ${unit.UnitCode}`,
                                                ...unit
                                            }))}
                                            placeholder="Select Unit"
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

                                <div className="material-name-form-grid material-name-form-grid-2">
                                    <div>
                                        <label className="material-name-label">Material Name Code</label>
                                        <input
                                            type="text"
                                            value={materialNameForm.MaterialNameCode}
                                            onChange={(e) => setMaterialNameForm({ ...materialNameForm, MaterialNameCode: e.target.value })}
                                            className="material-name-input"
                                            placeholder="Material name code"
                                        />
                                    </div>

                                    <div>
                                        <label className="material-name-label">Status</label>
                                        <div>
                                            <label className="material-name-label">
                                                <input
                                                    type="checkbox"
                                                    checked={materialNameForm.IsActive}
                                                    onChange={(e) => setMaterialNameForm({ ...materialNameForm, IsActive: e.target.checked })}
                                                    className="mr-2"
                                                />
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="material-name-modal-footer">
                            <button
                                onClick={() => setShowMaterialNameModal(false)}
                                className="material-name-btn material-name-btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveMaterialName}
                                className="material-name-btn material-name-btn-primary"
                                disabled={!materialNameForm.MaterialName || !materialNameForm.MaterialTypeID || !materialNameForm.MaterialGroupID || !materialNameForm.UnitMeasurementID || loading}
                            >
                                <Save className="material-name-icon" />
                                {editingMaterialName ? 'Update Material Name' : 'Add Material Name'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaterialName;
