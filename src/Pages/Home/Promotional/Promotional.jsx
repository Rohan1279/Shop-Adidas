import Carousel from "../../../components/Carousal/Carousal";
import { dataLoader } from "../../../utils/dataLoader";

const Promotional = () => {
  const { products } = dataLoader();
  const promotionalProducts = products
    ?.filter((product) => product?.category === "Outdoor & Hiking")
    .slice(1, 5);
  console.log("====================================");
  console.log(promotionalProducts);
  console.log("====================================");

  return (
    <div className="mt-12 ">
      <h2 className="mb-4 w-full text-right text-3xl font-extrabold text-[#333533] drop-shadow-2xl sm:text-5xl">
        Promotional
      </h2>
      <div className="">
        {promotionalProducts && (
          <Carousel
            data={promotionalProducts}
            animationDuration={3000}
            autoplay={true}
            rewind={true}
            perView={1}
          />
        )}
      </div>
    </div>
  );
};

export default Promotional;
