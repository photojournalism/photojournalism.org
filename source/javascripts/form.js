var Form = (function($) {
  'use strict';

  var self = {},
      name = "",
      message = "";

  var _validateFields = function(fields) {
    var valid = true;
    $.each(fields, function(i, val) {
      var field = $("#" + val);
      if ($.trim(field.val()) === "") {
        field.focus();
        field.parent().addClass("has-error");
        alert("Oops, you've missed a required field.");
        valid = false;
        return false;
      } else {
        field.parent().removeClass("has-error");
      }
    });
    return valid;
  };

  var _submit = function() {
    var inputs = $('#form .required');
    var values = {};
    inputs.each(function() {
        values[$(this).attr("id")] = $(this).val();
    });

    if (_validateFields(Object.keys(values))) {
      var button = $("#form-submit");
      var text = button.html();
      button.attr("disabled", "disabled");
      button.html("Submitting...");
      values.formName = name;

      $.ajax({
        url: '/contact/submit.php',
        type: 'POST',
        data: values,
        success: function() {
          $("#form").empty().append(
            "<div class='alert alert-success'>" +
              "Your form for <strong>" + name + "</strong> has been submitted successfully. " + message +
            "</div>"
          );
        },
        error: function(response) {
          alert("An error has occurred:\n" + response.responseJSON.message);
          button.html(text);
          button.removeAttr("disabled");
        }
      });
    }
  };

  self.init = function(formName, submitMessage) {
    name = formName;
    message = submitMessage;
    $("#form-submit").click(function() {
      _submit();
    });
  };

  return self;
}(jQuery));