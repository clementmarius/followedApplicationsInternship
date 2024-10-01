/* const { Sendim } = require("sendim");
const { SendimBrevoProviderConfig, SendimBrevoProvider } = require("sendim-brevo");

const globalForSendim = global;

const sendim = globalForSendim.sendim || new Sendim("debug");

const sendEmail = async ({ to, sender, subject, message }) => {
  if (!sendim.transports["brevo"]) {
    await sendim.addTransport(
      SendimBrevoProvider,
      {
        apiKey: process.env.BREVO_API_KEY
      },
      "brevo"
    );
  }

  return await sendim.sendTransactionalMail({
    to: [
      {
        email: to
      }
    ],
    sender: {
      email: sender.email || "no-reply@myreklam.fr",
      name: sender.name || "MyReklam"
    },
    subject: subject,
    textContent: message,
  });
};

module.exports = { sendEmail };
 */