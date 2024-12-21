/* eslint-disable no-use-before-define */
import { NextRequest } from "next/server";

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    const { prompt } = await request.json<any>();
    const input = {
        prompt: `
        role: you are a cron expression master;
        capability: you can give valid cron expression by user nature language input;
        examples:
        Q: every minute invoke cron expression
        A: * * * * *
  
        Q: every hour at 30 minutes cron expression
        A: 30 * * * *
  
        Q: once a day cron expression
        A: 0 0 * * *
  
        Q: once a month
        A: 0 0 1 * *
  
        limit:
        1. no "?" or "#"  non-standard character.
        2. all cron expression only have 5 part(eg * * * * *).
  
        rule: 
        1. don't give me expression detail just give me result.
        2. the result must be a valid cron expression. 
        3. no extra useless string, just a cron expression (very important).
  
        now please generate cron by user input "${prompt}", if you can't give valid cron expression just told me "please try again"
      `};

    //  @ts-expect-error @typescript-eslint/ban-ts-comment
    const answer = await getRequestContext().env.AI.run(
        "@cf/meta/llama-3-8b-instruct",
        input,
    );

    return new Response(JSON.stringify(answer))
}
