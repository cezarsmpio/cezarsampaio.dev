---
title: Creating a blog with Next.js
created_at: 2019-03-21
preview: How I have overcreated this blog just for fun.
slug: 2019-03-21-creating-a-blog-with-nextjs
keywords: [nextjs, blog, webpack, javascript, overengineering, express, nodejs, api, static]
---

That's my first post on my new blog, I have written other stories on [my Medium profile](https://medium.com/@cezarsampaio 'Medium profile of Cezar Sampaio.').

In this post I want to demonstrate how I have created this blog using Next.js and Markdown files importing them from a specific folder using Webpack. I wanted something **simple**.

### Requirements

-   Each post is a markdown file.
-   It should load all posts from a **posts** folder.
-   No database at all such as MySQL, MongoDB.
-   As simple as possible.
-   The less external dependencies, the better.
-   It should load under 1 second.

### First try

Before everything, I searched for some static blog generator such as Gatsby but I found them a bit complicated or it generates a bunch of files that didn't attend my requirements.

Then I went with **Next.js**, a framework that I'm used to.

I started creating all my components following the design of the page:

-   Homepage with a list of posts, header and my social networks links.
-   Single page of the post, there I have created all possible styles such as lists, headers, texts, links, tables, quotes, images, tables, iframes, and so on.

For the design I have used [Figma](https://www.figma.com).

![Preview of this blog on Figma](/static/design-of-cezar-sampaio-blog.jpg)

### Second try

I was happy with I have done. Once I had everything it was time to decide how I could load my Markdown files from the folder.

Simple. Just create two endpoints using Express.js because Next.js supports it and I'm done.

That was how my `server.js` file looked like.

```js
const express = require('express');
const next = require('next');
const fglob = require('fast-glob');
const fs = require('fs');
const fm = require('front-matter');
const md = require('markdown-it')();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('/api/posts', async (req, res) => {
        const files = await fglob('posts/**.md');
        const sortedFiles = [...files].reverse();

        const posts = sortedFiles.map(file => {
            const data = fm(fs.readFileSync(file).toString()); // convert to a front matter object

            return {
                ...data,
                html: md.render(data.body),
                slug: file.split('/')[1].replace(/\.md$/g, ''),
            };
        });

        return res.json(posts);
    });

    server.get('/api/posts/:slug', function(req, res) {
        fs.readFile(`posts/${req.params.slug}.md`, function(err, data) {
            if (err) {
                return res.status(404);
            }

            const file = fm(data.toString());

            return res.json({
                ...file,
                html: md.render(file.body),
                slug: req.params.slug.replace(/\.md$/g, ''),
            });
        });
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
```

Then on my **Next.js** pages I could fetch them from `getInitialProps` and I was done.

```js
const { data: post } = await axios.get(
    `http://localhost:3000/api/posts/${props.query.slug}`,
);

return { post };
```

Well... I was not happy with. It was kind of attending my requirements, but I was struggling with those two:

-   As simple as possible.
-   The less external dependencies, the better.

I was not satisfied at all. I was using `axios`, I could have used `fetch` instead but I thought that maybe I could do that just using `webpack`.

> I deleted everything.

### Third try

I started looking for some webpack loaders that I could use to convert markdown to html or even react. I found a lot of them but some were super heavy and this was not good for my requirements.

I found the `raw-loader` which basically return the content of specific file extensions that you can specify by using regular expression.

By having the content I could simply parse it!

I created a `next.config.js` to extend the webpack rules config:

```js
webpack: config => {
    config.module.rules.push({
        test: /\.md$/i,
        loader: ['raw-loader'],
    });

    return config;
},
```

Basically, It tells for every file ending with `.md` to use `raw-loader`.

Now I could import all Markdown files directly from my React components!

And I did.

And I got bored.

I started doing:

```js
import PostX from 'posts/x.md';
```

`PostX` had the content of that file and I could use some parsers.

I did this for one file, imagine if I have 20 posts. I would need to do all these imports manually. Not good at all.

### Fourth try

At this time, what I wanted was:

-   Just load all files from `/posts`.
-   Automatically.
-   Using webpack.

Well, I started googling about it and then I found something called **webpack contexts**.

You can specify the folder, the file extension by using regular expression and you can import all of them at once.

Then I tried:

```js
require.context('../posts/', true, /\.md$/);
```

This returns the content of files of those files but I still need to use `raw-loader`.

Following webpack documentation, they have an util function called `importAll`, I needed to change it a bit to attend my needs:

```js
export default function importAll(context) {
    return context
        .keys()
        .map(context)
        .map(module => module.default);
}
```

The homepage `getInitialProps` looks like:

```js
Index.getInitialProps = async function() {
    const posts = importAll(require.context('../posts/', true, /\.md$/))
        .reverse() // ordering them from most recent to oldest
        .map(frontMatter)
        .map(withReadingTime);

    return { posts };
};
```

You can notice `frontMatter` and `withReadingTime` being used there. I'm parsing my markdown content at that time.

**Front Matter** is a special format that allows you to add meta attributes on your markdown file.

In my case, I have some required attributes that I must follow in order to have a proper post object.

The attributes of this post you are just reading look like:

```
---
title: Creating a blog with Next.js
created_at: 2019-03-21
preview: How I have overcreated this blog just for fun.
slug: 2019-03-21-creating-a-blog-with-nextjs
keywords: [nextjs, blog, webpack, javascript, overengineering, express, nodejs, api, static]
---
```

And it returns an object that looks like:

```js
{
    attributes: {
        title: 'Creating a blog with Next.js',
        created_at: '2019-03-21',
        preview: '...',
    },
    body: 'your markdown here',
}
```

In order to attend my requirements, I was using a library to parse the front matter format and I decided to use `front-matter`, which is 180kb uncompressed, but It is huge for my needs, fortunately I found out a tinier library called `tiny-frontmatter` which is just 400 bytes, less than 1kb.

---

`withReadingTime` is an util that I have created to extend these attributes:

```js
export default function readingTime(text = '') {
    return Math.ceil(text.split(/s/g).length / 200);
}

