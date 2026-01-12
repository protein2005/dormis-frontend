import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Upload, X, ArrowLeft, Check } from 'lucide-react';
import { useActions } from "@/hooks/useActions";
import './CreateDormitoryPage.scss';

const CreateDormitoryPage = () => {
  const navigate = useNavigate();
  const { createDormitory } = useActions();
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { joinType: 'CODE' }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setValue('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const result = await createDormitory(data);
    if (createDormitory.fulfilled.match(result)) {
      navigate('/dormitories');
    }
  };

  return (
    <div className="create-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn-back">
          <ArrowLeft size={20} /> Назад
        </button>

        <Motion.div
          className="create-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="create-content__header">
            <h1>Налаштування нового гуртожитку</h1>
            <p>Створіть унікальний простір для ваших мешканців</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="create-form">
            <div className="create-form__grid">

              <div className="create-form__sidebar">
                <div className={`dropzone ${preview ? 'has-img' : ''}`}>
                  {preview ? (
                    <>
                      <img src={preview} alt="Preview" />
                      <button type="button" onClick={() => {setPreview(null); setValue('image', null)}} className="remove-img">
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <label className="dropzone__label">
                      <Upload size={32} />
                      <span>Завантажити лого</span>
                      <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                    </label>
                  )}
                </div>
                <div className="info-box">
                  <h3>Тип доступу</h3>
                  <select {...register('joinType')}>
                    <option value="CODE">За кодом</option>
                    <option value="WHITELIST">Вайтліст</option>
                    <option value="MODERATION">Модерація</option>
                  </select>
                </div>
              </div>

              <div className="create-form__main">
                <div className="input-field">
                  <label>Назва гуртожитку</label>
                  <div className="input-wrapper">
                    <Building2 size={18} />
                    <input {...register('name', { required: "Це поле обов'язкове" })} placeholder="Напр. Гуртожиток №1 КПІ" />
                  </div>
                  {errors.name && <span className="error">{errors.name.message}</span>}
                </div>

                <div className="input-field">
                  <label>Фізична адреса</label>
                  <div className="input-wrapper">
                    <MapPin size={18} />
                    <input {...register('address', { required: "Вкажіть адресу" })} placeholder="м. Київ, вул. Перемоги 37" />
                  </div>
                </div>

                <div className="input-field">
                  <label>Опис та правила</label>
                  <textarea {...register('description')} rows="5" placeholder="Розкажіть про умови проживання..." />
                </div>

                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  <Check size={20} />
                  {isSubmitting ? 'Створюємо...' : 'Запустити проект'}
                </button>
              </div>

            </div>
          </form>
        </Motion.div>
      </div>
    </div>
  );
};

export default CreateDormitoryPage;