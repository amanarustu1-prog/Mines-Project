import React, { useState, useMemo, useEffect } from 'react';
import './VehicleServiceType.css';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';
import { customStyles, multiValue } from '@/common/Utility';
import { fetch_Post_Data, fetchPostData } from '@/components/hooks/Api';
import ConfirmModal from '@/common/ConfirmModal';
import { getShowingDateText } from '@/common/DateFormat';
import * as XLSX from 'xlsx';
import useResizableColumns from '@/components/customHooks/UseResizableColumns';

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

const Edit3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const ToggleLeft = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const ToggleRight = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    VehicleServiceTypeID: string;
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
    const [filter, setFilter] = useState<"active" | "inactive" | "all">("active");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);
    const [dropdown, setDropdown] = useState<any[]>([]);
    const [maintenanceType, setMaintenanceType] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [activeCounts, setActiveCounts] = useState(0);
    const [inactiveCounts, setInactiveCounts] = useState(0);

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

    const fetchVehicleServiceTypes = async () => {
        try {
            setLoading(true);

            const response = await fetchPostData('VehicleServiceType/GetData_VehicleServiceType', {
                CompanyId: Number(localStorage.getItem("companyID")),
                IsActive: filter === "active" ? 1 : filter === "inactive" ? 0 : ""
            });
            // console.log(response);


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
            const response = await fetchPostData('VehicleServiceType/Insert_VehicleServiceType', {
                CompanyId: Number(localStorage.getItem("companyID")),
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
                await fetchCounts();
                return true;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error: any) {
            // console.error('Error inserting vehicle service type:', error);
            toastifyError(`Error adding vehicle service type: ${error.response?.data?.message || error.message}`);
            return false;
        }
    };

    const updateVehicleServiceType = async (data: any, id: number) => {
        try {
            const response = await fetchPostData('VehicleServiceType/Update_VehicleServiceType', {
                CompanyId: Number(localStorage.getItem("companyID")),
                ServiceTypeName: data.ServiceTypeName,
                MaintenanceTypeID: data.MaintenanceTypeID,
                KMInterval: data.KMInterval,
                Days: data.Days,
                VehicleServiceTypeCode: data.VehicleServiceTypeCode,
                VehicleServiceTypeID: dropdown.map(opt => opt.value).toString() || localStorage.getItem("companyID"),
            });

            if (response) {
                toastifySuccess('Vehicle service type updated successfully');
                fetchVehicleServiceTypes();
                return true;
            }
        } catch (error: any) {
            // console.error('Error updating vehicle service type:', error);
            toastifyError('Error updating vehicle service type');
            return false;
        }
    };

    const deleteVehicleServiceType = async (id: number) => {
        const item = vehicleServiceTypes.find(x => x.VehicleServiceTypeID === id);
        if (!item) return;

        const newStatus = item.IsActive ? 0 : 1;

        const payload = {
            VehicleServiceTypeID: id,
            IsActive: newStatus,
        };
        try {
            const response = await fetchPostData('VehicleServiceType/Delete_VehicleServiceType', payload);

            if (response) {
                toastifySuccess('Vehicle service type deleted successfully');
                fetchVehicleServiceTypes();
                await fetchCounts();
                return true;
            }
        } catch (error: any) {
            // console.error('Error deleting vehicle service type:', error);
            toastifyError('Error deleting vehicle service type');
            return false;
        }
    };

    //Get-Single-Data
    useEffect(() => {
        if(editItemId && dropdownOptions.length > 0){
            getSingleVehicleServiceType(editItemId);
        }
    }, [editItemId, dropdownOptions])

    const getSingleVehicleServiceType = async (id: number) => {
        try {
            const response = await fetchPostData('VehicleServiceType/GetSingleData_VehicleServiceType', {
                VehicleServiceTypeID: id
            });

            if (response && response.length > 0) {
            const data = response[0];

            // For dropdown — ensure it matches react-select format
            const matchOption = maintenanceTypes.find(
                (opt) => Number(opt.MaintenanceTypeID) === Number(data.MaintenanceTypeID)
            );

            // For multi-select company dropdown
            const selectedCompanies = dropdownOptions
                .filter(opt => data.CompanyId?.toString().split(',').includes(opt.CompanyID.toString()))
                .map(opt => ({ value: opt.CompanyID, label: opt.CompanyName }));
            setDropdown(selectedCompanies);

            setDropdown(selectedCompanies);


            // Prefill form
            setVehicleServiceTypeForm({
                ServiceTypeName: data.ServiceTypeName || '',
                MaintenanceTypeID: matchOption ? matchOption.MaintenanceTypeID : '',
                KMInterval: data.KMInterval || '',
                Days: data.Days || '',
                VehicleServiceTypeCode: data.VehicleServiceTypeCode || '',
                IsActive: data.IsActive ?? 1,
                CompanyId: Number(localStorage.getItem("companyID"))
            });

            setEditItemId(id);
            setShowVehicleServiceTypeModal(true);
        }}catch (error: any) {
            toastifyError('Error loading vehicle service type data');
        }
    };

    const fetchCounts = async () => {
        try {
        const [activeResp, inactiveResp] = await Promise.all([
            fetch_Post_Data('VehicleServiceType/GetData_VehicleServiceType', { IsActive: 1, CompanyId: Number(localStorage.getItem("companyID")) }),
            fetch_Post_Data('VehicleServiceType/GetData_VehicleServiceType', { IsActive: 0, CompanyId: Number(localStorage.getItem("companyID")) }),
        ]);
    
        setActiveCounts(Array.isArray(activeResp?.Data) ? activeResp.Data.length : 0);
        setInactiveCounts(Array.isArray(inactiveResp?.Data) ? inactiveResp.Data.length : 0)
        } catch (err) {
            toastifyError("Error fetching counts");
            }
    };

    useEffect(() => {
        fetchCounts();
    }, [filter]);

    // Filter functions
    const filteredVehicleServiceTypes = vehicleServiceTypes.filter(type => {
        const matchesSearch = searchTerm === '' ||
            type.ServiceTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            type.VehicleServiceTypeCode.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filter === 'all' ||
            (filter === 'active' && type.IsActive) ||
            (filter === 'inactive' && !type.IsActive);

        return matchesSearch && matchesStatus;
    });

    // useEffect hooks
    useEffect(() => {
        fetchVehicleServiceTypes();
    }, [filter]);

    // Initial load effect - only run if no data
    useEffect(() => {
        if (vehicleServiceTypes.length === 0) {
            fetchVehicleServiceTypes();
        }
    }, []);

    const handleSaveVehicleServiceType = async () => {
        if (!vehicleServiceTypeForm.ServiceTypeName || !vehicleServiceTypeForm.VehicleServiceTypeCode) {
            toastifyError('Please fill in all required fields');
            return;
        }

        if (editItemId) {
            const success = await updateVehicleServiceType(vehicleServiceTypeForm, editItemId!);
            if (success) {
                toastifySuccess('Vehicle service type updated successfully');
                setShowVehicleServiceTypeModal(false);
                setEditItemId(null);
                fetchVehicleServiceTypes();
                resetForm();
            }
        } else {
            const success = await insertVehicleServiceType(vehicleServiceTypeForm);
            if (success) {
                toastifySuccess('Vehicle service type added successfully');
                setShowVehicleServiceTypeModal(false);
                fetchVehicleServiceTypes();
                resetForm();
            }
        }
    };

    //Company-Dropdown
    useEffect(() => {
        const fetchDropDown = async () => {
            try {
                const payload = { EmployeeID: localStorage.getItem("employeeID") };
                const response = await fetchPostData('Users/GetData_Company', payload);
                if (response) {
                    const data = response;
                    setDropdownOptions(Array.isArray(data) ? data : []);
                } else {
                    toastifyError("Failed to load Dropdown.")
                }
            } catch (error: any) {
                toastifyError("Error fetching Dropdown");
            }
        }
        fetchDropDown();
    }, []);

    const options = dropdownOptions.map(opt => ({
        value: opt.CompanyID,
        label: opt.CompanyName
    }));

    useEffect(() => {
        const fetchGroupOptions = async () => {
            try {
                const payload = { CompanyId: localStorage.getItem("companyID") };
                const response = await fetchPostData('MaintenanceType/GetDataDropDown_MaintenanceType', payload);
                // console.log(response);

                const formatted = response.map((item: any) => ({
                    value: item.MaintenanceTypeID,
                    label: item.Description,
                }));
                // console.log("NEW "+ formatted[0].value);

            setMaintenanceTypes(formatted);
            } catch (error) {
                toastifyError("Error fetching Material Groups");
            }
        };
        fetchGroupOptions();
    }, []);

    // Reset form
    const resetForm = () => {
      setVehicleServiceTypeForm({
        ServiceTypeName: '',
        MaintenanceTypeID: 0,
        KMInterval: 0,
        Days: 0,
        VehicleServiceTypeCode: '',
        IsActive: true,
        CompanyId: Number(localStorage.getItem("companyID")),
      });
      setEditItemId(null);
      setSearch("");
      setDropdown([]);
    };

    // Calculate statistics
    const getVehicleServiceTypesByInterval = () => {
        const intervalCount = vehicleServiceTypes.reduce((acc, type) => {
            const interval = `${type.KMInterval} KM`;
            acc[interval] = (acc[interval] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.keys(intervalCount).length;
    };

    const Columns: any[] = [
        {
            name: 'Code',
            selector: (row: VehicleServiceType) => row.VehicleServiceTypeCode,
            sortable: true,
            cell: (row: VehicleServiceType) => <span className="vehicle-service-type-font-medium">{row.VehicleServiceTypeCode}</span>
        },
        {
            name: 'Service Type Name',
            selector: (row: VehicleServiceType) => row.ServiceTypeName,
            sortable: true,
            cell: (row: VehicleServiceType) => <span className="vehicle-service-type-font-medium">{row.ServiceTypeName}</span>
        },
        {
            name: 'Maintenance Type',
            selector: (row: VehicleServiceType) => {
                const maintenanceType = maintenanceTypes.find(mt => mt.value === row.MaintenanceTypeID);
                return maintenanceType ? maintenanceType.label : 'Unknown';
            },
            sortable: true,
        },
        {
            name: 'KM Interval',
            selector: (row: VehicleServiceType) => row.KMInterval,
            sortable: true,
        },
        {
            name: 'Days',
            selector: (row: VehicleServiceType) => row.Days,
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
        {
            name: 'Actions',
            cell: (row: VehicleServiceType) => (
                <div className="maintenance-type-flex maintenance-type-gap-1">
                    <button onClick={() => { setSelectedId(row.VehicleServiceTypeID!); setShowModal(true); }}
                        className={`list-button ghost ${row.IsActive ? 'danger' : 'success'}`} title={row.IsActive ? 'Deactivate' : 'Activate'}>
                        {row.IsActive ? <ToggleLeft className="list-icon-sm1" /> : <ToggleRight className="list-icon-sm1" />}
                    </button>

                    <button onClick={() => setEditItemId(row.VehicleServiceTypeID!)} className="list-button ghost primary" title="Edit">
                        <Edit3 className="maintenance-type-icon-sm" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
  
    const resizeableColumns = useResizableColumns(Columns).map(col => ({
        ...col,
        minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
    }));

    const exportToExcel = () => {
        const filteredDataNew = vehicleServiceTypes?.map(item => ({
            'Vehicle Service Type Code': item.VehicleServiceTypeCode,
            'Description': item.ServiceTypeName,
            'Material Group': item.VehicleServiceTypeID,
            'Status': item.IsActive ? 'Active' : 'Inactive',
            'Created Date': item.CreatedDate ? getShowingDateText(item.CreatedDate) : " ",
            'Last Modified': item.UpdatedDate ? getShowingDateText(item.UpdatedDate) : " ",
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(filteredDataNew);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return (
        <>
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
                                    // console.log('Add Vehicle Service Type button clicked');
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
                        <div className="maintenance-type-grid maintenance-type-grid-cols-1 maintenance-type-grid-box maintenance-type-md-grid-cols-4 maintenance-type-gap-6 p-3 rounded-lg">
                            <div className="vehicle-service-type-card cursor-pointer" onClick={() => setFilter("active")}>
                                <div className="vehicle-service-type-flex vehicle-service-type-items-center p-2">
                                    <div className="vehicle-service-type-stat-icon vehicle-service-type-stat-icon-green">
                                        <Settings className="vehicle-service-type-icon" />
                                    </div>
                                    <div>
                                        <p className="vehicle-service-type-text-sm vehicle-service-type-text-gray-600">Active Types</p>
                                        <p className="vehicle-service-type-text-2xl vehicle-service-type-font-bold">{activeCounts}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="vehicle-service-type-card cursor-pointer" onClick={() => setFilter("inactive")}>
                                <div className="vehicle-service-type-flex vehicle-service-type-items-center p-2">
                                    <div className="vehicle-service-type-stat-icon vehicle-service-type-stat-icon-yellow">
                                        <Calendar className="vehicle-service-type-icon" />
                                    </div>
                                    <div>
                                        <p className="vehicle-service-type-text-sm vehicle-service-type-text-gray-600">Inactive Types</p>
                                        <p className="vehicle-service-type-text-2xl vehicle-service-type-font-bold">{inactiveCounts}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="vehicle-service-type-card cursor-pointer" onClick={() => setFilter("all")}>
                                <div className="vehicle-service-type-flex vehicle-service-type-items-center p-2">
                                    <div className="vehicle-service-type-stat-icon vehicle-service-type-stat-icon-blue">
                                        <Wrench className="vehicle-service-type-icon" />
                                    </div>
                                    <div>
                                        <p className="vehicle-service-type-text-sm vehicle-service-type-text-gray-600">Total Types</p>
                                        <p className="vehicle-service-type-text-2xl vehicle-service-type-font-bold">{activeCounts + inactiveCounts}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="vehicle-service-type-card cursor-pointer">
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
                        <div className="vehicle-service-type-card mt-4 p-3">

                            <div className="maintenance-type-filters mb-1">
                                <div className="maintenance-type-search-container d-flex justify-between align-center">
                                    <button type="button" onClick={exportToExcel} className="btn btn-sm btn-primary bg-[#3b82f6]  py-1 h-9 px-2 mt-2 flex items-center gap-1">
                                        <i className="fa fa-file-excel-o" aria-hidden="true"></i> Export to Excel</button>
                                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                                        className="list-compact-input w-[20%] text-sm py-1 px-2 h-9 mt-2 mb-2 mr-2"
                                        placeholder="Search..." maxLength={300} />
                                </div>
                            </div>

                            <div className="vehicle-service-type-card-content">
                                <DataTable
                                    columns={resizeableColumns}
                                    data={filteredVehicleServiceTypes}
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
                                    {editItemId ? 'Edit Vehicle Service Type' : 'Add New Vehicle Service Type'}
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
                                    {/* First-Row */}
                                    <div className="vehicle-service-type-form-grid vehicle-service-type-form-grid-2">
                                        <div>
                                            <label className="vehicle-service-type-label">Service Type Code<span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                value={vehicleServiceTypeForm.VehicleServiceTypeCode}
                                                onChange={(e) => setVehicleServiceTypeForm({ ...vehicleServiceTypeForm, VehicleServiceTypeCode: e.target.value })}
                                                className="vehicle-service-type-input requiredColor"
                                                placeholder="Service type code"
                                            />
                                        </div>

                                        <div>
                                            <label className="vehicle-service-type-label">
                                                Service Type Name <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={vehicleServiceTypeForm.ServiceTypeName}
                                                onChange={(e) => setVehicleServiceTypeForm({ ...vehicleServiceTypeForm, ServiceTypeName: e.target.value })}
                                                className="vehicle-service-type-input requiredColor"
                                                placeholder="Service type name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Second-Row */}
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

                                    {/* Third-Row */}
                                    <div className="vehicle-service-type-form-grid vehicle-service-type-form-grid-2">
                                        <div>
                                            <Select
                                                value={maintenanceTypes.find(opt => opt.value === vehicleServiceTypeForm.MaintenanceTypeID)}
                                                onChange={(selectedOption) =>
                                                    setVehicleServiceTypeForm({...vehicleServiceTypeForm,
                                                        MaintenanceTypeID: selectedOption ? selectedOption.value : 0,})
                                                    }
                                                options={maintenanceTypes}
                                                placeholder="Select Maintenance Type"
                                                isSearchable
                                            />
                                        </div>

                                        <div>
                                            <Select
                                                value={dropdown}
                                                onChange={(selectedOptions: any) => setDropdown(selectedOptions || [])}
                                                options={options}
                                                isMulti
                                                isClearable
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={true}
                                                placeholder="Select Company"
                                                className="basic-multi-select"
                                                styles={{
                                                    ...multiValue,
                                                    valueContainer: (provided) => ({
                                                        ...provided,
                                                        maxHeight: "80px",
                                                        overflowY: "auto",
                                                        flexWrap: "wrap",
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="vehicle-service-type-modal-footer">
                                <button onClick={() => setShowVehicleServiceTypeModal(false)}
                                    className="vehicle-service-type-btn vehicle-service-type-btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveVehicleServiceType}
                                    className="vehicle-service-type-btn vehicle-service-type-btn-primary"
                                    disabled={!vehicleServiceTypeForm.VehicleServiceTypeCode || !vehicleServiceTypeForm.ServiceTypeName || loading}
                                >
                                    <Save className="vehicle-service-type-icon" />
                                    {editItemId ? 'Update Vehicle Service Type' : 'Add Vehicle Service Type'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <ConfirmModal 
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={() => {
                    if (selectedId !== null) {
                        deleteVehicleServiceType(selectedId);
                    }
                    setShowModal(false);
                }} />
        </>
    );
};

export default VehicleServiceType;
