const https = require("node:https");
const nodemailer = require("nodemailer");

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
  }

  const payload = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  });

  await new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.telegram.org",
        path: `/bot${token}/sendMessage`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve();
            return;
          }
          reject(
            new Error(
              `Telegram send failed (${res.statusCode || "no-status"}): ${body}`,
            ),
          );
        });
      },
    );

    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function sendEmail(subject, html) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({ from: user, to: user, subject, html });
}

module.exports = { sendTelegram, sendEmail };
