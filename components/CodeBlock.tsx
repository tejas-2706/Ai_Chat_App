import { CodeBlockProps } from "@/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Helper component for syntax highlighting code blocks
export const CodeBlock = ({ inline, className, children } : CodeBlockProps) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div">
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <SyntaxHighlighter style={dracula} PreTag="div">
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};