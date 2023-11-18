export const handleServerError = (error, data, next) => {
   error.status = 400;
   next();
};

export const preUpd = function (next) {
   this.option.new = true;
   this.option.runValidators = true;
   next();
};
