import React, { useState, useEffect, useMemo } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./styles.css";
import { customStyles } from "@/common/Utility";
import { fetchPostData } from "@/components/hooks/Api";

// ---------- Types ----------
interface VehicleType {
  id?: number;
  code: string;
  description: string;
  isActive: boolean;
  createdDate?: string;
  lastModified?: string;
}

interface FormData {
  code: string;
  description: string;
  isActive: boolean;
}

// ---------- API endpoints ----------
const API = {
  getVehicleTypes: "VehicleType/GetData_VehicleType",
  insertVehicleType: "VehicleType/Insert_VehicleType",
  updateVehicleType: "VehicleType/Update_VehicleType",
  toggleStatus: "VehicleType/ToggleStatus_VehicleType",
};

// ---------- Icon Components ----------
const Car = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h3m-1 4h6m4 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2.5M7 10H5a2 2 0 00-2 2v8a2 2 0 002 2h2m3 0h6m-6 0v-4m0 4v4m6-4v4m0 0h2a2 2 0 002-2v-8a2 2 0 00-2-2h-2.5"
    />
  </svg>
);

const List = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const ToggleLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const ToggleRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SaveIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    />
  </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

// ---------- Options ----------
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Inactive" },
];

const agencyOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "suv", label: "SUV" },
  { value: "sedan", label: "Sedan" },
  { value: "van", label: "Van" },
];

