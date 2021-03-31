import React, { useState, useEffect } from 'react';
import { Card, CardBody, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOpportunitiesFromFirestore } from '../../app/firestore/firestoreService';
import { selectOpportunityToReview } from '../../redux/actions';

const ReviewRolesList = () => {
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  // eslint-disable-next-line no-unused-vars
  const [roleId, setRoleId] = useState('1');
  const [opportunities, setOpportunities] = useState([]);
  const { selectedOpportunity } = useSelector((state) => state.opportunities);

  const dispatch = useDispatch();

  const handleAddOpportunity = (role) => {
    const opportunity = {
      ...role,
      deadline: new Date(role.deadline.seconds * 1000),
      startDate: new Date(role.startDate.seconds * 1000),
    };
    dispatch(selectOpportunityToReview(opportunity));
  };

  useEffect(() => {
    const fetchOpportunities = async () => {
      const results = await fetchOpportunitiesFromFirestore();
      setOpportunities(results);
    };
    fetchOpportunities();
  }, [selectedOpportunity]);
  return (
    <Card>
      <CardBody>
        <div className="dashboard-list-with-user">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <Nav pills className="flex-column">
              <NavItem>
                {opportunities.map((role, index) => {
                  return (
                    <NavLink
                      // eslint-disable-next-line react/no-array-index-key
                      key={`role_${index}`}
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === role.id,
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab(role.id);
                        setRoleId(role.id);
                        handleAddOpportunity(role);
                      }}
                    >
                      <h6>{role.title}</h6>
                    </NavLink>
                  );
                })}
              </NavItem>
            </Nav>
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReviewRolesList;
