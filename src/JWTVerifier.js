const jwt = require('@feathersjs/authentication-jwt');

class JWTVerifier extends jwt.Verifier {
  async verify(req, payload, done) {
    const User = require('mongoose').model('users');

    const user = await User.findOne({
      _id: payload.userId
    }, '_id email sendCount sendAllCount chargeAll level').lean();

    payload.user = user;

    done(null, user, payload);
  }
}

module.exports = JWTVerifier;
