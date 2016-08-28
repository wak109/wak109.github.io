// vim: set ts=4 et sw=4 sts=4 fileencoding=utf-8:

defaultConfig = 'json/config.json';

function convertMarkdownToHtml(node, src) {
    return $.ajax({
        url : src,
        success : function(data){
            $(node).append(marked(data));
        },
        error : function(){
            $(node).append("[ERROR] Failed to load " + src);
        }
    });
}

function queryStringToJson(query) {
    var obj = {} 
    query.split('&').forEach(function(pair) {
        pair = pair.split('=');
        obj[pair[0]] = decodeURIComponent(pair[1] || "");

    });

    return obj;
}

function makeXmlFileNode(node) {
    var element = document.createElement('file');
    element.setAttribute('md5', node.md5);
    element.setAttribute('title', node.title);
    return element;
}

function makeXmlDirectoryNode(node) {
    var element = document.createElement('directory');
    for (var key in node) {
        var child = makeXmlNode(node[key]);
        child.setAttribute('name', key);
        element.appendChild(child);
    };
    return element
}

function makeXmlNode(node) {
    if (node.md5 && node.title) {
        return makeXmlFileNode(node);
    }
    else {
        return makeXmlDirectoryNode(node);
    }
}

function loadXMLDoc(filename) {
    if (window.ActiveXObject) {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);
    try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
    xhttp.send("");
    return xhttp.responseXML;
}

function transformXml(xml, xsl)
{
    if (!(window.ActiveXObject) && "ActiveXObject" in window) {
        // TODO : DOSEN'T WORK
        // IE11 is exception
        var xslTemp = new ActiveXObject("Msxml2.XSLTemplate");
        xslTemp.stylesheet = xsl;

        var xslProc = xslTemp.createProcessor();
        xslProc.input = xml;
        xslProc.transform();
        return xslProc.output;
    }
    else {
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        return xsltProcessor.transformToFragment(xml, document);
    }
}

function getValue(value, queryData) {
    var match = value.match(/\${([^:]*)(?:\:=([^}]*))/);

    if (match) {
        var value = queryData[match[1]];
        if (typeof value !== 'undefined') {
            return value;
        }
        else {
            return match[2];
        }
    }
    else {
        return value;
    }
}

function main(uri) {
    var queryData = queryStringToJson(uri.slice(uri.indexOf('?')+1));

    $(".insert-xml").each(function(i, node) {
        var xml_url = getValue(node.attributes["insert-src"].value, queryData);
        var xsl_url = getValue(node.attributes["insert-xsl"].value, queryData);
        
        $.when(
            $.get(xml_url), $.get(xsl_url)
        )
        .done(function(xml, xsl) {
            $(node).append(transformXml(xml[0], xsl[0]));
        })
        .fail(function() {
           alert('failed');
        });
    });

    $(".insert-md").each(function(i, node) {
        var md_url = getValue(node.attributes["insert-src"].value, queryData);

        $.when(
            $.get(md_url)
        )
        .done(function(md) {
            $(node).append(marked(md));
        });
    });
}
