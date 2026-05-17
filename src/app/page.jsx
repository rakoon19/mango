import Banner from "@/Components/Banner";
import Marq from "@/Components/Marq";
import FeaturedBooks from "@/Components/FeaturedBooks";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <Banner />
      <Marq />
      <FeaturedBooks />
    </div>
  );
}
