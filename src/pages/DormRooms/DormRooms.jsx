import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions } from "@/hooks/useActions";
import { Plus, LayoutGrid, Layers } from 'lucide-react';
import './DormRooms.scss';
import RoomCard from "@/components/RoomCard";
import AddRoomModal from "@/components/AddRoomModal";

const DormRooms = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { rooms, isLoading } = useSelector(state => state.dormitory);
  const { getDormRooms } = useActions();

  useEffect(() => {
    if (id) getDormRooms(id);
  }, [id, getDormRooms]);

  const roomsByFloor = useMemo(() => {
    if (!rooms) return {};
    return rooms.reduce((acc, room) => {
      const floor = room.floor || 1;
      if (!acc[floor]) acc[floor] = [];
      acc[floor].push(room);
      return acc;
    }, {});
  }, [rooms]);

  return (
    <div className="rooms-page dash-content-fade">
      <header className="page-header">
        <div className="header-info">
          <h1><LayoutGrid size={24} /> Номерний фонд</h1>
          <p>Керування поверхами та мешканцями</p>
        </div>
        <button className="btn-add-room" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> Додати кімнату
        </button>
      </header>

      <div className="floors-container">
        {Object.keys(roomsByFloor).sort((a, b) => a - b).map(floor => (
          <div key={floor} className="floor-section">
            <h2 className="floor-title"><Layers size={16} /> {floor} Поверх</h2>
            <div className="rooms-grid">
              {roomsByFloor[floor].map(room => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          </div>
        ))}

        {rooms?.length === 0 && !isLoading && (
          <div className="empty-state">Кімнат ще не додано. Натисніть "Додати кімнату", щоб почати.</div>
        )}
      </div>

      <AddRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dormId={id}
      />
    </div>
  );
};

export default DormRooms;