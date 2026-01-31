import React, { useState } from 'react';
import { Mail, Send, AlertCircle, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus('error');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      return false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setStatus('error');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    setStatus('loading');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: '🔗' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { name: 'Kaggle', url: 'https://kaggle.com', icon: '🏆' },
    { name: 'Email', url: 'mailto:your-email@example.com', icon: '✉️' }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-100">Get in Touch</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Let's collaborate on exciting data science and ML projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-slate-300 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-slate-300 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-slate-300 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>

              {/* Status Messages */}
              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-300 text-sm">Please check all fields and try again</p>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <p className="text-green-300 text-sm">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {/* Email Info */}
            <div className="bg-slate-700/50 border border-slate-600 hover:border-blue-400 rounded-xl p-6 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-400/50 flex items-center justify-center text-2xl">
                  <Mail />
                </div>
                <div>
                  <h3 className="text-slate-100 font-semibold mb-1">Email</h3>
                  <p className="text-slate-400 mb-2">your.email@example.com</p>
                  <p className="text-slate-400 text-sm">Typically respond within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-slate-100 font-semibold mb-4">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="group bg-slate-700/50 border border-slate-600 hover:border-blue-400 rounded-lg p-4 transition-all duration-300 flex items-center gap-3 hover:bg-slate-700"
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="text-slate-300 group-hover:text-blue-400 font-medium transition-colors">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-slate-600 rounded-lg p-6">
              <h4 className="text-slate-100 font-semibold mb-4">Let's Collaborate</h4>
              <p className="text-slate-300 leading-relaxed">
                I'm always interested in discussing data science projects, ML research, and full-stack development opportunities. Feel free to reach out for collaborations or inquiries!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
