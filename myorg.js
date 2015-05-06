/* vim: set expandtab ts=4 fenc=utf-8 : */

var $ = require("jquery")
var org = require("org")

$(function() {
//    $("#org").html(org2html("* hehe"));
    $.get("org/index.org", function(data) {
        $("#org").html(org2html(data));
    });
});

function org2html(orgCode) {
    var parser = new org.Parser();
    var orgDocument = parser.parse(orgCode);
    var orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
        headerOffset: 1,
        exportFromLineNumber: false,
        suppressSubScriptHandling: false,
        suppressAutoLink: false
    });

    return orgHTMLDocument.toString();
}
