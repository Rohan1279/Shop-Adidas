import React from "react";
import Carousel from "../../../components/Carousal/Carousal";

function Featured() {
  const {
    data: featuredProducts = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/featured`).then((res) =>
        res.json()
      ),
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
  });
  return (
    <div>
      <h1>Featured</h1>
      <Carousel data={featuredProducts} />
    </div>
  );
}

export default Featured;
