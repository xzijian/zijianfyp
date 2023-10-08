import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { ModulesContextProvider } from './context/ModuleContext';
import { GroupsContextProvider } from './context/GroupsContext';
import { MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider>
    <AuthContextProvider>
      <ModulesContextProvider>
        <GroupsContextProvider>
          <App />
        </GroupsContextProvider>
      </ModulesContextProvider>
    </AuthContextProvider>
  </MantineProvider>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



