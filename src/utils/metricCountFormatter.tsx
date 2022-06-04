interface props {
    count: number;
}

function FollowerCount(props: props) {
    if (props.count > 1000000) {
        return (<><span style={{ fontWeight: 'bold' }}>{(props.count / 1000000).toFixed(1)} M </span><span>followers</span></>);
    } else if (props.count > 10000) {
        return (<><span style={{ fontWeight: 'bold' }}>{(props.count / 1000).toFixed(1)} k </span><span>followers</span></>);
    } else if (props.count > 1) {
        return (<><span style={{ fontWeight: 'bold' }}>{props.count} </span><span>followers</span></>)
    } else {
        return (<><span style={{ fontWeight: 'bold' }}>{props.count} </span><span>follower</span></>)
    }
}

export default FollowerCount;