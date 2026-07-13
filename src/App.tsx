import { useState, useEffect } from 'react';
import { useCPStats } from './hooks/useCPStats';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AboutTab } from './components/AboutTab';
import { ProjectsTab } from './components/ProjectsTab';
import { CPTab } from './components/CPTab';
import { AcademicsTab } from './components/AcademicsTab';
import { ContactTab } from './components/ContactTab';
import './App.css';

function App() {
  const stats = useCPStats();
  const [activeTab, setActiveTab] = useState('home');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  // Set dark theme permanently on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <div className="app-container">
      {/* Codeforces Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        stats={stats}
      />

      {/* Main Grid Layout */}
      <div className="main-layout">
        
        {/* Main Content Area */}
        <main>
          {activeTab === 'home' && (
            <AboutTab
              stats={stats}
              activeSubTab={activeSubTab}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab
              activeSubTab={activeSubTab}
              setActiveSubTab={setActiveSubTab}
            />
          )}

          {activeTab === 'cp' && (
            <CPTab
              stats={stats}
              activeSubTab={activeSubTab}
            />
          )}

          {activeTab === 'academics' && (
            <AcademicsTab
              activeSubTab={activeSubTab}
            />
          )}

          {activeTab === 'contact' && (
            <ContactTab
              activeSubTab={activeSubTab}
              setActiveSubTab={setActiveSubTab}
            />
          )}
        </main>

        {/* Sidebar Panel Widgets */}
        <Sidebar 
          stats={stats} 
          setActiveTab={setActiveTab}
          setActiveSubTab={setActiveSubTab}
        />

      </div>

      {/* Codeforces Footer details */}
      <footer style={{ 
        marginTop: '40px', 
        paddingTop: '20px', 
        borderTop: '1px solid var(--border-color)', 
        textAlign: 'center', 
        fontSize: '11px', 
        color: 'var(--text-secondary)' 
      }}>
        <p>
          <a href="https://codeforces.com" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold' }}>Codeforces</a> (c) Copyright 2010-2026 Mike Mirzayanov
        </p>
        <p style={{ marginTop: '4px' }}>
          The only programming contests Web 2.0 platform | Powered by React & Vite
        </p>
        <p style={{ marginTop: '4px' }}>
          Server time: {new Date().toLocaleString()} (k2).
        </p>
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <span>Supported by</span>
          <a href="https://ton.org" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center' }}>
            {/* Simple TON representation logo */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--link-color)" style={{ verticalAlign: 'middle' }}>
              <path d="M12 2L2 22h20L12 2zm0 4l6.5 13H5.5L12 6z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
