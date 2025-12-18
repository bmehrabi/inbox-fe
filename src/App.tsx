import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import MessagesList from "./pages/MessagesList";
import MessageDetails from "./pages/MessageDetails";
import NotFound from "./pages/NotFound";
import 'antd/dist/reset.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MessagesList />} />
      <Route path="/message/:id" element={<MessageDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
