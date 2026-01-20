import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Settlement.scss';
import StudentSettlementForm from "@/components/StudentSettlementForm";
import AdminSettlementReview from "@/components/AdminSettlementReview";
import StatusInfoBox from "@/components/StatusInfoBox";
import ApplicationPreview from "@/components/ApplicationPreview";

const Settlement = () => {
  const { currentDorm } = useOutletContext();
  const { memberships } = useSelector(state => state.auth);

  const myMembership = memberships?.find(m => m.dormitory._id === currentDorm?._id);
  const userRole = myMembership?.role;
  const currentStatus = myMembership?.status;

  if (!currentDorm || !myMembership) return <div>Завантаження...</div>;

  return (
    <div className="settlement-page dash-content-fade">
      <header className="page-header">
        <h1>Модуль поселення</h1>
        <p>Керування процесом заселення та перевірка документів</p>
      </header>

      <div className="settlement-content">
        {(userRole === 'owner' || userRole === 'admin') && (
          <AdminSettlementReview dormId={currentDorm._id} />
        )}

        {userRole === 'resident' && (
          <div className="student-settlement-flow">
            {currentStatus === 'joined' && (
              <StudentSettlementForm
                fields={currentDorm.settlementFields}
                dormId={currentDorm._id}
              />
            )}

            {currentStatus === 'pending' && (
              <>
                <StatusInfoBox
                  type="processing"
                  title="Заявка на розгляді"
                  message="Ваші документи перевіряються адміністрацією. Ви можете переглянути подані дані нижче."
                />
                <ApplicationPreview application={myMembership.application} />
              </>
            )}

            {currentStatus === 'active' && (
              <StatusInfoBox
                type="success"
                title="Ви поселені"
                message={`Вітаємо! Ви успішно пройшли перевірку. Ваша кімната: ${myMembership.roomNumber || 'Буде призначена скоро'}`}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settlement;