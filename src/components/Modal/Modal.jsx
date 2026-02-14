import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './Modal.scss';

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <Motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <Motion.div
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="modal-content__header">
              <h2>{title}</h2>
              <button onClick={onClose} className="modal-close">
                <X size={24} />
              </button>
            </div>
            <div className="modal-content__body">
              {children}
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;