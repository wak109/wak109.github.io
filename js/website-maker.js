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
        .done(function(text) {
            localStorage.setItem(url, text)
            dfd.resolve(text)
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

//    navigator.serviceWorker.register('./website-maker-cache.js')
//        .catch(console.error.bind(console));
    
    var queryData = queryStringToJson(uri.slice(uri.indexOf('?')+1));

    $(".insert-xml").each(function(i, node) {
        xml_url = getValue(node.attributes["insert-src"].value, queryData);
        xsl_url = getValue(node.attributes["insert-xsl"].value, queryData);
        
        Promise.all([fetch(xml_url), fetch(xsl_url)])
            .then(responses => Promise.all(
		responses.map(response => response.text())))
            .then(function(texts) {
		$(node).append(transformXml(
		    $.parseXML(texts[0]), $.parseXML(texts[1])));
            });
    });

    $(".insert-md").each(function(i, node) {
        var md_url = getValue(node.attributes["insert-src"].value, queryData);

        fetch(md_url)
            .then(response => response.text())
            .then(function(text) {
		$(node).append(marked(text));
            });
    });
}
