import * as React from 'react';
import {
  Admin,
  Resource,
  combineDataProviders,
} from 'react-admin';
import { useEffect, useState } from 'react';
import authProvider from './authProvider';
import Login from './Login/Login';
import EmbeddingDataProvider from './customDataProviders/embeddingsDataProvider';
import EmployeeDataProvider from './customDataProviders/employeesDataProvider';
import FeedbackDataProvider from './customDataProviders/feedbackDataProvider';
import UsersDataProvider from './customDataProviders/usersDataProvider';
import ConversationsDataProvider from './customDataProviders/conversationsDataProvider';
import { lightTheme } from './components/layout/themes';
import { Layout } from './components/layout';
import { MenuItemsWithPermissionResolver } from './components/layout/MenuOptions';

const fixBlankPage = () => {
  // temporary fix
  if (
    !window.location.href.includes('#/login') &&
    !window.location.href.includes('student')
  ) {
    window.location.href += '#/login';
  }
};

const App = () => {
  const [dataProvider, setDataProvider] = useState(null as any);

  const prepareDataProviders = async () => {
    try {
      //@ts-ignore
      const _dataProvider = combineDataProviders((resource) => {
        switch (resource) {
          case 'embeddings':
            return EmbeddingDataProvider;
          case 'employees':
            return EmployeeDataProvider;
          default:
            throw new Error(`Unknown resource: ${resource}`);
        }
      });
      setDataProvider(_dataProvider);
    } catch (e) {}
  };
  useEffect(() => {
    prepareDataProviders();
    fixBlankPage();
  }, []);

  if (!dataProvider) return <p>Loading...</p>;

  // Preparing data providers again as soon as token is retrieved.
  document.addEventListener('userFetched', prepareDataProviders, false);

  return (
    <>
      <Admin
        dataProvider={dataProvider}
        layout={Layout}
        theme={lightTheme}
        authProvider={authProvider}
        loginPage={Login}>
        {(permissions) => [
          MenuItemsWithPermissionResolver(permissions).map((option, index) => {
            return (
              <Resource
                key={index}
                name={option?.resource}
                {...option?.props}
              />
            );
          })
        ]}
      </Admin>
      <style>
        {`
          body::-webkit-scrollbar {
          display: none;
          }

          body {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>
    </>
  );
};
export default App;
