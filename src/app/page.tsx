import Categories from "@/components/categories/Categories";
import Container from "@/components/container/Container";
import Footer from "@/components/footer/Footer";
import LatestArticles from "@/components/latestArticles/LatestArticles";
import LatestProducts from "@/components/latestProducts/LatestProducts";
import ShopBenefits from "@/components/shopBenefits/ShopBenefits";
import Link from "next/link";


export default function Home() {
  
  return (
    <>
      <Container>
        <Categories />
        <LatestProducts />
        <ShopBenefits />
        <LatestArticles />
      </Container>

      

    </>
  );
}
