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

function decodeProps(propsStr) 
{ 
    var props = {}, hash; 
    var hashes = propsStr.split('&'); 
    for(var i = 0; i < hashes.length; i++) { 
        hash = hashes[i].split('='); 
        props[hash[0]] = decodeURI(hash[1]); 
    } 
    return props; 
}


function encodeProps(props) 
{
    var propsStr = ""

    for (var key in props) {
        if (props.hasOwnProperty(key)) {
            if (propsStr != "") {
                propsStr += "&";
            }
            propsStr += key + "=" + encodeURI(props[key]);
        }
    }
    return propsStr;
}

function makeProps(url) 
{
    return decodeProps(url.slice(url.indexOf('?') + 1));
}

function makeUrl(props) 
{
    return "?" + encodeProps(props);
}

function getOrgHtml(orgCode) {

    var parser = new org.Parser();
    var orgDocument = parser.parse(orgCode);
    return orgDocument.convert(org.ConverterHTML, {
        headerOffset: 1,
        exportFromLineNumber: false,
        suppressSubScriptHandling: false,
        suppressAutoLink: false
    });
}

function updateOrgLink(orgDom, props) {
    $(orgDom).find("a").each(function() {
        var href = $(this).attr("href");
        var re = /.org/g;
        if (href.match(re) != null) {
            props['orgFile'] = dirname(props['orgFile']) + "/" + href;
            $(this).attr("href", makeUrl(props));
        }
    });
    return orgDom;
}

function showHtml(url) {
    var props = makeProps(url);
    $.get(props["orgFile"], function(orgCode) {
        var orgHtml = getOrgHtml(orgCode);
        var orgDom = $.parseHTML(orgHtml.toString());
        $(props["selector"]).html(updateOrgLink(orgDom, props));
    });
}

(function(definition){

    showHtml(document.URL);

    // CommonJS
    if (typeof exports === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // <script>
    } else {
        orgpage = definition();
    }

})(function(){// 実際の定義を行う関数
    'use strict';

    var thisModule = function thisModule(){};

    thisModule.prototype = {
        makeUrl : makeUrl,
        makeProps : makeProps,
        showHtml : showHtml
    }

    return thisModule;
});
