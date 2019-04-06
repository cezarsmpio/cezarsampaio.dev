#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const postsFolder = path.resolve(__dirname, './posts');
const today = new Date().toISOString().split('T')[0];

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}

const attributes = process.argv.slice(2).reduce(function(list, fileName) {
    const [name, value] = fileName.split('=');

    return { ...list, [name]: { name, value } };
}, {});

const rules = {
    title:
        'A title must be specified. Example: title="Creating delicious cheese bread"',
    keywords:
        'Keywords must be specified. Example: keywords="red, blue, green, yellow"',
    preview:
        'A preview must be specified. Example: preview="Reproducing my grandma cheese bread recipe!"',
};

Object.keys(rules).forEach(function(key) {
    if (!attributes[key]) {
        console.error(rules[key]);
        process.exit();
    }
});

const file = `${postsFolder}/${today}-${slugify(attributes['title'].value)}.md`;

if (fs.existsSync(file)) {
    console.error(
        'This post already exists! Create one with a different name.',
    );
    return;
}

const postContent = `---
${Object.values(attributes)
    .map(function(attr) {
        if (attr.name === 'keywords') {
            return `${attr.name}: [${attr.value}]\n`;
        }

        return `${attr.name}: ${attr.value}\n`;
    })
    .join('')}
slug: ${today}-${slugify(attributes['title'].value)}
created_at: ${today}
---

`;

fs.writeFile(file, postContent, function(err) {
    if (err) {
        console.error('Something happened when creating the post:');
        console.error(err);
        return;
    }

    console.log('Post has been created! ⚡️');
    return;
});
