// PendingChallan.tsx
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  FiPackage, FiPrinter, FiEye, FiTrash2, FiClock, FiCheckCircle, FiXCircle,
} from "react-icons/fi";
import "./PendingChallan.css";

interface PendingChallan {
  id: string;
  challanNo: string;
  vehicleNo: string;
  challanDate: string;
  consigneeName: string;
  grossWeight: number;
  tareWeight: number;
  netWeight: number;
  gtWeight: number;
  status: "pending" | "completed" | "cancelled";
}

const PendingChallan: React.FC = () => {
  const [challans, setChallans] = useState<PendingChallan[]>([
    {
      id: "1",
      challanNo: "CH-2025-001",
      vehicleNo: "MH01AB1234",
      challanDate: "2025-07-28",
      consigneeName: "ABC Traders",
      grossWeight: 5000,
      tareWeight: 1000,
      netWeight: 4000,
      gtWeight: 3800,
      status: "pending",
    },
    {
      id: "2",
      challanNo: "CH-2025-002",
      vehicleNo: "RJ09CT9009",
      challanDate: "2025-08-01",
      consigneeName: "XYZ Pvt Ltd",
      grossWeight: 5500,
      tareWeight: 1200,
      netWeight: 4300,
      gtWeight: 4100,
      status: "completed",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter
  const filteredChallans = challans.filter(
    (c) =>
      c.challanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.consigneeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Counts
  const pendingCount = challans.filter((c) => c.status === "pending").length;
  const completedCount = challans.filter((c) => c.status === "completed").length;
  const cancelledCount = challans.filter((c) => c.status === "cancelled").length;

  // Columns for DataTable
  const columns = [
    { name: "Challan No", selector: (row: any) => row.challanNo, sortable: true },
    { name: "Vehicle #", selector: (row: any) => row.vehicleNo, sortable: true },
    { name: "Date", selector: (row: any) => new Date(row.challanDate).toLocaleDateString(), sortable: true },
    { name: "Consignee", selector: (row: any) => row.consigneeName, sortable: true },
    { name: "Gross", selector: (row: any) => row.grossWeight.toLocaleString(), right: true },
    { name: "Tare", selector: (row: any) => row.tareWeight.toLocaleString(), right: true },
    { name: "Net", selector: (row: any) => row.netWeight.toLocaleString(), right: true },
    { name: "GT", selector: (row: any) => row.gtWeight.toLocaleString(), right: true },
    {
      name: "Status",
      cell: (row: PendingChallan) => (
        <span
          className={`badge rounded-pill ${row.status === "pending"
            ? "bg-warning text-dark"
            : row.status === "completed"
              ? "bg-success"
              : "bg-danger"
            }`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: PendingChallan) => (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary" title="Print">
            <FiPrinter />
          </button>
          <button className="btn btn-sm btn-outline-secondary" title="View">
            <FiEye />
          </button>
          <button className="btn btn-sm btn-outline-danger" title="Delete">
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="pending-challan-container container mt-4 p-3 bg-white rounded shadow-sm">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 mt-5 border-bottom pb-2">
        <div className="d-flex align-items-center gap-2">
          <FiPackage size={22} className="text-primary" />
          <h5 className="mb-0 fw-semibold text-primary">Pending Challans</h5>
        </div>

        <div className="d-flex gap-3">
          <span className="badge bg-warning-subtle text-warning border border-warning rounded-pill px-3 py-2">
            <FiClock className="me-1" /> Pending: {pendingCount}
          </span>
          <span className="badge bg-success-subtle text-success border border-success rounded-pill px-3 py-2">
            <FiCheckCircle className="me-1" /> Completed: {completedCount}
          </span>
          <span className="badge bg-danger-subtle text-danger border border-danger rounded-pill px-3 py-2">
            <FiXCircle className="me-1" /> Cancelled: {cancelledCount}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search challans..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredChallans}
        highlightOnHover
        pagination
        dense
        responsive
        striped
        customStyles={{
          headCells: {
            style: {
              backgroundColor: "#f8f9fa",
              fontWeight: "600",
              fontSize: "14px",
            },
          },
          cells: {
            style: {
              fontSize: "13px",
              padding: "8px 12px",
            },
          },
        }}
      />
    </div>
  );
};

export default PendingChallan;
