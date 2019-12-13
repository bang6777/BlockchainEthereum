let raiseErr = async (req) => {
    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
      let err = errors.array();
      let firstError = err.map(error => error.msg)[0];
      return firstError
    }
    return null;
  }
  
  let postValidator = async (req) => {
    req.check('title', 'title is required.').not().isEmpty();
    req.check('content', 'content is required.').not().isEmpty();
    req.check('content', 'content must be less than 255 characters').isLength({max: 255});
    req.check('poster', 'poster is required.').not().isEmpty();
    req.check('poster', 'poster must be number.').isNumeric();
  
    //check for errors
    return await raiseErr(req);
  }
  
  module.exports = {
    postValidator,
  };