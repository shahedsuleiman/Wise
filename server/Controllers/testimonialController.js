const Testimonial = require("../Models/testimonialModel");

const createtestominal = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { testimonial } = req.body;
    await Testimonial.createtestominal(userID, testimonial);
    res
      .status(200)
      .json({ success: true, message: "Testimonial added successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: "Testimonial added failed" });
  }
};

const testimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.testimonials();
    res.status(200).json({ success: true, testimonials });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ success: false, error: " getting Testimonials failed" });
  }
};
module.exports = {
  createtestominal,
  testimonials,
};
