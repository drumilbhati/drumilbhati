import type { CPStats } from '../hooks/useCPStats';

interface CPTabProps {
  stats: CPStats;
  activeSubTab: string;
}

export const CPTab: React.FC<CPTabProps> = ({ stats, activeSubTab }) => {
  
  // Render CF-style SVG Rating Graph with rating-colored zones
  const renderRatingGraph = () => {
    // Default mock history if API history is not loaded yet or empty
    const defaultHistory = [
      { newRating: 800, date: 'Oct 2024' },
      { newRating: 920, date: 'Nov 2024' },
      { newRating: 890, date: 'Dec 2024' },
      { newRating: 1040, date: 'Jan 2025' },
      { newRating: 1110, date: 'Feb 2025' },
      { newRating: 1080, date: 'Mar 2025' },
      { newRating: 1220, date: 'Apr 2025' },
      { newRating: 1180, date: 'May 2025' },
      { newRating: 1281, date: 'Jun 2025' },
      { newRating: 1260, date: 'Jul 2025' },
      { newRating: 1310, date: 'Aug 2025' },
      { newRating: 1281, date: 'Sep 2025' }
    ];

    const history = stats.codeforces.ratingHistory.length > 0 
      ? stats.codeforces.ratingHistory.map(h => ({
          newRating: h.newRating,
          date: new Date(h.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        }))
      : defaultHistory;

    // Canvas size
    const width = 800;
    const height = 350;
    const paddingLeft = 50;
    const paddingRight = 30;
    const paddingTop = 20;
    const paddingBottom = 40;

    // Compute rating bounds
    const minR = Math.min(...history.map(h => h.newRating), 800) - 100;
    const maxR = Math.max(...history.map(h => h.newRating), 1500) + 150;

    // Helper functions to map points
    const getX = (index: number) => {
      const step = (width - paddingLeft - paddingRight) / (history.length - 1 || 1);
      return paddingLeft + index * step;
    };

    const getY = (rating: number) => {
      const scale = (height - paddingTop - paddingBottom) / (maxR - minR);
      return height - paddingBottom - (rating - minR) * scale;
    };

    // Rating zone bands to draw in the background
    const bands = [
      { min: 0, max: 1199, fill: 'rgba(128, 128, 128, 0.08)', label: 'Newbie', color: '#808080' },
      { min: 1200, max: 1399, fill: 'rgba(0, 128, 0, 0.08)', label: 'Pupil', color: '#008000' },
      { min: 1400, max: 1599, fill: 'rgba(3, 168, 158, 0.08)', label: 'Specialist', color: '#03a89e' },
      { min: 1600, max: 1899, fill: 'rgba(0, 0, 255, 0.05)', label: 'Expert', color: '#0000ff' },
      { min: 1900, max: 2199, fill: 'rgba(170, 0, 170, 0.05)', label: 'Candidate Master', color: '#aa00aa' }
    ];

    // Build the SVG path line
    let linePath = '';
    history.forEach((pt, idx) => {
      const x = getX(idx);
      const y = getY(pt.newRating);
      if (idx === 0) {
        linePath += `M ${x} ${y}`;
      } else {
        linePath += ` L ${x} ${y}`;
      }
    });

    return (
      <div className="roundbox">
        <div className="roundbox-header">
          <span>→ Rating History Chart</span>
          <span style={{ fontSize: '11px', fontWeight: 'normal' }}>Codeforces Rating: {stats.codeforces.rating}</span>
        </div>
        <div className="roundbox-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <svg width={width} height={height} style={{ background: 'var(--container-bg)', overflow: 'visible' }}>
              {/* Draw Background Zones */}
              {bands.map((band, idx) => {
                if (band.min > maxR || band.max < minR) return null;
                const top = getY(Math.min(band.max, maxR));
                const bottom = getY(Math.max(band.min, minR));
                const h = bottom - top;
                return (
                  <g key={idx}>
                    <rect 
                      x={paddingLeft} 
                      y={top} 
                      width={width - paddingLeft - paddingRight} 
                      height={h} 
                      fill={band.fill} 
                    />
                    <text 
                      x={width - paddingRight - 10} 
                      y={top + 15} 
                      fill={band.color} 
                      fontSize="9px" 
                      fontWeight="bold" 
                      textAnchor="end"
                      style={{ opacity: 0.6 }}
                    >
                      {band.label} ({band.min})
                    </text>
                  </g>
                );
              })}

              {/* Draw Horizontal Grid lines */}
              {[800, 1000, 1200, 1400, 1600, 1800].map(val => {
                if (val < minR || val > maxR) return null;
                const y = getY(val);
                return (
                  <g key={val}>
                    <line 
                      x1={paddingLeft} 
                      y1={y} 
                      x2={width - paddingRight} 
                      y2={y} 
                      stroke="var(--border-light)" 
                      strokeDasharray="4 4" 
                    />
                    <text 
                      x={paddingLeft - 8} 
                      y={y + 3} 
                      fill="var(--text-secondary)" 
                      fontSize="9px" 
                      fontFamily="var(--font-mono)"
                      textAnchor="end"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Draw X Axis dates */}
              {history.map((pt, idx) => {
                // To avoid cluttering the dates, render every alternate date or if it's the last one
                if (idx % 2 !== 0 && idx !== history.length - 1) return null;
                const x = getX(idx);
                return (
                  <text 
                    key={idx} 
                    x={x} 
                    y={height - paddingBottom + 18} 
                    fill="var(--text-secondary)" 
                    fontSize="9px" 
                    textAnchor="middle"
                  >
                    {pt.date}
                  </text>
                );
              })}

              {/* Draw Line path */}
              <path 
                d={linePath} 
                fill="none" 
                stroke="var(--cf-yellow)" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Draw Data Points circles */}
              {history.map((pt, idx) => {
                const x = getX(idx);
                const y = getY(pt.newRating);
                return (
                  <g key={idx} className="graph-dot" style={{ cursor: 'pointer' }}>
                    <circle 
                      cx={x} 
                      cy={y} 
                      r="4" 
                      fill="#fff" 
                      stroke="var(--cf-yellow)" 
                      strokeWidth="2" 
                    />
                    <circle 
                      cx={x} 
                      cy={y} 
                      r="8" 
                      fill="transparent" 
                    >
                      <title>{`Rating: ${pt.newRating} on ${pt.date}`}</title>
                    </circle>
                  </g>
                );
              })}
            </svg>
          </div>
          
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '12px', textAlign: 'center' }}>
            <span>Graph shows rating history across Codeforces contests. Hover over dots to view contest details.</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSolvedStats = () => {
    // Sort tags by frequency
    const sortedTags = Object.entries(stats.codeforces.tagStats)
      .sort((a, b) => b[1] - a[1]);

    const maxProblemsCount = Math.max(...Object.values(stats.codeforces.ratingStats), 1);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
        
        {/* Rating Difficulty Histogram */}
        <div className="roundbox">
          <div className="roundbox-header">
            <span>→ Problem Ratings Distribution</span>
            <span style={{ fontSize: '11px', fontWeight: 'normal' }}>Count of problems solved by rating difficulty</span>
          </div>
          <div className="roundbox-content">
            <div className="histogram">
              {Object.entries(stats.codeforces.ratingStats).map(([rating, count]) => {
                const pct = (count / maxProblemsCount) * 100;
                return (
                  <div className="histogram-row" key={rating}>
                    <div className="histogram-label">{rating}</div>
                    <div className="histogram-bar-container">
                      <div 
                        className="histogram-bar" 
                        style={{ 
                          width: `${pct}%`,
                          background: parseInt(rating) >= 1500 ? 'var(--rating-violet)' : parseInt(rating) >= 1200 ? 'var(--rating-green)' : 'var(--rating-gray)'
                        }} 
                      />
                    </div>
                    <div className="histogram-value">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tags breakdown */}
        <div className="roundbox">
          <div className="roundbox-header">
            <span>→ Problem Tags Solved</span>
          </div>
          <div className="roundbox-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sortedTags.map(([tag, count]) => (
                <div key={tag} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
                  <span style={{ fontWeight: 'bold' }}>{tag}</span>
                  <span className="cf-btn" style={{ padding: '2px 8px', fontSize: '11px', borderRadius: '12px' }}>
                    {count} solved
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    );
  };

  const renderPlatformsOverview = () => {
    const platforms = [
      {
        name: 'Codeforces',
        username: 'Drumil',
        stats: [
          { label: 'Rating', value: `${stats.codeforces.rating} (Max: ${stats.codeforces.maxRating})`, highlight: true },
          { label: 'Rank', value: stats.codeforces.rank, highlight: true },
          { label: 'Solved Problems', value: `${stats.codeforces.solvedCount}+` }
        ],
        badgeColor: 'var(--rating-green)',
        url: 'https://codeforces.com/profile/Drumil'
      },
      {
        name: 'LeetCode',
        username: 'drumilbhati',
        stats: [
          { label: 'Rank Badge', value: 'Knight ⚔️ (top 2% globally)', highlight: true },
          { label: 'Solved Problems', value: `${stats.leetcode.totalSolved} (Easy: ${stats.leetcode.easySolved}, Med: ${stats.leetcode.mediumSolved}, Hard: ${stats.leetcode.hardSolved})` },
          { label: 'Global Ranking', value: stats.leetcode.ranking.toLocaleString() }
        ],
        badgeColor: 'var(--rating-orange)',
        url: 'https://leetcode.com/u/drumilbhati/'
      },
      {
        name: 'CodeChef',
        username: 'drumilbhati',
        stats: [
          { label: 'Stars', value: stats.codechef.stars, highlight: true },
          { label: 'Rating', value: `${stats.codechef.rating} (Max: ${stats.codechef.maxRating})` },
          { label: 'Solved Problems', value: `${stats.codechef.solvedCount}+` }
        ],
        badgeColor: 'var(--rating-cyan)',
        url: 'https://www.codechef.com/users/drumilbhati'
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {platforms.map(p => (
          <div className="roundbox" key={p.name}>
            <div className="roundbox-header" style={{ borderColor: p.badgeColor }}>
              <span style={{ color: p.badgeColor }}>{p.name} Profile</span>
              <a href={p.url} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: 'var(--link-color)', fontWeight: 'bold' }}>
                Visit profile »
              </a>
            </div>
            <div className="roundbox-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>{p.username}</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Handle name on {p.name}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {p.stats.map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                    <span style={{ fontWeight: 'bold', color: s.highlight ? p.badgeColor : 'var(--text-primary)' }}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {activeSubTab === 'rating-history' && renderRatingGraph()}
      {activeSubTab === 'solved-stats' && renderSolvedStats()}
      {activeSubTab === 'platforms' && renderPlatformsOverview()}
    </div>
  );
};
