import React from 'react';
import type { CPStats } from '../hooks/useCPStats';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeSubTab: string;
  setActiveSubTab: (subTab: string) => void;
  stats: CPStats;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeSubTab,
  setActiveSubTab,
  stats
}) => {
  const mainTabs = [
    { id: 'home', label: 'HOME' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'cp', label: 'COMPETITIVE PROGRAMMING' },
    { id: 'academics', label: 'ACADEMICS & CERTIFICATIONS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  // Dynamically render submenus based on the active main tab
  const getSubmenus = () => {
    switch (activeTab) {
      case 'home':
        return [
          { id: 'overview', label: 'DRUMIL' },
          { id: 'skills', label: 'SKILLS' },
          { id: 'achievements', label: 'ACHIEVEMENTS' }
        ];
      case 'projects':
        return [
          { id: 'all-problems', label: 'PROBLEMSET' },
          { id: 'secureorder', label: '1001-SecureOrder' },
          { id: 'tablingtime', label: '1002-TablingTime' },
          { id: 'traffic', label: '1003-TrafficScheduler' }
        ];
      case 'cp':
        return [
          { id: 'rating-history', label: 'RATING GRAPH' },
          { id: 'solved-stats', label: 'SUBMISSIONS & TAGS' },
          { id: 'platforms', label: 'PLATFORMS OVERVIEW' }
        ];
      case 'academics':
        return [
          { id: 'grades', label: 'EDUCATION & GRADES' },
          { id: 'certifications', label: 'CERTIFICATIONS' }
        ];
      case 'contact':
        return [
          { id: 'write-entry', label: 'WRITE NEW ENTRY' },
          { id: 'sent-messages', label: 'SENT MESSAGES' }
        ];
      default:
        return [];
    }
  };

  const submenus = getSubmenus();

  return (
    <header style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
      {/* Top Bar (Simplified) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '12px', padding: '5px 0', color: 'var(--text-secondary)' }}>
        <span>
          Logged in as <span className="cf-handle pupil">{stats.codeforces.handle}</span>
        </span>
      </div>

      {/* Main Logo and Sponsorship Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', flexWrap: 'wrap', gap: '15px' }}>
        {/* Personal Branding Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
        >
          {/* SVG representation of Codeforces three bars */}
          <svg width="45" height="40" viewBox="0 0 45 40">
            {/* Blue bar (lowest) */}
            <rect x="0" y="20" width="10" height="20" fill="var(--cf-blue)" rx="2" />
            {/* Red bar (highest) */}
            <rect x="15" y="0" width="10" height="40" fill="var(--cf-red)" rx="2" />
            {/* Yellow bar (middle) */}
            <rect x="30" y="10" width="10" height="30" fill="var(--cf-yellow)" rx="2" />
          </svg>
          <div>
            <h1 style={{ 
              fontSize: '26px', 
              fontWeight: 800, 
              letterSpacing: '-1px', 
              lineHeight: '1',
              color: 'var(--text-primary)'
            }}>
              DRUMIL BHATI
            </h1>
            <p style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Systems & Algorithms Portfolio
            </p>
          </div>
        </div>

        {/* Mock sponsored banner */}
        <div 
          className="roundbox" 
          style={{ 
            padding: '8px 15px', 
            fontSize: '12px', 
            margin: 0,
            background: 'linear-gradient(135deg, rgba(59,89,152,0.05) 0%, rgba(252,164,0,0.05) 100%)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <div>
            <span style={{ fontWeight: 'bold', color: 'var(--cf-yellow)' }}>★ Special Contest:</span>{' '}
            <span style={{ color: 'var(--text-primary)' }}>Drumil's Resume Review Round 1109 (Div. 1 + Div. 2)</span>
          </div>
          <button 
            onClick={() => setActiveTab('contact')}
            className="cf-btn primary" 
            style={{ fontSize: '10px', padding: '4px 8px' }}
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <ul className="nav-tabs">
        {mainTabs.map(tab => (
          <li key={tab.id} className={activeTab === tab.id ? 'active' : ''}>
            <a 
              onClick={() => {
                setActiveTab(tab.id);
                // Reset active subtab to the first one in the new active tab
                switch (tab.id) {
                  case 'home':
                    setActiveSubTab('overview');
                    break;
                  case 'projects':
                    setActiveSubTab('all-problems');
                    break;
                  case 'cp':
                    setActiveSubTab('rating-history');
                    break;
                  case 'academics':
                    setActiveSubTab('grades');
                    break;
                  case 'contact':
                    setActiveSubTab('write-entry');
                    break;
                }
              }}
            >
              {tab.label}
            </a>
          </li>
        ))}
        {/* Simple mock search bar on the right */}
        <li style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', paddingRight: '5px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search..." 
              style={{
                padding: '4px 24px 4px 8px',
                fontSize: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: '3px',
                background: 'var(--container-bg)',
                color: 'var(--text-primary)',
                width: '150px'
              }}
            />
            <span style={{ position: 'absolute', right: '6px', fontSize: '11px', color: 'var(--text-secondary)', pointerEvents: 'none' }}>🔍</span>
          </div>
        </li>
      </ul>

      {/* Submenu navigation */}
      {submenus.length > 0 && (
        <div className="submenu-container">
          {submenus.map(sub => (
            <span 
              key={sub.id} 
              className={`submenu-item ${activeSubTab === sub.id ? 'active' : ''}`}
              onClick={() => setActiveSubTab(sub.id)}
            >
              {sub.label}
            </span>
          ))}
        </div>
      )}
    </header>
  );
};
