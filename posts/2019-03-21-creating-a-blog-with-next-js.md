---
title: Creating a blog with Next.js
created_at: 2019-03-21
preview: How I have overcreated this blog just for fun.
slug: creating-a-blog-with-nextjs
---

# Hello dear friends.

## Hello dear friends.

### Hello dear friends.

#### Hello dear friends.

##### Hello dear friends.

###### Hello dear friends.

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

asdkadasd adsad asdd

-   asdasd
-   asdasd
-   [asdasd](#)

1. asasd
2. 1231
3. asdasd

<script src="https://gist.github.com/cezarsmpio/65f7cceec4c3d181f1b5de3cf3383622.js"></script>

<iframe width="560" height="315" src="https://www.youtube.com/embed/9ld2lhXAcKU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

```jsx
function Posts(props) {
    return (
        <section>
            {props.posts.map((post, key) => (
                <PostPreview {...post} key={key} test={`asdsadsad`} />
            ))}
        </section>
    );
}
```

```xml
<!DOCTYPE html>
<title>Title</title>

<style>body {width: 500px;}</style>

<script type="application/javascript">
  function $init() {return true;}
</script>

<body>
  <p checked class="title" id='title'>Title</p>
  <!-- here goes the rest of the page -->
</body>
```

```json
[
    {
        "title": "apples",
        "count": [12000, 20000],
        "description": { "text": "...", "sensitive": false }
    },
    {
        "title": "oranges",
        "count": [17500, null],
        "description": { "text": "...", "sensitive": false }
    }
]
```

```python
@requires_authorization
def somefunc(param1='', param2=0):
    r'''A docstring'''
    if param1 > param2: # interesting
        print 'Gre\'ater'
    return (param2 - param1 + 1 + 0b10l) or None

class SomeClass:
    pass

>>> message = '''interpreter
... prompt'''
```

---

`When people start` learning React, [they often ask](https://google.com) for a style guide. While it’s a good idea to have some consistent **rules applied across a project**, a lot of them are arbitrary — and so React doesn’t have a strong opinion about them.

> You can use different type systems, prefer function **declarations or arrow** functions, sort your props in alphabetical order or in an order you find pleasing.

This flexibility allows integrating React _into projects with existing conventions_. But it also invites endless debates.

![alt text](/static/02160077.jpg 'caption')

![alt text](/static/02180002.jpg)
