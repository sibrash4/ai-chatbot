import { openai } from "@ai-sdk/openai";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createFireworks } from "@ai-sdk/fireworks";
import { createGroq } from "@ai-sdk/groq";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";
import { Model } from "./models";

// Type definitions for better type safety
type ProviderConfig = {
  apiKey: string;
  options?: Record<string, unknown>;
};

type CompletionParams = {
  prompt: string;
  system?: string;
  options?: Record<string, unknown>;
};

interface AIProvider {
  complete(params: CompletionParams): Promise<string>;
}

// Environment configuration with type safety
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Initialize providers with proper error handling
const gemini = new GoogleGenerativeAI(getEnvVar("GOOGLE_API_KEY"));

const deepseek = createDeepSeek({
  apiKey: getEnvVar("DEEPSEEK_API_KEY"),
});

const fireworks = createFireworks({
  apiKey: getEnvVar("FIREWORKS_API_KEY"),
});

const groq = createGroq({
  apiKey: getEnvVar("GROQ_API_KEY"),
});

// Provider implementations with proper error handling and typing
const providers = {
  openai: (modelId: string): AIProvider => {
    const model = openai(modelId);
    return {
      async complete({ prompt, system, options = {} }: CompletionParams) {
        try {
          return await model.complete({ prompt, system, ...options });
        } catch (error) {
          throw new Error(`OpenAI completion failed: ${error.message}`);
        }
      },
    };
  },

  gemini: (modelId: string): AIProvider => {
    const model = gemini.getGenerativeModel({ model: modelId });
    return {
      async complete({ prompt, system, options = {} }: CompletionParams) {
        try {
          const chat = model.startChat({
            history: system ? [{ role: "system", parts: [system] }] : [],
            ...options,
          });
          const result = await chat.sendMessage(prompt);
          const response = await result.response;
          return response.text();
        } catch (error) {
          throw new Error(`Gemini completion failed: ${error.message}`);
        }
      },
    };
  },

  deepseek: (modelId: string): AIProvider => {
    const model = deepseek(modelId);
    return {
      async complete({ prompt, system, options = {} }: CompletionParams) {
        try {
          return await model.complete({ prompt, system, ...options });
        } catch (error) {
          throw new Error(`DeepSeek completion failed: ${error.message}`);
        }
      },
    };
  },

  fireworks: (modelId: string): AIProvider => {
    const model = fireworks(modelId);
    return {
      async complete({ prompt, system, options = {} }: CompletionParams) {
        try {
          return await model.complete({ prompt, system, ...options });
        } catch (error) {
          throw new Error(`Fireworks completion failed: ${error.message}`);
        }
      },
    };
  },

  groq: (modelId: string): AIProvider => {
    const model = groq(modelId);
    return {
      async complete({ prompt, system, options = {} }: CompletionParams) {
        try {
          return await model.complete({ prompt, system, ...options });
        } catch (error) {
          throw new Error(`Groq completion failed: ${error.message}`);
        }
      },
    };
  },
} as const;

// Type guard to ensure provider exists
const isValidProvider = (
  provider: string
): provider is keyof typeof providers => {
  return provider in providers;
};

// Enhanced getModel function with error handling and type safety
export const getModel = (model: Model) => {
  if (!isValidProvider(model.provider)) {
    throw new Error(`Unsupported provider: ${model.provider}`);
  }

  try {
    return wrapLanguageModel({
      model: providers[model.provider](model.apiIdentifier),
    });
  } catch (error) {
    throw new Error(`Failed to initialize model: ${error.message}`);
  }
};

// Export provider-specific types and utilities
export type { AIProvider, ProviderConfig, CompletionParams };
export { providers };
