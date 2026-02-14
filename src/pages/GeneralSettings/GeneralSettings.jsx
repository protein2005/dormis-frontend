import React, { useState } from 'react';
import { Save, Building2, MapPin, AlignLeft, Phone, Mail, Send, ShieldAlert } from 'lucide-react';
import { useActions } from "@/hooks/useActions";
import './GeneralSettings.scss';

const GeneralSettings = ({ dorm }) => {
  const { updateDormitory } = useActions();

  const [formData, setFormData] = useState({
    name: dorm?.name || '',
    address: dorm?.address || '',
    description: dorm?.description || '',
    rules: dorm?.rules || '',
    contacts: {
      phone: dorm?.contacts?.phone || '',
      email: dorm?.contacts?.email || '',
      telegram: dorm?.contacts?.telegram || ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contact_')) {
      const field = name.replace('contact_', '');
      setFormData(prev => ({
        ...prev,
        contacts: { ...prev.contacts, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDormitory({ id: dorm._id, ...formData });
  };

  return (
    <form className="general-settings" onSubmit={handleSubmit}>
      <div className="settings-grid">
        {/* Основна інформація */}
        <div className="settings-card">
          <div className="card-header">
            <div className="icon-box icon-box--blue"><Building2 size={20} /></div>
            <h3>Основна інформація</h3>
          </div>
          <div className="card-body">
            <div className="input-group">
              <label><Building2 size={14} /> Назва гуртожитку</label>
              <input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label><MapPin size={14} /> Адреса</label>
              <input name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label><AlignLeft size={14} /> Опис</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" />
            </div>
          </div>
        </div>

        {/* Контакти */}
        <div className="settings-card">
          <div className="card-header">
            <div className="icon-box icon-box--purple"><Phone size={20} /></div>
            <h3>Контакти адміністрації</h3>
          </div>
          <div className="card-body">
            <div className="input-group">
              <label><Phone size={14} /> Телефон</label>
              <input name="contact_phone" value={formData.contacts.phone} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label><Mail size={14} /> Email</label>
              <input name="contact_email" value={formData.contacts.email} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label><Send size={14} /> Telegram (username)</label>
              <input name="contact_telegram" value={formData.contacts.telegram} onChange={handleChange} placeholder="@username" />
            </div>
          </div>
        </div>

        {/* Правила */}
        <div className="settings-card settings-card--full">
          <div className="card-header">
            <div className="icon-box icon-box--green"><ShieldAlert size={20} /></div>
            <h3>Внутрішні правила гуртожитку</h3>
          </div>
          <div className="card-body">
            <textarea
              name="rules"
              value={formData.rules}
              onChange={handleChange}
              rows="6"
              placeholder="Опишіть правила проживання, графік роботи пральні, години тиші тощо..."
            />
          </div>
        </div>
      </div>

      <button type="submit" className="btn-save-all">
        <Save size={20} /> Зберегти зміни
      </button>
    </form>
  );
};

export default GeneralSettings;