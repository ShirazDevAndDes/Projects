import Layout from "../layout/Layout";
import OrderMenu from "../components/orderMenu";

Menu.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Menu() {
  return <OrderMenu />;
}
