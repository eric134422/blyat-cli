#!/usr/bin/env node
import figlet from "figlet";
import inquirer from "inquirer";
import gradient from "gradient-string"; 
import Anthropic from "@anthropic-ai/sdk";  
import dotenv from "dotenv"; 
import chalk from "chalk";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { SYSTEM_PROMPT } from "./system.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });

const client = new Anthropic({
    api_key: process.env.ANTHROPIC_API_KEY
});

const conversationHistory = [];

const greet = async () => {
    return new Promise((resolve) => {
        figlet("BlyatGPT", (err, data) => {
            console.log(gradient.pastel.multiline(data));
            console.log(chalk.dim("Type 'exit' or 'quit' to leave | '/clear' to reset history\n"));
            resolve();
        });
    });
};

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
