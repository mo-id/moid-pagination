"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./pagination.cjs.production.min.js");
} else {
  module.exports = require("./pagination.cjs.development.js");
}
