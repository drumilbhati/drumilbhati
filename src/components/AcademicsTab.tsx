import React from 'react';

interface AcademicsTabProps {
  activeSubTab: string;
}

export const AcademicsTab: React.FC<AcademicsTabProps> = ({ activeSubTab }) => {
  
  const renderGrades = () => {
    const courses = [
      { code: 'CSE101', name: 'Data Structures and Algorithms', type: 'Relevant Coursework', gpa: '9.8/10' },
      { code: 'CSE202', name: 'Design and Analysis of Algorithms', type: 'Relevant Coursework', gpa: '10/10' },
      { code: 'CSE301', name: 'Operating Systems', type: 'Relevant Coursework', gpa: '9.5/10' },
      { code: 'CSE302', name: 'Database Management Systems', type: 'Relevant Coursework', gpa: '9.2/10' },
      { code: 'CSE303', name: 'Computer Networks', type: 'Relevant Coursework', gpa: '9.5/10' },
      { code: 'CSE304', name: 'Computer Architecture', type: 'Relevant Coursework', gpa: '9.0/10' },
      { code: 'CSE401', name: 'Distributed Systems', type: 'Relevant Coursework', gpa: '10/10' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Education Timeline */}
        <div className="roundbox">
          <div className="roundbox-header">
            <span>→ Education & Degrees</span>
          </div>
          <div className="roundbox-content" style={{ padding: 0 }}>
            <table className="cf-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Year</th>
                  <th style={{ width: '35%' }}>Degree / Board</th>
                  <th style={{ width: '35%' }}>Institute</th>
                  <th style={{ width: '15%', textAlign: 'center' }}>% / CGPA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>2023 - Present</td>
                  <td>BTech in Computer Science and Engineering</td>
                  <td>Ahmedabad University (School of Engineering and Applied Science)</td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--cf-red)' }}>3.8/4.00 (9.50/10)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>2023</td>
                  <td>HSC (PCM) - GSEB Board</td>
                  <td>St. Andrew's School</td>
                  <td style={{ textAlign: 'center' }}>82.30 %</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>2021</td>
                  <td>SSC - GSEB Board</td>
                  <td>Little Steps Montessori School</td>
                  <td style={{ textAlign: 'center' }}>91.00 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Standings Details */}
        <div className="roundbox" style={{ padding: '15px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--link-color)' }}>
            Academic Rankings & Highlights
          </h3>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            <li>🥇 **Ranked 1st** among 200+ engineering students in both 1st Year (9.18/10 GPA) and 2nd Year (9.48/10 GPA) at Ahmedabad University.</li>
            <li>💼 Served as **Teaching Assistant** for *Design and Analysis of Algorithms* (Spring 2026), teaching 150+ students greedy methods, divide-and-conquer, dynamic programming, and complexity.</li>
            <li>💼 Served as **Teaching Assistant** for *Data Structures* (Fall 2025), running weekly algorithm workshops and office hours for 150+ students. Assisted in co-designing assignments and raised course average scores by 20% compared to prior terms.</li>
          </ul>
        </div>

        {/* Coursework Table */}
        <div className="roundbox">
          <div className="roundbox-header">
            <span>→ Relevant Coursework & Grades</span>
          </div>
          <div className="roundbox-content" style={{ padding: 0 }}>
            <table className="cf-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>Course Code</th>
                  <th style={{ width: '50%' }}>Course Name</th>
                  <th style={{ width: '30%', textAlign: 'center' }}>Grade / Score</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.code}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{course.code}</td>
                    <td style={{ fontWeight: 'bold' }}>{course.name}</td>
                    <td style={{ textAlign: 'center', color: 'var(--rating-green)', fontWeight: 'bold' }}>
                      {course.gpa}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  };

  const renderCertifications = () => {
    const certs = [
      {
        title: 'IBM SkillsBuild Web Development Fundamentals',
        issuer: 'IBM',
        date: "Jun '26",
        desc: 'Demonstrated knowledge of web development concepts, including HTML, CSS, JavaScript, processes to develop, deploy, and test websites, using a simulated integrated development environment.'
      },
      {
        title: 'IBM Cloud Computing Fundamentals',
        issuer: 'IBM',
        date: "May '26 - Jun '26",
        desc: 'Earned certification demonstrating professional excellence in core cloud infrastructure, service models, and security frameworks. Trained in analyzing, deploying, and supporting scalable cloud-based solutions.'
      },
      {
        title: 'AWS Cloud Foundation',
        issuer: 'Amazon Web Services',
        date: "Sep '25 - Dec '25",
        desc: 'Gained practical expertise in AWS global infrastructure, scalable EC2 compute services, S3 secure storage, RDS relational databases, and security/IAM best practices required to deploy highly available, fault-tolerant backend systems.'
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {certs.map((c, idx) => (
          <div className="roundbox" key={idx}>
            <div className="roundbox-header">
              <span>📜 {c.title}</span>
              <span style={{ fontSize: '11px', fontWeight: 'bold' }}>{c.date}</span>
            </div>
            <div className="roundbox-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Issuer: <strong style={{ color: 'var(--text-primary)' }}>{c.issuer}</strong></span>
              </div>
              <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {activeSubTab === 'grades' ? renderGrades() : renderCertifications()}
    </div>
  );
};
