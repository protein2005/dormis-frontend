import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Building2, MapPin, Upload, X, ArrowLeft,
  Check, Phone, Mail, Send, BookOpen, Info, FileText
} from 'lucide-react';
import { useActions } from "@/hooks/useActions";
import { uploadFile } from '@/services/file.service';
import './CreateDormitoryPage.scss';

const CreateDormitoryPage = () => {
  const navigate = useNavigate();
  const { createDormitory } = useActions();

  const [preview, setPreview] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      joinType: 'CODE',
      contacts: { phone: '', email: '', telegram: '' },
      files: []
    }
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const result = await uploadFile(file);
      setPreview(result.url);
      setValue('imageUrl', result.url);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDocUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const result = await uploadFile(file);
      const newDocs = [...uploadedDocs, { name: result.name, url: result.url }];
      setUploadedDocs(newDocs);
      setValue('files', newDocs);
    } catch (error) {
      console.error("Doc upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeDoc = (index) => {
    const filtered = uploadedDocs.filter((_, i) => i !== index);
    setUploadedDocs(filtered);
    setValue('files', filtered);
  };

  const onSubmit = async (data) => {
    try {
      await createDormitory(data);
      navigate('/dormitories');
    } catch (error) {
      console.error("Помилка створення:", error);
    }
  };

  return (
    <div className="create-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn-back">
          <ArrowLeft size={20} /> Назад
        </button>

        <Motion.div className="create-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="create-content__header">
            <h1>Налаштування гуртожитку</h1>
            <p>Заповніть інформацію та завантажте медіафайли</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="create-form">
            <div className="create-form__grid">

              <div className="create-form__sidebar">
                <div className="form-block">
                  <label className="block-label">Логотип (Cloudinary)</label>
                  <div className={`dropzone ${preview ? 'has-img' : ''}`}>
                    {preview ? (
                      <>
                        <img src={preview} alt="Preview" />
                        <button type="button" onClick={() => {setPreview(null); setValue('imageUrl', '')}} className="remove-img">
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <label className="dropzone__label">
                        <Upload size={32} />
                        <span>{isUploading ? 'Завантаження...' : 'Завантажити фото'}</span>
                        <input type="file" hidden onChange={handleImageChange} accept="image/*" disabled={isUploading} />
                      </label>
                    )}
                  </div>
                </div>

                <div className="info-box">
                  <h3><Info size={16} /> Тип доступу</h3>
                  <select {...register('joinType')}>
                    <option value="CODE">Код запрошення</option>
                    <option value="WHITELIST">Вайтліст</option>
                    <option value="MODERATION">Модерація</option>
                  </select>
                </div>
              </div>

              <div className="create-form__main">
                <section className="form-section">
                  <div className="input-field">
                    <label>Назва</label>
                    <div className="input-wrapper">
                      <Building2 size={18} />
                      <input {...register('name', { required: "Обов'язково" })} placeholder="Назва закладу" />
                    </div>
                  </div>

                  <div className="input-field">
                    <label>Адреса</label>
                    <div className="input-wrapper">
                      <MapPin size={18} />
                      <input {...register('address', { required: "Обов'язково" })} placeholder="Повна адреса" />
                    </div>
                  </div>
                </section>

                <section className="form-section">
                  <h3 className="section-title">Контакти</h3>
                  <div className="inputs-row">
                    <div className="input-field">
                      <div className="input-wrapper"><Phone size={18} /><input {...register('contacts.phone')} placeholder="Телефон" /></div>
                    </div>
                    <div className="input-field">
                      <div className="input-wrapper"><Mail size={18} /><input {...register('contacts.email')} placeholder="Email" /></div>
                    </div>
                    <div className="input-field">
                      <div className="input-wrapper"><Send size={18} /><input {...register('contacts.telegram')} placeholder="Telegram" /></div>
                    </div>
                  </div>
                </section>

                <section className="form-section">
                  <label className="block-label">Документи (PDF)</label>
                  <div className="file-uploader">
                    <input type="file" id="pdf-upload" hidden accept=".pdf" onChange={handleDocUpload} />
                    <label htmlFor="pdf-upload" className="btn-add-file">
                      <Upload size={18} /> Додати документ
                    </label>

                    <div className="docs-list">
                      {uploadedDocs.map((doc, i) => (
                        <div key={i} className="doc-item">
                          <FileText size={16} />
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            {doc.name}
                          </a>
                          <button type="button" onClick={() => removeDoc(i)}><X size={14} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="form-section">
                  <div className="input-field">
                    <label>Опис</label>
                    <textarea {...register('description')} rows="3" placeholder="Опис гуртожитку..." />
                  </div>

                  <div className="input-field">
                    <label>Правила</label>
                    <div className="textarea-with-icon">
                      <BookOpen size={18} className="area-icon" />
                      <textarea {...register('rules')} rows="4" placeholder="Правила проживання..." />
                    </div>
                  </div>
                </section>

                <div className="form-footer">
                  <button type="submit" className="btn-submit" disabled={isSubmitting || isUploading}>
                    <Check size={20} />
                    <span>{isSubmitting ? 'Створення...' : 'Створити заклад'}</span>
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