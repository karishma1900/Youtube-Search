import { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [name, setName] = useState('');
  const [action, setAction] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = '';

    // ✅ Set API based on name and action
    if (name === 'karthik') {
      if (action === 'youtube-search') {
        url = 'https://thikkananda.app.n8n.cloud/webhook/f999c11d-0ba6-4102-8b4f-84cac72de457';
      } else if (action === 'channel-search') {
        url = 'https://thikkananda.app.n8n.cloud/webhook-test/7440669c-6d45-43d5-90ed-2f363b2f0805';
      }
    } else if (name === 'karishma') {
      if (action === 'youtube-search') {
        url = 'https://karishma125.app.n8n.cloud/webhook-test/cd1bc2c8-fa96-4ee1-89d2-f017de7f0792';
      } else if (action === 'channel-search') {
        url = 'https://karishma125.app.n8n.cloud/webhook-test/989e6a50-d7fa-4162-8f02-f5f664072739';
      }
    }

    if (!url) {
      toast.error('Please select a valid name and action.');
      return;
    }

    const payload = {
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()), // ✅ Convert tags to array
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed');

      const result = await res.json();
      console.log('Response:', result);
      toast.success('Submitted successfully! ✅');

      // ✅ Reset form
      setName('');
      setAction('');
      setTitle('');
      setDescription('');
      setTags('');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Submission failed! ❌');
    }
  };

  return (
    <div className="form-container">
      <h2>Submit YouTube Data</h2>

      <form onSubmit={handleSubmit}>
        <label className='labels'>
          Select Name:
          <select className='dropdown' value={name} onChange={(e) => setName(e.target.value)} required>
            <option value="">--Select--</option>
            <option value="karthik">Karthik</option>
            <option value="karishma">Karishma</option>
          </select>
        </label>

        <label className='labels'>
          Action Type:
          <select value={action} onChange={(e) => setAction(e.target.value)} required>
            <option value="">--Select--</option>
            <option value="youtube-search">YouTube Search</option>
            <option value="channel-search">Channel Search</option>
          </select>
        </label>

        <label className='labels'>
          Title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label className='labels'>
          Description:
          <input value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>

        <label className='labels'>
          Tags:
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Comma-separated tags (e.g., AI, React)"
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
