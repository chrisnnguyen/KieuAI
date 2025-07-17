import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://127.0.0.1:8000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.message || 'Gửi thành công!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <section className="contact" id="get-started">
      <h2>Liên hệ với Kieu AI</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Tên của bạn" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Nội dung" required />
        <button type="submit">Gửi liên hệ</button>
      </form>
      {status && <div className="form-status">{status}</div>}
    </section>
  );
};

export default Contact; 