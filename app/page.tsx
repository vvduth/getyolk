import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    Home
    <SignedOut>
      <SignInButton/>
    </SignedOut>
    <SignedIn>
    <SignOutButton/>
    </SignedIn>
   </div>
  );
}
