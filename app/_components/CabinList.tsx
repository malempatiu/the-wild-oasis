import { getCabins } from "@/app/_lib/data-service";
import { CabinCard } from "./CabinCard";
import { unstable_noStore as noStore} from "next/cache";

const CabinList = async ({filter}:{filter: string}) => {
  // Disable caching for dynamic data fetching (PPR)
  // noStore();
  const cabins = await getCabins();

  if (!cabins.length) return null;

  const displayedCabins = filter === "all" ? cabins : 
    filter === "small" ? cabins.filter((cabin) => cabin.maxCapacity <= 3)
    : filter === "medium"
    ? cabins.filter((cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7)
    : filter === "large"
    ? cabins.filter((cabin) => cabin.maxCapacity >= 8)
    : cabins;
  
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export {CabinList}