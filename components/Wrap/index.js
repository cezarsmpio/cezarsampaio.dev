function Wrap(props) {
    return (
        <div className="wrap">
            {props.children}
            <style jsx>{`
                .wrap {
                    max-width: 950px;
                    margin: 0 auto;
                    padding: 0 25px;
                }
            `}</style>
        </div>
    );
}

export default Wrap;
