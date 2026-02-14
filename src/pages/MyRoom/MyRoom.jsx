import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Home, Users, Zap, MapPin,
  User as UserIcon, Shield, Layout, Sparkles
} from 'lucide-react';
import './MyRoom.scss';

const MyRoom = () => {
  const { id } = useParams();
  const { memberships } = useSelector(state => state.auth);

  const membership = memberships?.find(m => m.dormitory._id === id || m.dormitory === id);
  const room = membership?.room;

  if (!room) {
    return (
      <div className="room-empty-container">
        <div className="empty-card">
          <div className="empty-icon"><Layout size={40} /></div>
          <h2>Очікування поселення</h2>
          <p>Адміністратор ще не призначив вам номер кімнати. Зачекайте на оновлення статусу вашої заявки.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-room-wrapper dash-content-fade">
      <div className="room-grid-layout">
        <section className="main-room-card">
          <div className="card-glass-effect"></div>
          <div className="room-header-content">
            <div className="status-pill"><Zap size={14} fill="currentColor" /> Активне проживання</div>
            <h1 className="room-number">№ {room.roomNumber}</h1>
            <div className="room-stats">
              <div className="stat-item">
                <MapPin size={18} />
                <span>{room.floor} поверх</span>
              </div>
              <div className="stat-item">
                <Shield size={18} />
                <span>{room.gender === 'male' ? 'Чоловіча' : 'Жіноча'}</span>
              </div>
            </div>
          </div>
          <div className="room-illustration">
            <Home size={120} strokeWidth={0.5} />
          </div>
        </section>

        <section className="roommates-section">
          <div className="section-title">
            <Users size={20} />
            <h3>Сусіди по кімнаті</h3>
            <span className="room-capacity">{room.residents?.length} / {room.capacity}</span>
          </div>

          <div className="roommates-list">
            {room.residents?.map((res) => (
              <div key={res._id} className="roommate-item">
                <div className="avatar-wrapper">
                  {res.avatar ? (
                    <img src={res.avatar} alt={res.fullName} />
                  ) : (
                    <div className="avatar-alt"><UserIcon size={20} /></div>
                  )}
                  <div className="online-indicator"></div>
                </div>
                <div className="roommate-info">
                  <span className="name">{res.fullName}</span>
                  <span className="role">Студент</span>
                </div>
                <div className="action-tag"><Sparkles size={14} /></div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default MyRoom;