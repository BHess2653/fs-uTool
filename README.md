# fs-uTool

## Install

``` javascript
npm install fs-uTool --save-dev

```

## Usage

### Require

``` javascript

const util = require('fs-uTool');


```

### .debug

``` javascript

util.debug('A Title', 'Something meaningful');

```

### Expected output

``` javascript

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
A title
Something meaningful
TimeStamp
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

```

### Gulp Tasks

``` javascript

gulp --message='A meaningful commit message' --major

```

``` javascript

gulp --message='A meaningful commit message' --minor

```

``` javascript

gulp --message='A meaningful commit message' --patch

```
