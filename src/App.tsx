/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkillzHome from './components/SkillzHome';
import Home from './components/Home';
import NodoPersonal from './components/NodoPersonal';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SkillzHome />} />
        <Route path="/openclaw" element={<Home />} />
        <Route path="/nodo-personal" element={<NodoPersonal />} />
      </Routes>
    </Router>
  );
}
