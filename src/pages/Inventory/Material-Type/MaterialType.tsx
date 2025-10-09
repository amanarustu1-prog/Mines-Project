import React, { useState, useMemo, useEffect } from 'react';
import './MaterialType.css';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';
import axios from '@/interceptors/axios';
import { customStyles, multiValue } from '@/common/Utility';
import { fetch_Post_Data, fetchPostData } from '@/components/hooks/Api';
import { getShowingDateText } from '@/common/DateFormat';
import * as XLSX from 'xlsx';
import ConfirmModal from '@/common/ConfirmModal';
import { setgroups } from 'process';

// Icon components
interface MaintenanceType {
    MaintenanceTypeID?: number;
    Description: string;
    MaintenanceType: string;
    MaintenanceTypeCode: string;
    Frequency: string;
    CompanyId: number | string;
    IsActive?: boolean;
    CreatedDate?: string;
    UpdatedDate?: string;
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

const MaterialType: React.FC<Props> = ({ baseUrl = '', companyId = null }) => {
    const [activeTab, setActiveTab] = useState('maintenanceTypes');
    const [showMaintenanceTypeModal, setShowMaintenanceTypeModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(false);
    const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);
    const [dropdown, setDropdown] = useState<any[]>([]);
    const [group, setGroup] = useState<any[]>([]);
    const [groupOptions, setGroupOptions] = useState<any[]>([]);
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [filter, setFilter] = useState<"active" | "inactive" | "all">("active");
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [activeCounts, setActiveCounts] = useState(0);
    const [inactiveCounts, setInactiveCounts] = useState(0);

    const [maintenanceTypes, setMaintenanceTypes] = useState<MaintenanceType[]>([]);
    const [maintenanceTypeForm, setMaintenanceTypeForm] = useState({
        Description: '',
        MaterialGroupID: '',
        MaterialTypeCode: '',
    });

    const api = (path: string) => (baseUrl ? `${baseUrl}${path}` : path);

    //Get-Data
    // const fetchMaintenanceTypes = async () => {
    //     try {
    //         setLoading(true);

    //         const response = await axios.post('MaterialType/GetData_MaterialType', {
    //             // IsActive: 1,
    //             CompanyId: localStorage.getItem('companyID')
    //         });

    //         const data = JSON.parse(response.data.data)?.Table || [];
    //         console.log(data);
    //         setMaintenanceTypes(data);

    //         if (data?.Table && Array.isArray(data.Table)) {
    //             setMaintenanceTypes(data.Table);
    //         }
    //     } catch (error: any) {
    //         toastifyError(`Error fetching material types: ${error.message}`);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    //Insert-Data
    const insertMaintenanceType = async (data: any) => {
        try {
            const response = await fetchPostData('MaterialType/GetData_MaterialType', {
                ...data,
                CompanyId: dropdown.map(opt => opt.value).toString() || localStorage.getItem("companyID"),
            });

            const message = response[0].Message;

            if (message === "Already Exists MaintenanceTypeCode") {
                toastifyError("Code is already Present");
                return;
            }

            if (message === "Already Exists Description") {
                toastifyError("Description is already Present");
                return;
            }

            if (response) {
                toastifySuccess('Maintenance type added successfully');
                await fetchData();
                await fetchCounts();
                return true;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error: any) {
            toastifyError(`Error adding maintenance type: ${error.response?.data?.message || error.message}`);
            return false;
        }
    };

    //Update-Data
    const updateMaintenanceType = async (data: any, id: number) => {
        try {
            const response = await fetchPostData('MaterialType/Update_MaterialType', {
                ...data,
                MaintenanceTypeID: id,
                CompanyId: dropdown.map(opt => opt.value).toString() || localStorage.getItem("companyID"),
            });

            const message = response[0].Message;

            if (message === "Already Exists MaintenanceTypeCode") {
                toastifyError("Code is already Present");
                return;
            }

            if (message === "Already Exists Description") {
                toastifyError("Description is already Present");
                return;
            }
            console.log(response);

            if (response) {
                toastifySuccess('Item updated successfully');
                setEditItemId(null);
                setDropdown([]);
                setMaintenanceTypeForm({ Description: '', MaintenanceTypes: '', MaintenanceTypeCode: '', Frequency: '' });
                fetchMaterialTypes();
                setShowMaintenanceTypeModal(false);
                return true;
            }
        } catch (error: any) {
            toastifyError('Error updating maintenance type');
            return false;
        }
    };

    //Delete-Data
    const deleteMaintenanceType = async (id: number) => {
        const item = maintenanceTypes.find(t => t.MaintenanceTypeID === id);
        if (!item) return;

        const newStatus = item.IsActive ? 0 : 1;

        try {
            const response = await fetchPostData('MaterialType/Delete_MaterialType', {
                MaintenanceTypeID: id,
                IsActive: newStatus,
            });

            if (response) {
                toastifySuccess(`Item ${newStatus === 1 ? "activated" : "deactivated"} successfully`);
                await fetchData();
                await fetchCounts();
                return true;
            }
        } catch (error: any) {
            toastifyError('Error updating status');
            return false;
        }
    };

    //Get-Dropdown-Data
    useEffect(() => {
        const fetchDropDown = async () => {
            try {
                const payload = { EmployeeID: localStorage.getItem("employeeID") };
                const response = await fetchPostData('Users/GetData_Company', payload);
                // console.log(response);
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

    //Get-Group-Options
    useEffect(() => {
        const fetchGroupOptions = async () => {
            const payload = { CompanyId: localStorage.getItem("companyID") };
            const response = await fetchPostData('MaterialGroup/GetDataDropDown_MaterialGroup', payload);
            // console.log(response);
            if (response) {
                const data = response;
                setGroupOptions(Array.isArray(data) ? data : []);
            } else {
                toastifyError("Failed to load Dropdown.");
            }
        }
        fetchGroupOptions();
    }, []);

    //Get-Single-Data
    useEffect(() => {
        if (editItemId) {
            getSingleData();
        }
    }, [editItemId]);

    const getSingleData = async () => {
        try {
            const val = { MaintenanceTypeID: editItemId };
            const res = await fetchPostData('MaterialType/GetSingleData_MaterialType', val);
            // console.log(res);
            if (res && Array.isArray(res) && res.length > 0) {
                const record = res[0];

                setMaintenanceTypeForm({
                    Description: record.Description || '',
                    MaintenanceTypes: record.MaintenanceType || '',
                    MaintenanceTypeCode: record.MaintenanceTypeCode || '',
                    Frequency: record.Frequency,
                });

                const companyIdField = record.Companyid ?? record.CompanyID ?? record.CompanyId ?? "";

                if (companyIdField && dropdownOptions.length > 0) {
                    const companyIds = String(companyIdField).split(",").map(id => id.trim());
                    const matchOptions = dropdownOptions.filter(opt => companyIds.includes(String(opt.CompanyID))).map(opt => ({
                        value: opt.CompanyID,
                        label: opt.CompanyName
                    }));

                    setDropdown(matchOptions);
                    setShowMaintenanceTypeModal(true);
                } else {
                    setDropdown([]);
                }
            } else {
                setMaintenanceTypeForm({ Description: '', MaintenanceTypes: '', MaintenanceTypeCode: '', Frequency: '' });
                // setDropdown
            }
        } catch (err) {
            toastifyError("Error fetching record data");
        }
    }

    const fetchData = async () => {
        try {
            if (filter === "all") {
                const activeResp = await fetch_Post_Data('MaintenanceType/GetData_MaintenanceType', { IsActive: "", CompanyId: Number(localStorage.getItem("companyID")) });
                fetchCounts();

                const activeData = activeResp?.Data || [];

                setMaintenanceTypes([
                    ...(Array.isArray(activeData) ? activeData : []),
                ])
            } else {
                const value = {
                    IsActive: filter === "active" ? 1 : 0,
                    CompanyId: Number(localStorage.getItem("companyID")),
                };
                fetchCounts();

                const response = await fetch_Post_Data('MaintenanceType/GetData_MaintenanceType', value);
                const parsedData = response?.Data;
                setMaintenanceTypes(Array.isArray(parsedData) ? parsedData : []);
            }
        } catch (err) {
            toastifyError("Error fetching data");
        }
    };

    const fetchCounts = async () => {
        try {
            const [activeResp, inactiveResp] = await Promise.all([
                fetch_Post_Data('MaintenanceType/GetData_MaintenanceType', { IsActive: 1, CompanyId: Number(localStorage.getItem("companyID")) }),
                fetch_Post_Data('MaintenanceType/GetData_MaintenanceType', { IsActive: 0, CompanyId: Number(localStorage.getItem("companyID")) }),
            ]);

            setActiveCounts(Array.isArray(activeResp?.Data) ? activeResp.Data.length : 0);
            setInactiveCounts(Array.isArray(inactiveResp?.Data) ? inactiveResp.Data.length : 0)
        } catch (err) {
            toastifyError("Error fetching counts");
        }
    };

    useEffect(() => {
        fetchData();
        fetchCounts();
    }, [filter]);

    //Filter functions
    const filteredMaintenanceTypes = maintenanceTypes.filter(type => {
        const searchLower = search.trim().toLowerCase();
        const matchesSearch = searchTerm === '' ||
            type.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            type.MaintenanceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (type.MaintenanceTypeCode && type.MaintenanceTypeCode.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = filterStatus === 'all' ||
            (filterStatus === 'active' && type.IsActive) ||
            (filterStatus === 'inactive' && !type.IsActive);

        return matchesSearch && matchesStatus;
    });

    //Debug effect to log data changes
    useEffect(() => {
    }, [maintenanceTypes, filteredMaintenanceTypes]);

    //Handle save
    const handleSaveMaintenanceType = async () => {
        if (!maintenanceTypeForm.MaintenanceTypeCode || !maintenanceTypeForm.Description) {
            toastifyError('Please fill in all required fields');
            return;
        }

        // alert(editItemId);
        if (editItemId) {
            const success = await updateMaintenanceType(maintenanceTypeForm, editItemId);
            if (success) {
                setEditItemId(null);
                setShowMaintenanceTypeModal(false);
                resetForm();
            }
        } else {
            const success = await insertMaintenanceType(maintenanceTypeForm);
            if (success) {
                setShowMaintenanceTypeModal(false);
                resetForm();
            }
        }
    };

    //Reset form
    const resetForm = () => {

        setMaintenanceTypeForm({
            Description: '',
            MaintenanceTypes: '',
            MaintenanceTypeCode: '',
            Frequency: '',
        });
        setFilter("active");
        setSearch("");
        setDropdown([]);
    };

    // Table columns configuration
    const columns: any[] = [
        {
            name: 'Code',
            selector: (row: MaintenanceType) => row.MaintenanceTypeCode,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row: MaintenanceType) => row.Description,
            sortable: true,
            cell: (row: MaintenanceType) => {
                const fullText = row.Description || '';
                const trunCateText = fullText.length > 30 ? `${fullText.substring(0, 30)}...` : fullText;
                return (<span title={row.Description}>{trunCateText}</span>)
            },
        },
        {
            name: 'Type',
            selector: (row: MaintenanceType) => row.MaintenanceType,
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
            name: 'Created Date',
            selector: (row: MaintenanceType) => getShowingDateText(row.CreatedDate),
            sortable: true,
        },
        {
            name: 'Last Modified',
            selector: (row: MaintenanceType) => getShowingDateText(row.UpdatedDate),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: MaintenanceType) => (
                <div className="maintenance-type-flex maintenance-type-gap-1">
                    <button onClick={() => { setSelectedId(row.MaintenanceTypeID!); setShowModal(true); }}
                        className={`list-button ghost ${row.IsActive ? 'danger' : 'success'}`} title={row.IsActive ? 'Deactivate' : 'Activate'}>
                        {row.IsActive ? <ToggleLeft className="list-icon-sm1" /> : <ToggleRight className="list-icon-sm1" />}
                    </button>

                    <button onClick={() => setEditItemId(row.MaintenanceTypeID!)} className="list-button ghost primary" title="Edit">
                        <Edit3 className="maintenance-type-icon-sm" />
                    </button>
                    {/* <button
            onClick={() => handleDeleteMaintenanceType(row.MaintenanceTypeID!)}
            className="maintenance-type-btn-icon maintenance-type-btn-icon-danger"
            title="Delete"
          >
            <Trash2 className="maintenance-type-icon-sm" />
          </button> */}
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    //Download-Excel_File
    const exportToExcel = () => {
        const filteredDataNew = filteredMaintenanceTypes?.map(item => ({
            'Maintenance-Type Code': item.MaintenanceTypeCode,
            'Description': item.Description,
            'Maintenance Type': item.MaintenanceType,
            'Frequency': item.Frequency,
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
            <div className="maintenance-type">
                {/* Header */}
                <div className="maintenance-type-header">
                    <div className="maintenance-type-header-content">
                        <div className="maintenance-type-title-section">
                            <Wrench className="maintenance-type-header-icon" />
                            <div>
                                <h1 className="maintenance-type-title">Material Type</h1>
                                <p className="maintenance-type-subtitle">
                                    Manage Material types, schedules, and procedures
                                </p>
                            </div>
                        </div>
                        <div className="maintenance-type-header-actions">
                            <button onClick={() => {
                                setEditItemId(null);
                                resetForm();
                                setShowMaintenanceTypeModal(true);
                            }} className="maintenance-type-btn maintenance-type-btn-primary">
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
                            <div className="maintenance-type-grid maintenance-type-grid-cols-1 maintenance-type-grid-box maintenance-type-md-grid-cols-4 maintenance-type-gap-6 py-3 px-2">
                                <div className="maintenance-type-card cursor-pointer" onClick={() => setFilter("active")}>
                                    <div className="maintenance-type-card-content">
                                        <div className="maintenance-type-flex maintenance-type-items-center p-2">
                                            <div className="maintenance-type-stat-icon maintenance-type-stat-icon-green">
                                                <Settings className="maintenance-type-icon" />
                                            </div>
                                            <div>
                                                <p className="maintenance-type-text-sm maintenance-type-text-gray-600 ">Active Types</p>
                                                <p className="maintenance-type-text-2xl maintenance-type-font-bold">{activeCounts}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="maintenance-type-card cursor-pointer" onClick={() => setFilter("inactive")}>
                                    <div className="maintenance-type-card-content">
                                        <div className="maintenance-type-flex maintenance-type-items-center p-2">
                                            <div className="maintenance-type-stat-icon maintenance-type-stat-icon-yellow">
                                                <Calendar className="maintenance-type-icon" />
                                            </div>
                                            <div>
                                                <p className="maintenance-type-text-sm maintenance-type-text-gray-600">Inactive Types</p>
                                                <p className="maintenance-type-text-2xl maintenance-type-font-bold">{inactiveCounts}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="maintenance-type-card cursor-pointer" onClick={() => setFilter("all")}>
                                    <div className="maintenance-type-card-content">
                                        <div className="maintenance-type-flex maintenance-type-items-center p-2">
                                            <div className="maintenance-type-stat-icon maintenance-type-stat-icon-blue">
                                                <Wrench className="maintenance-type-icon" />
                                            </div>
                                            <div>
                                                <p className="maintenance-type-text-sm maintenance-type-text-gray-600">Total Types</p>
                                                <p className="maintenance-type-text-2xl maintenance-type-font-bold">{activeCounts + inactiveCounts}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="maintenance-type-content">

                        {/* Maintenance Types Tab */}
                        {activeTab === 'maintenanceTypes' && (
                            <div className="maintenance-type-tab-content">

                                <div className="maintenance-type-filters">
                                    <div className="maintenance-type-search-container d-flex justify-between align-center">
                                        <button type="button" onClick={exportToExcel} className="btn btn-sm btn-primary bg-[#3b82f6]  py-1 h-9 px-2 mt-2 flex items-center gap-1">
                                            <i className="fa fa-file-excel-o" aria-hidden="true"></i> Export to Excel</button>
                                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                            className="list-compact-input w-[20%] text-sm py-1 px-2 h-9 mt-2 mb-2 mr-2"
                                            placeholder="Search..." maxLength={300} />
                                    </div>
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
                                    {editItemId ? 'Edit Material Type' : 'Add New Material Type'}
                                </h3>
                                <button onClick={() => setShowMaintenanceTypeModal(false)} className="maintenance-type-modal-close">
                                    ×
                                </button>
                            </div>
                            <div className="maintenance-type-modal-content">
                                <div className="maintenance-type-space-y-4">
                                    <div className="maintenance-type-form-grid maintenance-type-form-grid-2">
                                        <div>
                                            <label className="maintenance-type-label">
                                                Code<span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                value={maintenanceTypeForm.MaterialTypeCode}
                                                onChange={(e) => setMaintenanceTypeForm({ ...maintenanceTypeForm, MaterialTypeCode: e.target.value })}
                                                className="maintenance-type-input requiredColor"
                                                placeholder="Maintenance code"
                                            />
                                        </div>

                                        <div>
                                            <label className="maintenance-type-label">
                                                Description <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={maintenanceTypeForm.Description}
                                                onChange={(e) => setMaintenanceTypeForm({ ...maintenanceTypeForm, Description: e.target.value })}
                                                className="maintenance-type-input requiredColor"
                                                placeholder="Maintenance description"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className='maintenance-type-form-grid maintenance-type-form-grid-2'>
                                        <div>
                                            <Select
                                                value={groupOptions}
                                                onChange={(selectedOptions: any) => setGroup(selectedOptions || [])}
                                                options={options}
                                                isClearable
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={true}
                                                placeholder="Select Group"
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
                            <div className="maintenance-type-modal-footer">
                                <button onClick={() => setShowMaintenanceTypeModal(false)} className="maintenance-type-btn maintenance-type-btn-secondary">
                                    Cancel
                                </button>
                                <button onClick={handleSaveMaintenanceType} className="maintenance-type-btn maintenance-type-btn-primary" disabled={!maintenanceTypeForm.MaterialTypeCode || !maintenanceTypeForm.Description || loading} >
                                    <Save className="maintenance-type-icon" />
                                    {editItemId ? 'Update Material Type' : 'Add Material Type'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <ConfirmModal show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={() => {
                    if (selectedId !== null) {
                        deleteMaintenanceType(selectedId);
                    }
                    setShowModal(false);
                }} />
        </>
    );
};

export default MaterialType;
