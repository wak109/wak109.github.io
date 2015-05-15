/* vim: set expandtab ts=4 fenc=utf-8 : 
 
* Required Module

- jQuery
- org-js

* Reference

- http://qiita.com/yd_niku/items/7fe3a83e7484199f46a0


************************************************************************/

var $ = require("jquery")
var org = require("org")

function basename(path) {
    return path.replace(/\\/g, '/').replace(/.*\//, '');
}

function dirname(path) {
    return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
}


function org2html(orgCode, orgDir) {

    var parser = new org.Parser();
    var orgDocument = parser.parse(orgCode);
    var orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
        headerOffset: 1,
        exportFromLineNumber: false,
        suppressSubScriptHandling: false,
        suppressAutoLink: false
    });

    var dom = $.parseHTML(orgHTMLDocument.toString());
    $(dom).find("a").each(function() {
        var href = $(this).attr("href");
        var re = /.org/g;
        if (href.match(re) != null) {
            $(this).attr("href", "javascript:orgpage.writeHtml(" + "'" + href + "')" );
        }
    });
    return dom;
}


(function(definition) {
    orgpage = definition();

})(function() {

    'use strict'

    var orgDir = '.';
    var nodeSelector = 'body';
    var initFile = 'index.html';

    return {

        init : function (config) {
            var elm = document.createElement('a');
            elm.href = document.URL;

            var doc = elm.search.slice(1);

            // orgDir = dirname(config['initFile']);
            // initFile = basename(config['initFile']);
            orgDir = dirname(doc);
            initFile = basename(doc);
            nodeSelector = config['nodeSelector'];

            this.writeHtml(initFile);
        },

        writeHtml : function(orgFile) {
            $.get(orgDir + '/' + orgFile, function(data) {
                $(nodeSelector).html(org2html(data, orgDir));
            });
        }
    }
});
