const Suggestion = require("../models/Suggestion");
const { sendTelegram, sendEmail } = require("../services/notify");

exports.createSuggestion = async (req, res) => {
  try {
    const { name, email, projectType, title, details } = req.body;

    if (!name || !email || !projectType || !title || !details) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const suggestion = await Suggestion.create({
      userId: req.user?.id || null,
      name,
      email,
      projectType,
      title,
      details,
    });

    const tgText =
      `💡 <b>New suggestion on PlanFlow</b>\n\n` +
      `👤 <b>${name}</b> (${email})\n` +
      `📁 ${projectType} — <b>${title}</b>\n\n` +
      `${details}`;

    const emailHtml =
      `<h2>💡 New suggestion: ${title}</h2>` +
      `<p><b>From:</b> ${name} (${email})</p>` +
      `<p><b>Type:</b> ${projectType}</p>` +
      `<hr/><p>${details.replace(/\n/g, "<br/>")}</p>`;

    sendTelegram(tgText).catch(() => {});
    sendEmail(`💡 New suggestion: ${title}`, emailHtml).catch(() => {});

    return res.status(201).json(suggestion);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

