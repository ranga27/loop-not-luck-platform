/* eslint-disable import/prefer-default-export */
import React from 'react';
import { motion } from 'framer-motion';

export const StepLayout = ({ children }) => {
  return (
    <motion.div
      className="wizard-basic-step justify-content-center"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
