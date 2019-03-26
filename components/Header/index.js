import Link from 'next/link';

function AvtarIntro() {
    return (
        <div className="avatar">
            <div className="avatar__intro">
                <img
                    src="/static/cezar-sampaio.png"
                    width="120"
                    height="120"
                    alt="Picture of the author of this blog, Cezar Sampaio."
                />
            </div>
            <div className="avatar__group">
                <h1 className="avatar__name">
                    <Link href="/" passHref prefetch>
                        <a title="Go back home">Cezar Sampaio</a>
                    </Link>
                </h1>

                <p className="avatar__desc">
                    Randomly writing about lovely things
                </p>
            </div>

            <style jsx>{`
                .avatar {
                    display: flex;
                    margin-left: -25px;
                }

                .avatar__group {
                    padding-top: 14px;
                }

                .avatar__name {
                    font-size: 24px;
                    font-weight: 900;
                }

                .avatar__name a {
                    text-decoration: none;
                    color: var(--primary);
                }

                .avatar__name a:hover {
                    text-decoration: underline;
                }

                .avatar__desc {
                    margin-top: 5px;

                    font-size: 14px;
                }

                @media screen and (max-width: 768px) {
                    .avatar__name {
                        font-size: 22px;
                    }
                }
            `}</style>
        </div>
    );
}

function MenuList() {
    const menus = [
        { children: 'twitter', href: 'https://twitter.com/cezarsmpio' },
        {
            children: 'linkedin',
            href: 'https://www.linkedin.com/in/cezarsampaio/',
        },
        { children: 'github', href: 'https://github.com/cezarsmpio' },
        {
            children: 'instagram',
            href: 'https://www.instagram.com/cezarsmpio/',
        },
    ];

    return (
        <nav className="menu">
            <ul className="menu__list">
                {menus.map(function(menu, index) {
                    return (
                        <li className="menu__list-item" key={index}>
                            <a
                                target="_blank"
                                className="menu__anchor"
                                {...menu}
                            />
                        </li>
                    );
                })}
            </ul>

            <style jsx>{`
                .menu {
                    margin-top: 30px;
                }

                .menu__list {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                }

                .menu__list-item {
                    display: inline-block;
                    font-size: 14px;
                }

                .menu__list-item:not(:first-child) {

                }

                .menu__list-item:not(:first-child):before {
                    content: '•';
                    margin: 0 8px;
                }

                .menu__anchor {
                    text-decoration: none;
                    color: var(--black);
                }

                .menu__anchor:hover {
                    text-decoration: underline;
                    color: var(--primary);
                }

                @media screen and (max-width: 768px) {
                    .menu {
                        margin-top: 0;
                    }
                }
            `}</style>
        </nav>
    );
}

function Header() {
    return (
        <header className="header">
            <div>
                <AvtarIntro />
            </div>

            <div>
                <MenuList />
            </div>

            <style jsx>{`
                .header {
                    padding-top: 65px;
                    padding-bottom: 75px;
                    display: flex;
                    justify-content: space-between;
                }

                @media screen and (max-width: 768px) {
                    .header {
                        padding-top: 25px;
                        padding-bottom: 60px;
                        flex-direction: column;
                        align-items: center;
                    }
                }
            `}</style>
        </header>
    );
}

export default Header;
