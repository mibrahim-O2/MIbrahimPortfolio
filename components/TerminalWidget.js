'use client';

import { useEffect, useRef, useState } from 'react';
import { personalInfo } from '@/data/personal';
import { skillsData } from '@/data/skills';
import { projectsData } from '@/data/projects';
import { aboutParagraphs } from '@/data/about';

const TERMINAL_VERSION = "1.0.1";

const PROMPT_USER = 'ibrahim@ai-core';
const SUDO_STEP_MS = 450; // delay between the "access granted" lines
const MAX_INPUT_LENGTH = 200;
const SOCIAL_NAMES = ['GitHub', 'LinkedIn', 'YouTube', 'X'];

// ---------------------------------------------------------------------------------------------
// Output model: a "line" is an array of segments { text, tone?, href?, external?, scroll? }.
// Segments are rendered as React elements, so any user-typed text is escaped automatically.
// ---------------------------------------------------------------------------------------------
const seg = (text, tone) => ({ text, tone });
const link = (text, href, extra = {}) => ({ text, href, tone: 'link', ...extra });

const digitsOnly = (value) => String(value).replace(/[^\d+]/g, '');

// ---------------------------------------------------------------------------------------------
// Commands. Everything is read from the data files at run time.
// ---------------------------------------------------------------------------------------------
const helpEntries = [
  ['help', 'List all commands'],
  ['whoami', 'Who I am, in a few lines'],
  ['about', 'A short summary of my work'],
  ['skills', 'Skills grouped by area'],
  ['projects', 'Numbered list of projects'],
  ['project <n>', 'Details for one project, e.g. "project 1"'],
  ['contact', 'Email, phone and location'],
  ['socials', 'GitHub, LinkedIn, YouTube and X'],
  ['status', 'Current availability'],
  ['sudo hire', 'Fast-track a conversation with me'],
  ['clear', 'Clear the screen']
];

// Names used for Tab completion and "Did you mean" suggestions.
const COMMAND_NAMES = ['help', 'whoami', 'about', 'skills', 'projects', 'project', 'contact', 'socials', 'status', 'sudo hire', 'clear'];

const helpLines = () => [
  [seg('Available commands', 'heading')],
  ...helpEntries.map(([name, description]) => [seg(name.padEnd(13), 'teal'), seg(description, 'muted')])
];

const whoamiLines = () => [
  [seg(personalInfo.name, 'strong')],
  [seg(personalInfo.title, 'accent')],
  [seg(`Based in ${personalInfo.location}. Type 'about' for the short story.`, 'muted')]
];

const aboutLines = () => {
  const first = aboutParagraphs[0]?.text || '';
  // Sentence split without lookbehind (older Safari can't parse it)
  const sentences = (first.match(/[^.!?]+[.!?]+/g) || [first]).map((sentence) => sentence.trim());
  return [[seg('About', 'heading')], [seg(sentences.slice(0, 2).join(' '))]];
};

const skillsLines = () => [
  [seg('Skills', 'heading')],
  ...skillsData.map((group) => [
    seg(`${group.title}: `, 'teal'),
    seg(group.items.map((skill) => skill.name).join(', '))
  ])
];

const projectsLines = () => [
  [seg('Projects', 'heading')],
  ...projectsData.map((project, index) => [
    seg(`${String(index + 1).padStart(2, '0')}. `, 'teal'),
    seg(project.title, 'strong')
  ]),
  [seg("Type 'project <number>' for details.", 'muted')]
];

const projectLines = (args) => {
  const total = projectsData.length;
  const usage = [seg(`Usage: project <number>  (1-${total}, see 'projects')`, 'error')];

  if (args.length === 0) return [usage];
  if (args.length > 1 || !/^\d+$/.test(args[0])) {
    return [[seg(`Invalid project number: "${args.join(' ')}". Pick a number from 1 to ${total}.`, 'error')]];
  }
  const number = Number(args[0]);
  if (number < 1 || number > total) {
    return [[seg(`No project #${number}. Pick a number from 1 to ${total}.`, 'error')]];
  }

  const project = projectsData[number - 1];
  const lines = [[seg(`${String(number).padStart(2, '0')}. ${project.title}`, 'strong')]];
  if (project.description) lines.push([seg(project.description)]);
  if (project.tags?.length) lines.push([seg('Stack: ', 'teal'), seg(project.tags.join(', '))]);
  if (project.demoUrl) lines.push([seg('Demo:  ', 'teal'), link(project.demoUrl, project.demoUrl, { external: true })]);
  else if (project.videoUrl) lines.push([seg('Video: ', 'teal'), link(project.videoUrl, project.videoUrl, { external: true })]);
  if (project.githubUrl) lines.push([seg('GitHub: ', 'teal'), link(project.githubUrl, project.githubUrl, { external: true })]);
  return lines;
};

