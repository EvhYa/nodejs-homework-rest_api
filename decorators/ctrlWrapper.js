const ctrlWrapper = (ctrl) => {
   const func = async (req, res, next) => {
      try {
         await ctrl(req, res, next);
      } catch (error) {
        //  res.status(error.status).json(error.message);
         next(error);
      }
   };
   return func;
};

export default ctrlWrapper;
