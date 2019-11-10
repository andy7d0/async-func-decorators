'use strict';

const timeout = delay =>
	 delay ?
	 new Promise((resolve, reject) => setTimeout(resolve, delay))
	 : Promise.resolve()
;

module.exports = {

serial: function(asyncFunc) {
	let executed = Promise.resolve();
	return function(...args) {
		return executed = executed.catch(()=>null)
			.then(
				() => (asyncFunc.apply(this,args))
			)
	}
}
,

delay: timeout
,

debounce: function(delay, asyncFunc) {
	let pending = null;
	let last = null;
	return function(...args) {
		last = { context: this, args: args }
		if(pending) return pending;
		return pending = 
			timeout(delay)
			.then(() => asyncFunc.apply(last.context, last.args))
			.finally(() => {pending = null})
	}
}
,

throttle: function(delay, asyncFunc) {
	const timed = (ctx, args) =>
		Promise.allSettled([
			asyncFunc.apply(ctx, args)
			, timeout(delay)
		])
		.then( (res) => res[0] )
		;
	let started = null;
	let last = null;
	let pended = null
	return function (...args) {
		if(started) {
			last = { context: this, args: args }
			if(!pended) 
				pended = started.finally(
					() => {
					  started = pended;
					  pended = null;
					})
					.catch(()=>null)
					.then( 
					  ()=> timed(last.context, last.args)
					)
			return pended;
		}
		return started = timed(this, args)
			.finally(() => {
				started = null;
			})
	}
}

}


