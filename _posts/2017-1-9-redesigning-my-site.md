---
layout: post
date: 2017-1-9
title: Re&#58; Redesign
slug: redesigning-my-site
excerpt: A story about a redesign, but also one of self-discovery
tags: redesign dev growth storytime
music:
  - title: Love Like You
    artist: Aivi & Surasshu feat. Rebecca Sugar
    link: https://www.youtube.com/watch?v=clJk8a5q1Lo
---

This is not the first time I've tried having my own site as you might have guessed by my use of the word "redesign". It is, however, the first time that I felt pride in my site. That's not because it's the most technically advanced site I know how to make with crazy animations, but because it's the first to reflect me.

I'm not a designer by any means so my work leans on what I've seen others do and what I thought was cool at the time. That has always been true of my personal sites, but previous iterations felt very clinical or didn't properly showcase me. And what is even the point of having a website if it doesn't reflect and showcase you? So how did I get to having a site I'm proud of?

<p class="lead">
  &hellip;I learned a lot of bad habits, copied a lot of code straight from StackOverflow, and thought all problems could be solved by jQuery&hellip;
</p>

First, I'm finally proud of myself as a developer. I have a BS in Computer Science, but when it comes to web development I am self-taught. That means I learned a lot of bad habits, copied a lot of code straight from StackOverflow, and thought all problems could be solved by jQuery. That is to say I was a bad developer. Clever enough to make a living off of it, sure, but I was very aware that I didn't know as much as my peers. Still don't in many respects, but I have a wealth of experience now  and  can present to a room of developers on topics such as creating performant animations on the web or progressive enhancement, take questions on it, and hold up just fine.

Second, I ditched the frameworks. That's not say that frameworks are bad, hardly, but I found that when I used them I relied on them to the point of them being a crutch. For a while I wouldn't even think of starting anything without loading Bootstrap first. Bootstrap is fantastic! And [@mdo](http://github.com/mdo) is brilliant. But I found that I kept producing the same old "Bootstrap sites" you see/saw everywhere. So I ditched it. Yes, if you look at the CSS you'll find a lot of elements similar to what you would find in Bootstrap or Foundation, but I wrote them. That kept me focused; I didn't have all the bells and whistles so I didn't build something in service of what Bootstrap offered, I built what was service of the content, in service of me. I only made what I need to accomplish achieve the look I was going for.

<p class="lead">
  &hellip;I didn't have all the bells and whistles so I didn't build something in service of what Bootstrap offered&hellip;
</p>

Speaking of the look, I used to jump in with blocking out huge areas of what kind of elements I should have. This time I started at the bottom. Fonts. I tested a bunch of fonts until I landed on what felt right for me: Open Sans and Work Sans if you're curious. Then I [played with how all the different styles](/styles) of text would play off each other.

From there I worked out a rough idea of the colors I wanted to use. I wanted something eye-catching that screamed to be looked at. So I went with neon-pink.

Then, I thought about what was one thing I could do to really give someone a sense of who I am? Immediately it was clear to me that I needed to involve my Twitter in some way. Thus the banner at the top of the homepage. Funny thing about it, it doesn't technically use Twitter to power it. Twitter's API doesn't like to be used client-side and with this site being a Jekyll-powered GitHub page server-side wasn't going to happen.

So I turned to good ol' IFTTT for a solution. I set up a rule so that whenever I tweeted using trigger hashtag, my tweet would be entered into a Google Spreadsheet that I could then read from. Problem was there's no good way to pull out the image url from a tweet in this way. I was determined to be able to post an image and some text and have it show up on my site. Turns out Instagram had exactly what I was looking for.

Same solution, IFTTT takes Instagram posts from my account with a trigger hashtag and puts them in spreadsheet. And for good measure, since I don't really use Instagram all that much and don't want to direct people to it, IFTTT also reposts to Twitter natively. Ta-dah!

Next, I narrowed down what content I wanted to show: my Twitter (most reflective of me personally), my GitHub repos that I'm most proud of, my blog, and finally a trimmed down portfolio. In that order.

I already explained why the Twitter banner is first, like, a couple short paragraphs ago. If you can't remember, then you have a terrible memory.

I wanted my GitHub repos up top because they're the code that I own. Not stuff I made while employed or contracted elsewhere. This is about me after all.

Next my blog. I don't regularly blog. But I want to get into it. So I put it nearer the top as a way to force myself to use it. And I'm using it now, so it works! I'm so clever.

<p class="lead">
  &hellip;my biggest and most ambitious projects and others that were from when I was less capable&hellip;
</p>

Lastly, my resume as it were. Save the best for last, right? It's big and bold and filled with beautiful work. The work that I think defines me; some of my biggest and most ambitious projects and others that were from when I was less capable, but started being able to make a living doing web development.

And then I end-capped it with a sweet Cowboy Bebop reference. Once again, this is all about me, baby.

I could get deeper into the technical nitty-gritty details, but if you're the type of person interested in that then I suspect you'll have a more educational experience just inspecting everything.

Anyway, this post has gone on long enough.

See you space cowboy&hellip;
