nodebb-plugin-gravatar-extended
===============================

This plugin will extend some parameters to the Gravatar default image URL to make the default avatars rich.

Usage
-----
Inside `NodeBB ACP > General Settings > User > Avatars > Custom Gravatar Default Image`,
this field is going to accept these parameters:

- `%md5` - the MD5 string of the user's email
- `%email` - the raw email address

Example
-------
You can use `%md5` to fetch [Automatic Avatars](https://avatars.moe) by entering:

`https://avatars.moe/Default/%md5/128.png`

Or you can use `%email` to fetch [Adorable Avatars](http://avatars.adorable.io) by entering:

`http://api.adorable.io/avatar/128/%email.png`

Installation
-------
`npm install nodebb-plugin-gravatar-extended`

License
-------
MIT

(C) Jeremy Lam JLChnToZ, 2014.