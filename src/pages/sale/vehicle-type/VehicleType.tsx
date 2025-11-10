import React, { useState, useMemo } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Select from "react-select";
import "./styles.css";
import { customStyles } from "@/common/Utility";
import { fetchPostData } from "@/components/hooks/Api";

// ---------- Icon Components ----------
const Car = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7h3m-1 4h6m4 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2.5M7 10H5a2 2 0 00-2 2v8a2 2 0 002 2h2m3 0h6m-6 0v-4m0 4v4m6-4v4m0 0h2a2 2 0 002-2v-8a2 2 0 00-2-2h-2.5" />
    </svg>
);

const List = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const Plus = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const ToggleLeft = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const ToggleRight = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

// ---------- Options ----------
const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
];

const agencyOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'suv', label: 'SUV' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'van', label: 'Van' }
];

// ---------- Table ----------
const columns = [
    { name: "Code", selector: (row: any) => row.code, sortable: true },
    { name: "Description", selector: (row: any) => row.description, sortable: true },
    {
        name: "Status",
        sortable: true,
        cell: (row: any) => (
            <span
                className={row.isActive ? "text-green-600 font-medium" : "text-red-600 font-medium"}
            >
                {row.isActive ? "Active" : "Inactive"}
            </span>
        ),
    },
    { name: "Created Date", selector: (row: any) => row.createdDate, sortable: true },
    { name: "Last Modified", selector: (row: any) => row.lastModified, sortable: true },
    {
        name: "Actions",
        cell: (row: any) => (
            <div className="flex gap-2">
                <button className={`list-button ghost ${row.isActive ? 'danger' : 'success'}`} onClick={() => console.log("Edit", row)}> {row.isActive ? <ToggleLeft className="list-icon-sm" /> : <ToggleRight className="list-icon-sm" />}</button>

                <button className="list-button ghost primary" title="Edit" onClick={() => console.log("Delete", row)}> <Edit3 className="list-icon-sm" /></button>

            </div>
        ),
    }
];

const data = [
    { id: 1, code: "DEPT001", description: "Abhishek", isActive: true, createdDate: "2023-01-01", lastModified: "2023-01-01", actions: "" },
    { id: 2, code: "DEPT002", description: "Rahul", isActive: false, createdDate: "2023-01-02", lastModified: "2023-01-02", actions: "" },
    { id: 3, code: "DEPT003", description: "Priya", isActive: true, createdDate: "2023-01-03", lastModified: "2023-01-03", actions: "" },
    { id: 4, code: 'DEPT004', description: 'Equipment Maintenance', isActive: false, createdDate: '2025-01-15', lastModified: '2025-07-12' },
    { id: 5, code: 'DEPT005', description: 'Safety and Compliance', isActive: true, createdDate: '2025-01-18', lastModified: '2025-07-11' },
    { id: 6, code: 'DEPT006', description: 'Quality Control', isActive: false, createdDate: '2025-01-20', lastModified: '2025-07-10' }
];

