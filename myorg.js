/* vim: set expandtab ts=4 fenc=utf-8 : */

print_org = function(org_file, node_id) {
    var $ = require("jquery")

    $.get(org_file, function(data) {
        $(node_id).html(org2html(data));
    });
}

function org2html(org_code) {
    var org = require("org")

    var parser = new org.Parser();
    var orgDocument = parser.parse(org_code);
    var orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
        headerOffset: 1,
        exportFromLineNumber: false,
        suppressSubScriptHandling: false,
        suppressAutoLink: false
    });

    return orgHTMLDocument.toString();
}
