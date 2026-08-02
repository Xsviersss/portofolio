import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/session";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function DashboardLayout({ children }) {
  // Middleware already guards this, but a page-level check means this area
  // stays safe even if the middleware matcher is ever changed.
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <Sidebar />
      <main className="max-w-3xl flex-1 px-6 py-10 sm:px-10">{children}</main>
    </div>
  );
}
