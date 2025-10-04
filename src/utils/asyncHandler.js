const asynHandler=(fn)=>{async (req, res, next)=>{
    try {
        await fn(req,res,next);
        
    } catch (error) {
       res.status(error.code ||500).json({
        success:false,
        message: error.message

       });
        
    }
}}

export {asynHandler};

//we can create it by two ways :(1) by using promise and (2)try-catch
//promise approch is something like this:

/*
const asynHandler=(requesthandler)=>{}
    (req,res,next)=>{
        Promise.resolve(requesthandler(req,res, next)).r{eject(error=>next(error)})
        }
    }
*/