export function withReadingTime(post) {
    return {
        ...post,
        readingTime: readingTime(post.body),
    };
}
```

**Awesome!**

---

After that, I was happy with I had. It was time to load a single post.

On the post page, I receive the slug from the post then I find a post that matches with that value. This is what I have:

```js
Post.getInitialProps = async function(props) {
    const post = await import('../posts/' + props.query.slug + '.md')
        .then(post => post.default)
        .then(frontMatter)
        .then(withParsedHtml)
        .then(withReadingTime)
        .catch(() => false);

    return { post };
};
```

Of course I can improve it, but I was lazy.

The only difference here is that I'm using the `withParsedHtml` where I basically parse the Markdown to HTML.

```js
import marked from 'marked';

export function withParsedHtml(post) {
    return { ...post, html: marked(post.body) };
}
```

In this case, I have chosen 3 libraries to parse it:

-   `markdown` - my first choice, just 5.8kb but it is no longer supported
-   `snarkdown` - just 1kb but it doesn't support tables
-   `marked` - just 7kb, it is well maintained, supports tables. I tried 🤷‍

---

I'm done, finally!

Not yet...

To have more fun I created a tool to automatically create a post with the format that I need to give support. I need to follow some rules:

-   The slug should have the same name of the file.
-   I need to have at least the `title`, `keywords` and `preview` as props.
-   It needs to support the front matter format.

For that, I created a executable file called `cli.js`. (You can find the content here)[https://github.com/cezarsmpio/cezar.sh/blob/master/cli.js].

That's how I create my post now:

```
$ ./cli.js title="My post title" keywords="my, post" preview="Learning a lot and having some fun"
Post has been created! ⚡️
```

Inside of the `posts` folder, it creates a file called `2019-04-06-my-post-title.md` with the content:

```
---
title: My post title
keywords: [my, post]
preview: Learning a lot and having some fun

slug: 2019-04-06-my-post-title
created_at: 2019-04-06
---

```

Now I'm done! And happy! :)

## FAQ

#### Why Next.js?

It uses React, has code splitting out of the box and many other features aiming performance.

#### Pros and Cons?

Well, I'm happy with, I learned a lot, it's a small project. I tried to make the best decisions.

The only cons I can think now is if I have a lot of posts. Because by using webpack context api it adds the content of markdown into the bundle.

#### Why?

Why not?

#### Can I use it for my blog too?

Yes, of course! [You can check the repository](https://github.com/cezarsmpio/cezar.sh).

#### Ideas for the future?

-   Transform this project into a Next.js plugin-ish.

#### What did you end up using as external libraries?

```json
"dependencies": {
    "marked": "^0.6.1",
    "next": "^8.0.3",
    "react": "^16.8.4",
    "react-dom": "^16.8.4",
    "tiny-frontmatter": "^1.0.0"
},
"devDependencies": {
    "raw-loader": "^2.0.0"
}
```

Very consistent :)

---

Well, that's all, I hope you have liked this journey as much as I.

See you!
