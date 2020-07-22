# JavaScript Cookies

Create cookies in web pages using `Cookies` class.

## Installation

### Direct install

Example for how to load the script in browser:

```html
<script type="text/javascript" src="/path/to/Cookies.js"></script>
```

### Requirements

This class requires `Object.assign()` method. For older browsers, you must include [this polyfill code](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill) before the class script.

### Example

```javascript
var cookiesList = Cookies.list();
console.log(cookiesList);

var cookieValue = Cookies.read('mycookie');
console.log(cookieValue);

var exists = Cookies.check('mycookie');
if (exists) {
    Cookies.write('mycookie', 'string value', 10);
}

Cookies.delete('mycookie');
```

Enjoy ;)
