import React, { useEffect, useState } from 'react';
import "./ApprovedChallan.css";
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { PlusIcon } from 'lucide-react';
import DataTable from 'react-data-table-component';
import useResizableColumns from '@/components/customHooks/UseResizableColumns';
import { fetchPostData } from '@/components/hooks/Api';
import { toastifyError } from '@/common/AlertMsg';
import { customStyles } from '@/common/Utility';

interface challanDatas {
    // First-section
    ChallanNo: number;
    financialYear: number;
    ChallanDate: number;
    paytype: string;

    //Second-section
    PartyID: number;
    Address: string;
    Stateid: number;
    DistrictID: number;
    PinID: number;
    OwnerMobile: number;
    Email: string;
}

// Dropdowns-Interface
interface Party{
    PartyID: number;
    Name: string;
    Address: string;
    GSTNo: string;
}

interface State{
    ID: number;
    Description: string;
}

interface District{
    DistrictID: number;
    DistrictName: string;
}

interface ZipCode{
    ZipCodeID: number;
    ZipCodeName: string;
}

const ApprovedChallan = () => {
    const [fromData, setFromData] = useState<Date | null>(null);
    const [fromTime, setFromTime] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [toTime, setToTime] = useState<Date | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [vehicleSearchTerm, setVehicleSearchTerm] = useState('');
    const [challanData, setChallanData] = useState<challanDatas[]>([]);
    //Dropdowns-State
    const [party, setParty] = useState<Party[]>([]);
    const [gstParty, setGSTParty] = useState<Party[]>([]);
    const [state, setState] = useState<State[]>([]);
    const [gstState, setGSTState] = useState<State[]>([]);
    const [district, setDistrict] = useState<District[]>([]);
    const [gstDistrict, setGSTDistrict] = useState<District[]>([]);
    const [zipCode, setZipCode] = useState<ZipCode[]>([]);
    const [gstZipCode, setGSTZipCode] = useState<ZipCode[]>([]);

    //----Not-Known-----
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // -----------Get-Data------------
    const getChallanItem = async () => {
        try{
            setLoading(true);
            const payload = {
                CompanyId: Number(localStorage.getItem('companyID')),
                IsForApproval: '',
                CreatedDateFrom: '',
                CreatedDateTo: '',
                ISCompleted: ''
            }
            const response = await fetchPostData('Challan/GetData_Challan', payload);
            // console.log(response);
            if(response){
                setChallanData(response);
            }
        }catch(err){
            toastifyError("Error to get the Data");
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getChallanItem();
    }, []);

    //--------Dropdowns-------
    const dropDownPayload = {CompanyId: localStorage.getItem('companyID')};

    const fetchPartyType = async () => {
        try{
            const response = await fetchPostData('Party/GetDataDropDown_Party', dropDownPayload);
            console.log(response);

            if(response && Array.isArray(response)){
                setParty(response);
                setGSTParty(response);
            }else{
                setParty([]);
                setGSTParty([]);
            }
        }catch{
            toastifyError("Error Fetching a Party Data.");
        }
    }

    const fetchState = async () => {
        try{
            const response = await fetchPostData('State/GetDataDropDown_State', dropDownPayload);
            console.log(response);

            if(response && Array.isArray(response)){
                setState(response);
                setGSTState(response);
            }else{
                setState([]);
                setGSTState([]);
            }
        }catch{
            toastifyError('Error Fetching a State Data.');
        }
    }

    const fetchDistrict = async (stateID: number | string) => {
        try {
          const response = await fetchPostData('District/GetDataDropDown_District', {
            StateId: stateID,
            CompanyId: Number(localStorage.getItem('companyID')),
          })
          // console.log(response);
          if (response && Array.isArray(response)) {
            setDistrict(response);
            setGSTDistrict(response);
          } else {
            setDistrict([]);
          }
        } catch {
          toastifyError('Error fetching District');
        }
    }

    const fetchZipCode = async (id: number | string) => {
        const response = await fetchPostData('ZipCode/GetDataDropDown_ZipCode', {
          CompanyId: Number(localStorage.getItem('companyID')),
          DistrictId: id
        })
        // console.log(response);
        if (response && Array.isArray(response)) {
          setZipCode(response);
          setGSTZipCode(response);
        }
        else {
          setZipCode([]);
          setGSTZipCode([]);
        }
    }

    useEffect(() => {
        fetchPartyType();
        fetchState();
        fetchDistrict(1);
        fetchZipCode(1);
    }, []);

    const Columns = [
        // First-Section
        {
            name: 'Challan No',
            selector: (row: challanDatas) => row.ChallanNo,
            sortable: true,
            cell: (row: challanDatas) => (
                <span className="font-medium">{row.ChallanNo}</span>
            )
        },
        {
            name: 'Challan-Year', 
            selector: (row: challanDatas) => row.financialYear,
            sortable: true,
            cell: (row: challanDatas) => (
                <span className="font-medium">{row.financialYear}</span>
            )
        },
        {
            name: 'Challan-Date',
            selector: (row: challanDatas) => row.ChallanDate,
            sortable: true,
            cell: (row: challanDatas) => (
                <span className="font-medium">{row.ChallanDate}</span>
            )
        },
        {
            name: 'PayType',
            selector: (row: challanDatas) => row.paytype,
            sortable: true,
            cell: (row: challanDatas) => (
                <span className="font-medium">{row.paytype}</span>
            )
        },
        //Second-Section
        {
            name: 'Party',
            selector: (row: challanDatas) => row.PartyID,
            sortable: true,
            cell: (row: challanDatas) => {
                const pName = party.find((p) => Number(p.PartyID) === Number(row.PartyID))?.Name ?? "-";
                return <span className="font-medium">{pName}</span>
            }
        },
        {
            name: 'Address',
            selector: (row: challanDatas) => row.Address,
            sortable: true,
            cell: (row: challanDatas) => (
                <span className="font-medium">{row.Address}</span>
            )
        },
        {
            name: 'State',
            selector: (row: challanDatas) => row.Stateid,
            sortable: true,
            cell: (row: challanDatas) => {
                const getStateName = state.find(s => s.ID === row.Stateid)?.Description ?? "-";
                return <span className="font-medium">{getStateName}</span>
            }
        },
        {
            name: 'District',
            selector: (row: challanDatas) => row.DistrictID,
            sortable: true,
            cell: (row: challanDatas) => {
                const getDistrictName = district.find(d => d.DistrictID === row.DistrictID)?.DistrictName ?? "-";
                return <span className="font-medium">{ getDistrictName }</span>
            }
        },
        {
            name: 'Zip-Code',
            selector: (row: challanDatas) => row.PinID,
            sortable: true,
            cell: (row: challanDatas) => {
                const getZipName = zipCode.find(z => z.ZipCodeID === row.PinID)?.ZipCodeName ?? "-";
                return <span className="font-medium">{ getZipName }</span>
            }
        },
        {
            name: 'Contact',
            selector: (row: challanDatas) => row.OwnerMobile,
            sortable: true,
            cell: (row: challanDatas) => (
                <span className="font-medium">{row.OwnerMobile}</span>
            )
        },
        {
            name: 'Email-Id',
            selector: (row: challanDatas) => row.Email,
            sortable: true,
            cell: (row: challanDatas) => (
                <span className="font-medium">{row.Email}</span>
            )
        },

        //Third-Section
        {
            name: '',
            selector: (row: challanDatas) => row ,
            sortable: true,
            cell: (row: challanDatas) => (
                <span className="font-medium">{}</span>
            )
        }
    ];

    const handleSearch = () => {

    }

    const clearData = () => {
        setFromData(null);
        setFromTime(null);
        setToDate(null);
        setToTime(null);
        setSearchTerm('');
        setVehicleSearchTerm('');

    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const resizeableColumns = useResizableColumns(Columns).map(col => ({
        ...col, minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
    }));

    const exportToExcel = () => { }
    const resetForm = () => { }

    return (
        <div>
            <main className="dashboard-main">
                <div className="main-content-area">
                    <div className="main-content-wrapper mt-5">
                        <div className="relative lg:mt-8 mb-3">
                            <div className="py-3 employee-create-challan-card">
                                <div className="row g-3 align-items-center">
                                    {/* ---------FROM / TO--------- */}
                                    <div className="col-md-7">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="row align-items-center">
                                                    <div className="col-3 px-0">
                                                        <label className='fw-semibold mb-0 name-label label_search'>From</label>
                                                    </div>
                                                    <div className="col-6">
                                                        <DatePicker
                                                            selected={fromData}
                                                            onChange={(date) => setFromData(date)}
                                                            className='form-control form-control-sm challan'
                                                            dateFormat="mm/dd/yyyy"
                                                            placeholderText='MM/DD/YYYY'
                                                        />
                                                    </div>
                                                    <div className="col-3">
                                                        <DatePicker
                                                            selected={fromTime}
                                                            onChange={(time) => setFromTime(time)}
                                                            className='form-control form-control-sm challan'
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            timeIntervals={15}
                                                            timeCaption='Time'
                                                            dateFormat="HH:mm"
                                                            placeholderText='00:00'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row align-items-center">
                                                    <div className="col-3 px-0">
                                                        <label className='fw-semibold mb-0 name-label label_search'>To</label>
                                                    </div>
                                                    <div className="col-6">
                                                        <DatePicker
                                                            selected={toDate}
                                                            onChange={(date) => setToDate(date)}
                                                            className='form-control form-control-sm challan'
                                                            dateFormat="mm/dd/yyyy"
                                                            placeholderText='MM/DD/YYYY'
                                                        />
                                                    </div>
                                                    <div className="col-3">
                                                        <DatePicker
                                                            selected={toTime}
                                                            onChange={(time) => setToTime(time)}
                                                            className='form-control form-control-sm challan'
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            timeIntervals={15}
                                                            timeCaption='Time'
                                                            dateFormat="HH:mm"
                                                            placeholderText='00:00'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* -----------PARTY----------- */}
                                    <div className="col-md-4">
                                        <div className="row align-items-center">
                                            <div className="col-3 px-0">
                                                <label className="fw-semibold mb-0 name-label label_search">Party:</label>
                                            </div>

                                            <div className="col-9">
                                                <Select
                                                    placeholder="Select Party"
                                                    //   value={}
                                                    //   options={}
                                                    //   onChange={}
                                                    isClearable
                                                    isSearchable
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ------CHALLAN / VEHICLE-------- */}
                                    <div className="col-md-7">
                                        <div className="row">
                                            {/* -------Search Challan-No------ */}
                                            <div className="col-md-6">
                                                <div className="row align-items-center">
                                                    <div className="col-3 px-0">
                                                        <label className="mb-0 fw-semibold name-label label_search">Challan</label>
                                                    </div>
                                                    <div className="col-9">
                                                        <input type="text" placeholder='Search Challan...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control form-control-sm challan" style={{ borderRadius: '5px' }} />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* ------------Search-Vehicle----------- */}
                                            <div className="col-md-6">
                                                <div className="row align-items-center">
                                                    <div className="col-3 px-0">
                                                        <label className='mb-0 fw-semibold name-label label_search'>Vehicle</label>
                                                    </div>
                                                    <div className="col-9">
                                                        <input type="text" placeholder='Search Vehicle...' value={vehicleSearchTerm} onChange={(e) => setVehicleSearchTerm(e.target.value)} className="form-control form-control-sm challan" style={{ borderRadius: "5px" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --------SEARCH / CLEAR / EXPORT-------- */}
                                    <div className="col-md-5">
                                        <div className="row justify-content-between">
                                            {/* Search-Clear */}
                                            <div className="col-md-8 d-flex">
                                                <button onClick={handleSearch} className="btn bt-sm py-1 header-button mr-3">Search</button>
                                                <button onClick={clearData} className="btn bt-sm py-1 header-button">Clear</button>
                                            </div>
                                            {/* Export */}
                                            <div className="col-md-4 d-flex justify-content-end">
                                                <button type='button' onClick={exportToExcel} className='btn btn-sm btn-primary py-1 ms-2 export-btn'>Export</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="employee-master-space-y-2">
                            <div className="employee-master-card">
                                <div className="employee-master-card-header mt-2 flex justify-end">
                                    <button type='button' className="employee-master-button employee-master-button-primary employee-master-button-sm" onClick={() => { setEditItemId(null); resetForm(); handleOpenModal() }}>
                                        <PlusIcon /> Add Challan
                                    </button>
                                </div>

                                <div className="employee-master-card-content" style={{ padding: '0' }}>
                                    <DataTable
                                        columns={resizeableColumns}
                                        data={challanData}
                                        pagination
                                        paginationPerPage={10}
                                        paginationRowsPerPageOptions={[5, 10, 20, 50]}
                                        highlightOnHover
                                        customStyles={customStyles}
                                        striped
                                        responsive
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ApprovedChallan;