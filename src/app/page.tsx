import MainContact from "@/components/main-contact";
import Navbar from "@/components/navbar";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const currentPage = Number(searchParams?.page) || 1;
  
  return (
    <main className="w-11/12 md:w-8/12 mx-auto md:p-10">
      <h1 className="text-4xl font-bold text-center mb-10">M - Contact</h1>
      <Navbar user={user} />
      <MainContact user={user} currentPage={currentPage} />
    </main>
  );
}
