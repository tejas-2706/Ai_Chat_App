export enum Role {
    User = "user",
    Assistant = "assistant"
}

export type Message = {
    role: Role,
    content: string
}

export interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}