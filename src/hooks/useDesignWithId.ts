"use client";

import { Designs } from "@/types/database";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export const useDesignWithId = (designId: string) => {
  const [design, setDesign] = useState<Designs>();
  useEffect(() => {
    const getDesign = async () => {
      const { error, data } = await createClient()
        .from("designs")
        .select("*")
        .eq("id", designId)
        .single();

      if (error) return;
      setDesign(data);
    };
    getDesign();
  }, [designId]);

  return design;
};
