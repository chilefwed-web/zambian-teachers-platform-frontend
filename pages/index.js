import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [subject, setSubject] = useState('ICT');
  const [form, setForm] = useState(1);
  const [term, setTerm] = useState(1);
  const [year, setYear] = useState('2026');
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateScheme = async () => {
    setLoading(true);
    try {
      // ?? IMPORTANT: Replace YOUR_BACKEND_URL_HERE with your actual Render URL
      // Example: https://zambian-teachers-platform-backend.onrender.com
      const response = await axios.post('YOUR_BACKEND_URL_HERE/api/generate-scheme', {
        subject_code: subject,
        form_level: form,
        term: term,
        academic_year: year
      });
      setScheme(response.data.data);
    } catch (error) {
      alert('Error generating scheme. Please make sure your backend is running.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <header>
        <h1>???? Zambian Teachers Platform</h1>
        <p>Your CBC Teaching Companion</p>
        <p className="subtitle">Pre-School • Primary • Secondary (Forms 1-4)</p>
      </header>

      <main>
        <div className="generator-card">
          <h2>Generate Scheme of Work</h2>
          <div className="form-group">
            <label>Subject Code</label>
            <input 
              type="text" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              placeholder="e.g., ICT, MATH, SCI"
            />
          </div>
          <div className="form-group">
            <label>Form Level</label>
            <select value={form} onChange={(e) => setForm(Number(e.target.value))}>
              <option value={1}>Form 1</option>
              <option value={2}>Form 2</option>
              <option value={3}>Form 3</option>
              <option value={4}>Form 4</option>
            </select>
          </div>
          <div className="form-group">
            <label>Term</label>
            <select value={term} onChange={(e) => setTerm(Number(e.target.value))}>
              <option value={1}>Term 1</option>
              <option value={2}>Term 2</option>
              <option value={3}>Term 3</option>
            </select>
          </div>
          <div className="form-group">
            <label>Academic Year</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
          </div>
          <button onClick={generateScheme} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Scheme of Work'}
          </button>
        </div>

        {scheme && (
          <div className="result-card">
            <h2>?? Scheme of Work</h2>
            <p><strong>Subject:</strong> {scheme.subject}</p>
            <p><strong>Form:</strong> {scheme.form}</p>
            <p><strong>Term:</strong> {scheme.term}</p>
            <p><strong>Year:</strong> {scheme.academic_year}</p>
            <p><strong>Total Weeks:</strong> {scheme.total_weeks}</p>
            <table>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Topic</th>
                  <th>Hours</th>
                  <th>Theme</th>
                </tr>
              </thead>
              <tbody>
                {scheme.topics.map((topic, index) => (
                  <tr key={index}>
                    <td>{topic.week}</td>
                    <td>{topic.topic}</td>
                    <td>{topic.hours}</td>
                    <td>{topic.theme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer>
        <p>© 2026 Zambian Teachers Platform. ???? Uphuilding Zambia, One Lesson at a Time.</p>
      </footer>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 3px solid #008000;
          margin-bottom: 30px;
        }
        header h1 {
          color: #008000;
          font-size: 2.5rem;
          margin: 0;
        }
        header p {
          color: #DE2010;
          font-size: 1.2rem;
          margin: 5px 0;
        }
        .subtitle {
          color: #333 !important;
          font-size: 0.9rem !important;
          font-weight: bold;
        }
        .generator-card {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .generator-card h2 {
          color: #333;
          margin-top: 0;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 5px;
          color: #555;
        }
        .form-group input, .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        button {
          background: #008000;
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 18px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          width: 100%;
          transition: background 0.3s;
        }
        button:hover {
          background: #006400;
        }
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .result-card {
          background: #fff;
          border: 2px solid #008000;
          border-radius: 8px;
          padding: 30px;
          margin-top: 20px;
          overflow-x: auto;
        }
        .result-card h2 {
          color: #008000;
          margin-top: 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background: #f0f0f0;
          font-weight: 600;
        }
        tr:nth-child(even) {
          background: #f9f9f9;
        }
        footer {
          text-align: center;
          padding: 20px 0;
          margin-top: 40px;
          border-top: 3px solid #DE2010;
          color: #666;
        }
      `}</style>
    </div>
  );
}