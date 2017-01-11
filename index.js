(function(window, undefined) {
  'use strict';

  var $ = window.$;

  function comp(f, g) {
    return function() {
      return f.call(this, g.apply(this, arguments))
    }
  }

  function runAll(fs) {
    return function() {
      return fs.map(function(f) {
        return f.apply(this, arguments)
      })
    }
  }

  function withTarget(f) {
    return function(event) {
      return f(event.target)
    }
  }

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

  function replaceFootnoteRefs(document) {
    console.log('Replacing footnote refs...')
    $("ref").each(function(i, node) {
      var refname = node.textContent
      var artid = parentArticle(node).id
      $(node).replaceWith(
        "<a class='note-ref' " +
        "href='#" + artid + "-n-" + refname + "' " +
        "id='" + artid + "-nref-" + refname + "' " +
        ">" + refname + "</a>")
    })
  }

  function replacementForFootnote(i, noteNode) {
    var artid = parentArticle(noteNode).id
    var noteIndex = i + 1;
    var content = noteNode.innerHTML;
    var note = $("<li id='" + artid + "-n-" + noteIndex + "'>")
    var backref = $(
      "<a class='note-backref' " +
      "href='#"+ artid + "-nref-" + noteIndex + "'>"
    )
    note.html(content)
    note.prepend(backref)
    return note
  }

  function replacementForFootnotesBlock(blockNode) {
    var ol = $("<ol class='references'>")
    $(blockNode).children("note").each(
      comp(ol.append.bind(ol), replacementForFootnote)
    )
    return ol
  }

  function replaceFootnotes(document) {
    console.log('Replacing footnotes...')
    $("notes").each(function(i,notes) {
      $(notes).replaceWith(replacementForFootnotesBlock(notes))
    })
  }

  if (window.document) {
    window.document.addEventListener(
      'DOMContentLoaded',
      withTarget(runAll([
        replaceFootnoteRefs,
        replaceFootnotes,
      ]))
    );
  }

})(window);
