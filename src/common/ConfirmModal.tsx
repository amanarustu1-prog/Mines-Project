import React from "react";

interface ConfirmModalProps {
    show: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, handleClose, handleConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal d-block" style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: 11111 }} role="dialog" aria-hidden={!show} id="SaveModal" data-backdrop="false">
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="box text-center py-2">
                        <h5 className="modal-title">Are you sure you want to save changes you made for the current record?</h5>
                        <div className="btn-box mt-4">
                            <button type="button" className="btn btn-sm text-white py-2" style={{ background: "#ef233c" }} onClick={handleConfirm}>Delete</button>
                            <button type="button" className="btn btn-sm btn-secondary ml-2 py-2" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
