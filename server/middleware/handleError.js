function errorHandler(err, req, res, next) {
    // console.log('errorHandler', err)
    let code
    let msg
    console.log(err);
    if (err.name == "SequelizeValidationError") {
        code = 400
        msg = err.errors[0].message
        // console.log(err, '===== err dari error handler')
        // msg = 'error nomer 1'
        // console.log(msg, '<<<<<<<<<<<<<<<')
    } else if(err.name == 'Invalid_Email') {
        code = 400
        msg = 'Email is required'
    } else if (err.name == 'Invalid_Password') {
        code = 400
        msg = 'Password is required'
    } 
    else if (err.name == "SequelizeUniqueConstraintError") {
        code = 400
        msg = 'Your email already used'
    } 
    else if (err.name == 'Email/Password_Incorrect') {
        code = 401
        msg = 'Email/Password Incorrect'
    } else if (err.name == 'Not_Found' ) {
        code = 404
        msg = 'Data Not Found'
    } else if (err.name == 'Not_Login') {
        code = 401
        msg = 'Please Login First'
    } else if (err.name == 'JsonWebTokenError') {
        code = 401
        msg = 'Invalid Token'
    } else if (err.name == 'Forbidden') {
        code = 403
        msg = 'You do not have permission'
    } else if (err.name == 'Wishlist_Exist') {
        code = 409
        msg = 'You already add this product to your Wish List'
    }
    else {
        code = 500
        msg = 'Internal Server Error'
    }
    console.log(code, msg)
    res.status(code).json({msg})
}

module.exports = errorHandler