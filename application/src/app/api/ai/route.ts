/* eslint-disable no-use-before-define */
import { NextRequest } from "next/server";
import axios from "axios";
import { config } from "@/config/config";

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    const { prompt } = await request.json<any>();
    if (!prompt) new Response("Prompt is required");
    const res = await axios.post(
        "https://api.cloudflare.com/client/v4/accounts/01643766c6b18051f9e52bbd13fcfd3e/ai/run/@cf/meta/llama-3-8b-instruct",
        { messages: [{ role: "user", content: prompt }]},
        {
            headers: {
                'Authorization': `Bearer ${config.worker_ai_token}`
            }
        }
    );

    return new Response(JSON.stringify(res.data.result));
}
