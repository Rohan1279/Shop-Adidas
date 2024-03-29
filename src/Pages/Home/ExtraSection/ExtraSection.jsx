import Carousel from "../../../components/Carousal/Carousal";
import { dataLoader } from "../../../utils/dataLoader";

const ExtraSection = () => {
  const { products } = dataLoader();
  const qualityAndComfortProducts = products
    ?.filter((product) => product?.category === "Outdoor & Hiking")
    .slice(1, 12);
  console.log("====================================");
  console.log(qualityAndComfortProducts);
  console.log("====================================");

  return (
    <div className="mt-12 ">
      <h2 className="mb-4 w-full text-right text-3xl font-extrabold text-[#333533] drop-shadow-2xl sm:text-5xl">
        Quality & Comfort
      </h2>
      <div className="">
        {qualityAndComfortProducts && (
          <Carousel
            data={qualityAndComfortProducts}
            animationDuration={500}
            // autoplay={false}
            gap={10}
            perView={4}
            rewind={true}
            // focusAt={"center"}
          />
        )}
      </div>
    </div>
  );
};

export default ExtraSection;
