// vim: set ts=4 et sw=4 sts=4 fileencoding=utf-8:

function queryStringToJson(query) {
    var obj = {} 
    query.split('&').forEach(function(pair) {
        pair = pair.split('=');
        obj[pair[0]] = decodeURIComponent(pair[1] || "");

    });

    return obj;
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

// jQuery Deferred
//
function getText(url) {
    var dfd = new $.Deferred;
    var value = localStorage.getItem(url)

    if (value != null) {
        dfd.resolve(value);
    }
    else {
        $.when(
            $.get(url, null, null, 'text')
        )
        .done(function(file) {
            localStorage.setItem(url, file)
            dfd.resolve(file)
        })
    }
    return dfd.promise();
}

function getValue(value, queryData) {
    var match = value.match(/\${([^:}]*)(?:\:\=([^}]*))/);

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
            getText(xml_url), getText(xsl_url)
        )
        .done(function(xml, xsl) {
            $(node).append(transformXml($.parseXML(xml), $.parseXML(xsl)));
        })
        .fail(function() {
           alert('failed');
        });
    });

    $(".insert-md").each(function(i, node) {
        var md_url = getValue(node.attributes["insert-src"].value, queryData);

        $.when(
            getText(md_url)
        )
        .done(function(md) {
            $(node).append(marked(md));
        });
    });
}
