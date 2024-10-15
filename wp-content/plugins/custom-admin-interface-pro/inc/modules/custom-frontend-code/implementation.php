<?php

    /**
    * 
    *
    *
    * Function to add custom css and javascript to frontend of Wordpress
    */
    add_action( 'wp_enqueue_scripts', 'custom_frontend_code_implementation', 999 );
    function custom_frontend_code_implementation() {
        
        //we need to get all published posts and loop through them

        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'posts';
        
        //just get all data
        $query = "SELECT * FROM $table_name WHERE post_type='custom_frontend_code' AND post_status='publish'";
        
        $posts = $wpdb->get_results($query);

        if($posts){
            foreach($posts as $post){

                $post_id = $post->ID;
                
                //check if the code needs to be executed
                if(custom_admin_interface_pro_exception_check($post_id)){

                    //do css
                    $css_code = get_post_meta($post_id, 'custom_css_frontend', true);
                    
                    wp_enqueue_style( 'custom-frontend-code-css', plugins_url( '../../../inc/custom-frontend-style.css', __FILE__ ),array(),custom_admin_code_pro_version() );    
                    wp_add_inline_style( 'custom-frontend-code-css', $css_code ); 

                    //do js
                    $js_code = get_post_meta($post_id, 'custom_js_frontend', true);

                    wp_enqueue_script( 'custom-frontend-code-js', plugins_url( '../../../inc/custom-frontend-script.js', __FILE__ ), array( 'jquery'),custom_admin_code_pro_version());

                    $custom_code = "jQuery(document).ready(function ($) {
                    {$js_code} 
                    });";
                    wp_add_inline_script( 'custom-frontend-code-js', $custom_code );

                } //end exception check
            } //end foreach post
        } //end post check
    }
    


    




    
?>