// ---------- Main Component ----------
export default function VehicleType() {
    const [activeTab] = useState('list-overview');
    const [newItem, setNewItem] = useState({ code: '', description: '', isActive: true });
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"active" | "inactive" | "all">("all");

    const listData = data;

    const fetchMaterialTypes = async () => {
        try {
            setLoading(true);
            const payload = {
                IsActive: filter === "active" ? 1 : filter === "inactive" ? 0 : "",
                CompanyId: Number(localStorage.getItem("companyID")),
            };

            const response = await fetchPostData("MaterialType/GetData_MaterialType", payload);
            // console.log("API Response:", response);
            const parsed = JSON.parse(response?.data?.data || "{}");
            const data = parsed?.Table || [];
            // console.log("Fetched Material Types:", data);

            setMaintenanceTypes(response);
        } catch (error: any) {
            toastifyError("Error fetching material types");
        } finally {
            setLoading(false);
        }
    };

    const insertMaterialType = async (formData: any) => {
        try {
            const payload = {
                // MaterialGroupID: formData.MaterialGroupID || "",
                // Description: formData.Description,
                // MaterialTypeCode: formData.MaterialTypeCode,
                ...maintenanceTypeForm,
                CompanyId: dropdown.map(opt => opt.value).toString() || localStorage.getItem("companyID"),
            };
            // console.log("Insert Payload:", payload);

            const response = await fetchPostData("MaterialType/Insert_MaterialType", payload);
            // console.log("Insert Response:", response);
            const message = response[0].Message;

            if (message === "Already Exists MaterialTypeCode") {
                toastifyError("Code is already Present");
                return;
            }

            if (message === "Already Exists Description") {
                toastifyError("Description is already Present");
                return;
            }


            if (response) {
                toastifySuccess("Material Type added successfully");
                await fetchMaterialTypes();
                await fetchCounts();
                return true;
            } else {
                throw new Error('Invalid response from server');
            }
            return true;
        } catch (error: any) {
            toastifyError(`Error adding material type: ${error.message}`);
            return false;
        }
    };

    const updateMaterialType = async (formData: any, id: number) => {
        try {
            const payload = {
                MaterialTypeID: id,
                MaterialGroupID: formData.MaterialGroupID || "",
                Description: formData.Description,
                MaterialTypeCode: formData.MaterialTypeCode,
                CompanyId: dropdown.map(opt => opt.value).toString() || localStorage.getItem("companyID"),
            };
            const response = await fetchPostData("MaterialType/Update_MaterialType", payload);

            const message = response[0].Message;
            if (message === "Already Exists MaterialTypeCode") {
                toastifyError("Code is already Present");
                return;
            }

            if (message === "Already Exists Description") {
                toastifyError("Description is already Present");
                return;
            }
            console.log("Update Response:", response);
            if (response) {
                toastifySuccess('Item updated successfully');
                setEditItemId(null);
                setDropdown([]);
                setMaintenanceTypeForm({ Description: '', MaterialGroupID: '', MaterialTypeCode: '' });
                setShowMaintenanceTypeModal(false);
                await fetchMaterialTypes();
                return true;
            }
        } catch (error: any) {
            toastifyError(`Error updating material type: ${error.message}`);
            return false;
        }
    };

    const deleteMaterialType = async (id: number) => {
        try {
            const item = maintenanceTypes.find(x => x.MaterialTypeID === id);
            if (!item) return;

            const newStatus = item.IsActive ? 0 : 1;

            const payload = {
                MaterialTypeID: id,
                IsActive: newStatus,
            };

            const response = await fetchPostData("MaterialType/Delete_MaterialType", payload);
            console.log("Delete Response:", response);
            if (response) {
                toastifySuccess(`Item ${newStatus === 1 ? "activated" : "deactivated"} successfully`);
                await fetchMaterialTypes();
                await fetchCounts();
                return true;
            }
        } catch (error: any) {
            toastifyError(`Error deleting material type: ${error.message}`);
            return false;
        }
    };
    // Counts
    const activeCount = data.filter(item => item.isActive).length;
    const inactiveCount = data.filter(item => !item.isActive).length;

    return (
        <div className="list-management-container">
            <div className="list-main-container container">
                {/* Tab Content */}
                {activeTab === 'list-overview' && (
                    <div className="list-space-y-4">
                        {/* Summary Cards */}
                        <div className="list-grid-4">
                            <div className="list-card mb-0">
                                <div className="list-summary-card">
                                    <div className="list-header-info">
                                        <div className="list-header-icon">
                                            <Car className="list-icon-sm" />
                                        </div>
                                        <div>
                                            <h1 className="list-header-title">Vehicle Type</h1>
                                            <p className="list-header-subtitle">
                                                Master data with codes and descriptions for vehicle types
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-card mb-0 cursor-pointer" onClick={() => setFilter("active")}>
                                <div className="list-summary-card">
                                    <div className="list-summary-content">
                                        <div className="list-summary-icon active">
                                            <ToggleRight className="list-icon-lg" />
                                        </div>
                                        <div>
                                            <p className="list-summary-text">Active Items</p>
                                            <p className="list-summary-number active">{activeCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-card mb-0 cursor-pointer" onClick={() => setFilter("inactive")}>
                                <div className="list-summary-card">
                                    <div className="list-summary-content">
                                        <div className="list-summary-icon inactive">
                                            <ToggleLeft className="list-icon-lg" />
                                        </div>
                                        <div>
                                            <p className="list-summary-text">Inactive Items</p>
                                            <p className="list-summary-number inactive">{inactiveCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-card mb-0 cursor-pointer" onClick={() => setFilter("all")}>
                                <div className="list-summary-card">
                                    <div className="list-summary-content">
                                        <div className="list-summary-icon total">
                                            <List className="list-icon-lg" />
                                        </div>
                                        <div>
                                            <p className="list-summary-text">Total Items</p>
                                            <p className="list-summary-number total">{listData.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add New Item Form */}

                        <div className="list-card compact" style={{ height: '100%' }}>
                            <div className="list-card-content">
                                <div className="list-compact-form">
                                    <h4 className="list-compact-title pt-2">
                                        <Plus className="list-icon-sm" /> Add New Item
                                    </h4>

                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-3">
                                            <input
                                                type="text"
                                                value={newItem.code}
                                                onChange={(e) => handleInputChange("code", e.target.value)}
                                                className="list-compact-input w-full text-sm py-1 px-2 h-9"
                                                placeholder="Item Code"
                                                maxLength={20}
                                            />
                                        </div>

                                        <div className="col-span-3">
                                            <input
                                                type="text"
                                                value={newItem.description}
                                                onChange={(e) => handleInputChange("description", e.target.value)}
                                                className="list-compact-input w-full text-sm py-1 px-2 h-9"
                                                placeholder="Description"
                                                maxLength={300}
                                            />
                                        </div>

                                        <div className="col-span-4">
                                            <Select
                                                defaultValue={[agencyOptions[2], agencyOptions[3]]}
                                                isMulti
                                                name="agency"
                                                options={agencyOptions}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                            />
                                        </div>

                                        <div className="col-span-2 flex gap-2">
                                            <button
                                                onClick={handleSaveItem}
                                                className="list-button primary small flex-1 flex items-center justify-center gap-1 h-8"
                                            >
                                                <Save className="list-icon-sm" /> Save
                                            </button>
                                            <button
                                                onClick={() => setNewItem({ code: "", description: "", isActive: true })}
                                                className="list-button outline small flex-1 h-8"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="list-card compact" style={{ height: '100%' }}>
                            <div className="flex justify-end">
                                {/* search Filter */}
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="list-compact-input w-[20%] text-sm py-1 px-2 h-9 mt-2 mb-2 mr-2"
                                    placeholder="Search"
                                    maxLength={300}
                                />
                            </div>
                            <div className="list-card" style={{ height: '100%' }}>
                                <DataTable
                                    columns={columns}
                                    data={filteredData}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    fixedHeaderScrollHeight="300px"
                                    customStyles={customStyles}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}