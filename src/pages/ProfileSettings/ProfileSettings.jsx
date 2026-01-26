import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/useActions';
import { User, Save, Camera, Loader2 } from 'lucide-react';
import { uploadFile } from "@/services/file.service";
import './ProfileSettings.scss';

const ProfileSettings = () => {
  const { user } = useSelector(state => state.auth);
  const { updateProfile } = useActions();
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { isDirty, isSubmitting: isProfileSaving } } = useForm({
    defaultValues: {
      fullName: user?.fullName || '',
      gender: user?.gender || '',
      avatar: user?.avatar || ''
    }
  });

  const selectedGender = watch("gender");
  const avatarUrl = watch("avatar");

  const onProfileSubmit = async (data) => {
    await updateProfile(data);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const result = await uploadFile(file);
      setValue('avatar', result.url, { shouldDirty: true });
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="settings-page dash-content-fade">
      <header className="page-header">
        <h1>Налаштування профілю</h1>
        <p>Керуйте інформацією вашого профілю, щоб забезпечити точність та актуальність ваших даних.</p>
      </header>

      <div className="settings-layout">
        <div className="settings-container">

          <section className="settings-section avatar-section">
            <div className="avatar-wrapper">
              <div className="avatar-circle">
                {avatarUrl ? <img src={avatarUrl} alt="Profile" /> : <User size={40} />}
                {isUploading && <div className="avatar-loader"><Loader2 className="spinner" /></div>}
              </div>
              <label className="avatar-edit-btn">
                <Camera size={16} />
                <input type="file" hidden onChange={handleAvatarChange} accept="image/*" />
              </label>
            </div>
            <div className="avatar-text">
              <h3>Ваше фото</h3>
              <p>Додайте обличчя вашому профілю</p>
            </div>
          </section>

          <form onSubmit={handleSubmit(onProfileSubmit)}>
            <section className="settings-section">
              <div className="section-title"><User size={20} /> <h3>Основна інформація</h3></div>
              <div className="grid-form">
                <div className="input-group">
                  <label>Повне ім'я</label>
                  <input {...register("fullName", { required: true })} />
                </div>
                <div className="input-group">
                  <label>Email (незмінно)</label>
                  <input value={user?.email} disabled />
                </div>
                <div className="input-group full-width">
                  <label>Стать</label>
                  <div className="gender-toggle-group">
                    <button type="button" className={`gender-option ${selectedGender === 'male' ? 'active' : ''}`} onClick={() => setValue('gender', 'male', { shouldDirty: true })}>Чоловіча</button>
                    <button type="button" className={`gender-option ${selectedGender === 'female' ? 'active' : ''}`} onClick={() => setValue('gender', 'female', { shouldDirty: true })}>Жіноча</button>
                  </div>
                </div>
              </div>
              <div className="settings-footer">
                <button type="submit" className="btn-save" disabled={!isDirty || isProfileSaving}>
                  <Save size={18} /> {isProfileSaving ? 'Збереження...' : 'Зберегти профіль'}
                </button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;