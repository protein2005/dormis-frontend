import React from 'react';
import { Clock, CheckCircle2, XCircle, Send, MessageSquare } from 'lucide-react';
import './RequestHistory.scss';

const statusConfig = {
  submitted: { label: 'Заявку подано', icon: <Send size={14} />, class: 'submitted' },
  approved: { label: 'Схвалено', icon: <CheckCircle2 size={14} />, class: 'approved' },
  rejected: { label: 'Відхилено', icon: <XCircle size={14} />, class: 'rejected' },
  comment: { label: 'Коментар', icon: <MessageSquare size={14} />, class: 'comment' }
};

const RequestHistory = ({ logs }) => {
  return (
    <div className="history-card">
      <div className="card-top">
        <Clock size={20} />
        <h3>Історія заявки</h3>
      </div>
      <div className="timeline">
        {logs?.slice().reverse().map((log, i) => {
          const config = statusConfig[log.action] || { label: log.action, icon: null };
          return (
            <div key={i} className={`log-item ${config.class || ''}`}>
              <div className="log-marker">{config.icon}</div>
              <div className="log-content">
                <span className="log-date">{new Date(log.createdAt).toLocaleString()}</span>
                <p><strong>{config.label}</strong>: {log.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RequestHistory;