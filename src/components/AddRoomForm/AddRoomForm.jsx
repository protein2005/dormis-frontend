import React from 'react';
import { useForm } from 'react-hook-form';
import { useActions } from "@/hooks/useActions";
import { Hash, Users, PersonStanding, Loader2, Save, Layers } from 'lucide-react';

const AddRoomForm = ({ dormId, onSuccess }) => {
  const { addRoom } = useActions();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: { gender: 'mixed', capacity: 4, floor: 1 }
  });

  const onSubmit = async (data) => {
    console.log(data)
    addRoom({ dormId, ...data });
    onSuccess()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-room-form-inner">
      <div className="form-grid-modal">
        <div className="input-group">
          <label><Hash size={14} /> Номер кімнати</label>
          <input
            {...register("roomNumber", { required: "Вкажіть номер" })}
            placeholder="Напр: 402-А"
            className={errors.roomNumber ? 'input-error' : ''}
          />
        </div>

        <div className="input-group">
          <label><Layers size={14} /> Поверх</label>
          <input
            type="number"
            {...register("floor", { required: "Вкажіть поверх", min: 1 })}
            placeholder="1"
          />
        </div>

        <div className="input-group">
          <label><Users size={14} /> Місткість</label>
          <input
            type="number"
            {...register("capacity", { required: true, min: 1 })}
          />
        </div>

        <div className="input-group">
          <label><PersonStanding size={14} /> Тип (гендер)</label>
          <select {...register("gender")}>
            <option value="male">Чоловіча</option>
            <option value="female">Жіноча</option>
            <option value="mixed">Змішана</option>
          </select>
        </div>

        <button type="submit" className="btn-submit-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="spinner" size={18} /> : <Save size={18} />}
          {isSubmitting ? 'Збереження...' : 'Підтвердити додавання'}
        </button>
      </div>
    </form>
  );
};

export default AddRoomForm;