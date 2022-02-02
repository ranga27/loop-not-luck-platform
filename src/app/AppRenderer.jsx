import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from '../redux/store';

const queryClient = new QueryClient();

const App = lazy(() => import(/* webpackChunkName: "app-main" */ './App'));

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Suspense fallback={<div className="loading" />}>
              <App />
              <ReactQueryDevtools initialIsOpen />
            </Suspense>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
