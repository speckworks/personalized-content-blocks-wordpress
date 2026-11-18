<?php
/**
 * Plugin Name:       Personalized Content Block
 * Description:       Show nested blocks to new or returning visitors. Cache-safe: all variants ship in the HTML and the right one is revealed before first paint.
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Text Domain:       personalized-content
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the block from the compiled build (block.json is copied there by wp-scripts).
 */
add_action( 'init', function () {
	register_block_type( __DIR__ . '/build/personalized-content' );
} );

/**
 * Classify the visitor before first paint.
 *
 * Why this lives in <head> and not in the block's view script:
 * - Page caches serve the same HTML to everyone, so PHP can't know who is visiting.
 * - A deferred script would reveal the right variant after paint -> flicker and layout shift (CLS).
 * - A tiny blocking inline script sets data-visitor on <html>, and CSS does the rest.
 *
 * The result is pinned for the browser session so a reload doesn't flip "new" to "returning".
 * It's also pushed to the GA4 / GTM dataLayer so experiments can segment on it.
 */
add_action( 'wp_head', function () {
	$js = <<<'JS'
(function(){var d=document.documentElement,v='new';try{var s=sessionStorage.getItem('pc_visitor');v=s||(localStorage.getItem('pc_seen')?'returning':'new');sessionStorage.setItem('pc_visitor',v);localStorage.setItem('pc_seen','1');}catch(e){}d.setAttribute('data-visitor',v);(window.dataLayer=window.dataLayer||[]).push({event:'pc_visitor_segment',visitor_segment:v});})();
JS;
	wp_print_inline_script_tag( $js );
}, 1 );
