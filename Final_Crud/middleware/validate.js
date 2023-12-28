const validateForm = (req, res, next) => {
    const { title, genre, time } = req.body;
  
    if (!title || !genre || !time) {
      console.log("EMPTY FIELD");
      return res.status(400).render("add.ejs");
     
    }
    next();
  };
  
  module.exports = validateForm;