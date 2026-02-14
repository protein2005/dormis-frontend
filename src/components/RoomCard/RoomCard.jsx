import React from 'react';
import { User, Mars, Venus, Users2 } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const RoomCard = ({ room }) => {
  const { roomNumber, capacity, residents = [], gender } = room;

  const occupiedCount = residents.length;
  const isFull = occupiedCount >= capacity;
  const occupancyPercent = (occupiedCount / capacity) * 100;

  const genderConfig = {
    male: { icon: <Mars size={14} />, label: 'Чол', className: 'tag--male' },
    female: { icon: <Venus size={14} />, label: 'Жін', className: 'tag--female' },
    mixed: { icon: <Users2 size={14} />, label: 'Зміш', className: 'tag--mixed' }
  };

  const currentGender = genderConfig[gender] || genderConfig.mixed;

  return (
    <Motion.div
      className="room-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
    >
      <div className="room-card__top">
        <span className="number">№ {roomNumber}</span>
        <div className={`gender-tag ${currentGender.className}`}>
          {currentGender.icon}
          {currentGender.label}
        </div>
      </div>

      <div className="room-card__occupancy">
        <div className="progress-container">
          <Motion.div
            className={`progress-bar ${isFull ? 'full' : ''}`}
            initial={{ width: 0 }}
            animate={{ width: `${occupancyPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="occupancy-labels">
          <span className="count">{occupiedCount} / {capacity}</span>
          <span className="label">місць зайнято</span>
        </div>
      </div>

      <div className="room-card__residents">
        {residents.map((res) => (
          <div key={res._id} className="mini-res-avatar" title={res.fullName}>
            {res.avatar ? (
              <img src={res.avatar} alt={res.fullName} />
            ) : (
              <User size={14} />
            )}
          </div>
        ))}

        {Array.from({ length: capacity - occupiedCount }).map((_, i) => (
          <div key={`empty-${i}`} className="empty-slot" />
        ))}
      </div>
    </Motion.div>
  );
};

export default RoomCard;