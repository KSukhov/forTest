jQuery(document).ready(function ($) {
    $("#change_files").bind("click", function (e) {
    $('#fileupload').click();
        return true;
    });
    $.ajax({ // нвый заказ
        type: 'GET',
        url: 'upload.php?action=init'
    }).done(function (data) {
			orders.orderNumber = data;
			$('.orderNumber').text(orders.orderNumber);
			$('#fileupload').fileupload({
			dataType: 'json',
			acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			maxFileSize: 50000000, // 50 MB
			url: 'upload.php?order=' + data +'&action=add'
		});
	
		$('#fileupload').on('fileuploaddone', function (e, data) {
			var fileName = data.result.files[0].name;
			var item = $('<div/>').css({'margin-right': '10px', 'width': '110px','display' : 'inline-block'})
				.addClass('order_container')
				.attr('id', 'pre_'+fileName);
			
			item.append($('<span/>').addClass('span_picture')
				.text(cutFileName(fileName))
				.attr('title', fileName));
			
			var close_img = $('<img/>');
			close_img.css({"cursor": "pointer", "width": "11px"}).attr('src', 'img/closelabel.gif');
			close_img.bind("click", function () {
				$.get('upload.php?order=' + orders.orderNumber+'&name='+fileName +'&action=delete', function(data){
					if(data==1){
						item.remove();
						orders.parameters.numberOfFiles -=1 ;
						saveOrderInformation();
						if(orders.parameters.numberOfFiles < 1){
							removeRow();
							$("#div_result").hide();
							$("#div_buttons").hide();							
						}
					}
				});
			});
			close_img.appendTo(item);
			var img = $('<img/>');
			img.attr('src', 'tumbs/'+data.result.files[0].thumbnailUrl).addClass('original_preview_img1').appendTo(item);
			item.appendTo('#files');
			if(orders.parameters.numberOfFiles == 0){
				addRow();
			}
			orders.formats.push(data.result.files[0].format);

			img.load(function () {	
				if (window.end_of_load) {				
                    $('#div_progress').css('visibility', 'hidden');
                    $('#next_suborder').removeClass('show_message_0').addClass('next_suborder').css('cursor', 'pointer');
                    $('button.red').removeClass('show_message_0').addClass('end_order_button').css('cursor', 'pointer');
                }
			});
			orders.parameters.numberOfFiles += 1;
			saveOrderInformation();
			$(".end_order_button").bind('click', function () {
						checkFormat(this.id);
			});			
		});
     });
	 $('#fileupload').on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress').css(
            'background-position',
            (progress * 3) - 399 + 'px'
        );
        if ((data.loaded > 0) && (data.loaded < data.total) && ((data.total*8)/data.bitrate>10)) {
            $('#div_progress').css('visibility', 'visible');
        }
        if ((data.loaded > 0) && (data.loaded < data.total)) {
            $('#div_progress').css('visibility', 'visible');
        }

        $('#progress_percent').html(progress + "%");
        if (data.loaded == data.total) {
            window.end_of_load = true;
        }
        else {
            window.end_of_load = false;
            $('#next_suborder').removeClass('next_suborder').addClass('show_message_0').css('cursor', 'default');
            $('button.red').removeClass('end_order_button').addClass('show_message_0').css('cursor', 'default');
        }

		$("#div_result").show();
        $("#div_buttons").show();

    });
	
	 
  });
	
var orders  =  {
	orderNumber: 0,
	formats: [],
	phone: '',
	parameters : {
        format: '',     //массив форматов
        quantity: '',   //массив количества экземпляров каждой фотографии 
        paper_type: '', //тип бумаги 
        autocor: '',    //автокореркция 
        brims: '',       //поля 
        cost: '',        // стоимость заказа.
        numberOfFiles: 0  // количество фотографий
	},
	cost_format_fast : {
        '10x15': 14,
        "10x13.5": 14,
        "15x20": 30,
        "15x21": 30,
        "15x23": 30,
        "20x27": 90,
        "20x30": 90,
        "30x40": 180,
        "30x45": 180
    },
	
    cost_format_slow : {
        "10x15": 9,
        "10x13.5": 9,
        "15x20": 20,
        "15x21": 20,
        "15x23": 20,
        "20x27": 60,
        "20x30": 60,
        "30x40": 120,
        "30x45": 120
    },
	getOrderNumber: function( ) {
      return this.orderNumber;
    },
	setOrderNumber: function(num){
      this.orderNumber = num;
    }
}	  

var messages = [
    'Дождитесь завершения загрузки',
    'Оплата через интернет принимается при сумме заказа от 300 руб. При сумме заказа менее 300 руб. оплата производится при получении.'
];


function checkFormat(action) {
	var wrong = 0;	
	for(var i = 0; i < orders.formats.length; i++ ){
		if(orders.formats[i] != format_size_ratio[orders.parameters.format])
			wrong = 1
	}
    if (wrong == 0) { 
			var leftTd = $('#lefttd');
            leftTd.find('input[name="brim"][value="2"]').prop('checked', true);
            changeItem();
            total_end_order_correct(action);
        }  
        else { 
			$('.formatLabel').text(orders.parameters.format);
            $('#dialog').dialog({
				resizable: true,
				width: 600,
				height:400,
				modal: true,
				buttons: {
						"Подтвердить": function(){
						continue_action();
						$(this ).dialog( "close" );
					},
					Cancel: function() {
						$(this ).dialog( "close" );
					}
				} 
			});
	}
}

