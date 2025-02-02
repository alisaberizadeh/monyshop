import Container from "@/components/container/Container";
import Slider from "@/components/slider/Slider";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <Container>
        <div className="w-full  grid grid-cols-3 gap-5 mt-5">

          <div className="col-span-3 lg:col-span-2"><Slider/></div>

          <div className="col-span-3 lg:col-span-1 grid   grid-rows-2 gap-5">
            <div className="row-span-1 "><Link href=""><img className="w-full rounded-2xl h-full" src="https://marketplace.canva.com/EAE1gjmdjkQ/3/0/1600w/canva-yellow-and-black-super-weekend-sale-banner-qccqCrq6Umg.jpg" alt="" /></Link></div>
            <div className="row-span-1 "><Link href=""><img className="w-full rounded-2xl h-full" src="https://marketplace.canva.com/EAE1gjmdjkQ/3/0/1600w/canva-yellow-and-black-super-weekend-sale-banner-qccqCrq6Umg.jpg" alt="" /></Link></div>
           </div>
        </div>
      </Container>
    </>
  );
}
