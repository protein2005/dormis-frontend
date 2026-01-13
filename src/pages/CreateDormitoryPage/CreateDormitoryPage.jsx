import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Building2, MapPin, Upload, X, ArrowLeft,
  Check, Phone, Mail, Send, BookOpen, Info
} from 'lucide-react';
import { useActions } from "@/hooks/useActions";
import './CreateDormitoryPage.scss';

const CreateDormitoryPage = () => {
  const navigate = useNavigate();
  const { createDormitory } = useActions();
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      joinType: 'CODE',
      contacts: { phone: '', email: '', telegram: '' }
    }
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
    try {
      console.log(data)
      const bodyData = {
        ...data, image: ""
      }
      createDormitory(bodyData);
      navigate('/dormitories');
    } catch (error) {
      console.error("Помилка створення гуртожитку:", error);
    }
  };

  return (
    <div className="create-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn-back">
          <ArrowLeft size={20} /> Назад до списку
        </button>

        <Motion.div
          className="create-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="create-content__header">
            <h1>Налаштування нового гуртожитку</h1>
            <p>Заповніть детальну інформацію про ваш заклад</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="create-form">
            <div className="create-form__grid">

              <div className="create-form__sidebar">
                <div className="form-block">
                  <label className="block-label">Логотип закладу</label>
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
                        <span>Завантажити фото</span>
                        <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="info-box">
                  <h3><Info size={16} /> Метод приєднання</h3>
                  <p>Виберіть, як мешканці будуть потрапляти до системи.</p>
                  <select {...register('joinType')}>
                    <option value="CODE">За кодом запрошення</option>
                    <option value="WHITELIST">За списком Email (Whitelist)</option>
                    <option value="MODERATION">Ручна модерація</option>
                  </select>
                </div>
              </div>

              <div className="create-form__main">

                <section className="form-section">
                  <div className="input-field">
                    <label>Назва гуртожитку</label>
                    <div className="input-wrapper">
                      <Building2 size={18} />
                      <input {...register('name', { required: "Назва обов'язкова" })} placeholder="Напр. Гуртожиток №10" />
                    </div>
                    {errors.name && <span className="error">{errors.name.message}</span>}
                  </div>

                  <div className="input-field">
                    <label>Фізична адреса</label>
                    <div className="input-wrapper">
                      <MapPin size={18} />
                      <input {...register('address', { required: "Адреса обов'язкова" })} placeholder="вул. Студентська, 15" />
                    </div>
                    {errors.address && <span className="error">{errors.address.message}</span>}
                  </div>
                </section>

                <section className="form-section">
                  <h3 className="section-title">Контакти адміністрації</h3>
                  <div className="inputs-row">
                    <div className="input-field">
                      <div className="input-wrapper">
                        <Phone size={18} />
                        <input {...register('contacts.phone')} placeholder="+380..." />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input-wrapper">
                        <Mail size={18} />
                        <input {...register('contacts.email')} placeholder="admin@dorm.com" />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input-wrapper">
                        <Send size={18} />
                        <input {...register('contacts.telegram')} placeholder="@dorm_admin" />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="form-section">
                  <div className="input-field">
                    <label>Опис закладу</label>
                    <textarea
                      {...register('description')}
                      rows="3"
                      placeholder="Короткий опис гуртожитку для майбутніх мешканців..."
                    />
                  </div>

                  <div className="input-field">
                    <label>Правила внутрішнього розпорядку</label>
                    <div className="textarea-with-icon">
                      <BookOpen size={18} className="area-icon" />
                      <textarea
                        {...register('rules')}
                        rows="4"
                        placeholder="Наприклад: комендантська година з 23:00, дотримання тиші тощо."
                      />
                    </div>
                  </div>
                </section>

                <div className="form-footer">
                  <button type="submit" className="btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="loader-spinner" />
                    ) : (
                      <>
                        <Check size={20} />
                        <span>Створити гуртожиток</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </form>
        </Motion.div>
      </div>
    </div>
  );
};

export default CreateDormitoryPage;