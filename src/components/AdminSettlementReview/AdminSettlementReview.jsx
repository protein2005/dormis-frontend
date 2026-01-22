import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye, UserCheck, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useActions } from "@/hooks/useActions";
import { motion as Motion, AnimatePresence } from 'framer-motion';
import './AdminSettlementReview.scss';

const AdminSettlementReview = ({ dormId }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const { currentRequests } = useSelector(state => state.dormitory);
  const { getSettlementRequests } = useActions();

  useEffect(() => {
    if (dormId) {
      getSettlementRequests(dormId);
    }
  }, [dormId, getSettlementRequests]);

  const filteredRequests = currentRequests?.filter(req => req.status === activeTab) || [];

  const tabs = [
    { id: 'pending', label: 'Нові', icon: <Clock size={16} /> },
    { id: 'approved', label: 'Схвалені', icon: <CheckCircle2 size={16} /> },
    { id: 'rejected', label: 'Відхилені', icon: <XCircle size={16} /> },
  ];

  return (
    <div className="admin-review">
      <nav className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <Motion.div
                layoutId="activeTab"
                className="tab-indicator"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </nav>

      <div className="applications-list">
        <AnimatePresence mode='popLayout'>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((app) => (
              <Motion.div
                key={app._id}
                className="app-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <div className="app-item__user">
                  <div className="avatar">
                    {app.user?.avatar ? (
                      <img src={app.user.avatar} alt="" />
                    ) : (
                      <div className="placeholder">{app.user?.fullName?.[0] || 'U'}</div>
                    )}
                  </div>
                  <div className="info">
                    <span className="name">{app.user?.fullName}</span>
                    <span className="email">{app.user?.email}</span>
                  </div>
                </div>

                <div className="app-item__meta">
                  <span className="date">Оновлено: {new Date(app.updatedAt).toLocaleDateString()}</span>
                </div>

                <div className="app-item__actions">
                  <button
                    className="btn-view"
                    onClick={() => navigate(`/dashboard/${dormId}/settlement/review/${app._id}`)}
                  >
                    <Eye size={18} />
                    <span>Переглянути анкету</span>
                  </button>
                </div>
              </Motion.div>
            ))
          ) : (
            <Motion.div
              className="placeholder-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <UserCheck size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>У цій категорії поки немає жодної заявки</p>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminSettlementReview;