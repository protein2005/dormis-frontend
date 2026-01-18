import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Trash2, FileText, Type, Save } from 'lucide-react';
import { useActions } from "@/hooks/useActions";
import './SettlementSettings.scss';

const SettlementSettings = () => {
  const { currentDorm } = useOutletContext();
  const { updateSettlementSettings } = useActions();

  const [inputs, setInputs] = useState(currentDorm?.settlementFields?.inputs || []);
  const [files, setFiles] = useState(currentDorm?.settlementFields?.requiredFiles || []);

  const addField = () => setInputs([...inputs, { name: '', label: '', required: true }]);
  const addFile = () => setFiles([...files, { name: '', label: '', required: true }]);

  const handleSave = () => {
    updateSettlementSettings({
      id: currentDorm._id,
      settlementFields: { inputs, requiredFiles: files }
    });
  };

  return (
    <div className="settings-page dash-content-fade">
      <header className="settings-header">
        <h2>Конструктор форми поселення</h2>
        <p>Налаштуйте дані, які студент має надати для заселення</p>
      </header>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="card-header">
            <div className="icon-box icon-box--blue"><Type size={20} /></div>
            <h3>Текстові поля (Анкета)</h3>
            <button className="btn-add" onClick={addField}><Plus size={16} /></button>
          </div>
          <div className="card-body">
            {inputs.map((field, idx) => (
              <div key={idx} className="config-row">
                <input
                  placeholder="Назва (напр. faculty)"
                  value={field.name}
                  onChange={(e) => {
                    const newInputs = [...inputs];
                    newInputs[idx].name = e.target.value;
                    newInputs[idx].label = e.target.value;
                    setInputs(newInputs);
                  }}
                />
                <button className="btn-delete" onClick={() => setInputs(inputs.filter((_, i) => i !== idx))}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <div className="icon-box icon-box--purple"><FileText size={20} /></div>
            <h3>Необхідні документи (Скан/Фото)</h3>
            <button className="btn-add" onClick={addFile}><Plus size={16} /></button>
          </div>
          <div className="card-body">
            {files.map((file, idx) => (
              <div key={idx} className="config-row">
                <input
                  placeholder="Назва (напр. Паспорт)"
                  value={file.name}
                  onChange={(e) => {
                    const newFiles = [...files];
                    newFiles[idx].name = e.target.value;
                    newFiles[idx].label = e.target.value;
                    setFiles(newFiles);
                  }}
                />
                <button className="btn-delete" onClick={() => setFiles(files.filter((_, i) => i !== idx))}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="btn-save-all" onClick={handleSave}>
        <Save size={20} /> Зберегти налаштування форми
      </button>
    </div>
  );
};

export default SettlementSettings;