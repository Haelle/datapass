import React, { useContext } from 'react';
import { FormContext } from '../../../templates/Form';
import { ScrollablePanel } from '../../Scrollable';
import FileInput from '../../../molecules/FileInput';

export const AidantsSection = () => {
  const {
    onChange,
    enrollment: { documents = [], documents_attributes = [] },
  } = useContext(FormContext);

  if (!documents.some(({ type }) => type === 'Document::ListeAidants')) {
    return null;
  }

  return (
    <ScrollablePanel>
      <h3>Fichier liste des aidants</h3>
      <div className="notification info">
        La liste des aidants évolue. Dorénavant, merci d’ajouter les aidants
        dans la liste ci-dessus. L’ancien fichier reste à votre disposition pour
        consultation.
      </div>
      <FileInput
        label={<>Vous avez téléversé la liste d’aidant suivante :</>}
        disabled={true}
        documentType={'Document::ListeAidants'}
        mimeTypes=".ods, .xls, .xlsx, .csv"
        uploadedDocuments={documents}
        onChange={onChange}
        documentsToUpload={documents_attributes}
      />
    </ScrollablePanel>
  );
};

export default AidantsSection;
