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
  const [excelSheet, setExcelSheet] = useState('');
  const [topic, setTopic] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = '';
    let payload = {
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    // --- EXISTING LOGIC ---
    if (name === 'karthik') {
      if (action === 'youtube-search') {
        url = 'https://thikkananda.app.n8n.cloud/webhook/f999c11d-0ba6-4102-8b4f-84cac72de457';
      } else if (action === 'channel-search') {
        url = 'https://thikkananda.app.n8n.cloud/webhook/7440669c-6d45-43d5-90ed-2f363b2f0805';
      }
    } else if (name === 'karishma') {
      if (action === 'youtube-search') {
        url = 'https://karishma125.app.n8n.cloud/webhook/cd1bc2c8-fa96-4ee1-89d2-f017de7f0792';
      } else if (action === 'channel-search') {
        url = 'https://karishma125.app.n8n.cloud/webhook/989e6a50-d7fa-4162-8f02-f5f664072739';
      }
    } else if (name === 'karishma.corporate') {
      if (action === 'youtube-search') {
        url = 'https://hook.eu2.make.com/atxtuditwkx89tk64f6ygdaix7umpte7';
      } else if (action === 'channel-search') {
        url = 'https://hook.eu2.make.com/5fjmf1eip1uelw2tod3c8fc0rwe2qqom';
      }
    } else if (name === 'playlist-creator') {
      url = 'https://hook.eu2.make.com/id5lq2tldmutsaoldsbr95m6elmaca7f';
      payload.excelSheet = excelSheet;
    } else if (name === 'toneacademy') {
      url = 'https://aiautomation15.app.n8n.cloud/webhook/e142e4a5-187e-4cd9-9957-37e979d2e639';
      payload = {
        topic,
        category: 'blogs',
      };
    } 
    // --- Facebook Post ---
    else if (name === 'facebook-post') {
      url = 'https://makeagents250.app.n8n.cloud/webhook/625fb4f9-c22b-4982-934f-22c5571389a1';
      payload = {
        Topic: topic,
      };
    }
    // --- YouTube Upload ---
    else if (name === 'youtube-upload') {
      url = 'https://makeagents250.app.n8n.cloud/webhook/2df64ee6-e8aa-41c8-9399-e012506a36dd';
      payload = {
        folderLink: topic, // topic used as folder URL
      };
    }

    if (!url) {
      toast.error('Please select a valid name and action.');
      return;
    }

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

      // Reset form
      setName('');
      setAction('');
      setTitle('');
      setDescription('');
      setTags('');
      setExcelSheet('');
      setTopic('');
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
          <select
            className='dropdown'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          >
            <option value="">--Select--</option>
            <option value="karthik">Karthik</option>
            <option value="karishma">Karishma</option>
            <option value="karishma.corporate">TheAutomationMirror</option>
            <option value="playlist-creator">Playlist Creator</option>
            <option value="toneacademy">ToneAcademy</option>
            <option value="facebook-post">Facebook Post</option>
            <option value="youtube-upload">YouTube Upload</option> {/* ✅ New Option */}
          </select>
        </label>

        {/* Hide Action + Tags for playlist-creator, toneacademy, facebook-post, youtube-upload */}
        {!['playlist-creator', 'toneacademy', 'facebook-post', 'youtube-upload'].includes(name) && (
          <>
            <label className='labels'>
              Action Type:
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                required
              >
                <option value="">--Select--</option>
                <option value="youtube-search">YouTube Search</option>
                <option value="channel-search">Channel Search</option>
              </select>
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
          </>
        )}

        {/* Hide Title + Description for toneacademy, playlist-creator, facebook-post, youtube-upload */}
        {!['toneacademy', 'playlist-creator', 'facebook-post', 'youtube-upload'].includes(name) && (
          <>
            <label className='labels'>
              Title:
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label className='labels'>
              Description:
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </>
        )}

        {/* Excel Sheet field */}
        {name === 'playlist-creator' && (
          <label className='labels'>
            ExcelSheet URL:
            <input
              value={excelSheet}
              onChange={(e) => setExcelSheet(e.target.value)}
              placeholder="Enter Excel Sheet URL"
              required
            />
          </label>
        )}

        {/* Topic / Folder field */}
        {['toneacademy', 'facebook-post', 'youtube-upload'].includes(name) && (
          <label className='labels'>
            {name === 'youtube-upload' ? 'Folder URL:' : 'Topic Name:'}
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={name === 'youtube-upload' ? "Enter folder URL" : "Enter topic name"}
              required
            />
          </label>
        )}

        <button type="submit">Submit</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
