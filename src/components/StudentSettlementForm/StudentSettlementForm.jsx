import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useActions } from "@/hooks/useActions";
import { uploadFile, deleteFile } from "@/services/file.service";
import { Send, Upload, FileCheck, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import './StudentSettlementForm.scss';

const StudentSettlementForm = ({ fields, dormId }) => {
  const { submitSettlement } = useActions();
  const [uploading, setUploading] = useState({});

  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {
      responses: fields?.inputs?.map(i => ({ fieldName: i.name, value: '' })),
      files: []
    }
  });

  const watchedFiles = watch("files");

  const handleFileAction = async (fieldName, e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(prev => ({ ...prev, [fieldName]: true }));
      const result = await uploadFile(file);

      const currentFiles = watch("files");
      setValue("files", [...currentFiles, {
        fileName: fieldName,
        url: result.url,
        publicId: result.publicId
      }]);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const removeFile = async (e, publicId, fieldName) => {
    e.preventDefault();
    try {
      await deleteFile(publicId);
      const currentFiles = watch("files");
      setValue("files", currentFiles.filter(f => f.fileName !== fieldName));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const onSubmit = async (data) => {
    await submitSettlement({ dormId, payload: data });
  };

  return (
    <Motion.div
      className="student-form-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="form-header">
        <div className="icon-box icon-box--blue"><Send size={24} /></div>
        <div className="text">
          <h3>Анкета на поселення</h3>
          <p>Заповніть всі поля та додайте необхідні документи для перевірки адміністрацією</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="settlement-form">
        <div className="form-section">
          <h4><FileCheck size={18} /> Персональні дані</h4>
          <div className="inputs-grid">
            {fields?.inputs?.map((input, idx) => (
              <div key={input.name} className="input-group">
                <label>{input.label} {input.required && <span>*</span>}</label>
                <input type="hidden" {...register(`responses.${idx}.fieldName`)} value={input.name} />
                <input
                  type="text"
                  placeholder={`Введіть ${input.label.toLowerCase()}`}
                  {...register(`responses.${idx}.value`, { required: input.required })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h4><Upload size={18} /> Необхідні документи</h4>
          <div className="files-uploader-grid">
            {fields?.requiredFiles?.map((fileField) => {
              const uploaded = watchedFiles.find(f => f.fileName === fileField.name);
              const isFileLoading = uploading[fileField.name];

              return (
                <div key={fileField.name} className="file-upload-box">
                  <label className="file-label">
                    <input
                      type="file"
                      disabled={isFileLoading || !!uploaded}
                      onChange={(e) => handleFileAction(fileField.name, e)}
                      hidden
                    />
                    <div className="upload-content">
                      <div className="upload-icon">
                        {isFileLoading ? (
                          <Loader2 size={24} className="spinner" />
                        ) : uploaded ? (
                          <FileCheck size={24} color="#16a34a" />
                        ) : (
                          <Upload size={24} />
                        )}
                      </div>
                      <div className="upload-text">
                        <span className="file-title">{fileField.label}</span>
                        <span className="file-status">
                          {isFileLoading
                            ? 'Завантаження...'
                            : uploaded
                              ? 'Файл завантажено'
                              : 'Натисніть, щоб обрати файл'}
                        </span>
                      </div>
                      {uploaded && !isFileLoading && (
                        <button
                          className="btn-delete-file"
                          onClick={(e) => removeFile(e, uploaded.publicId, fileField.name)}
                          style={{ marginLeft: 'auto', border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-footer">
          <div className="info-note">
            <AlertCircle size={16} />
            <p>Перевірте правильність даних. Після відправки ви не зможете редагувати анкету до рішення адміністратора.</p>
          </div>
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Відправка...' : 'Відправити на перевірку'}
          </button>
        </div>
      </form>
    </Motion.div>
  );
};

export default StudentSettlementForm;