# react-element-resizer
A small React component adding the functionality of `object-fit: cover/contain` to all elements and browsers.

## Usage

To use this component wrap this component around the element you want to position. See example component.
```jsx
var React = require('react');
var ElementResizer = require('react-element-resizer');

class MyComponent extends Component {
    render() {
        <div>
            <ElementResizer
                scaleMode="cover"
                elementWidth={1920}
                elementHeight={1080}
            >
                <img src="https://placeimg.com/1920/1080/nature" alt=""/>
            </ElementResizer>
        </div>
    }
}

```

## Props

### alignmentX
**type:** number  
**default:** `0.5`  
X alignment of the resulting element, where 0 = left and 1 = right.

### alignmentY
**type:** number  
**default:** `0.5`  
Y alignment of the resulting element, where 0 = top and 1 = bottom.

### containerHeight
**type:** number  
**default:** `undefined`  
Height of the container to fit the element. By default the height is grabbed using container.offsetHeight.

### containerWidth
**type:** number  
**default:** `undefined`  
Width of the container to fit the element. By default the width is grabbed using container.offsetWidth.

### elementHeight
**type:** number  
**default:** `undefined`  
**required** `true`  
Element height/y ratio, e.g. for a 100x200 element you can either pass 200 or 2 as height.

### elementWidth
**type:** number  
**default:** `undefined`  
**required** `true`  
Element width/x ratio, e.g. for a 100x200 element you can either pass 100 or 1 as width.

### maxHeight
**type:** number  
**default:** `undefined`  
Maximum height of the element.

### maxWidth
**type:** number  
**default:** `undefined`  
Maximum width of the element.

### overflowVisible
**type:** boolean  
**default:** `false`  
Prop indicating if the overflow of the wrapping element should be visible or hidden. Default is hidden.

### scaleMode
**type:** oneOf(`'cover', 'contain', 'align-only'`)  
**default:** `cover`  
**required** `true`  
Scale mode that should be used. The options to choose from are `cover`, `contain` and `align-only`. The default value is `cover`.  
These scale modes work in the same way that css object-fit works on elements.

## Development

To view the examples
```shell
npm run dev
```
Then open `http://localhost:8080/react-video-cover`

To build the Component as published to npm:
```shell
npm run build
```
You can find the results in the `dist` folder.
