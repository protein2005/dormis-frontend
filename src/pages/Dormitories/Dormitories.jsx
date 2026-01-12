import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, User, Settings, Plus,
  ArrowUpRight, Building2, MapPin,
  Users, Calendar, ChevronRight
} from 'lucide-react';
import { motion as Motion } from "framer-motion";
import './Dormitories.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "circOut" } }
};

const Dormitories = () => {
  const { memberships } = useSelector(state => state.auth);

  const groups = {
    owner: {
      title: 'Мої заклади',
      items: memberships?.filter(m => m.role === 'owner'),
      icon: <ShieldCheck size={18} />,
      color: 'blue'
    },
    admin: {
      title: 'Адміністрування',
      items: memberships?.filter(m => m.role === 'admin'),
      icon: <Settings size={18} />,
      color: 'purple'
    },
    resident: {
      title: 'Моє проживання',
      items: memberships?.filter(m => m.role === 'resident'),
      icon: <User size={18} />,
      color: 'green'
    }
  };

  const renderGroup = (groupKey) => {
    const group = groups[groupKey];
    if (!group.items || group.items.length === 0) return null;

    return (
      <div className="dorm-section" key={groupKey}>
        <div className="dorm-section__header">
          <span className={`icon-box icon-box--${group.color}`}>{group.icon}</span>
          <h2>{group.title}</h2>
          <span className="count-badge">{group.items.length}</span>
        </div>

        <div className="dorm-grid">
          {group.items.map((m) => (
            <Motion.div key={m._id} variants={itemVariants}>
              <Link to={`/dashboard/${m.dormitory._id}`} className={`dorm-card dorm-card--${group.color}`}>
                <div className="dorm-card__body">
                  <div className="dorm-card__top">
                    <div className="dorm-card__avatar">
                      <Building2 size={24} />
                    </div>
                    <div className="dorm-card__main-info">
                      <h3>{m.dormitory.name}</h3>
                      <div className="address">
                        <MapPin size={14} />
                        <span>{m.dormitory.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="dorm-card__stats">
                    <div className="stat">
                      <Users size={14} />
                      <span>{m.dormitory.joinType}</span>
                    </div>
                    <div className="stat">
                      <Calendar size={14} />
                      <span>{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="dorm-card__footer">
                  <div className={`status-tag status-tag--${m.status}`}>
                    <div className="dot" />
                    {m.status === 'active' ? 'Активний' : 'На модерації'}
                  </div>
                  <div className="action-circle">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </Link>
            </Motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="dormitories-page">
      <Motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Motion.header className="page-header" variants={itemVariants}>
          <div className="page-header__content">
            <div className="breadcrumb">Головна <ChevronRight size={12} /> Гуртожитки</div>
            <h1>Мій простір <span>Dormis</span></h1>
            <p>Виберіть заклад для керування або перегляду деталей</p>
          </div>
          <Link to="/dormitories/create" className="btn-create">
            <div className="btn-create__icon"><Plus size={20} /></div>
            <span>Створити новий</span>
          </Link>
        </Motion.header>

        <div className="dormitories-content">
          {Object.keys(groups).map(key => renderGroup(key))}
        </div>

        {memberships?.length === 0 && (
          <Motion.div className="empty-state" variants={itemVariants}>
            <div className="empty-state__visual">
              <Building2 size={48} />
            </div>
            <h3>Немає підключень</h3>
            <p>Схоже, ви ще не є учасником жодного гуртожитку.</p>
            <Link to="/onboarding" className="btn-primary">Почати приєднання</Link>
          </Motion.div>
        )}
      </Motion.div>
    </div>
  );
};

export default Dormitories;