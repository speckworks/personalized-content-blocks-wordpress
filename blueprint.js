{
  "$schema": "https://playground.wordpress.net/blueprint-schema.json",
  "landingPage": "/demo/",
  "preferredVersions": { "php": "8.3", "wp": "latest" },
  "steps": [
    {
      "step": "installPlugin",
      "pluginData": {
        "resource": "git:directory",
        "url": "https://github.com/speckworks/personalized-content-blocks-wordpress",
        "ref": "HEAD"
      },
      "options": { "activate": true }
    },
    {
      "step": "runPHP",
      "code": "<?php require '/wordpress/wp-load.php'; $c = '<!-- wp:speckworks/personalized-content {\"audience\":\"new\"} --><div class=\"wp-block-speckworks-personalized-content pc-audience-new\" data-audience=\"new\"><!-- wp:heading --><h2 class=\"wp-block-heading\">First time here?</h2><!-- /wp:heading --></div><!-- /wp:speckworks/personalized-content --><!-- wp:speckworks/personalized-content {\"audience\":\"returning\"} --><div class=\"wp-block-speckworks-personalized-content pc-audience-returning\" data-audience=\"returning\"><!-- wp:heading --><h2 class=\"wp-block-heading\">Welcome back.</h2><!-- /wp:heading --></div><!-- /wp:speckworks/personalized-content -->'; wp_insert_post(['post_title'=>'Demo','post_name'=>'demo','post_content'=>$c,'post_status'=>'publish','post_type'=>'page']);"
    }
  ]
}