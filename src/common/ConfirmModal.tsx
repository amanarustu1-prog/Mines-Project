import React from "react";

const ConfirmModal = ({ show, handleClose, handleConfirm }) => {
    if (!show) return null; // Hide if not active

    return (
        <div className="modal d-block" style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: 11111, }} tabIndex="-1" role="dialog" ria-hidden={!show} id="SaveModal" tabIndex="-1" data-backdrop="false" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="box text-center py-2    ">
                        <h5 className="modal-title mt-2">
                            Are you sure you want to save changes you made for the current record?
                        </h5>

                        <div className="btn-box mt-4">
                            <button type="button" className="btn btn-sm text-white" style={{ background: "#ef233c" }} onClick={handleConfirm} >Delete</button>

                            <button type="button" className="btn btn-sm btn-secondary ml-2" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
