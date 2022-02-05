(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.behaviors.scd_form_helper = {
    attach: function (context, settings) {
      $('.config-download-button').once().hide();
      var currentConfigType = '';

      if ($('.form-item-config-name select').val() == 0) {
        $('.form-item-config-type select option:first-child').attr('disabled', 'disabled');
        $('.form-item-config-name select').attr('disabled', 'disabled');
      }
      $(document).once().ajaxStop(function () {
        if ($('.form-item-config-type select').val() == currentConfigType) {
          if ($('.form-item-config-name select').val()) {
            $('.config-download-button').show();
          }
          return;
        }
        currentConfigType = $('.form-item-config-type select').val();
        $('.form-item-config-type select option:first-child').attr('disabled', 'disabled');

        if ($('.form-item-config-type select').val() == '0') {
          $('.form-item-config-name select').attr('disabled', 'disabled');
        }
        else {
          $('.form-item-config-name select').removeAttr('disabled');

          if ($('.form-item-config-type select').val() == 'system.simple') { 
            $('.form-item-config-name select').prepend($('<option>', {
              value: 0,
              text: '- Select -'
            }));

            $('.config-download-button').hide();
          }
        }

        $('.form-item-config-name select').prop("selectedIndex", 0);

        $('.form-item-config-name select').change(function () {
          $('.form-item-config-name select option:first-child').attr('disabled', 'disabled');
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
