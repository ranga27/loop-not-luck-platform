import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import { NavLink } from 'react-router-dom';
import { adminRoot } from '../../constants/defaultValues';

const GradientWithRadialProgressCard = ({
  icon = 'iconsminds-bell',
  title = 'title',
  detail = 'detail',
  percent = 80,
  progressText = '8/10',
}) => {
  return (
    <Card className="progress-banner">
      <CardBody className="justify-content-between d-flex flex-row align-items-center">
        <div>
          <NavLink to={`${adminRoot}/opportunities/open`}>
            <i
              className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
            />
          </NavLink>

          <div>
            <NavLink to={`${adminRoot}/opportunities/open`}>
              <p className="lead text-white">{title}</p>
              <p className="text-small text-white">{detail}</p>
            </NavLink>
          </div>
        </div>
        <div className="progress-bar-circle progress-bar-banner position-relative">
          <NavLink to={`${adminRoot}/opportunities/open`}>
            <CircularProgressbar
              strokeWidth={4}
              value={percent}
              text={progressText}
            />
          </NavLink>
        </div>
      </CardBody>
    </Card>
  );
};
export default React.memo(GradientWithRadialProgressCard);
