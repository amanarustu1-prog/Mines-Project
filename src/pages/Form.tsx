import React, { useState, useEffect } from 'react';
// import './VehicleServiceType.css';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';
import { customStyles, multiValue } from '@/common/Utility';
import { fetchPostData } from '@/components/hooks/Api';
import ConfirmModal from '@/common/ConfirmModal';
import { getShowingDateText } from '@/common/DateFormat';
import * as XLSX from 'xlsx';
import useResizableColumns from '@/components/customHooks/UseResizableColumns';

// (icons omitted for brevity — copy your icons from original file)

const VehicleServiceType: React.FC = () => {
  const [showVehicleServiceTypeModal, setShowVehicleServiceTypeModal] = useState(false);
  const [editingVehicleServiceType, setEditingVehicleServiceType] = useState<any | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'active'|'inactive'|'all'>('active'); // << FIX: use this for API
  const [loading, setLoading] = useState(false);

  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);
  const [dropdown, setDropdown] = useState<any[]>([]);
  const [maintenanceTypes, setMaintenanceTypes] = useState<any[]>([]); // raw API objects
  const [vehicleServiceTypes, setVehicleServiceTypes] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [vehicleServiceTypeForm, setVehicleServiceTypeForm] = useState({
    ServiceTypeName: '',
    MaintenanceTypeID: 0,
    KMInterval: 0,
    Days: 0,
    VehicleServiceTypeCode: '',
    IsActive: true,
    CompanyId: Number(localStorage.getItem('companyID')) || 0
  });

  const getCompanyId = () => Number(localStorage.getItem('companyID')) || 0;

  // ---- FETCH lists ----
  const fetchVehicleServiceTypes = async () => {
    try {
      setLoading(true);
      // send IsActive according to filter
      const isActivePayload = filter === 'all' ? '' : (filter === 'active' ? 1 : 0); // << FIX
      const payload = {
        CompanyId: getCompanyId(),
        IsActive: isActivePayload
      };
      const resp = await fetchPostData('VehicleServiceType/GetData_VehicleServiceType', payload);
      // Normalize response: accept array or resp.Data
      const data = Array.isArray(resp) ? resp : (resp?.Data ?? resp?.data ?? resp);
      // If backend returns wrapped object, try to pull array
      const arr = Array.isArray(data) ? data : (Array.isArray(data?.Data) ? data.Data : []);
      setVehicleServiceTypes(arr);
    } catch (err: any) {
      toastifyError('Error fetching vehicle service types');
      setVehicleServiceTypes([]); // safe fallback
    } finally {
      setLoading(false);
    }
  };

  const fetchMaintenanceTypes = async () => {
    try {
      const payload = { CompanyId: getCompanyId() };
      const resp = await fetchPostData('MaintenanceType/GetDataDropDown_MaintenanceType', payload);
      const data = Array.isArray(resp) ? resp : (resp?.Data ?? resp?.data ?? resp);
      const arr = Array.isArray(data) ? data : (Array.isArray(data?.Table) ? data.Table : []);
      setMaintenanceTypes(arr || []);
    } catch (err) {
      toastifyError('Error fetching maintenance types');
      setMaintenanceTypes([]);
    }
  };

  // company dropdown
  useEffect(() => {
    const fetchDropDown = async () => {
      try {
        const payload = { EmployeeID: localStorage.getItem("employeeID") };
        const resp = await fetchPostData('Users/GetData_Company', payload);
        const arr = Array.isArray(resp) ? resp : (resp?.Data ?? resp?.data ?? []);
        setDropdownOptions(Array.isArray(arr) ? arr : []);
      } catch (err) {
        toastifyError('Error fetching company list');
      }
    };
    fetchDropDown();
  }, []);

  useEffect(() => {
    fetchVehicleServiceTypes();
  }, [filter]); // << FIX: re-fetch when filter changes

  useEffect(() => {
    fetchMaintenanceTypes();
  }, []);

  // ---- Single record (edit) ----
  const getSingleVehicleServiceType = async (id: number) => {
    try {
      const resp = await fetchPostData('VehicleServiceType/GetSingleData_VehicleServiceType', { VehicleServiceTypeID: id });
      const data = Array.isArray(resp) ? resp : (resp?.Data ?? resp?.data ?? resp);
      const arr = Array.isArray(data) ? data : (Array.isArray(data?.Table) ? data.Table : []);
      return arr[0] ?? null;
    } catch (err) {
      toastifyError('Error fetching record');
      return null;
    }
  };

  // Wire edit id -> fetch single and open modal
  useEffect(() => {
    // you were using editItemId variable earlier; here we open modal by setting editingVehicleServiceType via handleEdit
  }, []);

  // ---- CRUD ----
  const insertVehicleServiceType = async (data: any) => {
    try {
      const payload = {
        CompanyId: getCompanyId(),
        ServiceTypeName: data.ServiceTypeName,
        MaintenanceTypeID: data.MaintenanceTypeID,
        KMInterval: data.KMInterval,
        Days: data.Days,
        VehicleServiceTypeCode: data.VehicleServiceTypeCode
      };
      const resp = await fetchPostData('VehicleServiceType/Insert_VehicleServiceType', payload);
      // assume success if resp truthy
      toastifySuccess('Added successfully');
      await fetchVehicleServiceTypes();
      return true;
    } catch (err: any) {
      toastifyError('Error adding record');
      return false;
    }
  };

  const updateVehicleServiceType = async (data: any, id: number) => {
    try {
      const payload = {
        CompanyId: getCompanyId(),
        ServiceTypeName: data.ServiceTypeName,
        MaintenanceTypeID: data.MaintenanceTypeID,
        KMInterval: data.KMInterval,
        Days: data.Days,
        VehicleServiceTypeCode: data.VehicleServiceTypeCode,
        VehicleServiceTypeID: id
      };
      const resp = await fetchPostData('VehicleServiceType/Update_VehicleServiceType', payload);
      toastifySuccess('Updated successfully');
      await fetchVehicleServiceTypes();
      return true;
    } catch (err) {
      toastifyError('Error updating record');
      return false;
    }
  };

  const deleteVehicleServiceType = async (id: number) => {
    try {
      // find the row in vehicleServiceTypes (not maintenanceTypes)
      const item = vehicleServiceTypes.find(x => x.VehicleServiceTypeID === id);
      if (!item) return false;
      const newStatus = item.IsActive ? 0 : 1;
      const payload = { VehicleServiceTypeID: id, IsActive: newStatus };
      const resp = await fetchPostData('VehicleServiceType/Delete_VehicleServiceType', payload);
      toastifySuccess(newStatus === 1 ? 'Activated' : 'Deactivated');
      await fetchVehicleServiceTypes();
      return true;
    } catch (err) {
      toastifyError('Error deleting record');
      return false;
    }
  };

  // ---- handlers ----
  const handleSaveVehicleServiceType = async () => {
    if (!vehicleServiceTypeForm.ServiceTypeName || !vehicleServiceTypeForm.VehicleServiceTypeCode) {
      toastifyError('Please fill required fields');
      return;
    }
    if (editingVehicleServiceType) {
      const ok = await updateVehicleServiceType(vehicleServiceTypeForm, editingVehicleServiceType.VehicleServiceTypeID);
      if (ok) {
        setEditingVehicleServiceType(null);
        setShowVehicleServiceTypeModal(false);
        resetForm();
      }
    } else {
      const ok = await insertVehicleServiceType(vehicleServiceTypeForm);
      if (ok) {
        setShowVehicleServiceTypeModal(false);
        resetForm();
      }
    }
  };

  const handleEdit = async (row: any) => {
    setLoading(true);
    const single = await getSingleVehicleServiceType(row.VehicleServiceTypeID);
    const data = single ?? row;
    setEditingVehicleServiceType(data);
    setVehicleServiceTypeForm({
      ServiceTypeName: data.ServiceTypeName,
      MaintenanceTypeID: Number(data.MaintenanceTypeID) || 0,
      KMInterval: Number(data.KMInterval) || 0,
      Days: Number(data.Days) || 0,
      VehicleServiceTypeCode: data.VehicleServiceTypeCode || '',
      IsActive: data.IsActive ?? true,
      CompanyId: data.Companyid ?? data.CompanyId ?? getCompanyId()
    });
    setShowVehicleServiceTypeModal(true);
    setLoading(false);
  };

  // ---- search + filter result ----
  const filteredVehicleServiceTypes = vehicleServiceTypes.filter(type => {
    const matchesSearch = search.trim() === '' ||
      (type.ServiceTypeName || '').toString().toLowerCase().includes(search.toLowerCase()) ||
      (type.VehicleServiceTypeCode || '').toString().toLowerCase().includes(search.toLowerCase());
    // filter already applied server-side, but keep local guard:
    const matchesStatus =
      filter === 'all' ||
      (filter === 'active' && type.IsActive) ||
      (filter === 'inactive' && !type.IsActive);
    return matchesSearch && matchesStatus;
  });

  // ---- select options for maintenance Select ----
  const maintenanceOptions = maintenanceTypes.map((m: any) => ({
    value: m.MaintenanceTypeID,
    label: `${m.Description} - ${m.MaintenanceTypeCode ?? ''}`
  }));

  // Reset
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
    setDropdown([]);
  };

  // DataTable columns
  const overviewColumns: any[] = [
    { name: 'Code', selector: (r: any) => r.VehicleServiceTypeCode, sortable: true },
    { name: 'Service Type Name', selector: (r: any) => r.ServiceTypeName, sortable: true },
    {
      name: 'Maintenance Type',
      selector: (r: any) => {
        const m = maintenanceTypes.find((mt: any) => Number(mt.MaintenanceTypeID) === Number(r.MaintenanceTypeID));
        return m ? m.Description : 'Unknown';
      },
      sortable: true
    },
    { name: 'KM Interval', selector: (r: any) => r.KMInterval, sortable: true },
    { name: 'Days', selector: (r: any) => r.Days, sortable: true },
    {
      name: 'Status',
      cell: (r: any) => <span className={`badge ${r.IsActive ? 'active' : 'inactive'}`}>{r.IsActive ? 'Active' : 'Inactive'}</span>,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row: any) => (
        <div>
          <button onClick={() => { setSelectedId(row.VehicleServiceTypeID); setShowModal(true); }}>
            {row.IsActive ? 'Deactivate' : 'Activate'}
          </button>
          <button onClick={() => handleEdit(row)}>Edit</button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  const resizeableColumns = useResizableColumns(overviewColumns).map(col => ({
    ...col,
    minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
  }));

  // Excel export (uses filtered list)
  const exportToExcel = () => {
    const data = filteredVehicleServiceTypes.map((item: any) => ({
      'Vehicle Service Type Code': item.VehicleServiceTypeCode,
      'Service Type Name': item.ServiceTypeName,
      'Maintenance Type': (maintenanceTypes.find((mt:any)=>mt.MaintenanceTypeID===item.MaintenanceTypeID)?.Description) || '',
      'KM Interval': item.KMInterval,
      'Days': item.Days,
      'Status': item.IsActive ? 'Active' : 'Inactive'
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vehicle_service_types.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="vehicle-service-type-header">
        <h1>Vehicle Service Type Management</h1>
        <div>
          <button onClick={() => { setFilter('active'); }}>Active</button>
          <button onClick={() => { setFilter('inactive'); }}>Inactive</button>
          <button onClick={() => { setFilter('all'); }}>All</button>
        </div>
        <div>
          <button onClick={() => { setEditingVehicleServiceType(null); resetForm(); setShowVehicleServiceTypeModal(true); }}>
            Add Vehicle Service Type
          </button>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <button onClick={exportToExcel}>Export to Excel</button>
          </div>
          <input placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>

        <DataTable
          columns={resizeableColumns}
          data={filteredVehicleServiceTypes}
          pagination
          highlightOnHover
          progressPending={loading}
          customStyles={customStyles}
        />
      </div>

      { showVehicleServiceTypeModal && (
        <div className="modal-overlay" onClick={() => setShowVehicleServiceTypeModal(false)}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <h3>{editingVehicleServiceType ? 'Edit' : 'Add'} Vehicle Service Type</h3>

            <div>
              <label>Code*</label>
              <input value={vehicleServiceTypeForm.VehicleServiceTypeCode} onChange={(e)=>setVehicleServiceTypeForm({...vehicleServiceTypeForm, VehicleServiceTypeCode: e.target.value})} />
            </div>

            <div>
              <label>Service Name*</label>
              <input value={vehicleServiceTypeForm.ServiceTypeName} onChange={(e)=>setVehicleServiceTypeForm({...vehicleServiceTypeForm, ServiceTypeName: e.target.value})} />
            </div>

            <div>
              <label>Maintenance Type*</label>
              <Select
                options={maintenanceOptions}
                value={maintenanceOptions.find(o => o.value === vehicleServiceTypeForm.MaintenanceTypeID) || null} // << FIX: use maintenanceOptions
                onChange={(opt:any)=> setVehicleServiceTypeForm({...vehicleServiceTypeForm, MaintenanceTypeID: opt ? opt.value : 0})}
                styles={{...multiValue, valueContainer: (provided:any)=>({...provided, maxHeight: '80px', overflowY: 'auto'})}}
              />
            </div>

            <div>
              <label>KM Interval</label>
              <input type="number" value={vehicleServiceTypeForm.KMInterval} onChange={(e)=>setVehicleServiceTypeForm({...vehicleServiceTypeForm, KMInterval: Number(e.target.value)})} />
            </div>

            <div>
              <label>Days</label>
              <input type="number" value={vehicleServiceTypeForm.Days} onChange={(e)=>setVehicleServiceTypeForm({...vehicleServiceTypeForm, Days: Number(e.target.value)})} />
            </div>

            <div style={{ marginTop: 12 }}>
              <button onClick={()=>setShowVehicleServiceTypeModal(false)}>Cancel</button>
              <button onClick={handleSaveVehicleServiceType} disabled={!vehicleServiceTypeForm.ServiceTypeName || !vehicleServiceTypeForm.VehicleServiceTypeCode}>
                {editingVehicleServiceType ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() => {
          if (selectedId !== null) deleteVehicleServiceType(selectedId);
          setShowModal(false);
        }} />
    </>
  );
};

export default VehicleServiceType;
