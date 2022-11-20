import React from 'react';
import Routes from './routes';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);
export default function App() {
    return (
     
            <Routes />
      
    );
}
