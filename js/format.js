/**
 * Created by rusalex on 17.12.2014.
 */


var format_size_ratio = {
    "10x15": (15 / 10).toFixed(2),
    "10x13.5": (13.5 / 10).toFixed(2),
    "15x20": (20 / 15).toFixed(2),
    "15x21": (21 / 15).toFixed(2),
    "15x23": (23 / 15).toFixed(2),
    "20x27": (27 / 20).toFixed(2),
    "20x30": (30 / 20).toFixed(2),
    "30x40": (40 / 30).toFixed(2),
    "30x45": (45 / 30).toFixed(2)
};

var format_size_ratio_lower_limit_ = {
    "10x15": 1.490,
    "10x13.5": 1.32,
    "15x20": 1.315,
    "15x21": 1.40,
    "15x23": 1.51,
    "20x27": 1.349,
    "20x30": 1.50,
    "30x40": 1.33,
    "30x45": 1.498
};

var format_size_ratio_upper_limit = {
    "10x15": 1.50,
    "10x13.5": 1.35,
    "15x20": 1.333,
    "15x21": 1.42,
    "15x23": 1.53,
    "20x27": 1.35,
    "20x30": 1.5024,
    "30x40": 1.3311,
    "30x45": 1.50
};

var possible_formats = [
    ["10x15", "10x13.5"],
    ["15x20", "15x21", "15x23"],
    ["20x27", "20x30"],
    ["30x40", "30x45"]
];

function checkQuantityOfFormatsOnlyOne(suborder) {
    var temp_ratio = 0;
    for (var key in fileListRatio[suborder]) {
        if ((temp_ratio != 0) && (fileListRatio[suborder][key] != temp_ratio)) {
            return [false, ''];
        }
        temp_ratio = fileListRatio[suborder][key];
    }
    return [true, temp_ratio];
}

function checkImgFormat(img) {
    var img_height = $(img).height();
    var img_width = $(img).width();
    if (img_height > img_width) {
        if ((img_height / img_width).toFixed(2) != format_size_ratio[suborder_parameters.format[suborder]]) {
            return false;
        }
    }
    else {
        if ((img_width / img_height).toFixed(2) != format_size_ratio[suborder_parameters.format[suborder]]) {
            return false;
        }
    }
    return true;
}

function checkImgFormatWithApproximation(img) {
    var img_height = $(img).height();
    var img_width = $(img).width();
    var ratio;
    if (img_height > img_width) {
        ratio = (img_height / img_width).toFixed(2);
        if ((ratio < format_size_ratio_lower_limit_[suborder_parameters.format[suborder]]) || (ratio > format_size_ratio_upper_limit[suborder_parameters.format[suborder]])) {
            return false;
        }
    }
    else {
        ratio = (img_width / img_height).toFixed(2);
        if ((ratio < format_size_ratio_lower_limit_[suborder_parameters.format[suborder]]) || (ratio > format_size_ratio_upper_limit[suborder_parameters.format[suborder]])) {
            return false;
        }
    }
    return true;
}

function getNumberOfWrongFormatFiles(suborder) {
    var i = 0;
    for (var key in fileListRatio[suborder]) {
        if (format_size_ratio[suborder_parameters.format[suborder]] != fileListRatio[suborder][key]) {
            i++;
        }
    }
    return i;
}

function getNumberOfWrongFormatFilesWithApproximate(suborder) {
    var i = 0;
    for (var key in fileListRatio[suborder]) {
        if ((fileListRatio[suborder][key] < format_size_ratio_lower_limit_[suborder_parameters.format[suborder]]) || (fileListRatio[suborder][key] > format_size_ratio_upper_limit[suborder_parameters.format[suborder]])) {
            i++;
        }
    }
    return i;
}

function findBestFormat(img) {
    var img_height = $(img).height();
    var img_width = $(img).width();
    var ratio;
    var delta;
    var delta1;
    var format_obj = [];
    if (img_height > img_width) {

        ratio = (img_height / img_width).toFixed(2);
        delta = Math.abs(ratio - format_size_ratio[suborder_parameters.format[suborder]]);
        for (var a in format_size_ratio) {
            delta1 = Math.abs(ratio - format_size_ratio[a]);
            // console.log(delta1);
            if (delta > delta1) {
                format_obj = [];
                format_obj.push(a);
                delta = delta1;
            }
            else if (delta == delta1) {
                format_obj.push(a);
            }
        }
    }
    else {
        ratio = (img_width / img_height).toFixed(2);
        delta = Math.abs(ratio - format_size_ratio[suborder_parameters.format[suborder]]);
        for (var a in format_size_ratio) {
            delta1 = Math.abs(ratio - format_size_ratio[a]);
            // console.log(delta1);
            if (delta > delta1) {
                format_obj = [];
                format_obj.push(a);
                delta = delta1;
            }
            else if (delta == delta1) {
                format_obj.push(a);
            }
        }
    }
    return format_obj;

}

function findAccurateBestFormatForImg(img) {
    var img_height = $(img).height();
    var img_width = $(img).width();
    var ratio;
    var format_arr = [];
    if (img_height > img_width) {
        ratio = (img_height / img_width).toFixed(2);
        for (var a in format_size_ratio) {
            if (ratio == format_size_ratio[a]) {
                format_arr.push(a);
            }
        }
    }
    else {
        ratio = (img_width / img_height).toFixed(2);
        for (var a in format_size_ratio) {
            if (ratio == format_size_ratio[a]) {
                format_arr.push(a);
            }
        }
    }
    return format_arr;
}

function findAccuratebestFormatForRatio(ratio) {
    var best_formats_arr = [];
    for (var key in format_size_ratio) {
        if (format_size_ratio[key] == ratio) best_formats_arr.push(key);
    }
    return best_formats_arr;
}

function getRatioOfImgFormat(img) {
    var img_height = $(img).height();
    var img_width = $(img).width();
    var ratio;
    if (img_height > img_width) {
        ratio = (img_height / img_width).toFixed(2);
    }
    else {
        ratio = (img_width / img_height).toFixed(2);
    }
    return ratio;
}

/*функция ищет ближайший формат текущему из представленных*/
function getNearestFormat(current_format, format_arr_for_choose) {
    if (format_arr_for_choose.length == 0) return false;
    if (format_arr_for_choose.length == 1) {
        return format_arr_for_choose[0];
    }
    else {/////сравниваем форматы по ширине и выбираем формат с ближайшей шириной.
        var current_format_width = (current_format.split('x'))[1];
        var new_format_width;
        var delta = 100;
        var chosen_format;
        for (var i = 0; i < format_arr_for_choose.length; i++) {
            new_format_width = (format_arr_for_choose[i].split('x'))[1];
            if (Math.abs(new_format_width - current_format_width) < delta) {
                delta = Math.abs(new_format_width - current_format_width);
                chosen_format = format_arr_for_choose[i];
            }
        }
        return chosen_format;
    }
}


/*функция выбирает сравнивает формат с possible_formats, если совпадений нет, то возвращает false*/
function checkPossibleFormat(chosen_format) {
    var number_of_massive;
    for (var i = 0; i < possible_formats.length; i++) {
        for (var j = 0; j < possible_formats[i].length; j++) {
            if (suborder_parameters.format[suborder] == possible_formats[i][j]) {
                number_of_massive = i;
                break;
            }
        }
    }
    for (i = 0; i < possible_formats[number_of_massive].length; i++) {
        if (possible_formats[number_of_massive][i] == chosen_format) {
            return chosen_format;
        }
    }
    return false;
}