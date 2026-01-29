import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useActions } from "@/hooks/useActions";
import { uploadFile, deleteFile } from "@/services/file.service";
import { Send, Upload, FileCheck, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import './StudentSettlementForm.scss';

const StudentSettlementForm = ({ fields, dormId, initialData }) => {
  const { submitSettlement } = useActions();
  const [uploading, setUploading] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    setError,
    clearErrors,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      responses: initialData
        ? initialData.responses
        : fields?.inputs?.map(i => ({ fieldName: i.name, value: '' })),
      files: initialData ? initialData.files : [],
      wishlist: initialData ? initialData.wishlist : ''
    }
  });

  const watchedFiles = watch("files");

  const handleFileAction = async (fileField, e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(prev => ({ ...prev, [fileField.name]: true }));
      const result = await uploadFile(file);

      const currentFiles = getValues("files");
      setValue("files", [...currentFiles, {
        fileName: fileField.name,
        url: result.url,
        publicId: result.publicId
      }]);

      clearErrors(`file_${fileField.name}`);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(prev => ({ ...prev, [fileField.name]: false }));
    }
  };

  const removeFile = async (e, publicId, fieldName) => {
    e.preventDefault();
    try {
      await deleteFile(publicId);
      const currentFiles = getValues("files");
      setValue("files", currentFiles.filter(f => f.fileName !== fieldName));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const onSubmit = async (data) => {
    let hasFileErrors = false;
    fields?.requiredFiles?.forEach(f => clearErrors(`file_${f.name}`));

    fields?.requiredFiles?.forEach(reqFile => {
      const isUploaded = data.files.find(f => f.fileName === reqFile.name);

      if (reqFile.required && !isUploaded) {
        setError(`file_${reqFile.name}`, {
          type: 'manual',
          message: 'Будь ласка, завантажте цей документ'
        }, { shouldFocus: true });
        hasFileErrors = true;
      }
    });

    if (hasFileErrors) return;

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
          <h3 className="title">Анкета на поселення</h3>
          <p>Заповніть обов'язкові поля та додайте необхідні документи</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="settlement-form">
        <div className="form-section">
          <h4 className="title"><FileCheck size={18} /> Персональні дані</h4>
          <div className="inputs-grid">
            {fields?.inputs?.map((input, idx) => (
              <div key={input.name} className="input-group">
                <label>{input.label} {input.required && <span className="req">*</span>}</label>
                <input type="hidden" {...register(`responses.${idx}.fieldName`)} value={input.name} />
                <input
                  type="text"
                  placeholder={`Введіть ${input.label.toLowerCase()}`}
                  className={errors.responses?.[idx]?.value ? 'input-error' : ''}
                  {...register(`responses.${idx}.value`, { required: input.required })}
                />
                {errors.responses?.[idx]?.value && (
                  <span className="error-text">Обов'язкове поле</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h4 className="title"><Upload size={18} /> Необхідні документи</h4>
          <div className="files-uploader-grid">
            {fields?.requiredFiles?.map((fileField) => {
              const uploaded = watchedFiles.find(f => f.fileName === fileField.name);
              const isFileLoading = uploading[fileField.name];

              return (
                <div key={fileField.name} className="file-box-container">
                  <div className={`file-upload-box 
                    ${uploaded ? 'box-success' : ''}
                  `}>
                    <label className="file-label">
                      <input
                        type="file"
                        disabled={isFileLoading || !!uploaded}
                        onChange={(e) => handleFileAction(fileField, e)}
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
                            {isFileLoading ? 'Завантаження...' : uploaded ? 'Файл завантажено' : 'Натисніть для вибору'}
                          </span>
                        </div>
                        {uploaded && !isFileLoading && (
                          <button
                            type="button"
                            className="btn-delete-file"
                            onClick={(e) => removeFile(e, uploaded.publicId, fileField.name)}
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-section">
          <h4 className="title">Побажання до поселення (необов'язково)</h4>
          <div className="input-group full-width">
            <textarea
              placeholder="Наприклад: хочу жити в одній кімнаті з Олександром Петренком..."
              className="wishlist-textarea"
              {...register('wishlist')}
            />
          </div>
        </div>

        <div className="form-footer">
          <div className={`info-note ${Object.keys(errors).length > 0 ? 'info-note--error' : ''}`}>
            <AlertCircle size={16} />
            <p>
              {Object.keys(errors).length > 0
                ? "Будь ласка, завантажте всі обов'язкові документи та заповніть поля."
                : "Перевірте правильність даних. Після відправки редагування буде недоступне."}
            </p>
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