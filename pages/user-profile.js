export default function UserProfile(props) {
    return <div>{props.username}</div>
};

export async function getServerSideProps(context) {
    const {res, req, params} = context;

    console.log(res, req, params)
    return {
        props:{
            username: 'MAX',
        }
    }
}