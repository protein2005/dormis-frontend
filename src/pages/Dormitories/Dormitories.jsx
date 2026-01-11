import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShieldCheck, User, Settings, Plus } from 'lucide-react';
import './Dormitories.scss';
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";

const Dormitories = () => {
  const { memberships } = useSelector(state => state.auth);
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  const groups = {
    owner: memberships?.filter(m => m.role === 'owner'),
    admin: memberships?.filter(m => m.role === 'admin'),
    resident: memberships?.filter(m => m.role === 'resident'),
  };

  const renderGroup = (title, items, icon) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="dorm-group">
        <div className="dorm-group__header">
          {icon}
          <h2>{title}</h2>
        </div>
        <div className="dorm-grid">
          {items.map((m) => (
            <Link
              key={m._id}
              to={`/dashboard/${m.dormitory._id}`}
              className={`dorm-card dorm-card--${m.role}`}
            >
              <div className="dorm-card__info">
                <h3>{m.dormitory.name}</h3>
                <p>{m.dormitory.address}</p>
              </div>
              <div className="dorm-card__status">
                <span className={`badge badge--${m.status}`}>{m.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLocalLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLocalLoading) {
    return (
      <AnimatePresence>
        <Loader key="dorm-loader" />
      </AnimatePresence>
    );
  }


  return (
    <div className="dormitories">
      <div className="dormitories__container container">
        <header className="dormitories__header">
          <h1>Ваші гуртожитки</h1>
          <Link to="/onboarding" className="btn-add">
            <Plus size={20} />
            <span>Додати</span>
          </Link>
        </header>

        {renderGroup('Мої заклади (Власник)', groups.owner, <ShieldCheck className="icon-owner" />)}
        {renderGroup('Адміністрування', groups.admin, <Settings className="icon-admin" />)}
        {renderGroup('Проживання', groups.resident, <User className="icon-resident" />)}

        {memberships?.length === 0 && (
          <div className="dormitories__empty">
            <p>Ви ще не приєдналися до жодного гуртожитку.</p>
            <Link to="/onboarding" className="btn-primary">Почати зараз</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dormitories;