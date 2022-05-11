import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import TemplateModal from '../../views/super/Templates/TemplateModal';
import IntlMessages from '../../helpers/IntlMessages';

const TemplateCard = ({ template }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = async () => {
    setModalOpen(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Card key={template.id} className="mb-4">
        <CardBody>
          <div className="text-center">
            <CardTitle className="truncate mb-1">{template.title}</CardTitle>
            <Button
              outline
              size="xs"
              color="primary"
              onClick={() => handleOpenModal()}
            >
              <IntlMessages id="pages.templates-view" />
            </Button>
          </div>
        </CardBody>
      </Card>

      {modalOpen && (
        <TemplateModal
          modalOpen={modalOpen}
          template={template}
          setModalOpen={setModalOpen}
          toggle={toggleModal}
        />
      )}
    </>
  );
};

export default TemplateCard;
