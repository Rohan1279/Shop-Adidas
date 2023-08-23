import Carousel from "../../../components/Carousal/Carousal";
import { dataLoader } from "../../../utils/dataLoader";

const ExtraSection = () => {
  const { products } = dataLoader();
  const qualityAndComfortProducts = products?.filter(
    (product) => product?.category === "Outdoor & Hiking"
  );
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
          <Carousel data={qualityAndComfortProducts} />
        )}
      </div>
    </div>
  );
};

export default ExtraSection;
