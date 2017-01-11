(function(window, undefined) {
  'use strict';

  var $ = window.$;

  function firstParentWithName(node, name) {
    if (!node || !node.parentNode)  {
      return null
    }
    if (node.parentNode.nodeName.toUpperCase() === name) {
      return node.parentNode
    } else {
      return firstParentWithName(node.parentNode, name)
    }
  }

  function parentArticle(node) {
    return firstParentWithName(node, "ARTICLE")
  }

  function replaceLinks(document) {
    //<a class="note-ref" href="#art-intro-n-1" id="art-intro-nref-1">1</a>
    //document.on
    $("ref").each(function(i, node) {
      var refname = node.textContent
      var artid = parentArticle(node).id
      console.log(artid)
      $(node).replaceWith(
        "<a class='note-ref' " +
        "href='#" + artid + "-n-" + refname + "' " +
        "id='" + artid + "-nref-" + refname + "' " +
        ">" + refname + "</a>")
    })
  }

  function withTarget(f) {
    return function(event) {
      return f(event.target)
    }
  }

  if (window.document) {
    window.document.addEventListener('DOMContentLoaded', withTarget(replaceLinks));
  }

})(window);
