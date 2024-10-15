<?php
define( 'WP_CACHE', true );

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u993481118_G5Qgz' );

/** Database username */
define( 'DB_USER', 'u993481118_yMceK' );

/** Database password */
define( 'DB_PASSWORD', 'NIpZwCBGMO' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'Y-A4>+r}[Q;IpqZUhFg*Qxr|jx(d$4wVgU?FYMuU$WAhhPkiB^Rp6[`EQJ&7As:f' );
define( 'SECURE_AUTH_KEY',   'Dbb24N]8-0XQrAityVp4M1$iL#k<Gdo:SEX60b0u}V!aGIl8fv*%>mxoN9iRM{SL' );
define( 'LOGGED_IN_KEY',     'kb=Eh&QI7LU|s68-tQlO*FQ|(Uvke/ v1sEdz-zEow0,oo563qb~%p&<OK51$qHX' );
define( 'NONCE_KEY',         'mr*pY@O+<69_gc@IDo.+5Q5]zElbuf$g&n<}Dxn}xb${,GP3FP xb~#sgV7ev}7v' );
define( 'AUTH_SALT',         '(!cj34hG2<t9`XMV/NYCVfT8Hp,YvODy$Q`Xr }Pc5pZ%-uS^7M]/WE%hVK?oe3&' );
define( 'SECURE_AUTH_SALT',  'b+qL~iy)L^eUSwnc9{*T=x2eAOkhlc;@-:(X):%*PAm/0+lduLpn,z9-=gsachI{' );
define( 'LOGGED_IN_SALT',    'i].MX%a)Q)Ood6JnKI]a[vz1<}+%G,[Qxg;^/eXhf8m,Bl7TS}UG})x?s1A9**FW' );
define( 'NONCE_SALT',        'GSj-+^$)+`-2;5yHRQ]b*T|D<KDa_9`6 >|r_m?I 7?#3DsKn@#E8}|$-^- q)(Y' );
define( 'WP_CACHE_KEY_SALT', '5(me}h4xrf_RxPezG+cbFD&;)r9OF;b5TG#*/wr7mmcuso=8whw,p97*<<5$C;ug' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'FS_METHOD', 'direct' );
define( 'COOKIEHASH', '781eb310e97794d344577916a853ada5' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
