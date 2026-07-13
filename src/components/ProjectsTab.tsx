import React from 'react';

interface ProjectsTabProps {
  activeSubTab: string;
  setActiveSubTab: (subTab: string) => void;
}

interface ProjectData {
  id: string;
  code: string;
  title: string;
  languages: string;
  solvedCount: number;
  difficulty: number;
  timeLimit: string;
  memoryLimit: string;
  summary: string;
  keyOutcomes: string[];
  teamSize: number;
  skills: string[];
  github: string;
  sampleInput: string;
  sampleOutput: string;
}

const PROJECTS: Record<string, ProjectData> = {
  secureorder: {
    id: 'secureorder',
    code: '1001-A',
    title: 'SecureOrder',
    languages: 'Go, C++, Solidity, Hardhat, TypeScript, gRPC',
    solvedCount: 1950,
    difficulty: 1900,
    timeLimit: '2.0 seconds',
    memoryLimit: '256 megabytes',
    summary: 'A Maximal Extractable Value (MEV) protection layer designed to mitigate frontrunning by arbitrage bots in decentralized applications, featuring a distributed transaction sequencer.',
    skills: ['Go', 'C++', 'Solidity', 'Hardhat', 'TypeScript', 'gRPC', 'NaCl Cryptography', 'Raft Consensus'],
    teamSize: 5,
    github: 'https://github.com/drumilbhati/secureorder',
    keyOutcomes: [
      'Implemented a scalable, distributed sequencer with Raft consensus in Go using gRPC; sustained 1,000,000 concurrent requests on a 5-node AWS cluster at 3,000+ requests per second.',
      'Designed client-side encryption layer in C++ using NaCl sealed-box cryptography to secure transactions before submission to the public mempool.'
    ],
    sampleInput: `// Transaction payload before encryption
{
  "sender": "0xDrumil...",
  "recipient": "0xContract...",
  "value": "10.0 ETH",
  "data": "0xa9059cbb000000000000000000000000..."
}`,
    sampleOutput: `// Sealed-box Encrypted Payload (NaCl)
{
  "sequencer_id": "raft-node-2",
  "encrypted_tx": "h7C8F2kLp9XyZv8Wq1Rm3Bn5Vc4Xz2M1qP...",
  "signature": "0x7a3f8b9d... (ECDSA)",
  "raft_index": 451092,
  "consensus_status": "COMMITTED"
}`
  },
  tablingtime: {
    id: 'tablingtime',
    code: '1002-B',
    title: 'TablingTime',
    languages: 'React.js, Node.js, Express.js, MongoDB, AWS EC2',
    solvedCount: 3120,
    difficulty: 1400,
    timeLimit: '1.0 seconds',
    memoryLimit: '256 megabytes',
    summary: 'An automated scheduling engine for university cohorts, implementing constraint satisfaction algorithms to resolve room bookings, professor assignments, and student course schedules.',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'AWS EC2', 'Bipartite Matching', 'Constraint Satisfaction'],
    teamSize: 6,
    github: 'https://github.com/drumilbhati/TablingTime-Backend',
    keyOutcomes: [
      'Engineered an automated scheduling engine exposed via REST API serving 2,000+ students across 4-year cohorts using a greedy constraint-satisfaction algorithm.',
      'Developed a conflict detector with statistical clash tolerance and recursive room-constraint handling (modular halls), reducing administrative timetabling calculations from days to under 6 minutes.'
    ],
    sampleInput: `// Course Constraints List
[
  { "course": "CSE311", "students": 150, "professor": "Dr. Amin" },
  { "course": "CSE312", "students": 150, "professor": "Dr. Amin" }, // Clash!
  { "room": "Hall-A", "capacity": 180, "available_slots": ["MON-09:00", "MON-11:00"] }
]`,
    sampleOutput: `// Valid Timetable Match (Bipartite Graph Solution)
{
  "status": "VALID",
  "assignments": [
    { "course": "CSE311", "room": "Hall-A", "slot": "MON-09:00", "professor": "Dr. Amin" },
    { "course": "CSE312", "room": "Hall-A", "slot": "MON-11:00", "professor": "Dr. Amin" }
  ],
  "conflicts_resolved": 1,
  "computation_time_ms": 384
}`
  },
  traffic: {
    id: 'traffic',
    code: '1003-C',
    title: 'Urban Traffic Light Scheduler',
    languages: 'Python, OpenStreetMap, Matplotlib, LaTeX, Complex Networks',
    solvedCount: 1420,
    difficulty: 1600,
    timeLimit: '3.0 seconds',
    memoryLimit: '512 megabytes',
    summary: 'An end-to-end urban traffic simulator mapping real-world cities via OpenStreetMap to dynamically schedule traffic lights and minimize waiting times across road networks.',
    skills: ['Python', 'OpenStreetMap', 'Matplotlib', 'LaTeX', 'Complex Networks', 'Simulation'],
    teamSize: 2,
    github: 'https://github.com/dhairya0531/Complex_Network',
    keyOutcomes: [
      'Created an urban traffic light scheduler optimizing multi-intersection flows based on road graph centrality and vehicular density.',
      'Integrated OpenStreetMap to dynamically load and simulate actual road networks across major global cities, outperforming the traditional Backpressure baseline on wait times and queue lengths.'
    ],
    sampleInput: `// Road network nodes (OpenStreetMap extracts)
Node 1: Latitude 23.0225, Longitude 72.5714 (Intersection)
Vehicular queue (Inflow): 82 vehicles/min
Adjacent Node: Node 2 (Edge weight / distance: 120m)`,
    sampleOutput: `// Scheduler Signal Phase Optimization
{
  "signal_configuration": {
    "intersection_id": "osm-node-1",
    "phases": [
      { "direction": "North-South", "green_time_seconds": 45, "pedestrian_allowance": true },
      { "direction": "East-West", "green_time_seconds": 25, "pedestrian_allowance": false }
    ]
  },
  "metrics": {
    "queue_reduction": "28%",
    "avg_delay_reduction_seconds": 18.2
  }
}`
  }
};

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ activeSubTab, setActiveSubTab }) => {

  const renderProblemList = () => {
    return (
      <div className="roundbox">
        <div className="roundbox-header">
          <span>→ Problemset (Drumil's Projects)</span>
          <span style={{ fontSize: '11px', fontWeight: 'normal' }}>Select a problem to view statements</span>
        </div>
        <div className="roundbox-content" style={{ padding: 0 }}>
          <table className="cf-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th style={{ width: '8%', textAlign: 'center' }}>#</th>
                <th style={{ width: '40%' }}>Name</th>
                <th style={{ width: '30%' }}>Technologies / Languages</th>
                <th style={{ width: '12%', textAlign: 'center' }}>Difficulty</th>
                <th style={{ width: '10%', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(PROJECTS).map(proj => (
                <tr key={proj.id} style={{ cursor: 'pointer' }} onClick={() => setActiveSubTab(proj.id)}>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
                    {proj.code}
                  </td>
                  <td>
                    <span style={{ color: 'var(--link-color)', fontWeight: 'bold' }}>
                      {proj.title}
                    </span>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Team Size: {proj.teamSize} | Click for problem statement
                    </div>
                  </td>
                  <td>
                    <div className="tag-list" style={{ marginTop: 0 }}>
                      {proj.skills.slice(0, 4).map(skill => (
                        <span key={skill} className="tag-item" style={{ fontSize: '10px', padding: '1px 5px' }}>
                          {skill}
                        </span>
                      ))}
                      {proj.skills.length > 4 && (
                        <span className="tag-item" style={{ fontSize: '10px', padding: '1px 5px' }}>
                          +{proj.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ 
                      color: proj.difficulty >= 1900 ? 'var(--rating-violet)' : proj.difficulty >= 1600 ? 'var(--rating-blue)' : 'var(--rating-green)',
                      fontWeight: 'bold'
                    }}>
                      ★{proj.difficulty}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', color: 'var(--rating-green)', fontWeight: 'bold', fontSize: '16px' }}>
                    ✔
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderProblemStatement = (projId: string) => {
    const proj = PROJECTS[projId];
    if (!proj) return renderProblemList();

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Navigation Bar back to problem list */}
        <div style={{ marginBottom: '5px' }}>
          <button 
            className="cf-btn" 
            onClick={() => setActiveSubTab('all-problems')}
            style={{ fontSize: '12px' }}
          >
            ← Back to Problemset
          </button>
        </div>

        {/* Problem Layout box */}
        <div className="roundbox" style={{ padding: '25px' }}>
          
          {/* Header Specifications */}
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {proj.code}. {proj.title}
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div>time limit per test: <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{proj.timeLimit}</span></div>
              <div>memory limit per test: <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{proj.memoryLimit}</span></div>
              <div>input: <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>standard input</span></div>
              <div>output: <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>standard output</span></div>
              {proj.github && (
                <div style={{ marginTop: '8px' }}>
                  <a href={proj.github} target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', color: 'var(--cf-red)', textDecoration: 'underline' }}>
                    🔗 Open Repository on GitHub
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Problem Statement Body */}
          <div style={{ fontSize: '14px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* Description */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
                Description
              </h3>
              <p>{proj.summary}</p>
            </div>

            {/* Input Specs */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
                System Architecture & Inputs
              </h3>
              <p>
                The system accepts requests and payloads containing execution constraints or transactions. 
                Built utilizing a combination of <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{proj.languages}</span>, 
                the infrastructure handles operations across cluster environments, balancing resources to maintain high throughput and reliability.
              </p>
            </div>

            {/* Output Specs */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
                Outputs & Deliverables
              </h3>
              <ul style={{ paddingLeft: '20px' }}>
                {proj.keyOutcomes.map((outcome, idx) => (
                  <li key={idx} style={{ marginBottom: '5px' }}>{outcome}</li>
                ))}
              </ul>
            </div>

            {/* Technologies Tag Box */}
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                Problem tags:
              </h4>
              <div className="tag-list" style={{ marginTop: 0 }}>
                {proj.skills.map(skill => (
                  <span key={skill} className="tag-item" style={{ backgroundColor: 'var(--sidebar-header-bg)', color: 'var(--text-primary)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Input/Output Panel */}
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>
                Sample Input and Output Simulation
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                
                {/* Input block */}
                <div style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ backgroundColor: 'var(--sidebar-header-bg)', padding: '5px 10px', fontSize: '11px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
                    standard input
                  </div>
                  <pre style={{ 
                    margin: 0, 
                    padding: '10px', 
                    backgroundColor: 'var(--bg-color)', 
                    color: 'var(--text-primary)', 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '12px',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {proj.sampleInput}
                  </pre>
                </div>

                {/* Output block */}
                <div>
                  <div style={{ backgroundColor: 'var(--sidebar-header-bg)', padding: '5px 10px', fontSize: '11px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
                    standard output
                  </div>
                  <pre style={{ 
                    margin: 0, 
                    padding: '10px', 
                    backgroundColor: 'var(--bg-color)', 
                    color: 'var(--text-primary)', 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '12px',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {proj.sampleOutput}
                  </pre>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {activeSubTab === 'all-problems' ? renderProblemList() : renderProblemStatement(activeSubTab)}
    </div>
  );
};
