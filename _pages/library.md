---
layout: page
title: Library
permalink: /library
---

# The Library

<div class="narrower" markdown="1">
I tend to read an eclectic collection generally covering: political philosophy, culture & social commentary, fiction/novels, technology, design, psychology, and more. My book notes are likely unedited, stream-of-consciousness, and rough.

**Disclaimer:** I don't *necessarily* recommend all of these as "good" books. Their inclusion here is for my own note-taking and archival purposes. See the ratings and notes on individual books for my recommendation. Think of this Library like my own personal GoodReads where I have control over the format and the way I link my reviews to other notes and concepts.

Finished books list is obviously incomplete. I plan slowly add entries for older books that I read before I started note-taking.
</div>

## Currently reading

<div class="fdr card-container">
{% assign notes_list = site.notes %}  
{% for post in notes_list %}
    {% if post.tags contains "library" and post.library contains "current" %}
    <div class="card-small">
        <div class="card-inner">
            <div class="card-title">
                <strong>
                    <a class="internal-link" href="{{ post.url }}">
                        {{ post.title }}
                    </a>
                </strong>
            </div>
            <img class="ptd" src="{{ post.img }}" alt=""/>
        </div>
    </div>
    {% endif %}
{% endfor %}
</div>

## Finished

<div class="narrower mtd">
{% assign booktags =  site.notes | where_exp: "item", "item.tags contains 'library'" | map: 'library' | join: ',' | split: ',' | uniq | sort %}
{% for booktag in booktags %}
{% unless booktag contains "current" %}
<span class="tag mrs mbs taglist" id="{{ booktag | split: ' ' | join: '-' }}">
    <span class="mrs">
        {{ site.data.booktags[booktag] }}
    </span>
    <span>
        {{ booktag }}
    </span>
</span>

{% endunless %}
{% endfor %}
</div>

<div class="fdr card-container">
{% assign notes_list = site.notes | sort: "rating" | reverse %}  
{% for post in notes_list %}
    {% if post.tags contains "library" %}
    {% unless post.library contains "current" %}
    <div class="card-small" data-tags="{{ post.library }}">
        <div class="card-inner">
            <div class="card-title">
                <strong>
                    <a class="internal-link" href="{{ post.url }}">
                        {{ post.title }}
                    </a>
                </strong>
            </div>
            <img class="ptd" src="{{ post.img }}" alt=""/>
        </div>
    </div>
    {% endunless %}
    {% endif %}
{% endfor %}
</div>

<script>
    let tags = [];
    if(window.location.hash) {
        const urlTag = decodeURIComponent(window.location.hash.split('#')[1]);
        tags = [urlTag];
        $("#" + urlTag.split(' ').join('-')).addClass("active-tag");
    }

    function filterNotesByTags() {
        $("[data-tags]").each(function(index, element) {
            const elementTags = element.getAttribute("data-tags").split(',');
            if (elementTags.some(r => tags.includes(r)) || tags.length === 0) {
                $(this).removeClass("hidden");
            } else {
                $(this).addClass("hidden");
            } 
        });
    }

    $(".taglist").each(function() {
        $(this).click(function() {
            const id = $(this).attr('id').split('-').join(' ');
            if (tags.includes(id)) {
                const index = tags.indexOf(id);
                tags.splice(index, 1);
                $(this).removeClass("active-tag");
            } else {
                $(this).addClass("active-tag");
                tags.push(id);
            }
            filterNotesByTags();
        })
    });

    filterNotesByTags();

</script>