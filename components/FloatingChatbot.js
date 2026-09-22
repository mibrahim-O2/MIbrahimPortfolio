'use client';

import { useState, useRef, useEffect } from 'react';
import { personalInfo } from '@/data/personal';
import { projectsData } from '@/data/projects';
import { experienceData } from '@/data/experience';
import { educationData } from '@/data/education';
import { skillsData, softSkills } from '@/data/skills';
import { certificatesData } from '@/data/certificates';
import { volunteerData } from '@/data/volunteer';
import { aboutParagraphs } from '@/data/about';
import { galleryCategories } from '@/data/gallery';
import { fallbackGalleryItems } from '@/utils/galleryLoader';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello! 👋 I'm a keyword assistant for Ibrahim's portfolio. Ask me about Ibrahim's education, experience, skills, projects, or contact details.`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = generateNLPResponse(query);
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 500);
  };

  const generateNLPResponse = (query) => {
    const lower = query.toLowerCase().trim();
    const has = (...words) => words.some((word) => lower.includes(word));

    if (/^(hi|hello|hey|greetings|who are you|intro|about)\b/i.test(lower)) {
      return `Hello! 👋 I am **${personalInfo.name}** (${personalInfo.title}) from **${personalInfo.location}**.\n\n${aboutParagraphs[0].text}\n\nAsk me about my education, experience, skills, projects, or contact details.`;
    }

    if (has('freelance', 'client')) {
      const freelance = projectsData.filter((p) => (p.categories || []).includes('Freelance & Client'));
      if (!freelance.length) return "I don't have any freelance or client projects listed yet.";
      let resp = `My **Freelance & Client Projects**:\n\n`;
      freelance.forEach((p, i) => {
        resp += `${i + 1}. **${p.title}**\n   - ${p.description}\n   - **Stack:** ${(p.tags || []).join(', ')}\n\n`;
      });
      return resp.trim();
    }

    if (has('contact', 'email', 'phone', 'reach', 'hire', 'linkedin', 'github', 'location')) {
      const links = personalInfo.socialLinks.filter((link) => ['GitHub', 'LinkedIn'].includes(link.name));
      return `You can reach me directly via:\n- 📧 **Email:** [${personalInfo.email}](mailto:${personalInfo.email})\n- 📞 **Phone:** [${personalInfo.phone}](tel:${personalInfo.phone.replace(/\s/g, '')})\n- 📍 **Location:** ${personalInfo.location}\n${links.map((link) => `- 🔗 **${link.name}:** [${link.url}](${link.url})`).join('\n')}\n\n${personalInfo.statusPill}.`;
    }

    const asked = projectsData.find((p) => lower.includes(p.id) || lower.includes(p.title.toLowerCase()));
    if (asked) {
      return `**${asked.title}**:\n${asked.description}\n\n**Technologies:** ${(asked.tags || []).join(', ')}`;
    }

    if (has('project', 'built', 'portfolio')) {
      return 'My projects:\n\n' + projectsData.map((p) => `- **${p.title}** (${p.status}): ${p.subtitle}`).join('\n');
    }

    if (has('skill', 'stack', 'technology', 'technologies', 'language', 'tools')) {
      return 'My core technical stack includes:\n\n' + skillsData.map((group) => `- **${group.title}:** ${group.items.map((item) => item.name).join(', ')}.`).join('\n');
    }

    if (has('soft skill', 'strength')) {
      return 'My soft skills:\n\n' + softSkills.map((skill) => `- **${skill.title}:** ${skill.description}`).join('\n');
    }

    if (has('education', 'degree', 'study', 'studied', 'university', 'college', 'school')) {
      return 'Regarding my education:\n\n' + educationData.map((edu) => `- **${edu.title}** (${edu.degree}), ${edu.institutionName}, ${edu.period}${edu.status ? ` (${edu.status})` : ''}`).join('\n');
    }

    if (has('volunteer')) {
      return 'My volunteer experience:\n\n' + volunteerData.map((v) => `- **${v.role}**${v.organization ? `, ${v.organization}` : ''} (${v.period}): ${v.description}`).join('\n');
    }

    if (has('experience', 'work', 'job', 'career', 'intern')) {
      return 'Here is a summary of my experience:\n\n' + experienceData.map((exp) => `- **${exp.role}**, ${exp.company}: ${exp.project} (${exp.period})`).join('\n');
    }

    if (has('award', 'prize', 'honor', 'honour', 'achievement')) {
      return "There are no awards listed on this portfolio yet. You can ask about my **certifications** instead.";
    }

    if (has('certificate', 'certification', 'course')) {
      return certificatesData.length
        ? 'My certifications:\n\n' + certificatesData.map((c) => `- 📜 **${c.title}** (${c.issuer}${c.issuerVia ? ` via ${c.issuerVia}` : ''}, ${c.date})`).join('\n')
        : "I don't have any certifications listed yet.";
    }

    if (has('gallery', 'photo', 'picture', 'image')) {
      return `My gallery has **${fallbackGalleryItems.length} photos** (${galleryCategories.map((c) => c.label).join(', ')}). You can browse them on the [Gallery page](/gallery).`;
    }

    return `I couldn't find that in Ibrahim's portfolio. Try asking about my **education**, **experience**, **skills**, **projects** (like ${projectsData.slice(0, 3).map((p) => p.title).join(', ')}), **volunteering**, **certifications**, or **contact details**.`;
  };

  const renderMarkdown = (text) => {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--primary);text-decoration:underline;">$1</a>');
    html = html.replace(/\n/g, '<br>');
    return html;
  };

  return (
    <>
      {/* Chat Tooltip Popup */}
      {showTooltip && !isOpen && (
        <div
          className="chat-tooltip-popup active"
          id="chat-tooltip-popup"
          onClick={() => {
            setShowTooltip(false);
            setIsOpen(true);
          }}
        >
          <span className="chat-tooltip-avatar">
            <i className="fas fa-robot"></i>
          </span>
          <span>Ask about Ibrahim</span>
          <div className="chat-tooltip-arrow"></div>
        </div>
      )}

      {/* Floating Chatbot Widget Button */}
      <button
        className="chat-widget-btn"
        id="chat-widget-btn"
        aria-label="Open Chat Assistant"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'}`}></i>
      </button>

      {/* Floating Chatbot Container */}
      <div className={`chat-widget-container ${isOpen ? 'active' : ''}`} id="chat-widget-container" data-lenis-prevent>
        <div className="chat-widget-header">
          <div className="chat-header-info">
            <div className="chat-header-avatar">
              <img src={personalInfo.avatarUrl} alt="Muhammad Ibrahim" />
            </div>
            <div className="chat-header-title">
              <h4>Ibrahim's Portfolio Assistant</h4>
              <div className="chat-header-status">
                <span className="chat-header-status-dot"></span>
                <span>Online & Ready</span>
              </div>
            </div>
          </div>
          <button
            className="chat-widget-close"
            id="chat-widget-close"
            aria-label="Close Chat"
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="chat-widget-messages" id="chat-widget-messages" ref={messagesEndRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-msg ${msg.sender}`}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
            ></div>
          ))}
          {isTyping && (
            <div className="chat-msg bot typing-indicator-container">
              <div className="typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
        </div>

        <div className="chat-widget-chips">
          <span className="chat-chip" onClick={() => handleSend(`Tell me about ${projectsData[0]?.title}`)}>
            {projectsData[0]?.title} Info
          </span>
          <span className="chat-chip" onClick={() => handleSend('What are the skills?')}>
            Core Skills
          </span>
          <span className="chat-chip" onClick={() => handleSend('How do I contact Ibrahim?')}>
            Contact Info
          </span>
        </div>

        <div className="chat-widget-input-area">
          <input
            type="text"
            className="chat-widget-input"
            id="chat-widget-input"
            placeholder="Ask about skills, projects..."
            autoComplete="off"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button
            className="chat-widget-send"
            id="chat-widget-send"
            aria-label="Send Message"
            onClick={() => handleSend()}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
}
