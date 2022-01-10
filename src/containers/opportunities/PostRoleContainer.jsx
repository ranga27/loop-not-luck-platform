/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { getCompanies } from '../../redux/actions';
import PostRoleForm from '../../components/PostRoleForm';

const PostRoleContainer = () => {
  const { companies, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);
  const navigate = useNavigate();
  const [modalBasic, setModalBasic] = useState(false);

  return (
    <>
      {loading && <p>Loading...</p>}
      {companies.length === 0 && !loading && <p>No companies available!</p>}
      {error && !loading && <p>{error}</p>}
      {companies.length > 0 && (
        <>
          <PostRoleForm
            companies={companies.map(({ name }) => ({
              label: name,
              value: name,
            }))}
          />
          <Modal isOpen={modalBasic} toggle={() => setModalBasic(!modalBasic)}>
            <ModalHeader>Opportunity Saved!</ModalHeader>
            <ModalBody>
              Please head over to the Review tab to verify the details and to
              publish.
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={() => navigate('/app/opportunities/review')}
              >
                Go To Review
              </Button>
              <Button color="secondary" onClick={() => setModalBasic(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
    </>
  );
};
export default PostRoleContainer;
