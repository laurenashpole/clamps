# Clamps

[Demo](https://laurenashpole.github.io/clamps/)

There are already a lot of great text truncation options out there (for example, [line-clamp](https://github.com/yuanqing/line-clamp), [Clamp.js](https://github.com/josephschmitt/Clamp.js/), [Shave](https://github.com/dollarshaveclub/shave)) but they are, for the most part, purely JavaScript solutions. In some situations, it would be handier to just have a fallback for the CSS. Web fonts on mobile devices can trip up even the best JS replacement but 90% of mobile browsers support -webkit-line-clamp natively ([source](http://gs.statcounter.com/browser-market-share/mobile/united-states-of-america)). Changing the number of lines based on breakpoints or complex patterns can be tricky without using media queries or :nth-child. So this module is designed to mimic -webkit-line-clamp based on an element's height only in browsers that don't support it.

## Installation

### NPM

```
npm install clamps --save
```

### Yarn

```
yarn add clamps
```

### Script Tag

```
<script src="path/to/clamps.min.js"></script>
```

## Usage

### CSS + HTML

First, apply the `-webkit-line-clamp` styling for browsers with native support. Next, set the `max-height` or `height` which will be used to calculate the number of lines in browsers that ignore the -webkit-line-clamp property. For the best results, include a `line-height` as well.

```
<div class="line-clamp">
  ...
</div>
```

```
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 60px;
  line-height: 20px;
}
```

### JS

After importing the module (or adding the script tag), initialize with the elements to clamp.

```
var els = document.querySelectorAll('.line-clamp');
Clamps(els);
```

## Notes

* Since the goal is to copy -webkit-line-clamp behavior as closely as possible, this module doesn't accept any options for customization.
* The line clamping does not update on resize. I leave it to the user to decide if that seems necessary on any given project.

## License

[MIT](LICENSE)