import Head from "next/head";
import Link from "next/link";
import Layout from "../layout/Layout";
import OrderMenu from "../components/orderMenu";
// import * as bootstrap from "bootstrap";

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>Restaurant App</title>
        <meta name="description" content="Restaurant App Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-orange text-white p-5 header">
        <div className="row">
          <div className="col-7 pt-4">
            <h1 className="display-4 fw-bold">Creative Restaurant</h1>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              earum consequuntur, voluptatibus officia beatae, corrupti
              voluptate cumque quisquam asperiores voluptas ex! Quisquam,
              veritatis ipsa? Dicta eligendi id hic aperiam similique.
            </p>
            <Link href="/menu">
              <a className="btn btn-orange btn-lg" role="button">
                Check our menu
              </a>
            </Link>
          </div>
          <div className="col-5">
            <img src="/pizza-1.png" className="img-fluid rounded-start" />
          </div>
        </div>
      </div>

      <OrderMenu />

      <div className="bg-black text-white p-5 text-center">
        <h2 className="display-4 py-2">Contact Us</h2>
        <button className="btn btn-orange btn-lg">021-000-000</button>
      </div>
    </div>
  );
}
