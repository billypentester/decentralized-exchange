import React, {useEffect, useState} from 'react'
import Modal from 'react-modal';
import Loader from './Loader'

function Popup({ setShowModal, title, message, type, spin }) {

    const [loading, setLoading] = useState(spin)

    const closeModal = () => {
        setShowModal(false);
    };

    const modalOverlayStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999, // Ensure the modal is positioned above other elements
        border: 'none',
    };
  
    const modalContentStyles = {
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '35vh',
        overflow: 'auto',
    };


  return (
    <Modal
        isOpen={true}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        style={{
          overlay: modalOverlayStyles,
          content: modalContentStyles,
        }}
    >
      <div>
        <div className="d-flex justify-content-between">
            <h2>{title}</h2>
            <i className="fas fa-times fa-2x" onClick={closeModal}></i>
        </div>
        <div className={`alert alert-${type} m-3`} role="alert">
            <strong>
              {
                type === 'success ' ? 'Success! ' : 'Error! '
              }
            </strong>
           {message}
        </div>
        <div className="d-flex justify-content-end m-3">
              {
                loading === 'true' ? 
                <div class={`spinner-border text-${type}`} role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                :
                <button className={`btn btn-${type === 'success' ? 'success' : 'danger'}`} onClick={closeModal}>Close</button>
              }
        </div>
      </div>
    </Modal>
  )
}

export default Popup