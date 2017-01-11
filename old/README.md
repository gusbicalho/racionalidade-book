# Racionalidade

Nesse repositório será mantida a versão consolidada em HTML, formatada de modo a
permitir tanto a leitura na web quanto um bom resultado de impressão.

O projeto contém dois arquivos principais: `index.html` e `style.css`. O
primeiro contém o conteúdo do livro propriamente dito, o segundo contém as
regras de formatação. Além desses, o projeto contém a pasta `images`, que contém
as imagens que aparecem no documento.

## Checklist para contribuições

Em geral, a inclusão de um artigo começa com a criação da respectiva tag
`<article>` na `<section>` correta. Em seguida, copia-se o código html da página
do artigo na wiki correspondente à tradução. Esse código se encontra dentro de
uma tag `<td>`, que se inicia com uma tag `<h2>` que contém o título traduzido.

Em seguida, vale cumprir a checklist abaixo de tarefas mais-ou-menos
automatizadas:

- [ ] ID do artigo especificado corretamente e incluído na tag `<article>`
- [ ] Imagens colocadas na pasta `images`, nomeadas corretamente
- [ ] Limpar headers
  - Find: `<(h[0-6])><span class="mw-headline"
  id=".*?">(?:<i>)?(.*?)(?:</i>)?</span><span class="mw-editsection"><span
  class="mw-editsection-bracket">\[</span><a href=".*?" title=".*?">.*?</a><span
  class="mw-editsection-bracket">\]</span></span></h[0-6]>`
  - Replace: `<$1>$2</$1>`
- [ ] Deixar o título dos artigos na mesma linha da tag `<article>`, para
facilitar a visualização com as tags "fechadas" no editor de texto:
  - Find: `(<article id=".*?">)[\s]*(?:(<hgroup>)\s*)?<h1` Replace: `$1$2<h1`
  - Alinhar o resto do `<hgroup>`:
    - Find: `(<article id=".*?"><hgroup><h1>.*?</h1>)\s*(<p class="subtitle">.*?</p>)\s*</hgroup>`
    - Replace:

```
$1\n                               $2\n                        </hgroup>
```

- [ ] Links e back-links de notas corretos com o ID do artigo correto.
  Substituir o `id` no lugar dos `@` abaixo:
  - Find: `<sup>(\d+)[\n\r ]+(\d+)</sup>` Replace: `<a class="note-ref"
  href="#art-@-n-$1" id="art-@-nref-$1">$1</a>`
  - Find: `<sup id=\".*?\" class=\"reference\"><a
  href=\".cite_note-.*?\">\[(.*?)\]</a></sup>` Replace: `<a class="note-ref"
  href="#art-@-n-$1" id="art-@-nref-$1">$1</a>`
  - Find: `<li id="cite_note-.*?-(.*?)">` Replace: `<li id="art-@-n-$1"><a
  class="note-backref" href="#art-@-nref-$1"></a>`
- [ ] Links internos para capítulos que constam no documento direcionam para os
`id`s corretos; links externos para artigos ainda não incluídos direcionam para
a página do artigo na wiki
  - Encontrar artigos que já existem no wiki - Find: `<a href="(/wiki.*?)"
  title="(.*?)">`
    - Caso artigo já esteja no documento, substituir por: `<a href="#art-@"
    title="@">`, com o `id` correto e o título traduzido
    - Caso não esteja, transformar em link externo: `<a target="_blank"
    href="http://racionalidade.com.br$1" title="$2">`
  - Artigos que ainda não existem no wiki (redlinks):
    - Find: `<a href="/nw/index.php\?title=(.*?)&amp;action=edit&amp;redlink=1"
    class="new" title="(.*?) \(página inexistente\)">`
    - Replace: `<a target="_blank" href="http://racionalidade.com.br/wiki/$1"
    title="$2">`
- [ ] Links externos têm `target="_blank"`
  - Find: `<a (?:rel="nofollow" )?(?:class="external (?:free|text)"
  )?href="([^#])` Replace: `<a target="_blank" href="$1`
- [ ] Usar tags `<em>` e `<strong>` ao invés de `<i>` e `<b>`
  - Find: `<i>(.*?)</i>` Replace: `<em>$1</em>`
  - Find: `<b>(.*?)</b>` Replace: `<strong>$1</strong>`
- [ ] Aspas:
  - Find: `([ \(\[])"([^=\n]*?)"` Replace: `$1“$2”`
  - Find: `([ \(\[])'([^=\n]*?)''` Replace: `$1‘$2’`
- [ ] `</p>`s logo após o fim do texto
  - Find: `\s+</p>` Replace: `</p>`

## style.css

Em geral, o editor não precisará alterar o arquivo `style.css`. Ele já contém as
regras necessárias para a formatação do texto em geral. Alterar esse arquivo só
será necessário se algum trecho especial exigir uma formatação fora do padrão.

**Alterações ao `style.css` devem ser feitas em um PR específico.**

## images

As imagens incluídas no livro devem ser colocados na pasta `images`.

Os arquivos devem estar em formato `png` ou `jpg`, e seus nomes devem seguir o
padrão `art-X-img-Y`, em que X é o identificador do artigo (como especificado
acima), e Y é um número que corresponde à ordem em que a imagem aparece no
artigo.

