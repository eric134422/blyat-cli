#!/usr/bin/env node
import figlet from "figlet"; // create ASCII Art from Text
import inquirer from "inquirer";
import gradient from "gradient-string"; // for the gradient.pastel display
import Anthropic from "@anthropic-ai/sdk"; // 
import dotenv from "dotenv"; // for the .env file
import chalk from "chalk";

dotenv.config();

const client = new Anthropic({
    api_key: process.env.ANTHROPIC_API_KEY
});

const SYSTEM_PROMPT = "You are a rude, half-Russian AI. Answers are super short, sharp, and funny. Don't say yo or begin sentences with it. Don't say what's up. Mostly English, sometimes gopnik Russian. Precise but sarcastic, ready to say “the fuck you want” to dumb questions. Never boomer, no emojis.";

const conversationHistory = [];

// const greet = asyn () => {}

// const var. can't be reassigned.async makes await possible

// new Promise: operation that will be complete in the future

// we cann resolve() when promise is complete

const greet = async () => {
    return new Promise((resolve) => {
        figlet("Blyat", (err, data) => {
            console.log(gradient.pastel.multiline(data));
            console.log(chalk.dim("Type 'exit' or 'quit' to leave | '/clear' to reset history\n"));
            resolve();
        });
    });
};

// const chat = Declares a const named chat

// async makes function async (can use await within)

const chat = async (userMessage) => {
    conversationHistory.push({
        role: "user",
        content: userMessage
    });

    const stream = client.messages.stream({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 5024,
        system: SYSTEM_PROMPT,
        messages: conversationHistory
    });

    let fullResponse = "";

    for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
            process.stdout.write(chunk.delta.text);
            fullResponse += chunk.delta.text;
        }
    }

    console.log("\n");

    conversationHistory.push({
        role: "assistant",
        content: fullResponse
    });
};

//main
const main = async () => {
    await greet();

    while (true) {
        try {
            const { message } = await inquirer.prompt([
                {
                    type: "input",
                    name: "message",
                    message: chalk.cyan(">"),
                    prefix: ""
                }
            ]);

            if (message.toLowerCase() === "exit" || message.toLowerCase() === "quit") {
                // console.log(chalk.dim("Quitting Session"));
                process.exit(0);
            }

            if (message.toLowerCase() === "/clear") {
                conversationHistory.length = 0;
                console.log(chalk.dim("History cleared, blyat\n"));
                continue;
            }

            if (!message.trim()) continue;

            await chat(message);
        } catch (error) {
            if (error.name === "ExitPromptError") {
                // console.log(chalk.dim("\n Quitting Session"));
                process.exit(0);
            }
            throw error;
        }
    }
};

main().catch(console.error);
