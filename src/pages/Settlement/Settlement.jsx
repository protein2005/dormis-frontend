import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions } from "@/hooks/useActions";
import { Clock, CheckCircle, AlertCircle, RefreshCcw, Loader2 } from 'lucide-react';

import StudentSettlementForm from "@/components/StudentSettlementForm";
import AdminSettlementReview from "@/components/AdminSettlementReview";
import StatusInfoBox from "@/components/StatusInfoBox";
import ApplicationPreview from "@/components/ApplicationPreview";

import './Settlement.scss';

const Settlement = () => {
  const { currentDorm } = useOutletContext();
  const { memberships } = useSelector(state => state.auth);
  const { currentRequests } = useSelector(state => state.dormitory);
  const { getMySettlementRequests, getSettlementRequests } = useActions();

  const myMembership = memberships?.find(m =>
    (m.dormitory?._id === currentDorm?._id || m.dormitory === currentDorm?._id)
  );

  const userRole = myMembership?.role;
  const currentStatus = myMembership?.status;

  const myRequest = currentRequests?.find(req =>
    (req.dormitory?._id === currentDorm?._id || req.dormitory === currentDorm?._id)
  );

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
        {(userRole === 'owner' || userRole === 'admin') && (
          <AdminSettlementReview dormId={currentDorm._id} />
        )}

        {userRole === 'resident' && (
          <div className="student-flow">

            {currentStatus === 'joined' && (!myRequest || myRequest.status === 'cancelled') && (
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
                <ApplicationPreview request={myRequest} />
              </div>
            )}

            {currentStatus === 'joined' && myRequest?.status === 'rejected' && (
              <div className="status-container">
                <StatusInfoBox
                  type="error"
                  title="Заявку відхилено"
                  message="Адміністратор знайшов помилки у ваших документах."
                  icon={<AlertCircle size={24} />}
                />

                {myRequest.logs?.find(l => l.action === 'rejected')?.comment && (
                  <div className="admin-feedback">
                    <h5>Коментар модератора:</h5>
                    <p>{myRequest.logs.find(l => l.action === 'rejected').comment}</p>
                  </div>
                )}

                <div className="action-retry">
                  <button className="btn-retry" onClick={() => window.location.reload()}>
                    <RefreshCcw size={18} /> Спробувати ще раз
                  </button>
                </div>
                <ApplicationPreview request={myRequest} />
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
                {myRequest && <ApplicationPreview request={myRequest} />}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default Settlement;