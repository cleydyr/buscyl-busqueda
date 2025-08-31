import { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <button
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">
          <span className="accordion-info-icon">ℹ️</span>
          {title}
        </span>
        <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
}