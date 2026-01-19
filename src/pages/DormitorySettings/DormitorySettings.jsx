import React, { useMemo } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import {
  Settings,
  UserPlus,
  ShieldCheck,
  Bell,
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import './DormitorySettings.scss';
import SettlementSettings from "@/pages/SettlementSettings";
import GeneralSettings from "@/pages/GeneralSettings";

const DormitorySettings = () => {
  const { currentDorm } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') || 'general';

  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  const tabs = useMemo(() => [
    { id: 'general', label: 'Загальні', icon: <Settings size={18} /> },
    { id: 'settlement', label: 'Форма поселення', icon: <UserPlus size={18} /> },
    { id: 'security', label: 'Доступ та безпека', icon: <ShieldCheck size={18} /> },
    { id: 'notifications', label: 'Сповіщення', icon: <Bell size={18} /> },
  ], []);

  return (
    <div className="dorm-settings dash-content-fade">
      <header className="settings-header">
        <div className="settings-header__title">
          <h2>Налаштування гуртожитку</h2>
          <p>Керуйте конфігураціями вашого закладу та правилами поселення</p>
        </div>
      </header>

      <nav className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'tab-btn--active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <Motion.div layoutId="activeTab" className="tab-indicator" />
            )}
          </button>
        ))}
      </nav>

      <div className="settings-content">
        <AnimatePresence mode="wait">
          <Motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'settlement' && <SettlementSettings />}
            {activeTab === 'general' && <GeneralSettings dorm={currentDorm} />}
            {activeTab === 'security' && <div className="placeholder-card">Налаштування доступу за кодом та вайтлістів</div>}
            {activeTab === 'notifications' && <div className="placeholder-card">Налаштування Telegram-ботів та розсилок</div>}
          </Motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DormitorySettings;