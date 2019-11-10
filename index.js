'use strict';

const timeout = delay =>
	 new Promise((resolve, reject) => setTimeout(resolve, delay))
;

module.exports = {

serial: function(asyncFunc) {
	let executed = Promise.resolve(null);
	return function(...args) {
		return executed = executed.then(
			() => (asyncFunc.apply(this,args))
			,
			() => (asyncFunc.apply(this,args))
		)
	}
}
,

timeout: timeout
,

debounce: function(delay, asyncFunc) {
	let pending = null;
	return function(...args) {
		if(pending) return pending;
		return pending = 
			timeout(delay)
			.then(() => asyncFunc.apply(this, args))
			.finally(() => {pending = null})
	}
}
,

throttle: function(delay, asyncFunc) {
	let started = null;
	return function (...args) {
		if(started) return started;
		started = asyncFunc.apply(this, args)
		Promise.allSettled([started, timeout(delay)])
		.then( (res) => res[0] )
		.finally(() => {started = null})
	}
}

}


