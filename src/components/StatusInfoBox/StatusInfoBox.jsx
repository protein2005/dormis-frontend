import React from 'react';
import { Clock, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import './StatusInfoBox.scss';

const StatusInfoBox = ({ type, title, message }) => {
  const config = {
    processing: {
      icon: <Clock size={32} />,
      class: 'status-info-box--processing'
    },
    success: {
      icon: <CheckCircle2 size={32} />,
      class: 'status-info-box--success'
    },
    error: {
      icon: <AlertCircle size={32} />,
      class: 'status-info-box--error'
    },
    default: {
      icon: <Info size={32} />,
      class: 'status-info-box--default'
    }
  };

  const { icon, class: statusClass } = config[type] || config.default;

  return (
    <Motion.div
      className={`status-info-box ${statusClass}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="status-info-box__icon">
        {icon}
      </div>
      <div className="status-info-box__content">
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </Motion.div>
  );
};

export default StatusInfoBox;