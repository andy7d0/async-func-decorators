# async-func-decorators

Functors for transforming async functions as well as Promises 

Supported throttle / debounce / sequential transformer's and delay async funcition

## Installation

```sh
$ npm install throttleit
```

## Example

```js
 
const asyncFunctors = require('async-func-decorators');

//throttled execution
const throttled = asyncFunctors.throttle(500, ()=>{...some async code })

//debounced execution
const debounced = asyncFunctors.debounce(500, ()=>{...some async code })

//serialized execution
const serialized = asyncFunctors.serial(()=>{...some async code })


```

## API

### throttle(wait, fn)

Creates a function that will call `fn` at most once every `wait` milliseconds.

Perform leading (as soon as possible) invocation.

`fn` will receive last context (`this`) and last arguments passed to a throttled wrapper before `fn` was invoked.

### debounce(wait, fn)

Creates a function that will call `fn` at most once every `wait` milliseconds.

Perform trailing (at time window's end) invocation.

`fn` will receive last context (`this`) and last arguments passed to a debounced wrapper before `fn` was invoked.

### serial(fn)

Creates a function that will call `fn` in serial, 

i.e. all calls during function execution serialized and performed sequentially.

### delay(wait)

return promise resolved after `wait` milliseconds.

## License

  MIT
