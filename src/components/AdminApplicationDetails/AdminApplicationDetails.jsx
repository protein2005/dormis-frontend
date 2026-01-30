import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowLeft, CheckCircle2, XCircle, ShieldCheck,
  Mail, Calendar, MapPin, User, Mars, Venus, MessageSquare
} from 'lucide-react';
import { useActions } from "@/hooks/useActions";
import ApplicationPreview from "@/components/ApplicationPreview";
import RequestHistory from "@/components/RequestHistory";
import './AdminApplicationDetails.scss';

const AdminApplicationDetails = () => {
  const { id: dormId, membershipId } = useParams();
  const navigate = useNavigate();

  const { currentRequests, availableRooms, isLoading } = useSelector(state => state.dormitory);
  const { updateRequestStatus, getSettlementRequests, getAvailableRooms } = useActions();

  const [comment, setComment] = useState('');
  const [roomValue, setRoomValue] = useState('');

  const request = currentRequests?.find(r => r._id === membershipId);

  useEffect(() => {
    if (request?.user?.gender && dormId) {
      getAvailableRooms({ dormId, gender: request.user.gender });
    }
  }, [request?.user?.gender, dormId, getAvailableRooms]);

  useEffect(() => {
    if (!currentRequests.length && dormId) {
      getSettlementRequests(dormId);
    }
  }, [dormId, currentRequests.length, getSettlementRequests]);

  const handleAction = async (status) => {
    const matchedRoom = availableRooms.find(r => r.roomNumber === roomValue);
    await updateRequestStatus({
      requestId: membershipId,
      status,
      roomNumber: roomValue,
      roomId: matchedRoom ? matchedRoom._id : null,
      comment
    });
    navigate(-1);
  };

  if (isLoading || !request) return <div className="loading-screen">Завантаження...</div>;

  return (
    <div className="details-page dash-content-fade">
      <nav className="details-nav">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Назад до заявок
        </button>
        <div className={`nav-status status--${request.status}`}>
          <span className="dot"></span>
          {request.status === 'pending' ? 'Очікує розгляду' : request.status === 'approved' ? 'Схвалено' : 'Відхилено'}
        </div>
      </nav>

      <header className="user-hero-card">
        <div className="hero-main">
          <div className="hero-avatar">
            {request.user?.avatar ? <img src={request.user.avatar} alt="" /> : <User size={32} />}
          </div>
          <div className="hero-text">
            <h1 className='title'>{request.user?.fullName}</h1>
            <div className="hero-badges">
              <span className="badge"><Mail size={14} /> {request.user?.email}</span>
              <span className={`badge gender--${request.user?.gender}`}>
                {request.user?.gender === 'male' ? <><Mars size={14} /> Чоловік</> : <><Venus size={14} /> Жінка</>}
              </span>
              <span className="badge"><Calendar size={14} /> {new Date(request.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="details-grid">
        <div className="grid-main">
          <ApplicationPreview request={request} />

          {request.wishlist && (
            <div className="wishlist-section card-style">
              <div className="section-header">
                <MessageSquare size={20} />
                <h3>Побажання студента</h3>
              </div>
              <p className="wishlist-text">{request.wishlist}</p>
            </div>
          )}
        </div>

        <aside className="grid-sidebar">
          <div className="sticky-wrapper">
            {request.status === 'pending' && (
              <section className="decision-card card-style">
                <div className="card-header">
                  <ShieldCheck size={20} />
                  <h3>Прийняти рішення</h3>
                </div>

                <div className="form-group">
                  <label>Номер кімнати</label>
                  <div className="input-wrapper">
                    <MapPin size={18} />
                    <input
                      type="text"
                      list="available-rooms-list"
                      placeholder="Впишіть або оберіть..."
                      value={roomValue}
                      onChange={(e) => setRoomValue(e.target.value)}
                    />
                    <datalist id="available-rooms-list">
                      {availableRooms?.map(room => (
                        <option key={room._id} value={room.roomNumber}>
                          {room.roomNumber} (Поверх {room.floor}, місць: {room.capacity - (room.residents?.length || 0)})
                        </option>
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="form-group">
                  <label>Коментар (буде надіслано студенту)</label>
                  <textarea
                    placeholder="Наприклад: 'Документи прийнято, очікуйте...' або причина відмови"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="action-buttons">
                  <button
                    className="btn-approve"
                    onClick={() => handleAction('approved')}
                    disabled={!roomValue}
                  >
                    <CheckCircle2 size={18} /> Схвалити
                  </button>
                  <button className="btn-reject" onClick={() => handleAction('rejected')}>
                    <XCircle size={18} /> Відхилити
                  </button>
                </div>
              </section>
            )}
            <RequestHistory logs={request.logs} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminApplicationDetails;