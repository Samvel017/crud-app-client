import { Route, Routes } from 'react-router';
import UsersSection from './components/user-add-section/UsersSection';
import UserInfo from './components/user-add-section/UserInfo';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UsersSection />} />
        <Route path="/users/:id" element={<UserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
