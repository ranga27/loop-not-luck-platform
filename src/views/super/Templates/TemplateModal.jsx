import React from 'react';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Badge,
} from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import useTemplateStore from '../../../hooks/useTemplateStore';

const TemplateModal = ({ template, toggle, setModalOpen, modalOpen }) => {
  const setTemplate = useTemplateStore((state) => state.setTemplateForEdit);

  return (
    <Modal isOpen={modalOpen} toggle={toggle} className="modal-lg">
      <ModalHeader>{template.title}</ModalHeader>
      <ModalBody>
        <p style={{ whiteSpace: 'pre-line' }}>{template.description}</p>

        <dl className="row">
          <dt className="col-sm-3">Created at:</dt>
          <dd className="col-sm-9">{template.createdAt}</dd>
          <dt className="col-sm-3">Published</dt>
          <dd className="col-sm-9">
            <Badge>{template.publish}</Badge>
          </dd>
        </dl>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          type="submit"
          tag={Link}
          to="edit"
          onClick={() => setTemplate(template)}
        >
          <IntlMessages id="pages.templates-edit" />
        </Button>
        <Button onClick={() => setModalOpen(false)}>
          <IntlMessages id="pages.templates-cancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TemplateModal;
