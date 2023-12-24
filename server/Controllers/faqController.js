const FAQ = require("../Models/faqModel");

const addquestion = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { question } = req.body;
    const result = await FAQ.addquestion(userID, question);
    if (result) {
      return res.status(201).json({
        success: true,
        message: "question added successfully",
        data: result,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Failed to add question" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const allansweredquestions = async (req, res, next) => {
  try {
    console.log("hi");
    const question = await FAQ.allansweredquestions();

    res.status(200).json(question);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ success: false, error: "Error in getting questions" });
  }
};

const answer = async (req, res) => {
  try {
    const questionID = req.params.id;
    const answer = await FAQ.answer(questionID);
    res.status(201).json(answer);
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: "Error in getting answer" });
  }
};

module.exports = {
  addquestion,
  allansweredquestions,
  answer,
};
