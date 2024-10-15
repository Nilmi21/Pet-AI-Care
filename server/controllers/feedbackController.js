const Feedback = require('../Database/feedback')

async function submitFeedback(req, res){
  const { name,email,diseases, diseaseType, rating, feedback } = req.body;

  try {
    const newFeedback = await Feedback.create({
      name,
      email,
      diseases,
      diseaseType,
      rating,
      feedback,
    });

    res.status(201).json(newFeedback);
  } catch (error) {
    console.error("Error submitting feedback:", error); 
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};
async function getFeedbacks(req,res) {
  
try {
  Feedback.findAll({
    attributes:['name','rating','feedback']
  }).then((response)=>{
    
    res.status(200).json(response);
  })
} catch (error) {
  
}
  
}

module.exports = { 
  submitFeedback:submitFeedback,
  getFeedbacks:getFeedbacks
 };