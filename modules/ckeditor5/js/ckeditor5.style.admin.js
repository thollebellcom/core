/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.behaviors.ckeditor5StyleSettingsSummary = {
    attach() {
      $('[data-ckeditor5-plugin-id="ckeditor5_style"]').drupalSetSummary(context => {
        const stylesElement = document.querySelector('[data-drupal-selector="edit-editor-settings-plugins-ckeditor5-style-styles"]');
        const styleCount = stylesElement.value.split('\n').filter(line => line.trim().length >= 5).length;

        if (styleCount === 0) {
          return Drupal.t('No styles configured');
        }

        return Drupal.formatPlural(styleCount, 'One style configured', '@count styles configured');
      });
    }

  };
})(jQuery, Drupal);