


function continue_action() {
    var brims = $('input[name="choose_variant"]:checked');

    var brims_val = brims.val();
    var leftTd = $('#lefttd');
    if (brims_val == 'old_without_brims') {
        leftTd.find('input[name="brim"][value="0"]').click();
    }
    else if (brims_val == 'old_with_brims') {
        leftTd.find('input[name="brim"][value="1"]').click();
    }
    else if (brims_val == 'new') {
        leftTd.find('input[name="format"][value=\'' + brims.data('format') + '\']').click();
        leftTd.find('input[name="brim"][value="2"]').click();
    }
    changeItem();
	$("#form_var_main").hide();
    $('#suborder_complete_message').show();
     setTimeout(function () {
		sendEndOrderAjax();
    }, 2000);
}

function previewWithBrims(new_format, old_format) {
    var link_arr = [];
    var div_arr = [];
    var img_arr = [];
    var div_previews = $('#previews').html('');
    var header = $('<b></b>').html('Фото с полями').appendTo(div_previews);
    var curr_format_array = returnWidthAndHeightFromCurrFormat();
        $('.original_preview_img1').each(function () {
            link_arr.push($(this).attr('src'));
        });
        

    for (var i = 0; i < link_arr.length; i++) {

        div_arr[i] = $('<div></div>').css({
            'margin': '0 auto',
            'display': 'inline-block',
            'position': 'relative',
            'margin-top': '15px'
        });
        if (i == 0) {
            div_arr[i].css('margin-top', '31px')
        }
        img_arr[i] = $('<img/>').css('border', 'none');
        img_arr[i].load({iter: i, curr_format_array: curr_format_array}, function (e) {
            var $this = $(this);
            var img_height = this.height;
            var img_width = this.width;

            if (img_height>img_width) {
                $this=$(this).rotateRight(90);
                img_height = this.width;
                img_width = this.height;
            }

            var new_height;
            var new_width;
            var delta;
            var div_brim = $('<div></div>').css({
                'position': 'absolute',
                'border': '#000000 solid 1px',
                'top': '-1px',
                'left': '-1px'
            });
            var div_cut_top_left_dubl1 = $('<div></div>').css({
                'position': 'absolute',
                'border': 'none',
                'top': 0,
                'left': 0,
                'background': 'white',
                'opacity': 0.4
            });
            var div_cut_bottom_right_dubl1 = $('<div></div>').css({
                'position': 'absolute',
                'border': 'none',
                'bottom': '2px',
                'left': 0,
                'background': 'white',
                'opacity': 0.4
            });
            var div_cut_top_left_dubl2 = $('<div></div>').css({
                'position': 'absolute',
                'border': 'none',
                'top': 0,
                'left': 0,
                'background': 'white',
                'opacity': 0.4
            });
            var div_cut_bottom_right_dubl2 = $('<div></div>').css({
                'position': 'absolute',
                'border': 'none',
                'bottom': '2px',
                'left': 0,
                'background': 'white',
                'opacity': 0.4
            });
            var span_top_left = $('<span></span>').css({
                'position': 'absolute',
                'display': 'block',
                'width': '33px'
            });
            var span_bottom_right = $('<span></span>').css({
                'position': 'absolute',
                'display': 'block',
                'width': '33px'
            });
            var arrow_up=$('<img/>')
                .attr('src','img/up.png')
                .css({
                    'position':'absolute',
                    'top':'-5px',
                    'left':'-3px',
                    'height':'8px'
                });

            var arrow_down=$('<img/>')
                .attr('src','img/down.png')
                .css({
                    'position':'absolute',
                    'bottom':'-5px',
                    'left':'-3px',
                    'height':'8px'
                });
            var arrow_right=$('<img/>')
                .attr('src','img/right.png')
                .css({
                    'position':'absolute',
                    'top':'-3px',
                    'right':'-5px',
                    'width':'8px'
                });
            var arrow_left=$('<img/>')
                .attr('src','img/left.png')
                .css({
                    'position':'absolute',
                    'top':'-3px',
                    'left':'-5px',
                    'width':'8px'
                });
            if (img_height > img_width) {
                if ((img_height / img_width).toFixed(2) < format_size_ratio[old_format]) {
                    new_height = img_width * format_size_ratio[old_format];
                    delta = new_height - img_height;
                    div_brim.css({'height': new_height, 'width': img_width, 'top': '-' + (delta / 2) + 'px'});
                    div_arr[e.data.iter].css({
                        'margin-top': (delta / 2) + 5 + 31 + 'px',
                        'margin-bottom': (delta / 2) + 5 + 'px'
                    });

                    if (e.data.iter == 0) {
                        div_cut_top_left_dubl1.css({
                            'height': '30px',
                            'width': img_width,
                            'left': -1,
                            'border-left': '1px #494949 solid',
                            'border-right': '1px #494949 solid',
                            'top': -31 - delta / 2
                        });
                        div_cut_top_left_dubl2.css({
                            'height': '20px',
                            'width': img_width - 10,
                            'left': 5,
                            'border-top': '1px #494949 solid',
                            'top': -21 - delta / 2
                        });

                        div_cut_bottom_right_dubl1.css({
                            'height': new_height,
                            'width': '30px',
                            'border-top': '1px #494949 solid',
                            'border-bottom': '1px #494949 solid',
                            'left': -31,
                            'bottom': -delta / 2 + 1
                        });
                        div_cut_bottom_right_dubl2.css({
                            'height': new_height - 10,
                            'width': '20px',
                            'border-left': '1px #494949 solid',
                            'left': -21,
                            'bottom': -delta / 2 + 6
                        });
                        span_top_left.addClass('rotateText').css({
                            'left': '-46px',
                            'top': img_height / 2 - 7
                        }).html(e.data.curr_format_array[1] + 'см');
                        span_bottom_right.css({
                            'left': img_width / 2 - 17,
                            'top': '-43px'
                        }).html(e.data.curr_format_array[0] + 'см');

                        arrow_right.appendTo(div_cut_top_left_dubl2);
                        arrow_left.appendTo(div_cut_top_left_dubl2);
                        arrow_up.appendTo(div_cut_bottom_right_dubl2);
                        arrow_down.appendTo(div_cut_bottom_right_dubl2);
                    }

                } else {
                    new_width = img_height / format_size_ratio[old_format];
                    if (new_width > 500) { //если поля увеличиваются по ширине, то нам необходимо сделать так, чтобы фото с полями сохранило ширину не более 500px и пропорции.
                        var ratio = new_width / 500;
                        new_width = new_width / ratio;
                        img_width = img_width / ratio;
                        img_height = img_height / ratio;
                        $this.css({'height': img_height});
                    }
                    delta = new_width - img_width;
                    div_brim.css({'height': img_height, 'width': new_width, 'left': '-' + (delta / 2) + 'px'});

                    if (e.data.iter == 0) {
                        div_cut_top_left_dubl1.css({
                            'height': '30px',
                            'width': new_width,
                            'left': (-delta / 2),
                            'border-left': '1px #494949 solid',
                            'border-right': '1px #494949 solid',
                            'top': '-31px'
                        });
                        div_cut_top_left_dubl2.css({
                            'height': '20px',
                            'width': new_width - 10,
                            'left': (-delta / 2) + 5,
                            'border-top': '1px #494949 solid',
                            'top': '-21px'
                        });

                        div_cut_bottom_right_dubl1.css({
                            'height': img_height,
                            'width': '30px',
                            'border-top': '1px #494949 solid',
                            'border-bottom': '1px #494949 solid',
                            'left': -30 - delta / 2
                        });
                        div_cut_bottom_right_dubl2.css({
                            'height': img_height - 10,
                            'width': '20px',
                            'border-left': '1px #494949 solid',
                            'left': -20 - delta / 2,
                            'bottom': '8px'
                        });
                        span_top_left.addClass('rotateText').css({
                            'left': 46 - new_width / 2,
                            'top': img_height / 2 - 7
                        }).html(e.data.curr_format_array[1] + 'см');
                        span_bottom_right.css({
                            'left': img_width / 2 - 17,
                            'top': '-36px'
                        }).html(e.data.curr_format_array[0] + 'см');
                        arrow_right.appendTo(div_cut_bottom_right_dubl2);
                        arrow_left.appendTo(div_cut_bottom_right_dubl2);
                        arrow_up.appendTo(div_cut_top_left_dubl2);
                        arrow_down.appendTo(div_cut_top_left_dubl2);
                    }
                }
            } else {
                if ((img_width / img_height).toFixed(2) < format_size_ratio[old_format]) {
                    new_width = img_height * format_size_ratio[old_format];
                    if (new_width > 500) { //если поля увеличиваются по ширине, то нам необходимо сделать так, чтобы фото с полями сохранило ширину не более 500px и пропорции.
                        var ratio = new_width / 500;
                        new_width = new_width / ratio;
                        img_width = img_width / ratio;
                        img_height = img_height / ratio;
                        $this.css({'height': img_height});
                    }
                    delta = new_width - img_width;
                    div_brim.css({'height': img_height, 'width': new_width, 'left': '-' + (delta / 2) + 'px'});

                    if (e.data.iter == 0) {
                        div_cut_top_left_dubl1.css({
                            'height': '30px',
                            'width': new_width,
                            'left': (-delta / 2),
                            'border-left': '1px #494949 solid',
                            'border-right': '1px #494949 solid',
                            'top': '-31px'
                        });
                        div_cut_top_left_dubl2.css({
                            'height': '20px',
                            'width': new_width - 10,
                            'left': (-delta / 2) + 5,
                            'border-top': '1px #494949 solid',
                            'top': '-21px'
                        });

                        div_cut_bottom_right_dubl1.css({
                            'height': img_height,
                            'width': '30px',
                            'border-top': '1px #494949 solid',
                            'border-bottom': '1px #494949 solid',
                            'left': -30 - delta / 2
                        });
                        div_cut_bottom_right_dubl2.css({
                            'height': img_height - 10,
                            'width': '20px',
                            'border-left': '1px #494949 solid',
                            'left': -20 - delta / 2,
                            'bottom': '8px'
                        });
                        span_top_left.addClass('rotateText').css({
                            'left': -46 - delta / 2,
                            'top': img_height / 2 - 7
                        }).html(e.data.curr_format_array[0] + 'см');
                        span_bottom_right.css({
                            'left': img_width / 2 - 17,
                            'top': '-36px'
                        }).html(e.data.curr_format_array[1] + 'см');

                        arrow_right.appendTo(div_cut_top_left_dubl2);
                        arrow_left.appendTo(div_cut_top_left_dubl2);
                        arrow_up.appendTo(div_cut_bottom_right_dubl2);
                        arrow_down.appendTo(div_cut_bottom_right_dubl2);
                    }

                } else {
                    new_height = img_width / format_size_ratio[old_format];
                    delta = new_height - img_height;
                    div_brim.css({'height': new_height, 'width': img_width, 'top': '-' + (delta / 2) + 'px'});
                    div_arr[e.data.iter].css({
                        'margin-top': (delta / 2) + 5 + 31 + 'px',
                        'margin-bottom': (delta / 2) + 5 + 'px'
                    });

                    if (e.data.iter == 0) {
                        div_cut_top_left_dubl1.css({
                            'height': '30px',
                            'width': img_width,
                            'left': -1,
                            'border-left': '1px #494949 solid',
                            'border-right': '1px #494949 solid',
                            'top': -31 - delta / 2
                        });
                        div_cut_top_left_dubl2.css({
                            'height': '20px',
                            'width': img_width - 10,
                            'left': 5,
                            'border-top': '1px #494949 solid',
                            'top': -21 - delta / 2
                        });

                        div_cut_bottom_right_dubl1.css({
                            'height': new_height,
                            'width': '30px',
                            'border-top': '1px #494949 solid',
                            'border-bottom': '1px #494949 solid',
                            'left': -31,
                            'bottom': -delta / 2 + 1
                        });
                        div_cut_bottom_right_dubl2.css({
                            'height': new_height - 10,
                            'width': '20px',
                            'border-left': '1px #494949 solid',
                            'left': -21,
                            'bottom': -delta / 2 + 6
                        });
                        span_top_left.addClass('rotateText').css({
                            'left': '-46px',
                            'top': img_height / 2 - 7
                        }).html(e.data.curr_format_array[0] + 'см');
                        span_bottom_right.css({
                            'left': img_width / 2 - 17,
                            'top': -37 - delta / 2
                        }).html(e.data.curr_format_array[1] + 'см');
                        arrow_up.appendTo(div_cut_bottom_right_dubl2);
                        arrow_down.appendTo(div_cut_bottom_right_dubl2);
                        arrow_left.appendTo(div_cut_top_left_dubl2);
                        arrow_right.appendTo(div_cut_top_left_dubl2);
                    }
                }
            }
            div_brim.appendTo(div_arr[e.data.iter]);

            if (e.data.iter == 0) {

                div_cut_top_left_dubl1.appendTo(div_arr[e.data.iter]);
                div_cut_top_left_dubl2.appendTo(div_arr[e.data.iter]);

                div_cut_bottom_right_dubl1.appendTo(div_arr[e.data.iter]);
                div_cut_bottom_right_dubl2.appendTo(div_arr[e.data.iter]);

                span_top_left.appendTo(div_arr[e.data.iter]);
                span_bottom_right.appendTo(div_arr[e.data.iter]);
            }


        });
        img_arr[i].attr('src', link_arr[i]);
        img_arr[i].appendTo(div_arr[i]);
        div_arr[i].appendTo(div_previews);
    }
    //$('#continue').css('display', 'block');
   // $.fancybox.center();
}
function previewWithoutBrims(new_format, old_format) {
    var link_arr = [];
    var div_arr = [];
    var img_arr = [];
    var div_previews = $('#previews').html('');
    var header = $('<b></b>').html('Фото с подрезкой').appendTo(div_previews);
    var span_message = $('<span></span>').html('Зона, выделенная красным цветом, напечатана не будет.').css({
        'display': 'block'
    });
    var curr_format_array = returnWidthAndHeightFromCurrFormat();
        $('.original_preview_img1').each(function () {
            link_arr.push($(this).attr('src'));
        });


    for (var i = 0; i < link_arr.length; i++) {
        div_arr[i] = $('<div></div>').css({
            'margin': '0 auto',
            'display': 'inline-block',
            'position': 'relative',
            'margin-top': '15px'
        });

        if (i == 0) {
            div_arr[i].css({'margin-top': '31px'})
        }


        img_arr[i] = $('<img/>').attr('src', link_arr[i]);

        img_arr[i].load({iter: i, curr_format_array: curr_format_array, span_message: span_message}, function (e) {

            var $this = $(this);
            var img_height = this.height;
            var img_width = this.width;

            if (img_height>img_width) {
                $this=$(this).rotateRight(90);
                img_height = this.width;
                img_width = this.height;
            }

            var new_height;
            var new_width;
            var delta;



            var div_cut_top_left = $('<div></div>').css({
                'position': 'absolute',
                'border': 'none',
                'top': 0,
                'left': 0,
                'background': 'red',
                'opacity': 0.4
            });
            var div_cut_bottom_right = $('<div></div>').css({
                'position': 'absolute',
                'border': 'none',
                'bottom': '3px',
                'right': 0,
                'background': 'red',
                'opacity': 0.4
            });
            var div_cut_top_left_dubl1 = $('<div></div>').css({
                'position': 'absolute',
                'border': 'none',
                'top': 0,
                'left': 0,
                'background': 'white',
                'opacity': 0.4
            });
            var div_cut_bottom_right_dubl1 = $('<div></div>').css({
                'position': 'absolute',
                'border': 'none',
                'bottom': '3px',
                'left': 0,
                'background': 'white',
                'opacity': 0.4
            });
            var div_cut_top_left_dubl2 = $('<div></div>').css({
                'position': 'absolute',
                'border': 'none',
                'top': 0,
                'left': 0,
                'background': 'white',
                'opacity': 0.4
            });
            var div_cut_bottom_right_dubl2 = $('<div></div>').css({
                'position': 'absolute',
                'border': 'none',
                'bottom': '3px',
                'left': 0,
                'background': 'white',
                'opacity': 0.4
            });
            var span_top_left = $('<span></span>').css({
                'position': 'absolute',
                'display': 'block',
                'width': '33px'
            });
            var span_bottom_right = $('<span></span>').css({
                'position': 'absolute',
                'display': 'block',
                'width': '33px'
            });
            var arrow_up=$('<img/>')
                .attr('src','img/up.png')
                .css({
                    'position':'absolute',
                    'top':'-5px',
                    'left':'-3px',
                    'height':'8px'
                });

            var arrow_down=$('<img/>')
                .attr('src','img/down.png')
                .css({
                    'position':'absolute',
                    'bottom':'-5px',
                    'left':'-3px',
                    'height':'8px'
                });
            var arrow_right=$('<img/>')
                .attr('src','img/right.png')
                .css({
                    'position':'absolute',
                    'top':'-3px',
                    'right':'-5px',
                    'width':'8px'
                });
            var arrow_left=$('<img/>')
                .attr('src','img/left.png')
                .css({
                    'position':'absolute',
                    'top':'-3px',
                    'left':'-5px',
                    'width':'8px'
                });
            if (img_height > img_width) {
                if ((img_height / img_width).toFixed(2) < format_size_ratio[old_format]) {
                    new_width = img_height / format_size_ratio[old_format];
                    delta = img_width - new_width;
                    div_cut_top_left.css({'height': img_height, 'width': (delta / 2)});
                    div_cut_bottom_right.css({'height': img_height, 'width': (delta / 2)});


                    if (e.data.iter == 0) {
                        div_cut_top_left_dubl1.css({
                            'height': '30px',
                            'width': img_width - delta - 1,
                            'left': (delta / 2),
                            'border-left': '1px #494949 solid',
                            'border-right': '1px #494949 solid',
                            'top': '-30px'
                        });
                        div_cut_top_left_dubl2.css({
                            'height': '20px',
                            'width': img_width - delta - 10,
                            'left': (delta / 2) + 5,
                            'border-top': '1px #494949 solid',
                            'top': '-20px'
                        });

                        div_cut_bottom_right_dubl1.css({
                            'height': img_height - 2,
                            'width': '30px',
                            'border-top': '1px #494949 solid',
                            'border-bottom': '1px #494949 solid',
                            'left': '-30px'
                        });
                        div_cut_bottom_right_dubl2.css({
                            'height': img_height - 10,
                            'width': '20px',
                            'border-left': '1px #494949 solid',
                            'left': '-20px',
                            'bottom': '8px'
                        });
                        span_top_left.addClass('rotateText').css({
                            'left': '-46px',
                            'top': img_height / 2 - 7
                        }).html(e.data.curr_format_array[1] + 'см');
                        span_bottom_right.css({
                            'left': img_width / 2 - 17,
                            'top': '-36px'
                        }).html(e.data.curr_format_array[0] + 'см');
                        arrow_right.appendTo(div_cut_bottom_right_dubl2);
                        arrow_left.appendTo(div_cut_bottom_right_dubl2);
                        arrow_up.appendTo(div_cut_top_left_dubl2);
                        arrow_down.appendTo(div_cut_top_left_dubl2);
                    }


                } else {
                    new_height = img_width * format_size_ratio[old_format];
                    delta = img_height - new_height;
                    div_cut_top_left.css({'height': (delta / 2), 'width': img_width});
                    div_cut_bottom_right.css({'height': (delta / 2), 'width': img_width});


                    if (e.data.iter == 0) {
                        div_cut_top_left_dubl1.css({
                            'height': img_height - delta,
                            'width': '30px',
                            'left': '-30px',
                            'border-top': '1px #494949 solid',
                            'border-bottom': '1px #494949 solid',
                            'top': (delta / 2) - 1
                        });
                        div_cut_top_left_dubl2.css({
                            'height': img_height - delta - 10,
                            'width': '20px',
                            'left': '-20px',
                            'border-left': '1px #494949 solid',
                            'top': (delta / 2) + 5
                        });

                        div_cut_bottom_right_dubl1.css({
                            'height': '30px',
                            'width': img_width - 2,
                            'border-left': '1px #494949 solid',
                            'border-right': '1px #494949 solid',
                            'top': '-30px'
                        });
                        div_cut_bottom_right_dubl2.css({
                            'height': '20px',
                            'width': img_width - 10,
                            'border-top': '1px #494949 solid',
                            'top': '-20px',
                            'left': '5px'
                        });
                        span_top_left.addClass('rotateText').css({
                            'left': '-46px',
                            'top': img_height / 2 - 7
                        }).html(e.data.curr_format_array[1] + 'см');
                        span_bottom_right.css({
                            'left': img_width / 2 - 17,
                            'top': '-36px'
                        }).html(e.data.curr_format_array[0] + 'см');
                        arrow_right.appendTo(div_cut_top_left_dubl2);
                        arrow_left.appendTo(div_cut_top_left_dubl2);
                        arrow_up.appendTo(div_cut_bottom_right_dubl2);
                        arrow_down.appendTo(div_cut_bottom_right_dubl2);
                    }

                }
            } else {
                if ((img_width / img_height).toFixed(2) < format_size_ratio[old_format]) {
                    new_height = img_width / format_size_ratio[old_format];
                    delta = img_height - new_height;
                    div_cut_top_left.css({'height': (delta / 2), 'width': img_width});
                    div_cut_bottom_right.css({'height': (delta / 2), 'width': img_width});

                    if (e.data.iter == 0) {
                        div_cut_top_left_dubl1.css({
                            'height': img_height - delta,
                            'width': '30px',
                            'left': '-30px',
                            'border-top': '1px #494949 solid',
                            'border-bottom': '1px #494949 solid',
                            'top': (delta / 2) - 1
                        });
                        div_cut_top_left_dubl2.css({
                            'height': img_height - delta - 10,
                            'width': '20px',
                            'left': '-20px',
                            'border-left': '1px #494949 solid',
                            'top': (delta / 2) + 5
                        });

                        div_cut_bottom_right_dubl1.css({
                            'height': '30px',
                            'width': img_width - 2,
                            'border-left': '1px #494949 solid',
                            'border-right': '1px #494949 solid',
                            'top': '-30px'
                        });
                        div_cut_bottom_right_dubl2.css({
                            'height': '20px',
                            'width': img_width - 10,
                            'border-top': '1px #494949 solid',
                            'top': '-20px',
                            'left': '5px'
                        });
                        span_top_left.addClass('rotateText').css({
                            'left': '-46px',
                            'top': img_height / 2 - 7
                        }).html(e.data.curr_format_array[0] + 'см');
                        span_bottom_right.css({
                            'left': img_width / 2 - 17,
                            'top': '-36px'
                        }).html(e.data.curr_format_array[1] + 'см');
                        arrow_right.appendTo(div_cut_bottom_right_dubl2);
                        arrow_left.appendTo(div_cut_bottom_right_dubl2);
                        arrow_up.appendTo(div_cut_top_left_dubl2);
                        arrow_down.appendTo(div_cut_top_left_dubl2);
                    }

                } else {
                    new_width = img_height * format_size_ratio[old_format];
                    delta = img_width - new_width;
                    div_cut_top_left.css({'height': img_height, 'width': (delta / 2)});
                    div_cut_bottom_right.css({'height': img_height, 'width': (delta / 2)});

                    if (e.data.iter == 0) {
                        div_cut_top_left_dubl1.css({
                            'height': '30px',
                            'width': img_width - delta - 1,
                            'left': (delta / 2),
                            'border-left': '1px #494949 solid',
                            'border-right': '1px #494949 solid',
                            'top': '-30px'
                        });
                        div_cut_top_left_dubl2.css({
                            'height': '20px',
                            'width': img_width - delta - 10,
                            'left': (delta / 2) + 5,
                            'border-top': '1px #494949 solid',
                            'top': '-20px'
                        });

                        div_cut_bottom_right_dubl1.css({
                            'height': img_height - 2,
                            'width': '30px',
                            'border-top': '1px #494949 solid',
                            'border-bottom': '1px #494949 solid',
                            'left': '-30px'
                        });
                        div_cut_bottom_right_dubl2.css({
                            'height': img_height - 10,
                            'width': '20px',
                            'border-left': '1px #494949 solid',
                            'left': '-20px',
                            'bottom': '8px'
                        });
                        span_top_left.addClass('rotateText').css({
                            'left': '-46px',
                            'top': img_height / 2 - 7
                        }).html(e.data.curr_format_array[0] + 'см');
                        span_bottom_right.css({
                            'left': img_width / 2 - 17,
                            'top': '-36px'
                        }).html(e.data.curr_format_array[1] + 'см');
                        arrow_right.appendTo(div_cut_top_left_dubl2);
                        arrow_left.appendTo(div_cut_top_left_dubl2);
                        arrow_up.appendTo(div_cut_bottom_right_dubl2);
                        arrow_down.appendTo(div_cut_bottom_right_dubl2);
                    }


                }
            }
            div_cut_top_left.appendTo(div_arr[e.data.iter]);
            div_cut_bottom_right.appendTo(div_arr[e.data.iter]);

            if (e.data.iter == 0) {

                div_cut_top_left_dubl1.appendTo(div_arr[e.data.iter]);
                div_cut_top_left_dubl2.appendTo(div_arr[e.data.iter]);

                div_cut_bottom_right_dubl1.appendTo(div_arr[e.data.iter]);
                div_cut_bottom_right_dubl2.appendTo(div_arr[e.data.iter]);

                span_top_left.appendTo(div_arr[e.data.iter]);
                span_bottom_right.appendTo(div_arr[e.data.iter]);

            }

        });


        img_arr[i].appendTo(div_arr[i]);
        div_arr[i].appendTo(div_previews);

        if (i == 0) {
            span_message.appendTo(div_arr[i].parent());
        }

    }
    //$('#continue').css('display', 'block');
    //$.fancybox.center();
}
function returnWidthAndHeightFromCurrFormat() {
    return orders.parameters.format.split('x');
}
