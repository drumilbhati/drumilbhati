import React, { useState } from 'react';
import type { CPStats } from '../hooks/useCPStats';

interface SidebarProps {
  stats: CPStats;
  setActiveTab: (tab: string) => void;
  setActiveSubTab: (subTab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ stats, setActiveTab, setActiveSubTab }) => {
  const [searchHandle, setSearchHandle] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchHandle.trim()) return;
    
    const handleLower = searchHandle.trim().toLowerCase();
    if (handleLower === 'drumil') {
      setSearchResult('Found Drumil: Pupil (1281 rating)');
      setActiveTab('home');
      setActiveSubTab('overview');
    } else if (handleLower === 'tourist' || handleLower === 'jiangly') {
      setSearchResult(`Found ${searchHandle}: Legendary Grandmaster (3000+ rating)`);
    } else {
      setSearchResult(`User ${searchHandle} not found. Try 'Drumil'`);
    }
    setTimeout(() => setSearchResult(null), 5000);
  };

  const getRankClass = (rating: number): string => {
    if (rating >= 3000) return 'grandmaster'; // Legendary GM
    if (rating >= 2400) return 'grandmaster';
    if (rating >= 1900) return 'candidate-master'; // purple in codeforces
    if (rating >= 1600) return 'expert';
    if (rating >= 1400) return 'specialist';
    if (rating >= 1200) return 'pupil';
    return 'newbie';
  };

  // Static list of top rated for the widget
  const topRatedUsers = [
    { rank: 1, handle: 'jiangly', rating: 3728 },
    { rank: 2, handle: 'tourist', rating: 3439 },
    { rank: 3, handle: 'Um_nik', rating: 3376 },
    { rank: 4, handle: 'Drumil', rating: stats.codeforces.rating, isUser: true },
    { rank: 5, handle: 'heuristica', rating: 3322 }
  ];

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      {/* Pay Attention Widget */}
      <div className="roundbox">
        <div className="roundbox-header">
          <span>→ Pay attention</span>
        </div>
        <div className="roundbox-content" style={{ fontSize: '12px' }}>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold', color: 'var(--cf-red)' }}>Before Job Offer</span>
            <h4 style={{ margin: '5px 0', fontSize: '13px', color: 'var(--link-color)' }}>
              Drumil Bhati Recruiting Round
            </h4>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 'bold', margin: '8px 0' }}>
              00:00:00
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>Ongoing Career Search</span>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: '8px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <a 
              onClick={() => { setActiveTab('contact'); setActiveSubTab('write-entry'); }}
              style={{ fontWeight: 'bold', cursor: 'pointer' }}
            >
              Send Interview Invitation »
            </a>
          </div>
        </div>
      </div>

      {/* User Quick Info Widget */}
      <div className="roundbox">
        <div className="roundbox-header">
          <span>→ Drumil</span>
        </div>
        <div className="roundbox-content" style={{ fontSize: '12px', padding: '10px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
            <img 
              src={stats.codeforces.avatar} 
              alt="Drumil" 
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                objectFit: 'cover',
                background: '#eee'
              }}
            />
            <div>
              <div className="cf-handle pupil" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Drumil
              </div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                Rating: <span className="cf-handle pupil" style={{ fontWeight: 'bold' }}>{stats.codeforces.rating}</span>
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                Max: Pupil, <span className="cf-handle pupil">{stats.codeforces.maxRating}</span>
              </div>
            </div>
          </div>
          
          <ul style={{ listStyle: 'none', paddingLeft: '5px', display: 'flex', flexDirection: 'column', gap: '5px', borderTop: '1px solid var(--border-light)', paddingTop: '8px' }}>
            <li>
              <a 
                onClick={() => { setActiveTab('home'); setActiveSubTab('skills'); }} 
                style={{ cursor: 'pointer' }}
              >
                🛠️ Skills & Experience
              </a>
            </li>
            <li>
              <a 
                onClick={() => { setActiveTab('projects'); setActiveSubTab('all-problems'); }} 
                style={{ cursor: 'pointer' }}
              >
                📂 Problemset (Projects)
              </a>
            </li>
            <li>
              <a 
                onClick={() => { setActiveTab('cp'); setActiveSubTab('rating-history'); }} 
                style={{ cursor: 'pointer' }}
              >
                📊 Contest Submissions
              </a>
            </li>
            <li>
              <a 
                onClick={() => { setActiveTab('academics'); setActiveSubTab('grades'); }} 
                style={{ cursor: 'pointer' }}
              >
                🎓 Academics & Grades
              </a>
            </li>
            <li style={{ marginTop: '5px', borderTop: '1px dotted var(--border-light)', paddingTop: '5px' }}>
              <a 
                href="file:///Users/drumilbhati/Documents/Docs/Resumes/Resumes/Drumil_Bhati_2026.pdf" 
                target="_blank" 
                rel="noreferrer"
                style={{ fontWeight: 'bold', color: 'var(--cf-red)' }}
              >
                📄 Download Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Top Rated Widget (Ahmedabad Univ CP focus) */}
      <div className="roundbox">
        <div className="roundbox-header">
          <span>→ Top rated</span>
        </div>
        <div className="roundbox-content" style={{ padding: 0 }}>
          <table className="cf-table" style={{ margin: 0, fontSize: '11px', border: 'none' }}>
            <thead>
              <tr style={{ background: 'none' }}>
                <th style={{ width: '10%', border: 'none', borderBottom: '1px solid var(--border-color)' }}>#</th>
                <th style={{ border: 'none', borderBottom: '1px solid var(--border-color)' }}>User</th>
                <th style={{ width: '30%', textAlign: 'right', border: 'none', borderBottom: '1px solid var(--border-color)' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {topRatedUsers.map(user => (
                <tr 
                  key={user.handle} 
                  style={{ 
                    backgroundColor: user.isUser ? 'rgba(52, 211, 153, 0.1)' : 'transparent',
                    fontWeight: user.isUser ? 'bold' : 'normal'
                  }}
                >
                  <td style={{ border: 'none', borderBottom: '1px solid var(--border-light)' }}>{user.rank}</td>
                  <td style={{ border: 'none', borderBottom: '1px solid var(--border-light)' }}>
                    <span className={`cf-handle ${getRankClass(user.rating)}`}>
                      {user.handle}
                    </span>
                  </td>
                  <td style={{ border: 'none', borderBottom: '1px solid var(--border-light)' }}>{user.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '8px', textAlign: 'right', fontSize: '10px' }}>
            <a onClick={() => { setActiveTab('cp'); setActiveSubTab('platforms'); }} style={{ cursor: 'pointer' }}>
              View platform profiles »
            </a>
          </div>
        </div>
      </div>

      {/* Recent Actions Widget (Fictional updates matching resumes) */}
      <div className="roundbox">
        <div className="roundbox-header">
          <span>→ Recent actions</span>
        </div>
        <div className="roundbox-content" style={{ fontSize: '11px', maxHeight: '250px', overflowY: 'auto', padding: '10px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <span>📢 </span>
              <span className="cf-handle pupil">Drumil</span> published project{' '}
              <a onClick={() => { setActiveTab('projects'); setActiveSubTab('secureorder'); }} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                SecureOrder
              </a>{' '}
              with Raft consensus and gRPC.
            </li>
            <li>
              <span>🏆 </span>
              <span className="cf-handle pupil">Drumil</span> was awarded first place in ACM Pair-A-Thon.
            </li>
            <li>
              <span>🏫 </span>
              <span className="cf-handle pupil">Drumil</span> completed Data Structures TA responsibilities.
            </li>
            <li>
              <span>🚀 </span>
              <span className="cf-handle pupil">Drumil</span> certified in AWS Cloud Foundation and IBM Cloud Computing.
            </li>
            <li>
              <span>📈 </span>
              <span className="cf-handle pupil">Drumil</span> solved 1,200+ Leetcode and 1,350+ Codeforces problems.
            </li>
          </ul>
        </div>
      </div>

      {/* Find User Search Widget */}
      <div className="roundbox">
        <div className="roundbox-header">
          <span>→ Find user</span>
        </div>
        <div className="roundbox-content" style={{ fontSize: '12px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '5px' }}>
            <label htmlFor="sidebar-handle" style={{ display: 'none' }}>Handle</label>
            <input 
              id="sidebar-handle"
              type="text" 
              placeholder="Handle..." 
              value={searchHandle}
              onChange={(e) => setSearchHandle(e.target.value)}
              style={{
                flexGrow: 1,
                padding: '4px 8px',
                fontSize: '11px',
                border: '1px solid var(--border-color)',
                borderRadius: '3px',
                background: 'var(--container-bg)',
                color: 'var(--text-primary)'
              }}
            />
            <button type="submit" className="cf-btn" style={{ padding: '2px 8px', fontSize: '11px' }}>
              Find
            </button>
          </form>
          {searchResult && (
            <div style={{ marginTop: '8px', padding: '4px', backgroundColor: 'var(--bg-color)', border: '1px dotted var(--border-color)', borderRadius: '3px', fontSize: '10px', textAlign: 'center' }}>
              {searchResult}
            </div>
          )}
        </div>
      </div>

    </aside>
  );
};
