const User = require('../models/user');

async function authRequest(id) {
    try {
        var user = await User.findOne({ _id: id });
        if (user.isAdmin) {
            return true;
        } else {
            return false;
        }
    }
    catch {
        console.log('Request could not be authorized.');
        return false;
    }
}

module.exports = {
    authRequest
}