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
