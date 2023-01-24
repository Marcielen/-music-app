import InfiniteScroll from "react-infinite-scroll-component";

export const VirtualizedInfinite = () => {
  const state = [
    {
      item: "1",
    },
    {
      item: "1",
    },
    {
      item: "1",
    },
    {
      item: "1",
    },
    {
      item: "1",
    },
  ];

  return (
    <InfiniteScroll
      dataLength={10}
      next={() => {}}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {state.map((_, index) => (
        <div key={index}>div - #{index}</div>
      ))}
    </InfiniteScroll>
  );
};
