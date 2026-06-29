import React from "react";

export interface Frontmatter {
  title: string;
  summary: string;
  date: string;
  readingTime: string;
  category: string;
  author?: string;
  [key: string]: string | undefined;
}

export function parseFrontmatter(fileContent: string): { frontmatter: Frontmatter; content: string } {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return {
      frontmatter: {
        title: "Untitled",
        summary: "",
        date: "",
        readingTime: "3 min read",
        category: "Platform",
        author: "Shutter Team",
      },
      content: fileContent,
    };
  }

  const yamlStr = match[1];
  const bodyContent = match[2];
  
  const frontmatter: any = {
    author: "Shutter Team",
  };
  yamlStr.split("\n").forEach((line) => {
    const parts = line.split(":");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(":").trim().replace(/^["']|["']$/g, "");
      frontmatter[key] = val;
    }
  });

  return { frontmatter, content: bodyContent };
}

export function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentKey = 0;
  
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeBlockLang = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle Code Blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        inCodeBlock = false;
        elements.push(
          React.createElement(
            "pre",
            {
              key: `code-${currentKey++}`,
              className: "bg-black/40 border border-white/[0.05] p-5 rounded-xl font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed my-6",
            },
            React.createElement("code", { className: codeBlockLang }, codeBlockLines.join("\n"))
          )
        );
        codeBlockLines = [];
      } else {
        // Start code block
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3);
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Handle Headings
    if (line.startsWith("# ")) {
      elements.push(
        React.createElement(
          "h1",
          {
            key: `h1-${currentKey++}`,
            className: "text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight mt-10 mb-6",
          },
          parseInlineMarkdown(line.slice(2))
        )
      );
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        React.createElement(
          "h2",
          {
            key: `h2-${currentKey++}`,
            className: "text-2xl font-light text-white tracking-tight leading-snug mt-12 mb-4 border-b border-white/[0.05] pb-2",
          },
          parseInlineMarkdown(line.slice(3))
        )
      );
      continue;
    }
    if (line.startsWith("### ")) {
      elements.push(
        React.createElement(
          "h3",
          {
            key: `h3-${currentKey++}`,
            className: "text-xl font-semibold text-white mt-8 mb-4",
          },
          parseInlineMarkdown(line.slice(4))
        )
      );
      continue;
    }

    // Handle Blockquotes (Alerts/Callouts)
    if (line.startsWith("> ")) {
      const quoteText = line.slice(2).trim();
      let alertClass = "border-l-2 border-accent pl-4 py-1 my-6 text-zinc-400 italic";
      let renderedText = quoteText;

      // Map github style alerts
      if (quoteText.startsWith("[!NOTE]")) {
        alertClass = "border-l-2 border-blue-500 bg-blue-500/5 pl-4 py-3 my-6 text-zinc-300 rounded-r-lg";
        renderedText = quoteText.slice(7).trim();
      } else if (quoteText.startsWith("[!TIP]")) {
        alertClass = "border-l-2 border-emerald-500 bg-emerald-500/5 pl-4 py-3 my-6 text-zinc-300 rounded-r-lg";
        renderedText = quoteText.slice(6).trim();
      } else if (quoteText.startsWith("[!IMPORTANT]")) {
        alertClass = "border-l-2 border-purple-500 bg-purple-500/5 pl-4 py-3 my-6 text-zinc-300 rounded-r-lg";
        renderedText = quoteText.slice(12).trim();
      } else if (quoteText.startsWith("[!WARNING]")) {
        alertClass = "border-l-2 border-amber-500 bg-amber-500/5 pl-4 py-3 my-6 text-zinc-300 rounded-r-lg";
        renderedText = quoteText.slice(10).trim();
      }

      elements.push(
        React.createElement(
          "blockquote",
          {
            key: `quote-${currentKey++}`,
            className: alertClass,
          },
          parseInlineMarkdown(renderedText)
        )
      );
      continue;
    }

    // Handle Lists
    if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        React.createElement(
          "ul",
          {
            key: `ul-${currentKey++}`,
            className: "list-disc list-inside space-y-2 text-zinc-300 font-light pl-4 my-3",
          },
          React.createElement("li", {}, parseInlineMarkdown(line.slice(2)))
        )
      );
      continue;
    }

    // Skip empty lines
    if (line.trim() === "") {
      continue;
    }

    // Standard paragraphs
    elements.push(
      React.createElement(
        "p",
        {
          key: `p-${currentKey++}`,
          className: "text-base text-zinc-300 leading-relaxed font-light mb-6",
        },
        parseInlineMarkdown(line)
      )
    );
  }

  return elements;
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  let parts: React.ReactNode[] = [];
  let currentKey = 0;
  let remaining = text;
  
  while (remaining.length > 0) {
    const boldIndex = remaining.indexOf("**");
    const codeIndex = remaining.indexOf("`");
    const linkIndex = remaining.indexOf("[");
    
    let firstToken: "bold" | "code" | "link" | "none" = "none";
    let minIndex = remaining.length;
    
    if (boldIndex !== -1 && boldIndex < minIndex) {
      minIndex = boldIndex;
      firstToken = "bold";
    }
    if (codeIndex !== -1 && codeIndex < minIndex) {
      minIndex = codeIndex;
      firstToken = "code";
    }
    if (linkIndex !== -1 && linkIndex < minIndex) {
      const endTextIdx = remaining.indexOf("]", linkIndex);
      const startUrlIdx = remaining.indexOf("(", endTextIdx);
      const endUrlIdx = remaining.indexOf(")", startUrlIdx);
      if (endTextIdx !== -1 && startUrlIdx === endTextIdx + 1 && endUrlIdx !== -1) {
        minIndex = linkIndex;
        firstToken = "link";
      }
    }
    
    if (firstToken === "none") {
      parts.push(remaining);
      break;
    }
    
    if (minIndex > 0) {
      parts.push(remaining.substring(0, minIndex));
    }
    
    remaining = remaining.substring(minIndex);
    
    if (firstToken === "bold") {
      const closingIndex = remaining.indexOf("**", 2);
      if (closingIndex !== -1) {
        const boldText = remaining.substring(2, closingIndex);
        parts.push(
          React.createElement(
            "strong",
            { key: `bold-${currentKey++}`, className: "font-semibold text-white" },
            boldText
          )
        );
        remaining = remaining.substring(closingIndex + 2);
      } else {
        parts.push("**");
        remaining = remaining.substring(2);
      }
    } else if (firstToken === "code") {
      const closingIndex = remaining.indexOf("`", 1);
      if (closingIndex !== -1) {
        const codeText = remaining.substring(1, closingIndex);
        parts.push(
          React.createElement(
            "code",
            {
              key: `inline-code-${currentKey++}`,
              className: "text-accent bg-white/5 px-1.5 py-0.5 rounded font-mono text-sm",
            },
            codeText
          )
        );
        remaining = remaining.substring(closingIndex + 1);
      } else {
        parts.push("`");
        remaining = remaining.substring(1);
      }
    } else if (firstToken === "link") {
      const endTextIdx = remaining.indexOf("]");
      const startUrlIdx = remaining.indexOf("(");
      const endUrlIdx = remaining.indexOf(")");
      
      const linkText = remaining.substring(1, endTextIdx);
      const linkUrl = remaining.substring(startUrlIdx + 1, endUrlIdx);
      
      parts.push(
        React.createElement(
          "a",
          {
            key: `a-${currentKey++}`,
            href: linkUrl,
            className: "text-accent hover:underline font-medium",
            target: linkUrl.startsWith("http") ? "_blank" : undefined,
            rel: linkUrl.startsWith("http") ? "noopener noreferrer" : undefined,
          },
          linkText
        )
      );
      
      remaining = remaining.substring(endUrlIdx + 1);
    }
  }
  
  return parts;
}
