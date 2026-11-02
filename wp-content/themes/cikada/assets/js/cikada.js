/**
 * Hotell Cikada front page: the parts of each section rise into place once,
 * in reading order, as they come on screen (styles in assets/css/cikada.css).
 * Desktop only (782 px and wider) and skipped with reduced motion; without
 * this script everything is simply shown.
 */
( function () {
	if ( ! ( 'IntersectionObserver' in window ) ||
		! window.matchMedia( '(min-width: 782px) and (prefers-reduced-motion: no-preference)' ).matches ) {
		return;
	}
	// Each selector is one group; siblings within a group follow 70 ms apart.
	var groups = [
		'.cik-brief__title', '.cik-brief__cols > .wp-block-column',
		'.cik-rooms__head .wp-block-column', '.cik-film > .wp-block-column',
		'.cik-over, .cik-spa__title', '.cik-spa__photo', '.cik-trio > .wp-block-column',
		'.cik-resto .cik-ruled', '.cik-resto__main', '.cik-resto__side',
		'.cik-conf__mt .wp-block-media-text__content > *', '.cik-conf__mt .wp-block-media-text__media',
		'.cik-visit__media', '.cik-visit__grid > .wp-block-column:last-child > *'
	];
	var io = new IntersectionObserver( function ( entries ) {
		entries.forEach( function ( e ) {
			if ( e.isIntersecting ) {
				e.target.classList.add( 'is-in' );
				io.unobserve( e.target );
			}
		} );
	}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 } );
	document.documentElement.classList.add( 'cik-js' );
	groups.forEach( function ( sel ) {
		var count = new Map();
		document.querySelectorAll( sel ).forEach( function ( el ) {
			var n = count.get( el.parentElement ) || 0;
			count.set( el.parentElement, n + 1 );
			el.style.setProperty( '--cik-d', Math.min( n, 6 ) * 70 + 'ms' );
			el.classList.add( 'cik-r' );
			io.observe( el );
		} );
	} );
} )();
