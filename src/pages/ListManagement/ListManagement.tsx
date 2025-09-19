import React from 'react';
import AddUpList from './AddUpList';
import { useParams } from 'react-router-dom';
import ListManagementRoute from './ListManagementRoute';

// interface ListManagementRoute {
//   pageEndPoint: string;
// }

// const ListManagement: React.FC<ListManagementRoute> = ({ }) => {
const ListManagement = () => {
    const pageEndPoint = window.location.pathname.slice(1);
    console.log("Page End Point:", pageEndPoint);
    // const { section, page } = useParams();
    // const pageEndPoint = `${section}/${page}`;

    return (
        <div className="section-body view_page_design pt-1">
            <div className="row clearfix">
                <div className="col-12 col-sm-12">
                    <div className="card Agency name-card">
                        <div className="card-body">
                            {
                                pageEndPoint === "hr/blood-group" ? 
                                <AddUpList {...{pageEndPoint}} col1 = "BloodGroup" col2="Master Tables with codes and descriptions for Blood Types"
                                getUrl = 'BloodGroup/GetData_BloodGroup'
                                addUrl = "BloodGroup/Insert_BloodGroup"
                                singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                upUrl="BloodGroup/Update_BloodGroup"
                                delUrl="BloodGroup/Delete_BloodGroup"
                                dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                /> 
                                :
                                pageEndPoint === "fuel/fuel-type-master" ? 
                                <AddUpList {...{pageEndPoint}} col1 = "Fuel Type" col2="Master Tables with codes and descriptions for Fuel Types"
                                getUrl = 'BloodGroup/GetData_BloodGroup'
                                addUrl = "BloodGroup/Insert_BloodGroup"
                                singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                upUrl="BloodGroup/Update_BloodGroup"
                                delUrl="BloodGroup/Delete_BloodGroup"
                                dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                /> : "none"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   
    // return <ListManagement pageEndPoint={pageEndPoint} />;                    
}

export default ListManagement;
