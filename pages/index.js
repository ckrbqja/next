import fs from 'fs/promises'
import path from 'path'
import Link from "next/link";


function HomePage(props) {
    const {products} = props;

    return (
        <ul>
            {products.map(d => <Link href={`/${d.id}`}><li key={d.id}>{d.title}</li></Link>)}
        </ul>
    );
}

export async function getStaticProps() {


    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const json = await fs.readFile(filePath);
    const {products} = JSON.parse(json + '');

    if (products.length === 0)
        return {notFound: true}

    if (!products.length)
        return {
            redirect: {
                destination: 'no-data'
            }
        }


    return {
        props: {
            products
        },
        revalidate: 600
    }

}

export default HomePage;
