import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CheckCircle2, XCircle, Eye,
  FileText, UserCheck, Clock,
  ChevronRight, ExternalLink
} from 'lucide-react';
import { useActions } from "@/hooks/useActions";
import { motion as Motion, AnimatePresence } from 'framer-motion';
import './AdminSettlementReview.scss';

const AdminSettlementReview = ({ dormId }) => {
  const { currentMembers } = useSelector(state => state.dormitory);
  const { updateMember, getDormitoryMembers } = useActions();
  const [selectedApplication, setSelectedApplication] = useState(null);

  const pendingApplications = currentMembers?.filter(m => m.status === 'pending') || [];

  const handleDecision = (membershipId, status) => {
    updateMember({ dormId, membershipId, status });
    setSelectedApplication(null);
  };

  useEffect(() => {
    getDormitoryMembers(dormId);
  }, []);

  return (
    <div className="admin-review">
      <div className="review-header">
        <div className="review-stats">
          <div className="stat-pill">
            <Clock size={16} />
            <span>Очікують: <strong>{pendingApplications.length}</strong></span>
          </div>
        </div>
      </div>

      <div className="applications-list">
        {pendingApplications.length > 0 ? (
          pendingApplications.map((app) => (
            <Motion.div
              key={app._id}
              className="app-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="app-item__user">
                <div className="avatar">
                  {app.user?.avatar ? <img src={app.user.avatar} alt="" /> : <div className="placeholder">{app.user?.name[0]}</div>}
                </div>
                <div className="info">
                  <span className="name">{app.user?.name}</span>
                  <span className="email">{app.user?.email}</span>
                </div>
              </div>

              <div className="app-item__meta">
                <span className="date">Подано: {new Date(app.updatedAt).toLocaleDateString()}</span>
              </div>

              <div className="app-item__actions">
                <button className="btn-view" onClick={() => setSelectedApplication(app)}>
                  <Eye size={18} />
                  <span>Переглянути анкету</span>
                </button>
                <div className="quick-actions">
                  <button className="btn-approve" onClick={() => handleDecision(app._id, 'active')} title="Заселити">
                    <CheckCircle2 size={20} />
                  </button>
                  <button className="btn-reject" onClick={() => handleDecision(app._id, 'rejected')} title="Відхилити">
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            </Motion.div>
          ))
        ) : (
          <div className="empty-review">
            <UserCheck size={48} />
            <p>Наразі немає нових заявок на поселення</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedApplication && (
          <div className="app-modal-overlay" onClick={() => setSelectedApplication(null)}>
            <Motion.div
              className="app-modal"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <header className="modal-header">
                <h3>Деталі заявки: {selectedApplication.user?.name}</h3>
                <button className="close-btn" onClick={() => setSelectedApplication(null)}><XCircle size={24} /></button>
              </header>

              <div className="modal-body">
                <section className="data-section">
                  <h4><FileText size={18} /> Відповіді на анкету</h4>
                  <div className="responses-grid">
                    {selectedApplication.application?.responses?.map((res, i) => (
                      <div key={i} className="response-box">
                        <span className="label">{res.fieldName}</span>
                        <span className="value">{res.value}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="data-section">
                  <h4><ExternalLink size={18} /> Прикріплені документи</h4>
                  <div className="docs-list">
                    {selectedApplication.application?.files?.map((file, i) => (
                      <a key={i} href={file.url} target="_blank" rel="noreferrer" className="doc-link">
                        <FileText size={20} />
                        <span>{file.fileName}</span>
                        <ChevronRight size={16} />
                      </a>
                    ))}
                  </div>
                </section>
              </div>

              <footer className="modal-footer">
                <button className="btn-reject-full" onClick={() => handleDecision(selectedApplication._id, 'rejected')}>
                  Відхилити заявку
                </button>
                <button className="btn-approve-full" onClick={() => handleDecision(selectedApplication._id, 'active')}>
                  Підтвердити та заселити
                </button>
              </footer>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSettlementReview;