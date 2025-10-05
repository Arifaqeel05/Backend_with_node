// const asynHandler=(fn)=>{async (req, res, next)=>{
    
//     try {
//         await fn(req,res,next);
        
//     } catch (error) {
//        res.status(error.code ||500).json({
//         success:false,
//         message: error.message

//        });
        
//     }
// }}

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
      .catch(error => next(error));
  };
};


export {asyncHandler};

//we can create it by two ways :(1) by using promise and (2)try-catch
//promise approch is something like this:



