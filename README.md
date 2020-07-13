# JavaScript Cookies

Create cookies in web pages using `Cookies` class.

## Installation

### Direct install

Example for how to load UMD module in browser:

```html
<script type="text/javascript" src="/path/to/Cookies.js"></script>
```

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
