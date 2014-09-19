/**
 *  This file is part of NodeBB Gravatar Extended Plugin
 *  Copyright (c) 2014 Jeremy Lam (JLChnToZ).
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

var gravatar = module.parent.require("gravatar");
var crypto = require("crypto");

function convert(email, raw) {
  if(typeof raw != "string") return; // Double-check if this is a string
  var md5 = crypto.createHash("md5").update(email.toLowerCase().trim()).digest("hex");
  return raw.replace(/%md5/i, md5).replace(/%email/i, email);
}

var gravatar_url = gravatar.url;
gravatar.url = function(email, options, https) {
  if(options.d)
    options.d = convert(email, options.d);
  if(options.default)
    options.default = convert(email, options.default);
  return gravatar_url(email, options, https);
};

module.exports = function() { /* Yeah, nothing exports here. */ };
