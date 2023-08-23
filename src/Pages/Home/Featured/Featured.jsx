import React, { useContext, useEffect } from "react";
import Carousel from "../../../components/Carousal/Carousal";
import { useQuery } from "@tanstack/react-query";
import { Context } from "../../../contexts/ContextProvider";

function Featured() {
  const { authInfo } = useContext(Context);
  const { user } = authInfo;
  const {
    data: featuredProducts = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["featured", user?.email],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/featured`).then((res) =>
        res.json()
      ),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  useEffect(() => {
    refetch();
  }, []);
  console.log(featuredProducts);
  return (
    <div className="mt-12 ">
      <h2 className="mb-4 w-full text-3xl font-extrabold text-[#333533] drop-shadow-2xl sm:text-5xl">
        Featured
      </h2>
      <div className="">
        {featuredProducts.length > 0 && (
          <Carousel
            data={featuredProducts}
            animationDuration={4000}
            autoplay={true}
            gap={10}
            perView={3}
            rewind={true}
            focusAt={"center"}
          />
        )}
      </div>
    </div>
  );
}

export default Featured;
