"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Building2, Navigation, Sparkles } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { AVAILABLE_CENTRES, CentreData } from "@/data/demoData";
import { PageHeader } from "@/components/PageHeader";
import { CentreCard } from "@/components/CentreCard";

export default function CentreDiscoveryPage() {
  const router = useRouter();
  const { state, selectCentre, t } = useDemo();

  const handleSelectCentre = (centre: CentreData) => {
    selectCentre(centre.name, centre.distance);
    router.push("/slots");
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <PageHeader
        title="Find Procurement Centre"
        subtitle="Step 2 of 4: Smart allocation based on real-time mandi capacity"
        showBack
        backHref="/crop"
      />

      <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Algorithmic Recommendation Engine:</strong>
          <p className="mt-0.5 leading-normal">
            Centres are ranked by proximity distance, active queue depth, counter throughput, and open capacity slots to eliminate physical crowding.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {AVAILABLE_CENTRES.map((centre) => (
          <CentreCard
            key={centre.id}
            centre={centre}
            isSelected={state.centre === centre.name}
            onSelect={handleSelectCentre}
          />
        ))}
      </div>
    </div>
  );
}
