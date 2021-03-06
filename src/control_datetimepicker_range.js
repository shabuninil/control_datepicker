
var control_datetimepicker_range = {

    /**
     * Создание календаря
     * @param {object} wrapper
     */
    create : function(wrapper) {
        var $input_from = $('.ctrl-dtpr-from-value', wrapper);
        var $input_to   = $('.ctrl-dtpr-to-value', wrapper);

        control_datetimepicker_range.createDate($input_from, $input_to, wrapper);
        control_datetimepicker_range.createEvents(wrapper);

        var dateFormat = 'yy-mm-dd';
        $('.ctrl-dtpr-container', wrapper).datepicker({
            firstDay: 1,
            dateFormat: dateFormat,
            defaultDate: $input_from.val(),
            beforeShowDay: function(date) {
                var date1   = $.datepicker.parseDate(dateFormat, $input_from.val());
                var classes = date1 && date.getTime() == date1.getTime()
                    ? 'ctrl-dtpr-highlight'
                    : '';
                var classes2 = control_datetimepicker_range.callbackDayClass(date);
                classes += classes2 ? ' ' + classes2 + ' ' : '';
                return [true, classes];
            },
            onSelect: function(dateText, inst) {
                var hourFrom   = $('.ctrl-dtpr-from-hour', wrapper).val();
                var minuteFrom = $('.ctrl-dtpr-from-minute', wrapper).val();
                var hourTo     = $('.ctrl-dtpr-to-hour', wrapper).val();
                var minuteTo   = $('.ctrl-dtpr-to-minute', wrapper).val();

                var dateTextFrom = dateText;
                if (hourFrom != '' && minuteFrom != '') {
                    dateTextFrom += ' ' + hourFrom + ':' + minuteFrom;
                } else if (hourFrom != '' && minuteFrom == '') {
                    dateTextFrom += ' ' + hourFrom + ':00';
                } else if (hourFrom == '' && minuteFrom != '') {
                    dateTextFrom += ' 00:' + minuteFrom;
                }

                var dateTextTo = dateText;
                if (hourTo != '' && minuteTo != '') {
                    dateTextTo += ' ' + hourTo + ':' + minuteTo;
                } else if (hourTo != '' && minuteTo == '') {
                    dateTextTo += ' ' + hourTo + ':00';
                } else if (hourTo == '' && minuteTo != '') {
                    dateTextTo += ' 00:' + minuteTo;
                }

                $input_from.val(dateTextFrom);
                $input_to.val(dateTextTo);
                control_datetimepicker_range.createDate($input_from, $input_to, wrapper);
                control_datetimepicker_range.callbackChange(dateTextFrom, dateTextTo, wrapper);
                $('.ctrl-dtpr-container', wrapper).hide('fast');
            }
        });
    },


    /**
     * Обновление календаря
     * @param {object} wrapper
     */
    rebuildCalendar : function(wrapper) {
        var $input_from = $('.ctrl-dtpr-from-value', wrapper);
        var $input_to   = $('.ctrl-dtpr-to-value', wrapper);
        var dateFormat  = 'yy-mm-dd';
        var $ctrl       = $('.ctrl-dtpr-container', wrapper);

        $ctrl.datepicker('setDate', $input_from.val());
        $ctrl.datepicker( "option", "beforeShowDay", function(date) {
            var date1 = $.datepicker.parseDate(dateFormat, $input_from.val());
            var date2 = $.datepicker.parseDate(dateFormat, $input_to.val());
            var classes = date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date < date2))
                ? ' ctrl-dtpr-highlight '
                : '';
            var classes2 = control_datetimepicker_range.callbackDayClass(date);
            classes += classes2 ? ' ' + classes2 + ' ' : '';
            return [true, classes];
        });
    },


    /**
     * Заполнение значения
     * @param {object} wrapper
     */
    dateBlur : function(wrapper) {

        var day_from    = $('.ctrl-dtpr-from-day', wrapper).val();
        var month_from  = $('.ctrl-dtpr-from-month', wrapper).val();
        var year_from   = $('.ctrl-dtpr-from-year', wrapper).val();
        var hour_from   = $('.ctrl-dtpr-from-hour', wrapper).val();
        var minute_from = $('.ctrl-dtpr-from-minute', wrapper).val();

        var day_to    = $('.ctrl-dtpr-to-day', wrapper).val();
        var month_to  = $('.ctrl-dtpr-to-month', wrapper).val();
        var year_to   = $('.ctrl-dtpr-to-year', wrapper).val();
        var hour_to   = $('.ctrl-dtpr-to-hour', wrapper).val();
        var minute_to = $('.ctrl-dtpr-to-minute', wrapper).val();


        day_from    = Number(day_from) > 0 ? day_from : '';
        month_from  = Number(month_from) > 0 ? month_from : '';
        year_from   = Number(year_from) > 0 ? year_from : '';
        hour_from   = Number(hour_from) > 0 ? hour_from : '';
        minute_from = Number(minute_from) > 0 ? minute_from : '';

        day_from    = day_from.length > 2 ? day_from.substr(0, 2) : day_from;
        month_from  = month_from.length > 2 ? month_from.substr(0, 2) : month_from;
        year_from   = year_from.length > 4 ? year_from.substr(0, 4) : year_from;
        hour_from   = hour_from.length > 2 ? hour_from.substr(0, 2) : hour_from;
        minute_from = minute_from.length > 2 ? minute_from.substr(0, 2) : minute_from;

        day_from    = day_from    ? '00'.substring(0, 2 - day_from.length) + day_from       : '';
        month_from  = month_from  ? '00'.substring(0, 2 - month_from.length) + month_from   : '';
        year_from   = year_from   ? '0000'.substring(0, 4 - year_from.length) + year_from   : '';
        hour_from   = hour_from   ? '00'.substring(0, 2 - hour_from.length) + hour_from     : '00';
        minute_from = minute_from ? '00'.substring(0, 2 - minute_from.length) + minute_from : '00';

        
        day_to    = Number(day_to) > 0 ? day_to : '';
        month_to  = Number(month_to) > 0 ? month_to : '';
        year_to   = Number(year_to) > 0 ? year_to : '';
        hour_to   = Number(hour_to) > 0 ? hour_to : '';
        minute_to = Number(minute_to) > 0 ? minute_to : '';

        day_to    = day_to.length > 2 ? day_to.substr(0, 2) : day_to;
        month_to  = month_to.length > 2 ? month_to.substr(0, 2) : month_to;
        year_to   = year_to.length > 4 ? year_to.substr(0, 4) : year_to;
        hour_to   = hour_to.length > 2 ? hour_to.substr(0, 2) : hour_to;
        minute_to = minute_to.length > 2 ? minute_to.substr(0, 2) : minute_to;
        
        day_to    = day_to    ? '00'.substring(0, 2 - day_to.length) + day_to       : '';
        month_to  = month_to  ? '00'.substring(0, 2 - month_to.length) + month_to   : '';
        year_to   = year_to   ? '0000'.substring(0, 4 - year_to.length) + year_to   : '';
        hour_to   = hour_to   ? '00'.substring(0, 2 - hour_to.length) + hour_to     : '00';
        minute_to = minute_to ? '00'.substring(0, 2 - minute_to.length) + minute_to : '00';


        if (year_from === '' || month_from === '' || day_from === '') {
            $('.ctrl-dtpr-from-value', wrapper).val('');
            $('.ctrl-dtpr-to-value', wrapper).val('');
        } else {
            var date_from = year_from + '-' + month_from + '-' + day_from + ' ' + hour_from + ':' + minute_from;
            $('.ctrl-dtpr-from-value', wrapper).val(date_from);

            var date_to = '';
            if (year_to !== '' && month_to !== '' && day_to !== '') {
                date_to = year_to + '-' + month_to + '-' + day_to + ' ' + hour_to + ':' + minute_to;
            } else {
                date_to = year_from + '-' + month_from + '-' + day_from + ' ' + hour_to + ':' + minute_to;
            }
            $('.ctrl-dtpr-to-value', wrapper).val(date_to);
        }

        control_datetimepicker_range.callbackChange(date_from, date_to, wrapper);
        this.rebuildCalendar(wrapper);
    },


    /**
     * Заполнение дат
     * @param {object} $input_from
     * @param {object} $input_to
     * @param {object} wrapper
     */
    createDate : function($input_from, $input_to, wrapper) {

        var split_from = $input_from.val().split(' ');
        var split_to   = $input_to.val().split(' ');

        var date_from = split_from[0].split('-');
        var date_to   = split_to[0].split('-');

        $('.ctrl-dtpr-from-day', wrapper).val(date_from[2] ? date_from[2] : '');
        $('.ctrl-dtpr-from-month', wrapper).val(date_from[1] ? date_from[1] : '');
        $('.ctrl-dtpr-from-year', wrapper).val(date_from[0] ? date_from[0] : '');

        $('.ctrl-dtpr-to-day', wrapper).val(date_to[2] ? date_to[2] : '');
        $('.ctrl-dtpr-to-month', wrapper).val(date_to[1] ? date_to[1] : '');
        $('.ctrl-dtpr-to-year', wrapper).val(date_to[0] ? date_to[0] : '');


        if (typeof split_from[1] != 'undefined') {
            var from_time = split_from[1].split(':');

            $('.ctrl-dtpr-from-hour', wrapper).val(from_time[0]);
            $('.ctrl-dtpr-from-minute', wrapper).val(from_time[1]);

        } else {
            $('.ctrl-dtpr-from-hour', wrapper).val('00');
            $('.ctrl-dtpr-from-minute', wrapper).val('00');
        }

        if (typeof split_to[1] != 'undefined') {
            var to_time = split_to[1].split(':');

            $('.ctrl-dtpr-to-hour', wrapper).val(to_time[0]);
            $('.ctrl-dtpr-to-minute', wrapper).val(to_time[1]);

        } else {
            $('.ctrl-dtpr-to-hour', wrapper).val('00');
            $('.ctrl-dtpr-to-minute', wrapper).val('00');
        }
    },


    /**
     * Валидация
     * @param e
     */
    eventKeyPress : function (e) {
        var keyCode;
        if (e.keyCode) keyCode = e.keyCode;
        else if(e.which) keyCode = e.which;
        var av = new Array(8, 9, 35, 36, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57);
        for (var i = 0; i < av.length; i++) {
            if (av[i] == keyCode) {
                return;
            }
        }
        e.preventDefault();
    },


    /**
     * Проверка наличия класса
     * @param   {object}  element
     * @param   {string}  cls
     * @returns {boolean}
     */
    hasClass : function (element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    },


    /**
     * Валидация
     * @param {object} input
     * @param {object} wrapper
     */
    eventKeyUp : function(input, wrapper) {

        if (control_datetimepicker_range.hasClass(input, 'ctrl-dpr-from-day')) {
            var from_month    = parseInt($('.ctrl-dtpr-from-month', wrapper).val());
            var from_year     = parseInt($('.ctrl-dtpr-from-year', wrapper).val());
            var from_last_day = 31;

            if (from_month > 0) {
                from_last_day = 32 - new Date(from_year, from_month - 1, 32).getDate();
            }

            if (input.value.length > 2) {
                input.value = input.value.substr(0, 2);
            }
            if (input.value == '00') {
                input.value = '01';
            } else if (Number(input.value) > from_last_day) {
                input.value = from_last_day;
            } else if (input.value == '') {
                input.value = '';
            } else if (Number(input.value) < 0) {
                input.value = 0;
            }
            
        } else if (control_datetimepicker_range.hasClass(input, 'ctrl-dpr-to-day')) {
            var to_month    = parseInt($('.ctrl-dtpr-to-month', wrapper).val());
            var to_year     = parseInt($('.ctrl-dtpr-to-year', wrapper).val());
            var to_last_day = 31;

            if (to_month > 0) {
                to_last_day = 32 - new Date(to_year, to_month - 1, 32).getDate();
            }
            if (input.value.length > 2) {
                input.value = input.value.substr(0, 2);
            }
            if (input.value == '00' || Number(input.value) < 0) {
                input.value = '01';
            } else if (Number(input.value) > to_last_day) {
                input.value = to_last_day;
            } else if (input.value == '') {
                input.value = '';
            }
            
        } else if (control_datetimepicker_range.hasClass(input, 'ctrl-dpr-from-month') ||
                   control_datetimepicker_range.hasClass(input, 'ctrl-dpr-to-month')
        ) {
            if (input.value.length > 2) {
                input.value = input.value.substr(0, 2);
            }
            if (input.value == '00' || Number(input.value) < 0) {
                input.value = '01';
            } else if (Number(input.value) > 12) {
                input.value = 12;
            } else if (input.value == '') {
                input.value = '';
            }

        } else if (control_datetimepicker_range.hasClass(input, 'ctrl-dpr-from-year') ||
                   control_datetimepicker_range.hasClass(input, 'ctrl-dpr-to-year')
            ) {
            if (input.value.length > 4) {
                input.value = input.value.substr(0, 4);
            }

        } else if (control_datetimepicker_range.hasClass(input, 'ctrl-dpr-from-hour') ||
            control_datetimepicker_range.hasClass(input, 'ctrl-dpr-to-hour')
        ) {
            if (input.value.length > 2) {
                input.value = input.value.substr(0, 2);
            }
            if (Number(input.value) > 23) {
                input.value = 23;
            } else if (input.value == '') {
                input.value = '';
            } else if (Number(input.value) < 0) {
                input.value = 0;
            }

        } else if (control_datetimepicker_range.hasClass(input, 'ctrl-dpr-from-minute') ||
            control_datetimepicker_range.hasClass(input, 'ctrl-dpr-to-minute')
        ) {
            if (input.value.length > 2) {
                input.value = input.value.substr(0, 2);
            }
            if (Number(input.value) > 59) {
                input.value = 59;
            } else if (input.value == '') {
                input.value = '';
            } else if (Number(input.value) < 0) {
                input.value = 0;
            }
        }
        input.focus();
        this.dateBlur(wrapper);
    },


    /**
     * Валидация
     * @param {object} input
     * @param {object} wrapper
     */
    eventChange : function(input, wrapper) {
        this.dateBlur(wrapper);
    },


    /**
     * Установка событий
     * @param {object} wrapper
     */
    createEvents : function(wrapper) {

        /**
         * Показ/скрытие календаря
         */
        $('.ctrl-dtpr-trigger', wrapper).click(function () {
            if ($('.ctrl-dtpr-container', wrapper).is(':visible')) {
                $('.ctrl-dtpr-container', wrapper).hide('fast');
            } else {
                $('.ctrl-dtpr-container', wrapper).show('fast');
            }
            return false;
        });

        /**
         * Очистка даты
         */
        $('.ctrl-dtpr-clear', wrapper).click(function () {
            $('.ctrl-dtpr-from-value, .ctrl-dtpr-to-value', wrapper).val('');
            $('.ctrl-dtpr-from-day, .ctrl-dtpr-to-day', wrapper).val('');
            $('.ctrl-dtpr-from-month, .ctrl-dtpr-to-month', wrapper).val('');
            $('.ctrl-dtpr-from-year, .ctrl-dtpr-to-year', wrapper).val('');
            $('.ctrl-dtpr-from-hour, .ctrl-dtpr-to-hour', wrapper).val('');
            $('.ctrl-dtpr-from-minute, .ctrl-dtpr-to-minute', wrapper).val('');

            control_datetimepicker_range.callbackChange('', '', wrapper);

            $('.ctrl-dtpr-container', wrapper).datepicker('refresh');
        });


        /**
         * Валидация
         */
        $('.ctrl-dtpr-from-day, .ctrl-dtpr-from-month, .ctrl-dtpr-from-year', wrapper).keyup(function (event) {
            control_datetimepicker_range.eventKeyUp(this, wrapper);

            var keyCode;
            if (event.keyCode) keyCode = event.keyCode;
            else if (event.which) keyCode = event.which;
            var av = new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105);
            for (var i = 0; i < av.length; i++) {
                if (av[i] == keyCode) {
                    if ($(event.currentTarget).hasClass("ctrl-dtpr-from-day") ||
                        $(event.currentTarget).hasClass("ctrl-dtpr-from-month")
                    ) {
                        if ($(this, wrapper).val().length >= 2) {
                            event.preventDefault();
                            control_datetimepicker_range.nextFocus(this, wrapper);
                        }

                    } else {
                        if ($(this, wrapper).val().length >= 4) {
                            event.preventDefault();
                            control_datetimepicker_range.nextFocus(this, wrapper);
                        }
                    }
                    break;
                }
            }
        });
        $('.ctrl-dtpr-to-day, .ctrl-dtpr-to-month, .ctrl-dtpr-to-year', wrapper).keyup(function (event) {
            control_datetimepicker_range.eventKeyUp(this, wrapper);

            var keyCode;
            if (event.keyCode) keyCode = event.keyCode;
            else if (event.which) keyCode = event.which;
            var av = new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105);
            for (var i = 0; i < av.length; i++) {
                if (av[i] == keyCode) {
                    if ($(event.currentTarget).hasClass("ctrl-dtpr-to-day") ||
                        $(event.currentTarget).hasClass("ctrl-dtpr-to-month")
                    ) {
                        if ($(this, wrapper).val().length >= 2) {
                            event.preventDefault();
                            control_datetimepicker_range.nextFocus(this, wrapper);
                        }

                    } else {
                        if ($(this, wrapper).val().length >= 4) {
                            event.preventDefault();
                            control_datetimepicker_range.nextFocus(this, wrapper);
                        }
                    }
                    break;
                }
            }
        });
        $('.ctrl-dtpr-from-hour, .ctrl-dtpr-from-minute, .ctrl-dtpr-to-hour, .ctrl-dtpr-to-minute', wrapper).keyup(function (event) {
            control_datetimepicker_range.eventKeyUp(this, wrapper);

            var keyCode;
            if (event.keyCode) keyCode = event.keyCode;
            else if (event.which) keyCode = event.which;
            var av = new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105);
            for (var i = 0; i < av.length; i++) {
                if (av[i] == keyCode) {
                    if ($(this, wrapper).val().length >= 2) {
                        event.preventDefault();
                        control_datetimepicker_range.nextFocus(this, wrapper);
                    }
                    break;
                }
            }
        });
        $('.ctrl-dtpr-from-day, .ctrl-dtpr-from-month, .ctrl-dtpr-from-year', wrapper).keypress(function (event) {
            control_datetimepicker_range.eventKeyPress(event);
        });
        $('.ctrl-dtpr-to-day, .ctrl-dtpr-to-month, .ctrl-dtpr-to-year', wrapper).keypress(function (event) {
            control_datetimepicker_range.eventKeyPress(event);
        });
        $('.ctrl-dtpr-from-hour, .ctrl-dtpr-from-minute, .ctrl-dtpr-to-hour, .ctrl-dtpr-to-minute', wrapper).keypress(function (event) {
            control_datetimepicker_range.eventKeyPress(event);
        });
        $('.ctrl-dtpr-from-hour, .ctrl-dtpr-from-minute, .ctrl-dtpr-to-hour, .ctrl-dtpr-to-minute', wrapper).change(function () {
            control_datetimepicker_range.eventChange(this, wrapper);
        });
    },


    /**
     * Фокусировка на следующем контроле
     * @param {object} currentTarget
     * @param {object} wrapper
     */
    nextFocus: function(currentTarget, wrapper) {

        var now = new Date().getTime() / 1000;

        if ( ! this.lastNextChange || this.lastNextChange + 0.3 < now) {
            this.lastNextChange = now;
            var isFind = false;
            $('input[class*="ctrl-dtpr-"]:visible, select[class*="ctrl-dtpr-"]:visible', wrapper).each(function () {
                if (isFind === false) {
                    if (currentTarget == this) {
                        isFind = true;
                    }
                } else {
                    $(this).focus();
                    return false;
                }
            });
        }
    },


    /**
     * Выполнение функции после изменения даты
     */
    callbackChange : function(date_from, date_to, wrapper) {
        if (typeof this.callback_change == 'function') {
            this.callback_change(date_from, date_to, wrapper);
        }
    },


    /**
     * Функция выполняющаяся после изменения даты
     * @param func
     */
    setCallbackChange : function(func) {
        if (typeof func == 'function') {
            this.callback_change = func;
        }
    },


    /**
     * Выполнение функции для раскраски календаря
     */
    callbackDayClass : function(date) {
        if (typeof this.callback_day_class == 'function') {
            return this.callback_day_class(date);
        }
    },


    /**
     * Функция выполняющаяся для раскраски календаря
     * @param func
     */
    setCallbackDayClass : function(func) {
        if (typeof func == 'function') {
            this.callback_day_class = func;
        }
    }
};



$(document).ready(function(){
    /**
     * Скрытие календаря
     */
    $(document).click(function(e) {
        var target = $(e.target);
        if ($(target).parents('.ctrl-dtpr-container, .ui-datepicker-group, .ui-datepicker-next, .ui-datepicker-prev').length) {
            return false;

        } else if ($('.ctrl-dtpr-container').is(':visible')) {
            $('.ctrl-dtpr-container:visible').hide('fast');
        }
    });
});