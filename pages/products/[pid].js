import {Fragment} from "react";
import path from "path";
import fs from "fs/promises";

export default function ProductDetailPage(props) {
    const {loadedProduct: {title, description}} = props;

    // if(!loadedProduct) return <p>Loding...</p>

    return <Fragment>
        <h1>{title}</h1><p>{description}</p>
    </Fragment>
};


async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const json = await fs.readFile(filePath);
    const {products} = JSON.parse(json + '');
    return products;
}

export async function getStaticProps(context) {
    const {params: {pid: productId}} = context;

    const products = await getData()

    const loadedProduct = products.find(d => d.id === productId);

    if(!loadedProduct) return { notFound:true }

    return {
        props: {loadedProduct}
    }
}

export async function getStaticPaths() {
    const products = await getData()

    const paths = products
        .map(d => ({params: {pid: d.id}}));

    return {
        paths, fallback: false,
    }
}