Por exemplo, a segunda imagem do artigo 33 terá o nome `art-33-img-2.png`.

A capa do livro, logotipos e outras imagens que não são parte do conteúdo dos
artigos não seguem o padrão de nome acima. Esses arquivos devem ter nomes curtos
e descritivos de suas funções. Hífens `-` devem ser usados para indicar espaços
entre palavras (não usar *underscores*, pontos ou espaços nos nomes).

## index.html

### Estrutura geral e identificadores

O conteúdo do livro é organizado usando as tags `<section>` e `<article>`. Cada
Livro e Sequência corresponde a uma `<section>`, e cada artigo corresponde a um
`<article>`. Dentro das tags `<article>` ficam os textos propriamente ditos.

O primeiro elemento de cada `<section>` correspondente a um Livro deve ser uma
tag `<h1 class="book-title">`. A `<section>` deve ter um `id` na forma `book-x`,
onde `x` é o número romano que identifica o Livro, em letras minúsculas.

O primeiro elemento de cada `<section>` correspondente a uma Sequência deve ser
uma tag `<h1 class="seq-title">`. A `<section>` deve ter um `id` na forma
`seq-x`, onde `x` é a letra (minúscula) que identifica a Sequência.

O primeiro elemento de cada `<article>` deve ser uma tag `<h1>` contendo o
título do Livro, Sequência ou artigo, ou uma tag `<hgroup>`, caso haja um
subtítulo. O `<hgroup>`, nesse caso, deverá conter a tag `<h1>` com o título e
uma tag `<p class="subtitle">` com o subtítulo. O `<article>` deve ter um `id`
na forma `art-x`, onde `x` é o número que identifica o artigo. No caso de textos
sem número (como prefácio e interlúdios), `x` deve ser substituído por uma única
palavra ou abreviação que identifique o texto (eg. `pref`, `intro`).

### Link para o original

Ao final da maioria dos artigos haverá um link para o post original no
LessWrong. Esse link deve ser inserido **após o texto, antes das notas de
rodapé**, com a tag `<p class="endlink"><a target="_blank" href="..."></a></p>`,
substituindo-se as reticências pela URL completa do post.

### Notas de rodapé

As notas de rodapé são apresentadas ao fim dos textos, após o link para o
original. Nos casos em que não houver link para o original, elas serão marcadas
pela tag `<h2>Notas</h2>`. As notas de tradução vêm depois das notas originais e
têm numeração independente, e são identificadas pelo prefixo `NT`. O prefixo é
acrescentado automaticamente na exibição, mas deve ser incluído nos `id`s das
notas (ver abaixo).

Após a tag `<h2>`, deve haver uma lista ordenada, criada com a tag `<ol
class="references">`, no caso das notas constantes do original, ou `<ol
class="trans-notes">`, no caso das notas de tradução. Cada nota será um item da
lista, com a forma `<li id="art-X-n-Y"><a class="note-backref"
href="#art-X-nref-Y"></a> ... </li>`

Para inserir uma referência a uma nota de rodapé no corpo do texto, usa-se a tag
`<a class="note-ref" href="#art-X-n-Y" id="art-X-nref-Y">Y</a>`.

Nas fórmulas acima, X é o identificador do artigo (como especificado no atributo
`id` do `<article>`), e Y é o número da nota. Caso se trate de uma nota de
tradução, Y deve conter o prefixo `nt` (eg. `nt1`).

### Links internos ao livro

Em vários pontos, o texto do livro contém links para outros artigos do próprio
livro.

Caso o artigo de destino já tenha sido incorporado ao `index.html`, o link
deverá ter a forma `<a href="#art-X" title="Y">`, onde X é o `id` do artigo de
destino e Y é o seu título (sem numeração).

Por exemplo: `<a href="#art-5" title="Disponibilidade">disponibilidade</a>`

Caso o artigo de destino ainda não esteja no `index.html`, o índice deve remeter
à página do artigo na wiki de tradução (http://racionalidade.com.br/wiki/),
mesmo que essa página ainda não tenha sido criada. Além disso, o link deve
conter o atributo `target="_blank"`.

Por exemplo: `<a target="_blank"
    href="http://racionalidade.com.br/wiki/Interlude:_The_Simple_Truth"
    title="Interlude: The Simple Truth">verdade</a>`

### Links externos

Links externos devem conter o atributo `target="_blank"`.

Por exemplo: `<a target="_blank"
    href="http://en.wikipedia.org/wiki/Band_society">bandos</a>`

### Detalhes de formatação

- Use tags `<em>` e `<strong>`, ao invés de `<i>` e `<b>`
- Use a tag `<blockquote>` para citações
  - Dentro das blockquotes, separe parágrafos usando `<p>`, não `<br>`
  - Caso haja um único parágrafo, não é necessário usar `<p>`
  - Se existir, a assinatura da citação (eg. nome do autor) deve ser colocada
  numa tag `<p style="text-align: right">`
- Use estilos inline para alterar o alinhamento de um parágrafo, eg. `<p
style="text-align:right">`
- Use *smart quotes* `“x”` e `‘x’`, ao invés de aspas simples `"x"` e `'x'`.
