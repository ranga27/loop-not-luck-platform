/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from '../lang';
import ColorSwitcher from '../components/common/ColorSwitcher';
import { isMultiColorActive } from '../constants/defaultValues';
import { getDirection } from '../helpers/Utils';
import routes from '../helpers/route';

const App = () => {
  const direction = getDirection();
  if (direction.isRtl) {
    document.body.classList.add('rtl');
    document.body.classList.remove('ltr');
  } else {
    document.body.classList.add('ltr');
    document.body.classList.remove('rtl');
  }

  const { locale } = useSelector((state) => state.settings);
  const currentAppLocale = AppLocale[locale];

  const { currentUser } = useSelector((state) => state.authUser);

  const elements = useRoutes(routes(currentUser));

  return (
    <div className="h-100">
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <>
          {isMultiColorActive && <ColorSwitcher />}
          <Suspense fallback={<div className="loading" />}>{elements}</Suspense>
        </>
      </IntlProvider>
    </div>
  );
};

export default App;
