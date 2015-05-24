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

function encodeProps(props) 
{
    var propsStr = ""

    for (var key in props) {
        if (props.hasOwnProperty(key)) {
            if (propsStr != "") {
                propsStr += "&";
            }
            propsStr += encodeURIComponent(key) + "=" + encodeURIComponent(props[key]);
        }
    }
    return propsStr;
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

/************************************************************************
Properties from URL
************************************************************************/

function updateOrgLink(orgDom, props) {
    $(orgDom).find("a").each(function() {
        var href = $(this).attr("href");
        var re = /.org$/;
        if (href.match(re) != null) {
            props['orgFile'] = dirname(props['orgFile']) + "/" + href;
            $(this).attr("href", "?" + encodeProps(props));
        }
    });
    return orgDom;
}

function updateCss(props) {

    var $head = $("head");
    var $headlinklast = $head.find("link[rel='stylesheet']:last");
    var linkElement = "<link rel='stylesheet' href='" + props['css'] + "' type='text/css' media='screen'>";
    if ($headlinklast.length){
        $headlinklast.after(linkElement);
    }
    else {
        $head.append(linkElement);
    }
}

function showHtml(props) {
    $.get(props["orgFile"], function(orgCode) {
        var orgHtml = getOrgHtml(orgCode);
        //var orgDom = $.parseHTML(orgHtml.toString());
        var orgDom = $.parseHTML(orgHtml.contentHTML);
        orgDom = updateOrgLink(orgDom, props);
        updateCss(props);

        $('title').html(orgHtml.title);
        $(props["selector"]).html(orgDom);
    });
}

/************************************************************************
Properties from URL
************************************************************************/

function parseQuery(str)
{
    if(typeof str != "string" || str.length == 0)
        return {};

    var s = str.split("&");
    var bit, query = {}, first, second;
    for(var i = 0; i < s.length; i++)
    {
        bit = s[i].split("=");
        first = decodeURIComponent(bit[0]);
        if(first.length == 0)
            continue;
        second = decodeURIComponent(bit[1]);
        if(typeof query[first] == "undefined")
            query[first] = second;
        else if(query[first] instanceof Array)
            query[first].push(second);
        else
            query[first] = [query[first], second]; 
    }
    return query;
}

function makeProps(url) 
{
    var tagIndex = url.indexOf('#');
    if (tagIndex < 0)
        return parseQuery(url.slice(url.indexOf('?') + 1));
    else
        return parseQuery(url.slice(url.indexOf('?') + 1, tagIndex));
}


/************************************************************************
Export
************************************************************************/

(function(){
    orgpage = {
        show: showHtml,
        properties: makeProps
    };
})();
