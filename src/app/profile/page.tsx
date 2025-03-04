import { Navbar } from "@/app/components/Navbar";
import { ProfileDashboard } from "@/app/components/Profile";

export default function ProfilePage() {
  return (
    <div>
      <Navbar />
      <div className="h-12"></div>
      <ProfileDashboard />
    </div>
  );
}
