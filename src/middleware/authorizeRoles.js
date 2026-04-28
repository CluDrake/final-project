export function authorizeRoles(...allowedRoles) {
    return function (req, res, next) {
        if(!allowedRoles.includes(req.user.role)){
            const error = new Error('Forbidden: You do not have permission to access this resource');
            error.status = 403;
            return next(error);
        }
        next(); 
    };
}