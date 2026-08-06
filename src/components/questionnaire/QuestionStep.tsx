import { useState } from "react";

const QuestionStep = ({
  question,
  value,
  onTextSubmit,
  onMultiSelect,
  onSingleSelect,
  onColorSelect,
  onBoolean,
  inputValue,
  setInputValue,
}) => {
  const [selected, setSelected] = useState(value || (question.type === "multiSelect" ? [] : null));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onTextSubmit(inputValue);
      setInputValue("");
    }
  };

  if (question.type === "text") {
    return (
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={question.placeholder}
          autoFocus
          className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={() => {
            onTextSubmit(inputValue);
            setInputValue("");
          }}
          disabled={!inputValue.trim()}
          className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          Send
        </button>
      </div>
    );
  }

  if (question.type === "textarea") {
    return (
      <div className="space-y-2">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.metaKey) {
              onTextSubmit(inputValue);
              setInputValue("");
            }
          }}
          placeholder={question.placeholder}
          rows={3}
          autoFocus
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <div className="flex justify-end">
          <button
            onClick={() => {
              onTextSubmit(inputValue);
              setInputValue("");
            }}
            disabled={!inputValue.trim()}
            className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  if (question.type === "multiSelect") {
    const toggle = (val) => {
      setSelected((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      );
    };

    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
                selected.includes(opt.value)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {selected.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={() => onMultiSelect(selected)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 cursor-pointer"
            >
              Continue ({selected} selected)
            </button>
          </div>
        )}
      </div>
    );
  }

  if (question.type === "singleSelect") {
    return (
      <div className="space-y-2">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSingleSelect(opt.value)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors cursor-pointer ${
              selected === opt.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 bg-background"
            }`}
          >
            <div className="font-medium text-sm text-foreground">{opt.label}</div>
            {opt.desc && (
              <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
            )}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === "color") {
    const presets = [
      "#2563EB", "#7C3AED", "#DB2777", "#DC2626",
      "#EA580C", "#16A34A", "#0891B2", "#4F46E5",
      "#000000", "#374151", "#6B7280", "#D1D5DB",
    ];

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={value || question.default}
            onChange={(e) => onColorSelect(e.target.value)}
            className="w-10 h-10 rounded-lg border border-border cursor-pointer"
          />
          <span className="text-sm text-foreground font-mono">
            {value || question.default}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((color) => (
            <button
              key={color}
              onClick={() => onColorSelect(color)}
              className="w-8 h-8 rounded-lg border-2 border-transparent hover:border-foreground/20 cursor-pointer"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (question.type === "boolean") {
    return (
      <div className="flex gap-3">
        <button
          onClick={() => onBoolean(true)}
          className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:border-primary/50 cursor-pointer"
        >
          Yes
        </button>
        <button
          onClick={() => onBoolean(false)}
          className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:border-primary/50 cursor-pointer"
        >
          No
        </button>
      </div>
    );
  }

  return null;
};

export default QuestionStep;
