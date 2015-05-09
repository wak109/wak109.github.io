/* vim: set expandtab ts=4 fenc=utf-8 : 
 
* Required Module

- jQuery
- org-js

* Reference

- http://qiita.com/yd_niku/items/7fe3a83e7484199f46a0

************************************************************************/

function org2html(orgCode) {
    var org = require("org")

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


(function(definition) {
    // export
    orgpage = definition();

})(function() {

    'use strict'

    var orgDir = '.';
    var nodeSelector = 'body';

    return {

        init : function (config) {
            orgDir = config['orgDir'];
            nodeSelector = config['nodeSelector'];
        },

        writeHtml : function(orgFile) {
            var $ = require("jquery")
            $.get(orgDir + '/' + orgFile, function(data) {
                $(nodeSelector).html(org2html(data));
            });
        }
    }
});
