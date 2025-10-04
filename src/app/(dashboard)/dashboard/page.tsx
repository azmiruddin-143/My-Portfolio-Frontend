import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";

const DashboardHomePage = async () => {

  const session = await getServerSession(authOptions)

  console.log(session);
  return (
    <div>
      <h1>Dashboard Home Page</h1>
      <h1 className='text-5xl '>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
    </div>
  );
};

export default DashboardHomePage;
