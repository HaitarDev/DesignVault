"use client";

import Modal from "../ui/modal";
import { Bookmark, ListCollapse, LoaderPinwheel } from "lucide-react";
import LoginForm from "../login/login-form";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";

import { Separator } from "../ui/separator";
import { createClient } from "@/utils/supabase/client";
import DesignBookmarkTitle from "./design-form-title-bookmark";
import { insertDesignCollection } from "@/actions/designs/action";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function DesignBookmarkBttn({ designId }: { designId: string }) {
  const { data: user } = useUser();
  const [collectionId, setCollectionId] = useState<string>("");
  const supabase = createClient();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (collectionId: string) => {
      try {
        if (!collectionId) return;
        setCollectionId(collectionId);
        await insertDesignCollection(designId, collectionId);
      } catch (err: any) {
        throw new Error(err.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] }),
        queryClient.invalidateQueries({ queryKey: [collectionId] });
    },
  });
  const { data, isLoading: isLoadingCollections } = useQuery({
    queryKey: ["collections", collectionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*, collection_designs(*)")
        .eq("user_id", user ? user?.id : "");
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const handleChangeCollection = async (e: ChangeEvent<HTMLInputElement>) => {
    mutate(e.target.value);
  };

  const render = !user ? (
    <Modal
      title="Login to save a design"
      description="If you have no account go to register page"
      trigger={<Bookmark />}
    >
      <LoginForm />
    </Modal>
  ) : (
    <Modal
      title="Add this Shot to a collection"
      description="saved it to new collection or an old one"
      trigger={<Bookmark />}
    >
      <div className="flex flex-col gap-4">
        <DesignBookmarkTitle />
        <Separator />
        <div>
          <h5 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4">
            Choose Collection:
          </h5>
          <div>
            <div className="flex gap-1 flex-col">
              {isLoadingCollections && (
                <LoaderPinwheel className="animate-spin" />
              )}
              {data?.map((collection) => {
                const coll = collection.collection_designs.find(
                  (design) => design.design_id === designId
                );

                return (
                  <div key={collection.id} className="flex items-center">
                    <input
                      onChange={handleChangeCollection}
                      value={collection.id}
                      checked={
                        collectionId === collection.id ||
                        coll?.collection_id === collection.id
                      }
                      className="peer"
                      type="checkbox"
                      hidden
                      id={collection.id}
                      disabled={isPending}
                    />
                    <label
                      htmlFor={collection.id}
                      className={`w-full h-full justify-start p-4 peer-checked:bg-secondary hover:bg-secondary transition duration-300 ease-in-out rounded-md
                      border peer-disabled:bg-gray-300`}
                    >
                      <div className="flex items-center gap-4">
                        <ListCollapse
                          size={40}
                          className="p-2 bg-secondary rounded-md"
                        />
                        <div>
                          <h5 className="sm:text-lg font-medium">
                            {collection.title}
                          </h5>
                          <p className="text-gray-500 text-xs text-start">
                            {collection.collection_designs.length} shots
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="rounded-full">Save</Button>
        </div>
      </div>
    </Modal>
  );

  return <div>{render}</div>;
}

export default DesignBookmarkBttn;
