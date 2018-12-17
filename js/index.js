$(function() {

    $('#counters').viewportChecker({

        callbackFunction: function(elem, action) {
            $('#number1').animateNumber({
                number: 15
            });

            $('#number2').animateNumber({
                number: 500
            });

            $('#number3').animateNumber({
                number: 300
            });
        },

    });

    $('.closePopUp').click(function() {

        $("#success").fadeOut({
            easing: "linear",
            duration: 200,
            complete: function() {
                $('body').css('overflow-y', 'visible');
            }
        });

    });


    $('#buttonMenu').click(function() {

        $("#modal").fadeIn({
            easing: "linear",
            duration: 200,
            complete: function() {
                $('body').css('overflow-y', 'hidden');
            }
        });

    });


    $('#closeMenu, #closeIndex').click(function() {

        $("#modal").fadeOut({
            easing: "linear",
            duration: 200,
            complete: function() {
                $('body').css('overflow-y', 'visible');
            }
        });

    });


    $('#submitButton').on('click', formSumitButtonHandler);

    function formSumitButtonHandler(e) {

        var fullName = $('#full-Name').val();
        var companyName = $('#company-Name').val();
        var email = $('#e-mail').val();
        var message = $('#message').val();

        if (fullName.length >= 3 && companyName.length >= 3 && email.length >= 6) {

            var formData = {
                'fullName': $('#full-Name').val(),
                'companyName': $('#company-Name').val(),
                'email': $('#e-mail').val(),
                'message': $('#message').val()
            };

            $.ajax({
                type: 'POST',
                url: 'c/contact_form',
                data: formData,
                dataType: 'json', 
                encode: true,
                success: function(data, textStatus, jQxhr) {

                    $('#mainForm')[0].reset($(function() {

                        $('#submitButton, input, textarea').attr('disabled', 'disabled');

                        setTimeout(function() {
                            $('#success').fadeIn(500);
                            $('body').css('overflow-y', 'hidden');
                        }, 400);

                        setTimeout(function() {
                            $('#success').fadeOut(500);
                            $('#submitButton, input, textarea').removeAttr('disabled');
                            $('body').css('overflow-y', 'visible');
                        }, 5000);

                    }));

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {

                    $('#mainForm')[0].reset($(function() {

                        setTimeout(function() {
                            $('#invalidMessage').fadeIn(500);
                        }, 400);

                        setTimeout(function() {
                            $('#invalidMessage').fadeOut(500);
                        }, 6300);

                    }));
                    
                }
                
            })

            e.preventDefault();

        } else {

            setTimeout(function() {
                $('#invalidMessage').fadeIn(500);
            }, 400);

            setTimeout(function() {
                $('#invalidMessage').fadeOut(500);
            }, 6000);

        }

    }


});