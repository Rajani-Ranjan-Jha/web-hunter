const { validateToken } = require("../utils/auth");

function checkForToken(req, res, next) {
  const token = req.cookies.LoginToken;
  if (!token) {
    console.log("did not get any token (checkForToken)");
    return next();
  }
  console.log("got the token", token);

  try {
    const userPayload = validateToken(token);
    req.admin = userPayload;
    console.log("userPlayload is created (checkForToken)", req.admin);
    next();
  } catch (error) {
    // res.status(401).json({message: 'Invalid token'})
    console.log(`error in checkfortoken: ${error}`);
    next();
  }
}

function ensureAuthenticated(req, res, next) {
  if (req.admin) {
    console.log("Yes, authenticated (ensureAuthenticated)");
    next();
  } else {
    console.log("Not authenticated (ensureAuthenticated)");
    return;
  }
}

module.exports = {
  checkForToken,
  ensureAuthenticated,
};
