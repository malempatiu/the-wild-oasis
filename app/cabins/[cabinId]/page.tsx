import { Cabin } from "@/app/_components/Cabin";
import { Reservation } from "@/app/_components/Reservation";
import { Spinner } from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";


type Props = {
  params: Promise<{ cabinId: string }>
}

// For dynamic SEO titles
export const generateMetadata = async ({ params }: Props) =>{
  const { cabinId } = await params;
  const { name } = await getCabin(parseInt(cabinId));
  return { title: `Cabin ${name}` };
}

// Generate static params for all cabins to enable static generation
export const generateStaticParams = async () => {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({ cabinId: cabin.id.toString() }));
};

// Main page component for displaying individual cabin details
const Page = async ({ params }: Props) =>{
  const { cabinId } = await params;
  const cabin = await getCabin(parseInt(cabinId));

  return (
    <div className='max-w-7xl mx-auto mt-8'>
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;