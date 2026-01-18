import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import './SetupBanner.scss';

const SetupBanner = ({ dormitory, userRole }) => {
  const isSetupComplete = dormitory?.settlementFields?.inputs?.length > 0 ||
    dormitory?.settlementFields?.requiredFiles?.length > 0;

  if (userRole !== 'owner' || isSetupComplete) return null;

  return (
    <Motion.div
      className="setup-banner"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="setup-banner__icon">
        <ShieldAlert size={24} />
      </div>
      <div className="setup-banner__content">
        <h3 className="title">Завершіть налаштування гуртожитку</h3>
        <p>Створіть форму поселення, щоб студенти могли подавати документи та приєднуватися до закладу.</p>
      </div>
      <Link to={`/dashboard/${dormitory?._id}/settings`} className="btn-setup">
        Налаштувати зараз
      </Link>
    </Motion.div>
  );
};

export default SetupBanner;