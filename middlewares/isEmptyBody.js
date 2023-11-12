import { HttpError } from "../helpers/index.js";

const isEmptyBody = async (req, res, next) => {
   const keys = Object.keys(req.body);
   if (!keys.length) {
      return next(HttpError(400, "Body should be filled"));
   }
   next();
};

export default isEmptyBody;