const contactLines = () => [
  [seg('Contact', 'heading')],
  [seg('Email:    ', 'teal'), link(personalInfo.email, `mailto:${personalInfo.email}`)],
  [seg('Phone:    ', 'teal'), link(personalInfo.phone, `tel:${digitsOnly(personalInfo.phone)}`)],
  [seg('Location: ', 'teal'), seg(personalInfo.location)]
];

const socialsLines = () => [
  [seg('Socials', 'heading')],
  ...personalInfo.socialLinks
    .filter((social) => SOCIAL_NAMES.includes(social.name))
    .map((social) => [seg(`${social.name.padEnd(9)}`, 'teal'), link(social.url, social.url, { external: true })])
];

const statusLines = () => {
  const text = personalInfo.statusPill || '';
  const split = text.indexOf(':');
  return split === -1
    ? [[seg(text, 'accent')]]
    : [[seg(text.slice(0, split + 1), 'accent'), seg(text.slice(split + 1))]];
};

const sudoSequence = () => [
  [seg('[sudo] password for recruiter: ', 'muted'), seg('********', 'muted')],
  [seg('Verifying credentials... ', 'muted'), seg('OK', 'teal')],
  [seg('ACCESS GRANTED', 'heading'), seg(` - hire privileges elevated for ${personalInfo.name}`)]
];

const sudoFinale = () => [
  [seg('Fast-tracking your message. Email me at '), link(personalInfo.email, `mailto:${personalInfo.email}`)],
  [link('Jump to the Contact section ->', '/contact', { scroll: true })]
];

const SIMPLE_COMMANDS = {
  help: helpLines,
  whoami: whoamiLines,
  about: aboutLines,
  skills: skillsLines,
  projects: projectsLines,
  contact: contactLines,
  socials: socialsLines,
  status: statusLines
};

// ---------------------------------------------------------------------------------------------
// Typo suggestions (optimal string alignment distance: an adjacent swap counts as one edit)
// ---------------------------------------------------------------------------------------------
const editDistance = (a, b) => {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const d = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[rows - 1][cols - 1];
};

const suggestCommand = (input) => {
  const query = input.toLowerCase();
  const firstWord = query.split(' ')[0];
  const limit = query.length <= 4 ? 1 : 2;
  let best = null;
  let bestDistance = Infinity;

  COMMAND_NAMES.forEach((name) => {
    let distance = editDistance(query, name);
    if (!name.includes(' ')) distance = Math.min(distance, editDistance(firstWord, name));
    if (query.length >= 3 && name.startsWith(query)) distance = Math.min(distance, 1);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = name;
    }
  });
  return bestDistance <= limit ? best : null;
};

const commonPrefix = (words) =>
  words.reduce((prefix, word) => {
    let i = 0;
    while (i < prefix.length && i < word.length && prefix[i] === word[i]) i += 1;
    return prefix.slice(0, i);
  });

const safeHref = (href) => (/^(https?:|mailto:|tel:|\/)/i.test(href) ? href : undefined);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollToContact = (event) => {
  const section = document.getElementById('contact');
  if (!section) return; // not on the home page: let the link open /contact
  event.preventDefault();
  section.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};

// ---------------------------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------------------------
function TerminalLine({ line, index, instant }) {
  const length = line.reduce((sum, part) => sum + part.text.length, 0);
  const style = {
    '--i': instant ? 0 : Math.min(index, 14),
    '--steps': Math.max(1, Math.min(length, 48)),
    '--dur': `${Math.min(700, 120 + length * 8)}ms`
  };

  return (
    <div className="terminal-out-line" style={style}>
      {line.map((part, partIndex) => {
        const href = part.href ? safeHref(part.href) : undefined;
        if (href) {
          return (
            <a
              key={partIndex}
              className="terminal-link"
              href={href}
              target={part.external ? '_blank' : undefined}
              rel={part.external ? 'noopener noreferrer' : undefined}
              onClick={part.scroll ? scrollToContact : undefined}
            >
              {part.text}
            </a>
          );
        }
        return (
          <span key={partIndex} className={part.tone ? `terminal-tone-${part.tone}` : undefined}>
            {part.text}
          </span>
        );
      })}
    </div>
  );
}

function Prompt() {
  return (
    <span className="terminal-prompt">
      {PROMPT_USER}:<span className="terminal-prompt-path">~</span>$
    </span>
  );
}

