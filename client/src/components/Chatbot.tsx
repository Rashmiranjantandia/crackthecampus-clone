import { FormEvent, useState } from "react";
import { Building2, GraduationCap, Send, X } from "lucide-react";

type Message = { from: "bot" | "user"; text: string };

const quickPrompts = [
  { label: "I represent an institution", icon: Building2 },
  { label: "I am a student", icon: GraduationCap },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    const isInstitution = clean.toLowerCase().includes("institution");
    setStarted(true);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: clean },
      {
        from: "bot",
        text: isInstitution
          ? "I can help with institutional demos, assessment hosting, and placement intelligence. Visit the Institution page to explore the suite."
          : "I can help you find assessments, courses, contests, and placement pathways. Start with Explore or create your free workspace.",
      },
    ]);
    setInput("");
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    send(input);
  };

  return (
    <div className={`chatbot-root ${open ? "is-open" : ""}`}>
      {open && (
        <section className="chatbot-panel" aria-label="Ruby Crack The Campus Assistant">
          <header>
            <div className="chatbot-avatar" aria-hidden="true">R</div>
            <div className="chatbot-heading">
              <strong>Ruby</strong>
              <small>Crack The Campus · Assistant</small>
            </div>
            <button type="button" aria-label="Close Ruby chat" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </header>
          <div className="chatbot-messages">
            {!started && (
              <>
                <p className="chat-message bot">Hi — I’m Ruby. Are you exploring Crack The Campus as an Institution or as a student?</p>
                <div className="chat-quick-prompts">
                  {quickPrompts.map(({ label, icon: Icon }) => (
                    <button type="button" key={label} onClick={() => send(label)}>
                      <Icon size={14} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {started && messages.map((message, index) => (
              <p className={`chat-message ${message.from}`} key={`${message.text}-${index}`}>{message.text}</p>
            ))}
          </div>
          {!started && <p className="chatbot-hint">Pick an option above to continue.</p>}
          {started && (
            <form className="chatbot-input" onSubmit={submit}>
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask Ruby anything…" aria-label="Message Ruby" />
              <button type="submit" aria-label="Send message"><Send size={15} /></button>
            </form>
          )}
        </section>
      )}
      <button className="chat-button" type="button" aria-label={open ? "Close Ruby chat" : "Open Ruby chat assistant"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? <X size={22} /> : <span className="chat-ruby-mark">R</span>}
      </button>
    </div>
  );
}
