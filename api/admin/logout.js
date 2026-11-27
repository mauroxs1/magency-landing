const { send } = require("../_lib/http");
const { cookieHeader } = require("../_lib/auth");

module.exports = async (req, res) => send(res, 200, { ok: true }, { "Set-Cookie": cookieHeader("", true) });
