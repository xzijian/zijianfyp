import React from 'react';
import './App1.css';
import { Register } from './pages/register';
import { Homepage } from './pages/homepage';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Module } from './pages/modules';
import { Groups } from './pages/groups';
import { Group } from './pages/group';
import {HeroContentLeft} from './pages/landing';
import { useAuthContext } from './hooks/useAuthContext'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
                path="/"
                element={user ? <Homepage /> : <HeroContentLeft/> } 
              />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register /> : <Navigate to="/" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile /> : <Navigate to="/" />} 
            />
            <Route
              path="/module/:id"
              element={user ? <Module /> : <Navigate to="/" />}
            />
            <Route
              path="/groups"
              element={user ? <Groups /> : <Navigate to="/" />}
            />
            <Route
              path="/groups/:id"
              element={user ? <Group /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;

