import React from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Phone,
  Mail,
  Send,
  FileText,
  ShieldAlert,
  MapPin,
  Key,
  Download,
} from 'lucide-react';
import './DormitoryInfo.scss';

const DormitoryInfo = () => {
  const { currentDorm } = useOutletContext();

  if (!currentDorm) return <div className="loading-state">Завантаження інформації...</div>;

  return (
    <div className="dorm-info">
      <div className="dorm-info__hero">
        {currentDorm.imageUrl && (
          <div className="hero-image">
            <img src={currentDorm.imageUrl} alt={currentDorm.name} />
          </div>
        )}
        <div className="hero-content">
          <p className="address"><MapPin size={16} /> {currentDorm.address}</p>
          <p className="description">{currentDorm.description || "Опис відсутній"}</p>
          <div className="invite-box">
            <Key size={18} />
            <span>Код запрошення: <strong>{currentDorm.inviteCode}</strong></span>
          </div>
        </div>
      </div>

      <div className="dorm-info__grid">
        <div className="info-card">
          <div className="info-card__header">
            <div className="icon-box icon-box--blue"><Phone size={20} /></div>
            <h3>Контакти</h3>
          </div>
          <div className="info-card__body">
            <div className="contact-item">
              <Phone size={16} /> <span>{currentDorm.contacts?.phone || 'Не вказано'}</span>
            </div>
            <div className="contact-item">
              <Mail size={16} /> <span>{currentDorm.contacts?.email || 'Не вказано'}</span>
            </div>
            {currentDorm.contacts?.telegram && (
              <a href={`https://t.me/${currentDorm.contacts.telegram.replace('@', '')}`} className="contact-item contact-item--link">
                <Send size={16} /> <span>{currentDorm.contacts.telegram}</span>
              </a>
            )}
          </div>
        </div>

        <div className="info-card">
          <div className="info-card__header">
            <div className="icon-box icon-box--purple"><ShieldAlert size={20} /></div>
            <h3>Правила гуртожитку</h3>
          </div>
          <div className="info-card__body">
            <p className="rules-text">{currentDorm.rules || "Правила ще не додані адміністрацією."}</p>
          </div>
        </div>

        <div className="info-card info-card--full">
          <div className="info-card__header">
            <div className="icon-box icon-box--green"><FileText size={20} /></div>
            <h3>Важливі документи</h3>
          </div>
          <div className="info-card__body files-grid">
            {currentDorm.files?.length > 0 ? currentDorm.files.map((file, idx) => (
              <a key={idx} href={file.url} target="_blank" rel="noreferrer" className="file-item">
                <div className="file-icon"><FileText size={24} /></div>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-action">Завантажити <Download size={14} /></span>
                </div>
              </a>
            )) : <p className="empty-msg">Файли відсутні</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DormitoryInfo;