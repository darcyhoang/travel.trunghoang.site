<?php

namespace Hostinger\EasyOnboarding\Admin;

use Hostinger\EasyOnboarding\Settings;

defined('ABSPATH') || exit;

class Redirects
{
    public const PLATFORM_HPANEL = 'hpanel';
    public const BUILDER_TYPE = 'prebuilt';
    public const HOMEPAGE_DISPLAY = 'page';

    private string $platform;

    public function __construct()
    {
        if (!Settings::get_setting('first_login_at')) {
            Settings::update_setting('first_login_at', gmdate('Y-m-d H:i:s'));
        }

        $platform = isset($_GET['platform']) ? sanitize_text_field($_GET['platform']) : null;

        if ($platform) {
            $this->platform = $platform;

            if ($this->platform === self::PLATFORM_HPANEL) {
                add_action('init', [$this, 'loginRedirect']);
            }
        }
    }

    public function loginRedirect(): void
    {
        $isPrebuildWebsite = get_option('hostinger_builder_type', '') === self::BUILDER_TYPE;
        $isWoocommercePage = in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')));
        $homepageId        = get_option('show_on_front') === self::HOMEPAGE_DISPLAY ? get_option('page_on_front') : null;
        $isGutenbergPage   = $homepageId ? has_blocks(get_post($homepageId)->post_content) : false;

        if ($this->canRedirectToGutenbergEditor($isPrebuildWebsite, $isWoocommercePage, $homepageId, $isGutenbergPage)) {
            wp_safe_redirect(get_edit_post_link($homepageId, ''));
            exit;
        }

        wp_safe_redirect(admin_url('admin.php?page=hostinger'));
        exit;
    }

    private function canRedirectToGutenbergEditor(bool $isPrebuildWebsite, bool $isWoocommercePage, ?int $homepageId, bool $isGutenbergPage): bool
    {
        return $isPrebuildWebsite && !$isWoocommercePage && $homepageId && $isGutenbergPage;
    }
}
