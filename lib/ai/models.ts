// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  provider: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: "gpt-4o-mini",
    label: "GPT 4o mini",
    apiIdentifier: "gpt-4o-mini",
    provider: "openai",
    description: "Small model for fast, lightweight tasks",
  },
  {
    id: "gpt-4o",
    label: "GPT 4o",
    apiIdentifier: "gpt-4o",
    provider: "openai",
    description: "For complex, multi-step tasks",
  },
  {
    id: "gpt-4o-mini-2024-01-18",
    label: "GPT 4o mini 2024-01-18",
    apiIdentifier: "gpt-4o-mini-2024-01-18",
    provider: "openai",
    description: "Small model for fast, lightweight tasks",
  },
  {
    id: "deepseek-chat",
    label: "DeepSeek Chat",
    apiIdentifier: "deepseek-chat",
    provider: "deepseek",
    description: "DeepSeek's conversational AI model",
  },
  {
    id: "deepseek-coder",
    label: "DeepSeek Coder",
    apiIdentifier: "deepseek-coder",
    provider: "deepseek",
    description: "Specialized model for code generation",
  },
  {
    id: "gemini-2.0-flash-exp",
    label: "Gemini 2.0 Flash Exp",
    apiIdentifier: "gemini-2.0-flash-exp",
    provider: "gemini",
    description: "Google's advanced large language model",
  },
  {
    id: "gemini-2.0-flash-thinking-exp-1219",
    label: "Gemini 2.0 Flash Thinking Exp 1219",
    apiIdentifier: "gemini-2.0-flash-thinking-exp-1219",
    provider: "gemini",
    description: "Google's advanced large language model",
  },
  {
    id: "gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    apiIdentifier: "gemini-1.5-pro",
    provider: "gemini",
    description: "Alias that points to gemini-1.5-pro-002",
  },
  {
    id: "gemini-1.5-flash",
    label: "Gemini 1.5 Flash",
    apiIdentifier: "gemini-1.5-flash",
    provider: "gemini",
    description: "Alias that points to gemini-1.5-flash-002",
  },
  {
    id: "gemini-1.5-flash-8b",
    label: "Gemini 1.5 Flash 8B",
    apiIdentifier: "gemini-1.5-flash-8b",
    provider: "gemini",
    description: "Alias that points to gemini-1.5-flash-8b-001",
  },
] as const;

export const DEFAULT_MODEL_NAME: string = "gpt-4o-mini";
