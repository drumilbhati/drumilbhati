import React, { useState, useEffect } from 'react';

interface Message {
  id: string;
  subject: string;
  body: string;
  gasPrice: number;
  date: string;
  upvotes: number;
}

interface ContactTabProps {
  activeSubTab: string;
  setActiveSubTab: (subTab: string) => void;
}

export const ContactTab: React.FC<ContactTabProps> = ({ activeSubTab, setActiveSubTab }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [gasPrice, setGasPrice] = useState(30); // in Gwei
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  // Load sent messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cf_portfolio_msgs');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;

    setIsSending(true);
    
    // Simulate mining delays based on priority gas fee
    // Higher gas = faster transmission!
    const delay = Math.max(500, 3000 - gasPrice * 30);

    setTimeout(() => {
      const newMsg: Message = {
        id: Math.random().toString(36).substring(2, 9),
        subject: subject.trim(),
        body: body.trim(),
        gasPrice,
        date: new Date().toLocaleString(),
        upvotes: Math.floor(Math.random() * 15) + 1
      };

      const updated = [newMsg, ...messages];
      setMessages(updated);
      localStorage.setItem('cf_portfolio_msgs', JSON.stringify(updated));
      
      // Reset form
      setSubject('');
      setBody('');
      setGasPrice(30);
      setIsSending(false);
      
      // Go to sent messages subtab
      setActiveSubTab('sent-messages');
    }, delay);
  };

  const handleDelete = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('cf_portfolio_msgs', JSON.stringify(updated));
  };

  const handleVote = (id: string, delta: number) => {
    const updated = messages.map(m => {
      if (m.id === id) {
        return { ...m, upvotes: m.upvotes + delta };
      }
      return m;
    });
    setMessages(updated);
    localStorage.setItem('cf_portfolio_msgs', JSON.stringify(updated));
  };

  const renderWriteEntry = () => {
    return (
      <div className="roundbox">
        <div className="roundbox-header">
          <span>→ Write new blog entry (Send message to Drumil)</span>
        </div>
        <div className="roundbox-content">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div className="cf-form-group">
              <label htmlFor="msg-subject">Subject / Title</label>
              <input 
                id="msg-subject"
                type="text" 
                className="cf-input"
                placeholder="Inquiry / Interview Invitation / Feedback..." 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={isSending}
              />
            </div>

            <div className="cf-form-group">
              <label htmlFor="msg-body">Content / Message Body</label>
              <textarea 
                id="msg-body"
                className="cf-textarea"
                rows={8}
                placeholder="Type your message details here... Let me know about job openings, contract projects, or questions."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                disabled={isSending}
              />
            </div>

            {/* MEV Gas slider fun element */}
            <div className="cf-form-group" style={{ backgroundColor: 'var(--bg-color)', padding: '15px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>⛽ MEV Gas Priority Fee (Mempool Speed)</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', color: 'var(--cf-yellow)' }}>{gasPrice} Gwei</span>
              </div>
              <label htmlFor="gas-price-slider" style={{ display: 'none' }}>Gas Price Slider</label>
              <input 
                id="gas-price-slider"
                type="range" 
                min="10" 
                max="100" 
                value={gasPrice}
                onChange={(e) => setGasPrice(parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
                disabled={isSending}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <span>10 Gwei (Standard - ~3s delay)</span>
                <span>100 Gwei (Flashbots bundle - instant block inclusion)</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                className="cf-btn" 
                onClick={() => { setSubject(''); setBody(''); }}
                disabled={isSending}
              >
                Clear
              </button>
              <button 
                type="submit" 
                className="cf-btn primary"
                disabled={isSending}
              >
                {isSending ? 'Mining transaction...' : 'Post Entry (Send Message)'}
              </button>
            </div>

          </form>
        </div>
      </div>
    );
  };

  const renderSentMessages = () => {
    if (messages.length === 0) {
      return (
        <div className="roundbox" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <h3>No posts found</h3>
          <p style={{ marginTop: '5px' }}>You haven't posted any entries to Drumil yet. Use the "Write New Entry" tab to get in touch!</p>
          <button 
            className="cf-btn primary" 
            onClick={() => setActiveSubTab('write-entry')}
            style={{ marginTop: '15px' }}
          >
            Write Entry
          </button>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {messages.map(msg => (
          <div className="roundbox" key={msg.id} style={{ borderLeft: '4px solid var(--cf-yellow)' }}>
            
            {/* Title & Stats */}
            <div className="roundbox-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{msg.subject}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="status-badge live" style={{ fontSize: '10px' }}>
                  Gas: {msg.gasPrice} Gwei
                </span>
                <button 
                  onClick={() => handleDelete(msg.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--cf-red)', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="roundbox-content">
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '13.5px' }}>
                {msg.body}
              </p>
              
              {/* Footer Blog Style elements */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', marginTop: '15px', paddingTop: '10px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <div>
                  Posted by <span className="cf-handle pupil">You</span> | 📅 {msg.date}
                </div>
                
                {/* Voting widgets */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                  <button 
                    onClick={() => handleVote(msg.id, 1)}
                    style={{ background: 'none', border: 'none', color: 'var(--rating-green)', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    ▲
                  </button>
                  <span style={{ color: msg.upvotes > 0 ? 'var(--rating-green)' : 'var(--text-primary)' }}>
                    {msg.upvotes > 0 ? `+${msg.upvotes}` : msg.upvotes}
                  </span>
                  <button 
                    onClick={() => handleVote(msg.id, -1)}
                    style={{ background: 'none', border: 'none', color: 'var(--cf-red)', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    ▼
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {activeSubTab === 'write-entry' ? renderWriteEntry() : renderSentMessages()}
    </div>
  );
};
