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

(function(gravatarExtended) {
  var gravatar = module.parent.require("gravatar"),
  User = module.parent.require("./user"),
  Meta = module.parent.require('./meta'),
  nconf = module.parent.require('nconf'),
  crypto = require("crypto");

  var converts = [
    { regex: /%md5/i, fn: function(r) {
      return crypto.createHash("md5").update(r.email.toLowerCase().trim()).digest("hex");
    }},
    { regex: /%email/i, fn: function(r) {
      return r.email;
    }},
    { regex: /%user/i, fn: function(r) {
      return r.username;
    }}
  ];
  var prefix = '__GRAVATAR__';

  function createGravatarURL(user) {
    var customGravatarDefaultImage = Meta.config.customGravatarDefaultImage;
    if (customGravatarDefaultImage && customGravatarDefaultImage.indexOf('http') === -1)
      customGravatarDefaultImage = nconf.get('url') + Meta.config.customGravatarDefaultImage;
    var options = {
      size: parseInt(Meta.config.profileImageDimension, 10) || 128,
      default: customGravatarDefaultImage || Meta.config.defaultGravatarImage || 'identicon',
      rating: 'pg'
    };
    if(!user.email)
      user.email = '';
    for(var i = 0; i < converts.length; i++)
      options.default = options.default.replace(converts[i].regex, converts[i].fn(user));
    return gravatar.url(user.email, options, true);
  };
  
  gravatarExtended.init = function() {
    require("./overrider");
    User.override("createGravatarURLFromEmail", function(orig, email) {
      return prefix + email;
    });
  };

  gravatarExtended.onGetUsers = function(users, callback) {
      users.forEach(function(user) {
        if (user.picture == prefix + user.email)
          user.picture = createGravatarURL(user.email);
      });
      return callback(null, users);
    }
  };
})(module.exports);