import { AlertTriangle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import './GenderWarning.scss';

const GenderWarning = () => (
  <div className="gender-warning-card">
    <div className="warning-icon">
      <AlertTriangle size={24} />
    </div>
    <div className="warning-content">
      <h4 className="title">У профілі не вказано стать</h4>
      <p>Для продовження процесу поселення нам необхідно знати вашу стать. Будь ласка, вкажіть її у налаштуваннях.</p>
    </div>
    <Link to="/profile/settings" className="btn-settings">
      <Settings size={18} />
      Перейти до налаштувань
    </Link>
  </div>
);

export default GenderWarning;