import DashboardClient from "./DashboardClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import dbConnect from "../../lib/dbConnect";

export default async function Page() {

  const cookieStore = await cookies();   // ✅ must await
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/login");
  }

  await dbConnect();


  // const serializedData = JSON.parse(JSON.stringify(userData));

  return <DashboardClient  />;
}
