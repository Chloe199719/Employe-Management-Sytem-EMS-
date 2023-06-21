import Guest from "@/components/hero/Guest";
import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
type Props = {};

async function getRole(userId: string) {
  try {
    const res = await prismaClient.user.findUniqueOrThrow({
      where: {
        userID: userId,
      },
      select: {
        role: true,
      },
    });
    return res.role;
  } catch (error) {
    return null;
  }
}

async function page({}: Props) {
  const { userId } = auth();
  const role = await getRole(userId!);
  if (role === "admin") {
    redirect("/dashboard/admin");
  }
  if (role === "user") {
    redirect("/dashboard/user");
  }
  if (role === "guest" || role === null) {
    redirect("/");
  }

  return <div>page</div>;
}
export default page;
