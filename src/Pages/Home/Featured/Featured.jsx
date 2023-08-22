import React, { useContext } from "react";
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
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
  });
  console.log(featuredProducts);
  return (
    <div>
      <h2 className="mb-4 text-3xl text-[#333533] drop-shadow-2xl sm:text-5xl">
        Featured{" "}
      </h2>
      {featuredProducts.length > 0 && <Carousel data={featuredProducts} />}
    </div>
  );
}

export default Featured;