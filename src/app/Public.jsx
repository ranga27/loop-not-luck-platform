import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from '../helpers/route';

const Public = () => {
  const elements = useRoutes(publicRoutes);
  return <Suspense fallback={<div className="loading" />}>{elements}</Suspense>;
};

export default Public;
