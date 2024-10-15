<?php

namespace Hostinger\Amplitude;

class ActionDispatcher
{
    private const TRANSIENT_KEY = 'hostinger_login_data';
    private const EXPIRATION_TIME_SECONDS = 10800; // 3 hours

    public function init() {
        add_action( 'hostinger_autologin_user_logged_in', [ $this, 'processLoginData' ] );
        add_action( 'hostinger_autologin', [ $this, 'processLoginData' ] );
        add_action( 'wp_logout', [ $this, 'clearLoginData' ] );
    }

    public function processLoginData( array $data ) : void {
        $sanitized_data = $this->sanitizeLoginData( $data );
        set_transient( self::TRANSIENT_KEY, $sanitized_data, self::EXPIRATION_TIME_SECONDS );
    }

    private function sanitizeLoginData( array $data ) : array {
        if ( ! is_array( $data ) ) {
            return [];
        }

        return array_map( 'sanitize_text_field', $data );
    }

    public function clearLoginData() : void {
        delete_transient( self::TRANSIENT_KEY );
    }
}
