// PendingChallan.tsx
import React, { useState, useEffect } from 'react';
import { FiPrinter, FiTrash2, FiEye, FiX, FiCheck, FiClock, FiCheckCircle, FiXCircle, FiPackage } from 'react-icons/fi';
import './PendingChallan.css'; // Make sure to create this CSS file

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
  status: 'pending' | 'completed' | 'cancelled';
}

const PendingChallan: React.FC = () => {
  // Sample data - replace with API call in real implementation
  const [challans, setChallans] = useState<PendingChallan[]>([
    {
      id: '1',
      challanNo: 'CH-2025-001',
      vehicleNo: 'MH01AB1234',
      challanDate: '2025-07-28',
      consigneeName: 'ABC Traders',
      grossWeight: 5000,
      tareWeight: 1000,
      netWeight: 4000,
      gtWeight: 3800,
      status: 'pending'
    },
    // Add more sample data as needed
  ]);

  // Filter state
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    search: ''
  });

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Filter challans based on filters
  const filteredChallans = challans.filter(challan => {
    const matchesDate = (!filters.dateFrom || challan.challanDate >= filters.dateFrom) &&
                      (!filters.dateTo || challan.challanDate <= filters.dateTo);
    const matchesSearch = !filters.search || 
      challan.challanNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      challan.vehicleNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      challan.consigneeName.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesDate && matchesSearch;
  });

  // Action handlers
  const handlePrint = (id: string) => {
    console.log('Print challan:', id);
    // Implement print functionality
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this challan?')) {
      setChallans(challans.filter(challan => challan.id !== id));
    }
  };

  const handleOpen = (id: string) => {
    console.log('Open challan:', id);
    // Implement open functionality
  };

  const handleClose = (id: string) => {
    if (window.confirm('Are you sure you want to close this challan?')) {
      setChallans(challans.map(challan => 
        challan.id === id ? { ...challan, status: 'completed' } : challan
      ));
    }
  };

  // Calculate summary statistics
  const pendingCount = challans.filter(c => c.status === 'pending').length;
  const completedCount = challans.filter(c => c.status === 'completed').length;
  const cancelledCount = challans.filter(c => c.status === 'cancelled').length;
  const totalWeight = challans.reduce((sum, challan) => sum + challan.netWeight, 0);

  return (
    <div className="pending-challan-container">
      {/* <div className="pending-challan-header">
        <h2>Pending Challans</h2>
      </div> */}


      {/* DataTable */}
      <div className="table-responsive mt-[65px]">
        <table className="challan-table">
          <thead>
            <tr>
              <th>Challan No</th>
              <th>Vehicle #</th>
              <th>Challan Date</th>
              <th>Name</th>
              <th>Gross Weight</th>
              <th>Tare Weight</th>
              <th>Net Weight</th>
              <th>GT Weight</th>
            </tr>
          </thead>
          <tbody>
            {filteredChallans.length > 0 ? (
              filteredChallans.map((challan) => (
                <tr key={challan.id} className={challan.status}>
                  <td>{challan.challanNo}</td>
                  <td>{challan.vehicleNo}</td>
                  <td>{new Date(challan.challanDate).toLocaleDateString()}</td>
                  <td>{challan.consigneeName}</td>
                  <td>{challan.grossWeight.toLocaleString()}</td>
                  <td>{challan.tareWeight.toLocaleString()}</td>
                  <td>{challan.netWeight.toLocaleString()}</td>
                  <td>{challan.gtWeight.toLocaleString()}</td>
               
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="no-data">
                  No pending challans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingChallan;