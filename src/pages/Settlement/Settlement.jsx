import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions } from "@/hooks/useActions";
import { Clock, CheckCircle, ArrowLeft, Loader2, Edit3 } from 'lucide-react';

import StudentSettlementForm from "@/components/StudentSettlementForm";
import AdminSettlementReview from "@/components/AdminSettlementReview";
import StatusInfoBox from "@/components/StatusInfoBox";
import ApplicationPreview from "@/components/ApplicationPreview";

import './Settlement.scss';
import RequestHistory from "@/components/RequestHistory";
import GenderWarning from "@/components/GenderWarning";

const Settlement = () => {
  const { currentDorm } = useOutletContext();
  const { memberships, user } = useSelector(state => state.auth);
  const { currentRequests } = useSelector(state => state.dormitory);
  const { getMySettlementRequests, getSettlementRequests } = useActions();
  const [isEditing, setIsEditing] = useState(false);

  const myMembership = memberships?.find(m =>
    (m.dormitory?._id === currentDorm?._id || m.dormitory === currentDorm?._id)
  );

  const userRole = myMembership?.role;
  const currentStatus = myMembership?.status;

  const myRequest = currentRequests?.find(req =>
    (req.dormitory?._id === currentDorm?._id || req.dormitory === currentDorm?._id)
  );

  const hasNoGender = !user?.gender;

  useEffect(() => {
    if (!currentDorm?._id) return;

    if (userRole === 'owner' || userRole === 'admin') {
      getSettlementRequests(currentDorm._id);
    } else if (userRole === 'resident') {
      getMySettlementRequests();
    }
  }, [currentDorm?._id, userRole, getMySettlementRequests, getSettlementRequests]);

  if (!currentDorm || !myMembership) {
    return (
      <div className="settlement-loading">
        <Loader2 className="spinner" />
        <p>Завантаження даних поселення...</p>
      </div>
    );
  }

  return (
    <div className="settlement-page dash-content-fade">
      <header className="page-header">
        <h1 className="title">Модуль поселення</h1>
        <p>Керування процесом заселення та перевірка документів</p>
      </header>

      <div className="settlement-content">
        {userRole === 'resident' && hasNoGender && (
          <GenderWarning />
        )}

        {(userRole === 'owner' || userRole === 'admin') && (
          <AdminSettlementReview dormId={currentDorm._id} />
        )}

        {userRole === 'resident' && (
          <div className="student-flow">

            {currentStatus === 'joined' && !hasNoGender && (!myRequest || myRequest.status === 'cancelled') && (
              <StudentSettlementForm
                fields={currentDorm.settlementFields}
                dormId={currentDorm._id}
              />
            )}

            {currentStatus === 'joined' && myRequest?.status === 'pending' && (
              <div className="status-container">
                <StatusInfoBox
                  type="processing"
                  title="Заявка на розгляді"
                  message="Ви успішно подали документи. Очікуйте на перевірку адміністратором."
                  icon={<Clock size={24} />}
                />
                <div className="settlement-grid">
                  <div className="settlement-grid__main">
                    <ApplicationPreview request={myRequest} />
                  </div>
                  <aside className="settlement-grid__sidebar">
                    <RequestHistory logs={myRequest.logs} />
                  </aside>
                </div>
              </div>
            )}

            {currentStatus === 'joined' && myRequest?.status === 'rejected' && (
              <div className="status-container dash-content-fade">
                {!isEditing ? (
                  <>
                    <StatusInfoBox
                      type="error"
                      title="Заявку відхилено"
                      message={`Причина: ${myRequest.logs[myRequest.logs.length - 1]?.comment || 'Перегляньте зауваження в історії.'}`}
                    />

                    <div className="action-bar" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                      <button className="btn-submit" onClick={() => setIsEditing(true)}>
                        <Edit3 size={18} style={{ marginRight: '8px' }} /> Редагувати та подати заново
                      </button>
                    </div>

                    <div className="settlement-grid">
                      <div className="settlement-grid__main">
                        <ApplicationPreview request={myRequest} />
                      </div>
                      <aside className="settlement-grid__sidebar">
                        <RequestHistory logs={myRequest?.logs} />
                      </aside>
                    </div>
                  </>
                ) : (
                  <div className="edit-flow">
                    <button className="back-link" onClick={() => setIsEditing(false)} style={{ marginBottom: '20px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700, color: '#64748b' }}>
                      <ArrowLeft size={18} /> Скасувати редагування
                    </button>

                    <StudentSettlementForm
                      fields={currentDorm.settlementFields}
                      dormId={currentDorm._id}
                      initialData={myRequest}
                    />
                  </div>
                )}
              </div>
            )}

            {currentStatus === 'active' && (
              <div className="status-container">
                <StatusInfoBox
                  type="success"
                  title="Ви заселені"
                  message={`Вітаємо! Процес поселення завершено. Ваша кімната: ${myMembership.roomNumber || 'Буде призначена скоро'}`}
                  icon={<CheckCircle size={24} />}
                />
                <div className="settlement-grid">
                  <div className="settlement-grid__main">
                    <ApplicationPreview request={myRequest} />
                  </div>
                  <aside className="settlement-grid__sidebar">
                    <RequestHistory logs={myRequest?.logs} />
                  </aside>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settlement;