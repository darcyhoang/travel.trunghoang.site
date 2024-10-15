<?php
// Add style file
function my_admin_theme_style()
{
    wp_enqueue_style('my-admin-theme', plugins_url('custom/css/style-admin.css', __FILE__));
}

add_action('admin_enqueue_scripts', 'my_admin_theme_style');
add_action('login_enqueue_scripts', 'my_admin_theme_style');