// ---------- Main Component ----------
export default function VehicleType() {
  const [activeTab] = useState("list-overview");
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"active" | "inactive" | "all">("all");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      code: "",
      description: "",
      isActive: true,
    },
  });

  // ---------- Fetch vehicle types ----------
  const fetchVehicleTypes = async () => {
    try {
      setIsLoading(true);
      const payload = {
        IsActive: filter === "active" ? 1 : filter === "inactive" ? 0 : "",
        CompanyId: Number(localStorage.getItem("companyID")),
      };

      const response: any = await fetchPostData(API.getVehicleTypes, payload);

      const raw = response?.data?.data ?? response?.data;
      let parsed: any = {};

      if (typeof raw === "string") {
        parsed = JSON.parse(raw);
      } else {
        parsed = raw ?? {};
      }

      const table = parsed?.Table || [];

      const mapped: VehicleType[] = table.map((item: any) => ({
        id: item.VehicleTypeID ?? item.id,
        code: item.Code ?? item.code ?? "",
        description: item.Description ?? item.description ?? "",
        isActive: item.IsActive === 1 || item.IsActive === true || item.isActive === true,
        createdDate: item.CreatedDate ?? item.createdDate,
        lastModified: item.UpdatedDate ?? item.lastModified,
      }));

      setVehicleTypes(mapped);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error fetching vehicle types");
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- Reset form ----------
  const resetForm = () => {
    reset({
      code: "",
      description: "",
      isActive: true,
    });
    setEditingId(null);
  };

  // ---------- Edit item ----------
  const handleEdit = (row: VehicleType) => {
    setEditingId(row.id ?? null);
    setValue("code", row.code);
    setValue("description", row.description);
    setValue("isActive", row.isActive);
  };

  // ---------- Toggle item status ----------
  const toggleItemStatus = async (id: number | undefined, currentStatus: boolean) => {
    if (!id) return;
    try {
      const response: any = await fetchPostData(API.toggleStatus, {
        id,
        isActive: !currentStatus,
        CompanyId: Number(localStorage.getItem("companyID")),
      });

      if (response?.success || response?.Success) {
        // UI update immediately
        setVehicleTypes((prev) =>
          prev.map((v) =>
            v.id === id
              ? {
                  ...v,
                  isActive: !currentStatus,
                  lastModified: new Date().toISOString(),
                }
              : v
          )
        );
        toast.success(`Item ${!currentStatus ? "activated" : "deactivated"} successfully`);
        await fetchVehicleTypes();
      } else {
        toast.warn("Status update failed");
      }
    } catch (error) {
      console.error("Toggle status error:", error);
      toast.error("Error updating status");
    }
  };

  // ---------- Form submit ----------
  const onSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        IsActive: formData.isActive ? 1 : 0,
        CompanyId: Number(localStorage.getItem("companyID")),
      };

      let response: any;

      if (editingId) {
        // Update existing
        response = await fetchPostData(API.updateVehicleType, { ...payload, id: editingId });

        // 👉 UI ko turant update karo
        setVehicleTypes((prev) =>
          prev.map((v) =>
            v.id === editingId
              ? {
                  ...v,
                  code: formData.code,
                  description: formData.description,
                  isActive: formData.isActive,
                  lastModified: new Date().toISOString(),
                }
              : v
          )
        );

        toast.success("Vehicle type updated successfully");
      } else {
        // Create new
        response = await fetchPostData(API.insertVehicleType, payload);

        // example "Already Exists" check (adjust as per your API)
        if (response?.[0]?.Message === "Already Exists") {
          toast.error("A vehicle type with this code already exists");
          return;
        }

        // 👉 Naya row turant datatable me dikhane ke liye
        const newItem: VehicleType = {
          id:
            response?.insertedId ??
            response?.id ??
            Date.now(), // fallback agar API id na de
          code: formData.code,
          description: formData.description,
          isActive: formData.isActive,
          createdDate: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        };

        setVehicleTypes((prev) => [...prev, newItem]);

        toast.success("Vehicle type added successfully");
      }

      // Safety ke liye server se fresh data bhi le lo:
      await fetchVehicleTypes();
      resetForm();
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error?.message || "Error saving vehicle type");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------- Counts ----------
  const activeCount = vehicleTypes.filter((item) => item.isActive).length;
  const inactiveCount = vehicleTypes.filter((item) => !item.isActive).length;

  // ---------- Filtered data ----------
  const filteredData = useMemo(() => {
    return vehicleTypes.filter((item) => {
      const matchesSearch =
        !search ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && item.isActive) ||
        (filter === "inactive" && !item.isActive);

      return matchesSearch && matchesFilter;
    });
  }, [vehicleTypes, search, filter]);

  // ---------- Table columns ----------
  const columns: TableColumn<VehicleType>[] = [
    { name: "Code", selector: (row) => row.code, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    {
      name: "Status",
      sortable: true,
      cell: (row) => (
        <span className={row.isActive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      name: "Created Date",
      selector: (row) => row.createdDate || "",
      sortable: true,
    },
    {
      name: "Last Modified",
      selector: (row) => row.lastModified || "",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className={`list-button ghost ${row.isActive ? "danger" : "success"}`}
            title={row.isActive ? "Deactivate" : "Activate"}
            onClick={() => toggleItemStatus(row.id, row.isActive)}
          >
            {row.isActive ? <ToggleLeft className="list-icon-sm" /> : <ToggleRight className="list-icon-sm" />}
          </button>

          <button
            className="list-button ghost primary"
            title="Edit"
            onClick={() => handleEdit(row)}
          >
            <Edit3 className="list-icon-sm" />
          </button>
        </div>
      ),
    },
  ];

  // ---------- Fetch data on mount & filter change ----------
  useEffect(() => {
    fetchVehicleTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="list-management-container">
      <div className="list-main-container container">
        {activeTab === "list-overview" && (
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

              <div
                className="list-card mb-0 cursor-pointer"
                onClick={() => setFilter("active")}
              >
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

              <div
                className="list-card mb-0 cursor-pointer"
                onClick={() => setFilter("inactive")}
              >
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

              <div
                className="list-card mb-0 cursor-pointer"
                onClick={() => setFilter("all")}
              >
                <div className="list-summary-card">
                  <div className="list-summary-content">
                    <div className="list-summary-icon total">
                      <List className="list-icon-lg" />
                    </div>
                    <div>
                      <p className="list-summary-text">Total Items</p>
                      <p className="list-summary-number total">{vehicleTypes.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add / Edit Form */}
            <div className="list-card compact" style={{ height: "100%" }}>
              <div className="list-card-content">
                <div className="list-compact-form">
                  <h4 className="list-compact-title pt-2 flex items-center gap-2">
                    <Plus className="list-icon-sm" />{" "}
                    {editingId ? "Edit Vehicle Type" : "Add New Item"}
                  </h4>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-4 items-center"
                  >
                    {/* Code */}
                    <div className="col-span-3">
                      <input
                        type="text"
                        {...register("code", {
                          required: "Code is required",
                          maxLength: { value: 20, message: "Max 20 characters" },
                        })}
                        className="list-compact-input w-full text-sm py-1 px-2 h-9"
                        placeholder="Item Code"
                      />
                      {errors.code && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.code.message}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="col-span-3">
                      <input
                        type="text"
                        {...register("description", {
                          required: "Description is required",
                          maxLength: { value: 300, message: "Max 300 characters" },
                        })}
                        className="list-compact-input w-full text-sm py-1 px-2 h-9"
                        placeholder="Description"
                      />
                      {errors.description && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    {/* Status Select */}
                    <div className="col-span-2">
                      <Select
                        options={statusOptions}
                        defaultValue={statusOptions[0]}
                        onChange={(opt) => setValue("isActive", opt?.value ?? true)}
                        className="basic-select"
                        classNamePrefix="select"
                      />
                    </div>

                    {/* Agency (demo only) */}
                    <div className="col-span-2">
                      <Select
                        defaultValue={[agencyOptions[2], agencyOptions[3]]}
                        isMulti
                        name="agency"
                        options={agencyOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="col-span-2 flex gap-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="list-button primary small flex-1 flex items-center justify-center gap-1 h-8 disabled:opacity-60"
                      >
                        <SaveIcon className="list-icon-sm" />{" "}
                        {isSubmitting ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="list-button outline small flex-1 h-8"
                      >
                        Clear
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="list-card compact" style={{ height: "100%" }}>
              <div className="flex justify-end">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="list-compact-input w-[20%] text-sm py-1 px-2 h-9 mt-2 mb-2 mr-2"
                  placeholder="Search"
                  maxLength={300}
                />
              </div>
              <div className="list-card" style={{ height: "100%" }}>
                <DataTable
                  columns={columns}
                  data={filteredData}
                  pagination
                  highlightOnHover
                  fixedHeader
                  fixedHeaderScrollHeight="300px"
                  customStyles={customStyles}
                  progressPending={isLoading}
                  progressComponent={
                    <div className="py-6 text-sm text-gray-500">Loading...</div>
                  }
                  noDataComponent={
                    <div className="py-6 text-sm text-gray-500">
                      No records found
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
