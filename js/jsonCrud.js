const tempData = '<!--DATA-->';

function convertTkCrudTableToJSON(tblElm, cmd) {
    var tHeadString = '{"head": [' + tempData + '], ';
    var tHeadStringTemp = '';
    var tBodyString = '"body": [' + tempData + ']}';
    var tBodyStringTemp = '';
    var returnString = '';
    $(tblElm).find('thead > tr > th').each(function () {
        tHeadStringTemp += '"' + $(this).text() + '", ';
    });
    tHeadStringTemp = tHeadStringTemp.substring(0, tHeadStringTemp.length - 2);
    tHeadString = tHeadString.replace(tempData, tHeadStringTemp);
    $(tblElm).find('tbody > tr').each(function (index, value) {
        if (!$(this).hasClass('is-delete')) {
            tBodyStringTemp += '{';
            $(this).find('td > input').each(function () {
                tBodyStringTemp += '"' + $(this).attr('tbl-data') + '": "' + $(this).val() + '", ';
            });
            tBodyStringTemp = tBodyStringTemp.substring(0, tBodyStringTemp.length - 2);
            if ((cmd === 'C' && cmd !== 'D') && index === $(this).parent().find('tr').length - 1) {
                tBodyStringTemp += '}, {';
                $(this).find('td > input').each(function () {
                    tBodyStringTemp += '"' + $(this).attr('tbl-data') + '": "' + $(this).val() + '", ';
                });
                tBodyStringTemp = tBodyStringTemp.substring(0, tBodyStringTemp.length - 2);
            }
            tBodyStringTemp += '}, ';
        }
    });
    tBodyStringTemp = tBodyStringTemp.substring(0, tBodyStringTemp.length - 2);
    tBodyString = tBodyString.replace(tempData, tBodyStringTemp);
    returnString = tHeadString + tBodyString;
    return returnString;
}

function setTkCrudTable(tblElm, data, cmd, callback) {
    var dataJSON = $.parseJSON(data);
    var tHeadString = '<thead><tr>' + tempData + '</tr></thead>';
    var tHeadStringTemp = '';
    var tBodyString = '<tbody>' + tempData + '</tbody>';
    var tBodyStringTemp = '';
    $(tblElm).html('');
    $.each(dataJSON.head, function (index, value) {
        tHeadStringTemp += '<th>' + value + '</th>';
    });
    tHeadString = tHeadString.replace(tempData, tHeadStringTemp);
    $(tblElm).append(tHeadString);
    $.each(dataJSON.body, function (index, value) {
        var tBodyStringRow = '<tr>' + tempData + '</tr>';
        var tBodyStringRowTemp = '';
        $.each(value, function (index2, value2) {
            tBodyStringRowTemp += '<td class="tk-crud-data"><input type="text" class="tk-crud-text" value="' + value2 + '" tbl-data="' + index2 + '" /></td>';
        });
        tBodyStringRow = tBodyStringRow.replace(tempData, tBodyStringRowTemp);
        tBodyStringTemp += tBodyStringRow;
        if (cmd === 'R' && dataJSON.body.length === index + 1) {
            var tBodyStringRowEmpty = '<tr>' + tempData + '</tr>';
            var tBodyStringRowEmptyTemp = '';
            $.each(value, function (index2, value2) {
                tBodyStringRowEmptyTemp += '<td><input type="text" class="tk-crud-text" tbl-data="' + index2 + '" /></td>';
            });
            tBodyStringRowEmpty = tBodyStringRowEmpty.replace(tempData, tBodyStringRowEmptyTemp);
            tBodyStringTemp += tBodyStringRowEmpty;
        }
    });
    tBodyString = tBodyString.replace(tempData, tBodyStringTemp);
    $(tblElm).append(tBodyString);
    if (!!callback) {
        callback(tblElm);
    }
}

$(document).ready(function () {
    $.fn.tkCrudTable = function (option) {
        var tblElm = this;
        var tblData = option.data;
        setTkCrudTable(tblElm, tblData, 'R');
        $(this).on('focus', 'input.tk-crud-text', function () {
            $(this).parent().addClass('active');
        });
        $(this).on('blur', 'input.tk-crud-text', function () {
            $(this).parent().removeClass('active');
            tblData = convertTkCrudTableToJSON(tblElm, 'U');
        });
        $(this).on('keydown', 'tr:last-child > td:last-child > input.tk-crud-text', function (evt) {
            if (evt.keyCode === 9 && !evt.shiftKey) {
                evt.preventDefault();
                tblData = convertTkCrudTableToJSON(tblElm, 'C');
                setTkCrudTable(tblElm, tblData, 'C', function () {
                    $(tblElm).find('tbody > tr:last-child > td:first-child > input.tk-crud-text').focus();
                });
            }
        });
        $(this).on('keydown', 'tr:last-child > td > input.tk-crud-text', function (evt) {
            if (evt.keyCode === 13) {
                tblData = convertTkCrudTableToJSON(tblElm, 'C'); setTkCrudTable(tblElm, tblData, 'C', function () {
                    $(tblElm).find('tbody > tr:last-child > td:first-child > input.tk-crud-text').focus();
                });
            }
        });
        $(this).on('keydown', 'tr > td.tk-crud-data > input.tk-crud-text', function (evt) {
            if (evt.keyCode === 46) {
                var msg = (typeof option.deleteMessage === 'undefined') ? 'Do you really want to delete this row?' : option.deleteMessage;
                if (confirm(msg)) {
                    evt.preventDefault();
                    $(this).parent().parent().addClass('is-delete');
                    tblData = convertTkCrudTableToJSON(tblElm, 'D');
                    setTkCrudTable(tblElm, tblData, 'D');
                }
            }
        });
        return this;
    };
});

