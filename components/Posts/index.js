import PostPreview from '../PostPreview';

function Posts(props) {
    return (
        <section>
            {props.posts.map((post, key) => (
                <PostPreview {...post} key={key} />
            ))}
        </section>
    );
}

export default Posts;
