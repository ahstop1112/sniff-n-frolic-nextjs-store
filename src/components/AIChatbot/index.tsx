'use client';

import { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import type { Message, Product } from './types';
import styles from './AIChatbot.module.scss';


const QUICK_PROMPTS = [
  { label: '🧸 Toys', text: 'Show me dog toys' },
  { label: '🍖 Treats', text: 'What treats do you have?' },
  { label: '🦮 Leashes', text: 'Looking for a leash or harness' },
  { label: '✂️ Grooming', text: 'Grooming products please' },
  { label: '🚗 Car travel', text: 'Products for car travel with my dog' },
  { label: '💧 Water bottles', text: 'Dog water bottles for walks' },
];

const  AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi there! I'm Fei Fei, your Sniff N Frolic shopping assistant 🐾\nTell me about your pet and what you're looking for — I'll help find the perfect match!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setShowQuickPrompts(false);

    const userMessage: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.text,
        products: data.products ?? [],
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat assistant"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {!open && <span className={styles.fabLabel}>Ask Fei Fei</span>}
      </button>

      {/* Chat window */}
      {open && (
        <div className={styles.window}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerAvatar}>🐾</div>
            <div>
              <div className={styles.headerName}>Fei Fei</div>
              <div className={styles.headerSub}>Sniff N Frolic assistant</div>
            </div>
            <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.msgRow} ${msg.role === 'user' ? styles.userRow : ''}`}>
                {msg.role === 'assistant' && <div className={styles.avatar}>🐾</div>}
                <div className={`${styles.bubble} ${msg.role === 'user' ? styles.userBubble : styles.aiBubble}`}>
                  {msg.content}
                  {msg.products && msg.products.length > 0 && (
                    <div className={styles.productList}>
                      {msg.products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className={styles.msgRow}>
                <div className={styles.avatar}>🐾</div>
                <div className={`${styles.bubble} ${styles.aiBubble}`}>
                  <div className={styles.typing}>
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            {showQuickPrompts && !loading && (
              <div className={styles.quickPrompts}>
                {QUICK_PROMPTS.map((q) => (
                  <button key={q.text} className={styles.chip} onClick={() => sendMessage(q.text)}>
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask me anything about our products..."
              disabled={loading}
            />
            <button
              className={styles.sendBtn}
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 2L2 7l5 3 2 5 5-13z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatbot;