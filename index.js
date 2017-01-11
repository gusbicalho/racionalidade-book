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

  function replaceFootnotes(document) {
    console.log('Replacing footnotes...')
    $("notes").each(function(i,notesNode) {
      $(notesNode).replaceWith(newFootnotesList(notesNode))
    })
  }

  function newEndlink(endlinkNode) {
    // <p class="endlink">
    // <a target="_blank" href="http://lesswrong.com/lw/jm/the_lens_that_sees_its_flaws/"></a>
    // </p>
    var href = endlinkNode.innerHTML.trim()
    var link = $(
      "<a target='_blank' " +
      "href='" + href + "'>"
    )
    var wrapper = $("<p class='endlink'>")
    wrapper.append(link)
    return wrapper
  }

  function replaceEndlinks(document) {
    console.log('Replacing endlinks...')
    $("endlink").each(function(i,endlinkNode) {
      $(endlinkNode).replaceWith(newEndlink(endlinkNode))
    })
  }

  function newBook(bookNode) {
    var t = bookNode.attributes.t.value.trim()
    var separator = t.indexOf(".")
    var index = t.slice(0, separator).trim()
    var bookName = t.slice(separator+1).trim()
    var wrapper = $("<section id='book-" + index.toLowerCase() + "'>")
    var title = $("<h1 class='book-title'>")
    title.text(index.toUpperCase() + " - " + bookName)
    wrapper.html(bookNode.innerHTML)
    wrapper.prepend(title)
    return wrapper
  }

  function replaceBooks(document) {
    console.log('Replacing books...')
    $("book").each(function(i, bookNode) {
      $(bookNode).replaceWith(newBook(bookNode))
    })
  }

  function newSequence(seqNode) {
    var t = seqNode.attributes.t.value.trim()
    var separator = t.indexOf(".")
    var index = t.slice(0, separator).trim()
    var seqName = t.slice(separator+1).trim()
    var wrapper = $("<section id='seq-" + index.toLowerCase() + "'>")
    var title = $("<h1 class='seq-title'>")
    title.text(index.toUpperCase() + ". " + seqName)
    wrapper.html(seqNode.innerHTML)
    wrapper.prepend(title)
    return wrapper
  }

  function replaceSequences(document) {
    console.log('Replacing sequences...')
    $("sequence").each(function(i, seqNode) {
      $(seqNode).replaceWith(newSequence(seqNode))
    })
  }

  if (window.document) {
    window.document.addEventListener(
      'DOMContentLoaded',
      withTarget(runAll([
        replaceBooks,
        replaceSequences,
        replaceFootnoteRefs,
        replaceFootnotes,
        replaceEndlinks,
      ]))
    );
  }

})(window);
