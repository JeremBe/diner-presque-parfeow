import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { UserProvider } from './contexts/AppContext';
import ScrollToTop from './ScrollTop';
import Edit from './views/Edit/Edit';

import Home from './views/Home/Home';
import Menu from './views/Menu/Menu';
import Review from './views/Review/Review';
import Users from './views/Users/Users';

function App() {
  return (
    <UserProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu/:id" element={<Menu />} />
            <Route path="/menu/:id/review" element={<Review />} />
            <Route path="/menu/:id/edit" element={<Edit />} />
            <Route path="/user/:user" element={<Users />} />
          </Routes>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App;
