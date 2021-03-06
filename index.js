(function(window, undefined) {
  'use strict';

  var $ = window.$;

  function comp(f, g) {
    return function() {
      return f.call(this, g.apply(this, arguments))
    }
  }

  function runAll(fs) {
    return function(initialContext) {
      return fs.reduce(
        function(ctx, f) {
          return f(ctx)
        },
        initialContext || {})
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

  function replaceElements(selector, builderFn) {
    return function (context) {
      console.log('Replacing '+selector+" ...")
      $(selector).each(function(i, node) {
        $(node).replaceWith(builderFn(node))
      })
      return context
    }
  }

  function newFootnoteRef(refNode) {
    var refname = refNode.textContent
    var artid = parentArticle(refNode).id
    return $(
      "<a class='note-ref' " +
      "href='#" + artid + "-n-" + refname + "' " +
      "id='" + artid + "-nref-" + refname + "' " +
      ">" + refname + "</a>"
    )
  }

  function newFootnote(i, noteNode) {
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

  function newFootnotesList(notesNode) {
    var ol = $("<ol class='references'>")
    $(notesNode).children("note").each(
      comp(ol.append.bind(ol), newFootnote)
    )
    return ol
  }

  function newEndlink(endlinkNode) {
    var href = endlinkNode.innerHTML.trim()
    var link = $(
      "<a target='_blank' " +
      "href='" + href + "'>"
    )
    var wrapper = $("<p class='endlink'>")
    wrapper.append(link)
    return wrapper
  }

  function newSection(sectionType, node) {
    var t = node.attributes.t.value.trim()
    var separator = t.indexOf(".")
    var index = t.slice(0, separator).trim()
    var name = t.slice(separator+1).trim()
    var wrapper = $("<section id='" + sectionType + "-" + index.toLowerCase() + "'>")
    var title = $("<h1 class='" + sectionType + "-title'>")
    title.text(index.toUpperCase() + " - " + name)
    wrapper.html(node.innerHTML)
    wrapper.prepend(title)
    return wrapper
  }

  function newBook(bookNode) {
    return newSection("book", bookNode)
  }

  function newSequence(seqNode) {
    return newSection("seq", seqNode)
  }

  if (window.document) {
    window.document.addEventListener(
      'DOMContentLoaded',
      runAll([
        replaceElements("book", newBook),
        replaceElements("sequence", newSequence),
        replaceElements("ref", newFootnoteRef),
        replaceElements("notes", newFootnotesList),
        replaceElements("endlink", newEndlink),
      ]).bind(null, {})
    );
  }

})(window);
