import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';

const NoPrescreening = ({ noPrescreeningTemplate }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h6>
        <IntlMessages id="pages.application-applicationInfo" />
      </h6>
      <div>
        {open ? (
          <Button onClick={() => setOpen(!open)} color="link">
            <IntlMessages id="menu.close" />
          </Button>
        ) : (
          <Button onClick={() => setOpen(!open)} color="link">
            <IntlMessages id="pages.application-preview" />
          </Button>
        )}
      </div>
      <Modal isOpen={open}>
        <ModalHeader>
          <IntlMessages id="pages.application-normalPreview" />
        </ModalHeader>
        <ModalBody>
          <p style={{ whiteSpace: 'pre-line' }}>
            {noPrescreeningTemplate[0].description}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setOpen(!open)}>
            <IntlMessages id="pages.application-done" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NoPrescreening;
