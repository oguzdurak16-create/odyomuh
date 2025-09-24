---
title: Ana Sayfa
layout: base.njk
---

<ul class="post-list">
{%- for yazi in collections.post | reverse -%}
  <li class="post-card">
    <h2 class="post-card-title"><a href="{{ yazi.url }}">{{ yazi.data.title }}</a></h2>
    <p class="post-meta">{{ yazi.data.date | date('DD MMMM YYYY') }} | {{ yazi.data.category }}</p>
    <p class="post-excerpt">{{ yazi.data.excerpt }}</p>
    <a href="{{ yazi.url }}" class="read-more-link">Devamını Oku &rarr;</a>
  </li>
{%- endfor -%}
</ul>