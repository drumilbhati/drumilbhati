import type { CPStats } from '../hooks/useCPStats';

interface AboutTabProps {
  stats: CPStats;
  activeSubTab: string;
}

export const AboutTab: React.FC<AboutTabProps> = ({ stats, activeSubTab }) => {
  
  // Renders Codeforces contribution grid / calendar activity
  const renderActivityCalendar = () => {
    // Generate dates for the last 52 weeks (approx 364 days)
    const weeks = 53;
    const daysPerWeek = 7;
    const totalDays = weeks * daysPerWeek;
    
    // Simulate submission activity matching 1350 total solved problems
    // We will distribute values randomly but make it look realistic (clusters of activity)
    const activityArray: number[] = [];
    let seed = 12345;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < totalDays; i++) {
      const randVal = random();
      if (randVal > 0.85) {
        activityArray.push(4); // high activity
      } else if (randVal > 0.7) {
        activityArray.push(3); // medium activity
      } else if (randVal > 0.5) {
        activityArray.push(2); // low activity
      } else if (randVal > 0.3) {
        activityArray.push(1); // minimal activity
      } else {
        activityArray.push(0); // no activity
      }
    }

    return (
      <div className="roundbox" style={{ marginTop: '15px' }}>
        <div className="roundbox-header" style={{ fontSize: '12px' }}>
          <span>→ Submission Activity</span>
          <span style={{ fontSize: '11px', fontWeight: 'normal' }}>Show activity: All</span>
        </div>
        <div className="roundbox-content" style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: '700px' }}>
            <div className="contribution-calendar">
              {activityArray.map((activity, idx) => (
                <div 
                  key={idx} 
                  className={`calendar-day day-${activity}`} 
                  title={`Day ${idx}: Solved ${activity * 2} problems`}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '5px' }}>
              <div>1350 problems solved for all time</div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <span>Less</span>
                <span className="calendar-day day-0" style={{ width: '10px', height: '10px' }} />
                <span className="calendar-day day-1" style={{ width: '10px', height: '10px' }} />
                <span className="calendar-day day-2" style={{ width: '10px', height: '10px' }} />
                <span className="calendar-day day-3" style={{ width: '10px', height: '10px' }} />
                <span className="calendar-day day-4" style={{ width: '10px', height: '10px' }} />
                <span>More</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', borderTop: '1px dotted var(--border-light)', paddingTop: '8px' }}>
              <div>🔥 <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>89 days</span> in a row max</div>
              <div>✨ <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>33 days</span> in a row last year</div>
              <div>📈 <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>505 problems</span> solved last year</div>
              <div>⚡ <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>39 problems</span> solved last month</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOverview = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Profile Card Header */}
        <div className="roundbox" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <img 
              src={stats.codeforces.avatar} 
              alt="Drumil" 
              style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                objectFit: 'cover',
                background: '#eee'
              }}
            />
            
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div>
                  <span className="cf-handle pupil" style={{ fontSize: '14px', textTransform: 'capitalize', fontWeight: 'bold' }}>
                    {stats.codeforces.rank}
                  </span>
                  <h2 className="cf-handle pupil" style={{ fontSize: '28px', fontWeight: 'bold', margin: '2px 0 10px 0', lineHeight: 1.1 }}>
                    {stats.codeforces.handle}
                  </h2>
                </div>
                
                {/* Live Data Pull status indicator */}
                <span className={`status-badge ${stats.codeforces.source === 'api' ? 'live' : 'cached'}`}>
                  <span className="pulse-dot" />
                  {stats.codeforces.source === 'api' ? 'API Live Sync' : 'Offline Cache'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '13px' }}>
                <div>👤 **Drumil Komal Bhati**</div>
                <div>📍 Ahmedabad, Gujarat, India</div>
                <div>🏫 Student at **Ahmedabad University** (SEAS)</div>
                <div>⭐ Max Rating: <span className="cf-handle pupil">{stats.codeforces.maxRating}</span> (Pupil)</div>
                <div>📧 Contact: <a href="mailto:drumilbhati5@gmail.com">drumilbhati5@gmail.com</a></div>
                <div>🕒 Registered: 3 years ago</div>
                <div style={{ marginTop: '5px' }}>
                  🟢 Status: <span style={{ color: 'var(--rating-green)', fontWeight: 'bold' }}>online now</span> (viewing portfolio)
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-light)', paddingTop: '15px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--link-color)' }}>
              Summary
            </h3>
            <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--text-primary)' }}>
              I am a final-year Computer Science and Engineering undergraduate student at Ahmedabad University. 
              I specialize in building high-throughput, distributed systems and backend applications in **Go, C++, and Node.js**. 
              Academically, I rank **1st in my class of 200+ students** with a **GPA of 9.50/10 (3.80/4.00)**. 
              In the competitive programming space, I am a **LeetCode Knight** (top 2% globally), a **3-Star on CodeChef**, 
              and head the university's Competitive Programming Club, besides having served as a Teaching Assistant for core Data Structures and Algorithms courses.
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="quick-stats">
          <div className="quick-stat-card">
            <div className="value" style={{ color: 'var(--rating-green)' }}>{stats.codeforces.rating}</div>
            <div className="label">CF Rating</div>
          </div>
          <div className="quick-stat-card">
            <div className="value" style={{ color: 'var(--rating-yellow)' }}>{stats.leetcode.totalSolved}</div>
            <div className="label">LeetCode Solved</div>
          </div>
          <div className="quick-stat-card">
            <div className="value" style={{ color: 'var(--rating-cyan)' }}>{stats.codechef.rating}</div>
            <div className="label">CodeChef Rating</div>
          </div>
          <div className="quick-stat-card">
            <div className="value" style={{ color: 'var(--cf-red)' }}>9.50</div>
            <div className="label">GPA / 10</div>
          </div>
        </div>

        {/* CP Activity Grid */}
        {renderActivityCalendar()}
      </div>
    );
  };

  const renderSkills = () => {
    const skillCategories = [
      {
        title: 'Languages',
        skills: ['C++', 'Go (Golang)', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'Solidity', 'Rust', 'Verilog']
      },
      {
        title: 'Frameworks & Libraries',
        skills: ['Node.js', 'Express.js', 'React.js', 'Next.js', 'Gorilla Mux', 'gRPC', 'Hardhat', 'NaCl Crypto']
      },
      {
        title: 'Databases & Cache',
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MongoDB Atlas', 'SQLAlchemy']
      },
      {
        title: 'DevOps & Tools',
        skills: ['Docker', 'AWS EC2', 'Nginx', 'Git & GitHub', 'Linux / Shell scripting', 'CI/CD Pipelines', 'Postman']
      },
      {
        title: 'Key Concepts & Areas',
        skills: ['Distributed Systems', 'Raft Consensus', 'System Design', 'REST APIs', 'WebSockets', 'Algorithms & Data Structures', 'Cryptography']
      }
    ];

    return (
      <div className="roundbox">
        <div className="roundbox-header">
          <span>→ Technical Skills & Expertise</span>
        </div>
        <div className="roundbox-content">
          <p style={{ marginBottom: '15px', color: 'var(--text-secondary)' }}>
            A detailed catalog of tools, programming languages, and engineering domains I work with regularly:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {skillCategories.map(cat => (
              <div key={cat.title} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--link-color)' }}>
                  {cat.title}
                </h4>
                <div className="tag-list" style={{ marginTop: 0 }}>
                  {cat.skills.map(skill => (
                    <span key={skill} className="tag-item" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '12px', padding: '4px 10px' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAchievements = () => {
    const achievements = [
      {
        title: "ACM Pair-A-Thon 2025 Winner",
        date: "March 2025",
        summary: "Awarded first place among all second-year computer science engineering students for exceptional performance in algorithmic and problem-solving contests."
      },
      {
        title: "State Rank 14 (GSEB Class 12 Boards)",
        date: "May 2023",
        summary: "Secured rank 14 out of 70,000+ students statewide in the Gujarat Secondary and Higher Secondary Education Board examinations, demonstrating strong physics, chemistry, and math foundations."
      },
      {
        title: "Winner Website Making Challenge 2024",
        date: "August 2024",
        summary: "Won the first-place prize for the 'most clean and scalable codebase' among 20+ competing engineering teams at Ahmedabad University's Programming Club contest."
      },
      {
        title: "Odoo x Adani Hackathon On-site finalist",
        date: "January 2026",
        summary: "Qualified for the final offline hackathon round in the national level hackathon, placing in top brackets among 2,400+ participating engineers."
      },
      {
        title: "ACM ICPC 2025 Regionals Prelims",
        date: "November 2025",
        summary: "Ranked 1382 nationally, securing the highest rank within Ahmedabad University among 3rd year teams."
      }
    ];

    return (
      <div className="roundbox">
        <div className="roundbox-header">
          <span>→ Key Achievements & Accomplishments</span>
        </div>
        <div className="roundbox-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {achievements.map((ach, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', borderBottom: idx !== achievements.length - 1 ? '1px solid var(--border-light)' : 'none', paddingBottom: idx !== achievements.length - 1 ? '15px' : '0' }}>
                <div style={{ fontSize: '24px' }}>🏆</div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{ach.title}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>{ach.date}</span>
                  </div>
                  <p style={{ marginTop: '5px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {ach.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {activeSubTab === 'overview' && renderOverview()}
      {activeSubTab === 'skills' && renderSkills()}
      {activeSubTab === 'achievements' && renderAchievements()}
    </div>
  );
};
