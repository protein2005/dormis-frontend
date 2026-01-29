import React from 'react';
import Modal from '@/components/Modal';
import AddRoomForm from "@/components/AddRoomForm";

const AddRoomModal = ({ isOpen, onClose, dormId }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Додати нову кімнату"
    >
      <div className="add-room-modal-body">
        <p className="modal-subtitle">
          Вкажіть параметри кімнати для автоматичного розподілу студентів.
        </p>

        <AddRoomForm
          dormId={dormId}
          onSuccess={onClose}
        />
      </div>
    </Modal>
  );
};

export default AddRoomModal;