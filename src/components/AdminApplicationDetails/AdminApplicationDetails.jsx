import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowLeft, CheckCircle2, XCircle, Clock,
  ShieldCheck, Mail, Calendar, MapPin, User
} from 'lucide-react';
import { useActions } from "@/hooks/useActions";
import ApplicationPreview from "@/components/ApplicationPreview";
import './AdminApplicationDetails.scss';
import RequestHistory from "@/components/RequestHistory";

const AdminApplicationDetails = () => {
  const { dormId, membershipId } = useParams();
  const navigate = useNavigate();
  const { currentRequests, isLoading } = useSelector(state => state.dormitory);
  const { updateRequestStatus, getSettlementRequests } = useActions();

  const [comment, setComment] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const request = currentRequests?.find(r => r._id === membershipId);

  useEffect(() => {
    if (!currentRequests.length && dormId) {
      getSettlementRequests(dormId);
    }
  }, [dormId, currentRequests.length, getSettlementRequests]);

  const handleAction = async (status) => {
    await updateRequestStatus({
      requestId: membershipId,
      status,
      roomNumber,
      comment
    });
    navigate(-1);
  };

  if (isLoading || !request) return <div className="loading-screen">Завантаження...</div>;

  return (
    <div className="details-page dash-content-fade">
      <nav className="details-nav">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> До списку заявок
        </button>
        <div className={`nav-status status--${request.status}`}>
          <span className="dot"></span>
          Статус: {request.status === 'pending' ? 'Очікує' : request.status === 'approved' ? 'Схвалено' : 'Відхилено'}
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
              <span className="badge"><Calendar size={14} /> Створено: {new Date(request.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="details-layout">
        <main className="details-main">
          <ApplicationPreview request={request} />
        </main>

        <aside className="details-sidebar">
          <div className="sticky-sidebar">
            {request.status === 'pending' && (
              <div className="decision-card">
                <div className="card-top">
                  <ShieldCheck size={20} />
                  <h3>Прийняти рішення</h3>
                </div>

                <div className="form-group">
                  <label>Номер кімнати</label>
                  <div className="input-wrapper">
                    <MapPin size={16} />
                    <input
                      type="text"
                      placeholder="Напр: 402-А"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Коментар для студента</label>
                  <textarea
                    placeholder="Причина або вказівки..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="decision-buttons">
                  <button className="btn-approve" onClick={() => handleAction('approved')} disabled={!roomNumber}>
                    <CheckCircle2 size={18} /> Схвалити
                  </button>
                  <button className="btn-reject" onClick={() => handleAction('rejected')}>
                    <XCircle size={18} /> Відхилити
                  </button>
                </div>
              </div>
            )}
            <RequestHistory logs={request.logs} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminApplicationDetails;