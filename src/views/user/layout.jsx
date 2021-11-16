// TODO: move to containers
import React from 'react';
import { Row, Card, CardTitle } from 'reactstrap';

import { motion } from 'framer-motion';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

const pageVariants = {
  initial: {
    opacity: 0,
    y: '100vw',
    scale: 0.8,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: '-100vw',
    scale: 1.2,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const Layout = ({ cardTitle, children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side " />
            <div className="form-side">
              <CardTitle className="mb-4">
                <IntlMessages id={cardTitle} />
              </CardTitle>
              {children}
            </div>
          </Card>
        </Colxx>
      </Row>
    </motion.div>
  );
};

export default Layout;
