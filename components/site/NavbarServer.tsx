import { getMenu } from "@/lib/wordpress";
import { ClinicNavbar } from "./ClinicNavbar";

export async function NavbarServer() {
  const menuItems = await getMenu("primary").catch(() => []);
  return <ClinicNavbar initialMenuItems={menuItems} />;
}
