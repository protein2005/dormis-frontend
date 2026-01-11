import { useForm } from 'react-hook-form';
import { useActions } from "@/hooks/useActions";
import Modal from '@/components/Modal';
import './JoinModal.scss';
import { joinByCode } from "@/store/dormitory/dormitory.actions";

const JoinModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange'
  });

  const { joinByCode } = useActions();

  const onSubmit = async (data) => {
    console.log(data)
    joinByCode(data)
    reset()
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Приєднатись до гуртожитку">
      <form onSubmit={handleSubmit(onSubmit)} className="join-form">
        <div className="join-form__field">
          <label className="join-form__label">Код запрошення</label>
          <input
            {...register('inviteCode', {
              required: 'Код обов’язковий',
              minLength: { value: 4, message: 'Код занадто короткий' },
              maxLength: { value: 12, message: 'Некоректний код' }
            })}
            className={`join-form__input ${errors.inviteCode ? 'error' : ''}`}
            placeholder="Наприклад: A1B2C3D4"
            autoComplete="off"
          />
          {errors.inviteCode && (
            <span className="join-form__error">{errors.inviteCode.message}</span>
          )}
          <p className="join-form__hint">
            Цей код має надати адміністрація вашого гуртожитку.
          </p>
        </div>

        <div className="join-form__actions">
          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Перевірка...' : 'Приєднатися'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default JoinModal;