export default function TerminalWidget() {
  const [inputVal, setInputVal] = useState('');
  const [entries, setEntries] = useState([]);
  const [busy, setBusy] = useState(false);

  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]); // submitted commands, in memory only
  const historyPosRef = useRef(-1); // -1 = not browsing history
  const draftRef = useRef(''); // what was typed before browsing history
  const entryIdRef = useRef(0);
  const timersRef = useRef(new Set());
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const timers = timersRef.current;
    return () => {
      mountedRef.current = false;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  // Keep the latest line in view
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [entries]);

  const schedule = (callback, delay) => {
    const timer = window.setTimeout(() => {
      timersRef.current.delete(timer);
      if (mountedRef.current) callback();
    }, delay);
    timersRef.current.add(timer);
  };

  const addEntry = (command, lines, extra = {}) => {
    entryIdRef.current += 1;
    const id = entryIdRef.current;
    setEntries((prev) => [...prev, { id, command, lines, ...extra }]);
    return id;
  };

  const appendLine = (id, line) => {
    setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, lines: [...entry.lines, line] } : entry)));
  };

  const runSudoHire = (commandText) => {
    const id = addEntry(commandText, [], { instant: true });
    const lines = [...sudoSequence(), ...sudoFinale()];
    const step = prefersReducedMotion() ? 0 : SUDO_STEP_MS;
    setBusy(true);
    lines.forEach((line, index) => schedule(() => appendLine(id, line), (index + 1) * step));
    schedule(() => setBusy(false), (lines.length + 1) * step);
  };

  const submit = () => {
    const shown = inputVal.trim();
    const normalized = shown.replace(/\s+/g, ' ');
    const lower = normalized.toLowerCase();

    setInputVal('');
    historyPosRef.current = -1;
    draftRef.current = '';

    if (!normalized) {
      addEntry('', []); // only a fresh prompt line
      return;
    }

    if (historyRef.current[historyRef.current.length - 1] !== normalized) {
      historyRef.current.push(normalized);
    }

    if (lower === 'clear') {
      setEntries([]);
      return;
    }
    if (lower === 'sudo hire') {
      runSudoHire(shown);
      return;
    }

    const [word, ...args] = lower.split(' ');
    if (word === 'project') {
      addEntry(shown, projectLines(args));
      return;
    }
    if (SIMPLE_COMMANDS[lower]) {
      addEntry(shown, SIMPLE_COMMANDS[lower]());
      return;
    }

    const suggestion = suggestCommand(lower);
    const lines = [[seg('command not found: ', 'error'), seg(`${shown}. Type 'help' for the list.`)]];
    if (suggestion) lines.push([seg(`Did you mean '${suggestion}'?`, 'muted')]);
    addEntry(shown, lines);
  };

  const browseHistory = (direction) => {
    const history = historyRef.current;
    if (!history.length) return;

    if (direction < 0) {
      if (historyPosRef.current === -1) {
        draftRef.current = inputVal;
        historyPosRef.current = history.length - 1;
      } else if (historyPosRef.current > 0) {
        historyPosRef.current -= 1;
      }
      setInputVal(history[historyPosRef.current]);
    } else if (historyPosRef.current !== -1) {
      if (historyPosRef.current < history.length - 1) {
        historyPosRef.current += 1;
        setInputVal(history[historyPosRef.current]);
      } else {
        historyPosRef.current = -1;
        setInputVal(draftRef.current);
      }
    }
  };

  const autocomplete = () => {
    const typed = inputVal.replace(/\s+/g, ' ').trimStart().toLowerCase();
    if (!typed) return;
    const matches = COMMAND_NAMES.filter((name) => name.startsWith(typed));
    if (!matches.length) return;
    setInputVal(commonPrefix(matches));
  };

  const handleKeyDown = (event) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!busy) submit();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      browseHistory(-1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      browseHistory(1);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      autocomplete();
    }
  };

  const focusInput = () => {
    if (window.getSelection && window.getSelection().toString()) return; // don't steal a text selection
    if (inputRef.current) inputRef.current.focus({ preventScroll: true });
  };

  return (
    <div className="terminal-widget">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn close"></span>
          <span className="terminal-btn minimize"></span>
          <span className="terminal-btn maximize"></span>
        </div>
        <div className="terminal-title">muhammad_ibrahim@ai-core:~</div>
        <div>
          <i className="fas fa-terminal" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}></i>
        </div>
      </div>

      <div className="terminal-body" id="terminal-body" ref={bodyRef} onClick={focusInput}>
        <div className="terminal-welcome">
          {`Welcome to Ibrahim's AI Core Terminal [Version ${TERMINAL_VERSION}]`}
          <br />
          {"Type 'help' to see list of active commands or 'sudo hire' for access."}
        </div>

        <div id="terminal-history" role="log" aria-live="polite">
          {entries.map((entry) => (
            <div key={entry.id}>
              <div className="terminal-input-line">
                <Prompt />
                <span className="terminal-typed">{entry.command}</span>
              </div>
              {entry.lines.length > 0 && (
                <div className="terminal-output">
                  {entry.lines.map((line, index) => (
                    <TerminalLine key={index} line={line} index={index} instant={entry.instant} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="terminal-input-line">
          <Prompt />
          <input
            type="text"
            ref={inputRef}
            className="terminal-input"
            aria-label="Terminal command input"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            maxLength={MAX_INPUT_LENGTH}
            placeholder="Type help..."
            value={inputVal}
            readOnly={busy}
            onChange={(event) => setInputVal(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}
