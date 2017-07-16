# Distributed π

Forked, adapted, reworked and refactored from https://github.com/antimatter15/distributed-pi

## An investigation into distributed computing using web browsers as the client

Calculate digits of π by simply visiting a website.

The plan was to build this into an adblocker so instead of contributing yourself and your privacy as commodity, offer up your computing power instead.

More detailed write up to come (maybe).

## What's different from the source I forked from

The algorithm used is largely the same. I've rewrote the server side implementation to use Express and a MySQL database instead of the original's writing to a text file. The client side implementation is refactored to work with my interface and hopefully provide a simpler API to be used in a browser extension if I ever do that.

## How to calculate π?

Just visit the [site](https://distributed-pi.herokuapp.com) and let it run. It can run in the background and not slow your tab or your browser down, provided your browser supports [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), that's it. If you want to know the maths, find a better source for the maths side of it, I'm no mathematician.

---

P.S. May not get back to this for quite a while if ever. An old project, was just cleaning my dropbox but the live site will still be running on Heroku's server.