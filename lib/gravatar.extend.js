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

require("./overrider");

(function() {
  var gravatar = module.parent.require("gravatar");
  var crypto = require("crypto");

  var converts = [
    {
      regex: /%md5/i, fn: function(r) {
        return crypto.createHash("md5").update(r.toLowerCase().trim()).digest("hex");
      }
    },
    {
      regex: /%email/i, fn: function(r) {
        return r;
      }
    }
  ];

  function convert(email, raw) {
    for(var i = 0; i < converts.length; i++)
      raw = raw.replace(converts[i].regex, converts[i].fn(email));
    return raw;
  }

  if(!gravatar.__extended)
    gravatar.override("url", function(orig, email, options, https) {
      if(options.d)
      options.d = convert(email, options.d);
      if(options.default)
      options.default = convert(email, options.default);
      return orig(email, options, https);
    });

  gravatar.__extended = true;
  
  return module.exports = function() {};
})();