const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const smsService = {
  sendOtpSms: async (mobile, otp) => {
    // ✅ Ensure E.164 format
    let formattedNumber = mobile;

    // If mobile does not start with +, add your default country code
    if (!formattedNumber.startsWith("+")) {
      formattedNumber = `+91${formattedNumber}`; // For India
    }

    const message = `Your OTP is: ${otp}`;

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedNumber,
    });

    console.log(`✅ OTP sent to ${formattedNumber}`);
    return result;
  },
};

module.exports = smsService;
