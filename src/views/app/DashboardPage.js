import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { injectIntl } from 'react-intl';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import ProfileStatuses from '../../containers/pages/ProfileStatuses';
import ProductCategoriesDoughnut from '../../containers/pages/ProductCategoriesDoughnut';
import GradientWithRadialProgressCard from '../../containers/pages/GradientWithRadialProgressCard';
import { BarChart } from '../../components/charts';
import { barChartData } from '../../data/charts'

const DashboardPage = ({ intl, match }) => {
  const { messages } = intl;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.dashboard" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="4" md="6" className="mb-4">
          <GradientWithRadialProgressCard
            icon="iconsminds-clock"
            title={`12 ${messages['dashboards.posts']}`}
            detail={messages['dashboards.pending-for-publish']}
            percent={(5 * 100) / 12}
            progressText="5/12"
          />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <GradientWithRadialProgressCard
            icon="iconsminds-male"
            title={`6 ${messages['dashboards.users']}`}
            detail={messages['dashboards.on-approval-process']}
            percent={(4 * 100) / 6}
            progressText="4/6"
          />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <GradientWithRadialProgressCard
            icon="iconsminds-bell"
            title={`10 ${messages['dashboards.alerts']}`}
            detail={messages['dashboards.waiting-for-notice']}
            percent={(8 * 100) / 10}
            progressText="8/10"
          />
        </Colxx>
      </Row>

      <Row>
        <Colxx xl="4" lg="6" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="charts.bar" />
              </CardTitle>
              <div className="chart-container">
                <BarChart shadow data={barChartData} />
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xl="4" lg="6" className="mb-4">
          <ProfileStatuses cardClass="dashboard-progress" />
        </Colxx>

        <Colxx xl="4" lg="6" className="mb-4">
          <ProductCategoriesDoughnut />
        </Colxx>
      </Row>
    </>
  );
};

export default injectIntl(DashboardPage);
