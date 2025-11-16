import { useState } from 'react';

export const useDocumentUpload = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isSourceModalVisible, setIsSourceModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [showDocumentList, setShowDocumentList] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const documentOptions = [
    "ID card (front and back)",
    "Income proof (salary slip, not older than one year)",
    "Residential confirmation (e.g. utility bill)"
  ];

  const handleAddDocument = () => {
    setIsAddModalVisible(true);
  };

  const handleSelectDocument = (doc: string) => {
    setSelectedDocument(doc);
  };

  const handleContinueFromModal = () => {
    if (selectedDocument) {
      setIsAddModalVisible(false);
      setIsSourceModalVisible(true);
    }
  };

  const handleSourceSelection = (source: string) => {
    if (selectedDocument) {
      const fileName = selectedDocument.split(' ')[0].replace(/\W/g, '') + '.pdf';
      setUploadedDocuments([...uploadedDocuments, `${fileName}`]);
    }
    setIsSourceModalVisible(false);
  };

  const handleRemoveDocument = (index: number) => {
    const newDocs = [...uploadedDocuments];
    newDocs.splice(index, 1);
    setUploadedDocuments(newDocs);
  };

  return {
    uploadedDocuments,
    isAddModalVisible,
    setIsAddModalVisible,
    isSourceModalVisible,
    setIsSourceModalVisible,
    selectedDocument,
    showDocumentList,
    setShowDocumentList,
    isChecked,
    setIsChecked,
    documentOptions,
    handleAddDocument,
    handleSelectDocument,
    handleContinueFromModal,
    handleSourceSelection,
    handleRemoveDocument,
  };
};