function sendEndOrder(options) {
    var data = {
		order: orders.orderNumber,
        format: orders.parameters.format,
        paper_type: orders.parameters.paper_type,
        quantity: orders.parameters.quantity,
        autocor: orders.parameters.autocor,
        brims: orders.parameters.brims,
        cost: orders.parameters.cost,
        numberOfFiles: orders.parameters.numberOfFiles,
        phone: orders.phone
    };
    $.ajax({
        dataType: 'script',
        type: 'POST',
        data: data,
        url: 'upload.php?action=save'
    }) 
	location.href='/test';
}


function setfast(sro) {
	saveOrderInformation();
    var set_fast = getRadioGroupValue(document.forms[0].fast);
    for (var i = 0; i <= suborder; i++) {
        var fast_cell = $('#r' + i + 'd7');
        if (fast_cell.length > 0) {
            fast_cell.html('<b>' + suborder_parameters.cost[i] + '</b>');
        }
    }
}

function getRadioGroupValue(radioGroupObj) {
    for (var i = 0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked) return radioGroupObj[i].value;

    return null;
}

function setRadioGroupValue(radioObj, newValue) {
    if (!radioObj)
        return;
    var radioLength = radioObj.length;
    if (radioLength == undefined) {
        radioObj.checked = (radioObj.value == newValue.toString());
        return;
    }
    for (var i = 0; i < radioLength; i++) {
        radioObj[i].checked = false;
        if (radioObj[i].value == newValue.toString()) {
            radioObj[i].checked = true;
        }
    }
}

function saveOrderInformation() {
	orders.phone = $('#telnum').val(); //телефон
	orders.parameters.format = getRadioGroupValue(document.forms[0].format); //формат (размер)
    orders.parameters.paper_type = getRadioGroupValue(document.forms[0].paper);  //бумага
    orders.parameters.quantity = $('#copynumSelect').val();  //количество экземпляров фото с каждого файла
    orders.parameters.autocor = getRadioGroupValue(document.forms[0].autocor);  //автокоррекция
    orders.parameters.brims = getRadioGroupValue(document.forms[0].brim);         //поля
	switch (getRadioGroupValue(document.forms[0].fast)) {
        case "0":
            orders.parameters.cost = orders.parameters.quantity * orders.parameters.numberOfFiles * orders.cost_format_slow[orders.parameters.format]; 
            break;
        case "1":
            orders.parameters.cost = orders.parameters.quantity * orders.parameters.numberOfFiles * orders.cost_format_fast[orders.parameters.format]; // стоимость заказа.
            break;
    }
	printResultString();
}

function changeItem() {
    saveOrderInformation();
}

 function printResultString() {
    var brim_value=getRadioGroupValue(document.forms[0].brim);
    $('#rd1').html('<b>№ ' + (orders.orderNumber) + '</b>');
    $('#rd2').html(orders.parameters.numberOfFiles);
    $('#rd3').html(orders.parameters.quantity);
    $('#rd4').html(orders.parameters.format);
	// честно, не понял смысла этого хака - С. К.
    if (getRadioGroupValue(orders.parameters.format) == '10x13,5') {
        $('#rd4').css({'font-size': '13px'});
    }
    $('#rd5').html((orders.parameters.paper_type == 1) ? 'мат.' : 'глян.');
    $('#rd6').css({'font-size': '9px'}).html(((getRadioGroupValue(document.forms[0].autocor) == 1) ? 'с&nbsp;авток.' : 'без&nbsp;авток.') + '<br>' + ((brim_value == 1) ? 'с&nbsp;полями' : ((brim_value==0) ?'с&nbsp;подрез':((brim_value==2) ? 'в размер':''))));
	$('#rd7').html('<b>' + orders.parameters.cost + '</b>');
	$('#finCost').html(orders.parameters.cost);
}

function objectLength(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

function addRow() {
    var tr = $('<tr/>').attr("id", "tr_");
    var td = {};
    for (var i = 1; i <= 7; i++) {	
        td[i] = $('<td/>').attr("id", "rd" + i).addClass("td" + i).appendTo(tr);
    }
    tr.prependTo('#tbody_result');
}

function removeRow() {
    $("#tr_").remove();
}

function calculateTotalCost() {
    total_cost = 0;

    for (var i = 0; i <= suborder; i++) {
        if (suborder_parameters.cost[i]) total_cost += suborder_parameters.cost[i];
    }
    if ($('#delievery').prop("checked")) {
        total_cost += 300;
    }


}



function TrimStr(s) {
    s = s.replace(/^-/, '');
    return s.replace(/-$/, '');
}

function cutFileName(filename) {
    var extension = filename.substr(filename.lastIndexOf('.'));
    var extension_length = extension.length;
    var basis_name = filename.substr(0, filename.lastIndexOf('.'));
    return basis_name.substr(0, (14 - extension_length)) + extension;
}


function changeCheckboxGroup (node) {
    var $this=node;
    var box_name=$(node).data('checkbox');
    $('input[data-checkbox="'+box_name+'"]:checked').each(function() {
        if (this!=$this) {
            $(this).prop('checked',false);
        }
    });
}
