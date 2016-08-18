/* vim: set ts=4 et sw=4 sts=4 fileencoding=utf-8: */


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

function main() {
    $(".markdown").each(function(i, node) {
        convertMarkdownToHtml(node, node.attributes["default"].value);
    });
}
