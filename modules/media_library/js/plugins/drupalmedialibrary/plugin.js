/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, CKEDITOR) {
  CKEDITOR.plugins.add('drupalmedialibrary', {
    requires: 'drupalmedia',
    icons: 'drupalmedialibrary',
    hidpi: true,

    beforeInit(editor) {
      editor.addCommand('drupalmedialibrary', {
        allowedContent: {
          'drupal-media': {
            attributes: {
              '!data-entity-type': true,
              '!data-entity-uuid': true,
              '!data-view-mode': true,
              '!data-align': true,
              '!data-caption': true,
              '!alt': true,
              '!title': true
            },
            classes: {}
          }
        },
        requiredContent: new CKEDITOR.style({
          element: 'drupal-media',
          attributes: {
            'data-entity-type': '',
            'data-entity-uuid': ''
          }
        }),
        modes: {
          wysiwyg: 1
        },
        canUndo: true,

        exec(editor) {
          const saveCallback = function (values) {
            editor.fire('saveSnapshot');
            const mediaElement = editor.document.createElement('drupal-media');
            const attributes = values.attributes;
            Object.keys(attributes).forEach(key => {
              mediaElement.setAttribute(key, attributes[key]);
            });
            editor.insertHtml(mediaElement.getOuterHtml());
            editor.fire('saveSnapshot');
          };

          Drupal.ckeditor.openDialog(editor, editor.config.DrupalMediaLibrary_url, {}, saveCallback, editor.config.DrupalMediaLibrary_dialogOptions);
        }

      });

      if (editor.ui.addButton) {
        editor.ui.addButton('DrupalMediaLibrary', {
          label: Drupal.t('Insert from Media Library'),
          command: 'drupalmedialibrary'
        });
      }
    }

  });
})(Drupal, CKEDITOR);