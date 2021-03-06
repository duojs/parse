
# duo-parse

[![npm package](https://img.shields.io/npm/v/duo-parse.svg)](https://www.npmjs.com/package/duo-parse)
[![travis build status](https://img.shields.io/travis/duojs/parse.svg)](https://travis-ci.org/duojs/parse)

> duo's dependency parser

## parse(slug)

```js
var obj = parse('component/tip@0.1.0:index.js');

obj.slug     // component/tip@0.1.0:index.js
obj.user     // component
obj.repo     // tip
obj.ref      // 0.1.0
obj.path     // index.js
obj.provider // github.com
```

This function comes memoized by default, so there is no need to
cache results externally.


## License

(The MIT License)

Copyright (c) 2014 Matthew Mueller &lt;mattmuelle@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
