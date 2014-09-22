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

require('array.from');

Object.prototype.override = function(tree, newStuff, noExec) {
  if(typeof tree === "function") tree = tree();
  if(typeof tree === "string") tree = tree.split(".");
  if(!(tree instanceof Array)) tree = [tree];
  if(typeof noExec === "function") noExec = noExec();
  var iterate = this;
  for(var i = 0; i < tree.length - 2; i++)
    iterate = iterate[tree[i]];
  var lastFragment = tree[tree.length - 1];
  if(!noExec && typeof newStuff === "function") {
    var original = iterate[lastFragment];
    if(typeof original === "function")
      iterate[lastFragment] = function() {
        var args = Array.from(arguments);
        args.unshift(original);
        return newStuff.apply(this, args);
      };
    else
      iterate[lastFragment] = newStuff(original);
  } else
    iterate[lastFragment] = newStuff;
  return this;
};

