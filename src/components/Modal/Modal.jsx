import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Overlay, ModalStyle } from './Modal.style';

const Modal = ({ closeModal, children }) => {

    const handleCloseModal = event => {
        if (event.currentTarget === event.target || event.code === 'Escape') {
            closeModal();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleCloseModal);
        return () => {
            window.removeEventListener('keydown', handleCloseModal);
        }
    })
    
    return createPortal(
        <Overlay onClick={handleCloseModal}>
            <ModalStyle>
                {children}
            </ModalStyle>
        </Overlay>,
        document.querySelector('#modal-root')
    );
};

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default Modal;