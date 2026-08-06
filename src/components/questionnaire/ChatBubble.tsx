const ChatBubble = ({ role, text, typing }) => {
  const isBot = role === "bot";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isBot
            ? "bg-muted text-foreground rounded-bl-md"
            : "bg-primary text-primary-foreground rounded-br-md"
        }`}
      >
        {typing ? (
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
          </span>
        ) : (
          text
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
