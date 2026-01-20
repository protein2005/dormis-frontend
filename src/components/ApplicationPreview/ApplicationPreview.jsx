import React from 'react';
import { FileText, ExternalLink, Calendar, User, ClipboardList } from 'lucide-react';
import './ApplicationPreview.scss';

const ApplicationPreview = ({ application }) => {
  if (!application) return null;

  return (
    <div className="application-preview">
      <div className="preview-header">
        <div className="header-title">
          <ClipboardList size={20} />
          <h4>Деталі поданої анкети</h4>
        </div>
        <div className="submitted-date">
          <Calendar size={14} />
          <span>Подано: {new Date(application.submittedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="preview-body">
        <section className="preview-section">
          <div className="section-title">
            <User size={16} />
            <span>Інформація про поселенця</span>
          </div>
          <div className="responses-grid">
            {application.responses?.map((res, i) => (
              <div key={i} className="response-card">
                <span className="field-name">{res.fieldName}</span>
                <span className="field-value">{res.value || '—'}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="preview-section">
          <div className="section-title">
            <FileText size={16} />
            <span>Завантажені документи</span>
          </div>
          <div className="files-grid">
            {application.files?.map((file, i) => (
              <a
                key={i}
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="file-item"
              >
                <div className="file-icon">
                  <FileText size={18} />
                </div>
                <div className="file-info">
                  <span className="name">{file.fileName}</span>
                  <span className="action">Натисніть, щоб переглянути <ExternalLink size={12} /></span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApplicationPreview;