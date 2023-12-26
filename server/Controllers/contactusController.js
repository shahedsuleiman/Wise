const nodemailer = require("nodemailer");

const mail = async (req, res) => {
  try {
    const { email, title, message } = req.body;

    console.log("Sender's Email:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "wiseassist5@gmail.com",
        pass: "sxcpifvtmimfntlh",
      },
    });

    await transporter.sendMail({
      to: "wiseassist5@gmail.com",
      subject: title,
      text: `from ${email}\n${message}`,
    });
    await transporter.sendMail({
      to: email,
      subject: "WiseAssist",
      text: "Thank you for contacting us, we will contact you as soon as possible! ",
    });

    res.json({
      success: true,
      message: "Your email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending the email",
      error: error.message,
    });
  }
};

module.exports = { mail };