// From here below is how to use.
// Assuming that I got this JSON from the database
var result = '{"head": ["Nombre del Producto", "Precio", "Descripción Corta", "Descripción Larga", "Detalles"],"body": [{"data1": "Pastel temático EL PADRINO", "data2": "$450.00", "data3": "Pastel decorado con la temática EL PADRINO", "data4": "Pastel para cumpleaños con la temática de la película EL PADRINO tamaño normal para 20 personas", "data5": "Pastel de 1kg sabor chocolate Pastel de fondan sabor bombon"},{"data1": "Pastel temático 5 DIBUJOS", "data2": "$350.00", "data3": "Pastel decorado con la temática 5 DIBUJOS (Búhos)", "data4": "Pastel para cumpleaños para niña con temática de la caricatura HOP HOP tamaño mediano para 45 personas.", "data5": "Pastel de 2kg con sabor a fresa Pastel de betún de vailla"}, {"data1": "Pastel para BAUTIZO", "data2": "$380.00", "data3": "Pastel decorado para BAUTIZO", "data4": "Pastel para bautizo DE OSO tamaño normal para 15 personas", "data5": "Pastel de 1kg con sabor a fresa Pastel de fondan sabor bombon, con figuras de oso y circulos de fondan"}, {"data1": "Pastel Temático de CERDITO", "data2": "$350.00", "data3": "Pastel decorado para niña con temática de CERDITO", "data4": "Pastel para cumpleaños de temátoca de CERDITO tamaño normal para 15 personas", "data5": "Pastel de 1kg con sabor a fresa Pastel de betún de fresa y vailla Detalle de figuras de fondon de cerdito"}, {"data1": "Pastel Para ANIVERSARIO", "data2": "$550.00", "data3": "Pastel decorado para vivir una tarde especial para ANIVERSARIO", "data4": "Pastel para cumpleaños de ANIVERSARIO tamaño normal para 15 personas", "data5": "Pastel de 1.5kg con sabor a limon Pastel de fondan sabor bombon Detallado estilo marmol Detalles con betun brilloso y letrero"},{"data1": "Pastel temático de SIRENA", "data2": "$250.00", "data3": "Pastel decorado con temática de SIRENA", "data4": "Pastel para cumpleaños con temática de SIRENA tamaño normal circular para 15 personas", "data5": "Pastel de 1kg con sabor limon Pastel de fondan sabor bombon Detalles de figuras de fondan al estilo fondo del mar"}, {"data1": "Pastel temático de PRINCESA", "data2": "$300.00", "data3": "Pastel decorado con la temátoca de PRINCESA", "data4": "Pastel para cumpleaños con temática de PRINCESA tamaño normal circular para 15 personas", "data5": "Pastel de 1kg con sabor a fresa Pastel de fondan sabor bombon Detalles en fondan de diferentes colores y además diseño de corona en fondan"}, {"data1": "Pastel temático de DRAGON BALLZ", "data2": "$400.00", "data3": "Pastel decorado con la temática de DRAGON BALL Z", "data4": "Pastel para cumpleaños con temática de Dragon Ball tamaño grande rectangular para 50 personas", "data5": "Pastel de 1kg con sabor a Chocolate Pastel de betún sabor a Chocolate color azul y amarillo Detalles de los personajes de la saga en 3D"},{"data1": "Pastel temático para BODAS", "data2": "$550.00", "data3": "Pastel decorado con la temática de BODAS", "data4": "Pastel para BODAS tamaño normal para 100 personas", "data5": "Pastel de 1kg con sabor a nuez"}, {"data1": "Pastel temático LADYBUG", "data2": "$500.00", "data3": "Pastel decorado con la temática LADYBUG", "data4": "Pastel para cumpleaños con temática de la caricatura LADYBUG tamaño normal circular para 50 personas", "data5": "Pastel de 1kg con sabor a fresa Pastel decorado de betun rojo y blanco sabor vainilla Detalle con imagen comestible de LADYBUG"}]}';

$(document).ready(function () {
    $('.tk-crud-table').tkCrudTable({
        data: result,
        deleteMessage: 'Do you really want to delete this row?'
        // TODO: validator
    });
});