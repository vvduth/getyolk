"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import {api} from "../../convex/_generated/api"
import { useState } from "react";


import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppleIcon, CalendarIcon, DumbbellIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProfilePage = () => {

  const { user } = useUser();
  const userId = user?.id as string;

  const allPlans = useQuery(api.plans.getUserPlans, { userId });
  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null);

  const activePlan = allPlans?.find((plan) => plan.isActive);
  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
      Header 
    </section>
  )
}

export default ProfilePage