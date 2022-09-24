// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CallTracker } from "assert";
import type { NextApiRequest, NextApiResponse } from "next";
import { Telegraf } from "telegraf";

type Data = {
  name: string;
};

const BOT_TOKEN: string = process.env.BOT_TOKEN!;
const BASE_PATH: string = process.env.BASE_PATH!;

const bot = new Telegraf(BOT_TOKEN);

bot.on("message", async (ctx) => {
  console.log(ctx.message);
  const { message } = ctx;

  await ctx.reply("Confirmed!", {
    reply_to_message_id: message.message_id,
  });
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  bot.webhookCallback;
  try {
    const { body } = req;
    await bot.handleUpdate(body);
  } catch (e) {
    console.log(e);
  }

  res.status(200).send("OK");
}
