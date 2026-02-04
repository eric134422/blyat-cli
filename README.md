# Blyat-CLI

A rude, chaotic, half-Russian AI chatbot for your terminal. Because sometimes you need an AI that tells it like it is, blyat.

## What is this?

A CLI wrapper for Claude that speaks like a gopnik. Short answers, sharp wit, randomly sprinkled Russian slang. Think of it as ChatGPT's rude cousin who hangs out behind the kiosk.

## Features

- **Streaming responses** - Text appears in real-time like a proper chat
- **Conversation memory** - Remembers context until you clear it
- **Gopnik personality** - Sarcastic, precise, and not afraid to call out dumb questions
- **Global command** - Type `blyat` from anywhere in your terminal
- **Cost-effective** - Uses Claude Haiku 4.5 (cheapest model)

## Installation

### Prerequisites
- Node.js installed
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Setup

```bash
# Clone the repo
git clone <your-repo-url>
cd cli

# Install dependencies
npm install

# Add your API key

Create an .env
Add ANTHROPIC_API_KEY = "YOUR-API-KEY" to .env


# Install globally (optional)
npm link
```

## Usage

### Run directly
```bash
node index.js
```

### Run globally (after npm link)
```bash
blyat
```

### Commands
- Type your message and press Enter
- `exit` or `quit` - Leave the chat
- `/clear` - Reset conversation history
- `Ctrl+C` - Quick exit

## Example Conversation

```
> what is 2+2?
4, genius. What's next, asking me what color the sky is?

> how do I center a div?
Flexbox, blyat. `display: flex; justify-content: center; align-items: center;`
Stop using margin hacks like it's 2005.

> thanks!
come back when you have real problems.
```

## How it works

1. Uses Anthropic's Claude Haiku 4.5 for responses
2. Streams text chunk-by-chunk for that real-time feel
3. Keeps conversation history in memory
4. System prompt enforces the gopnik personality
5. All local - your conversations stay on your machine

## Security

- API key stored in `.env` (never committed to git)
- `.env` is in `.gitignore` by default
- No telemetry, no tracking, no cloud storage
- All conversations are local-only

## Contributing

It's a side project for fun. Fork it, break it, make it ruder. No rules.

## License

MIT - Do whatever you want with it.

## Disclaimer

This AI is intentionally rude for comedic effect. 

--

** Made with ❤️ **
