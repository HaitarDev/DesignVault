"use client";

import Modal from "../ui/modal";
import { Bookmark, ListCollapse } from "lucide-react";
import LoginForm from "../login/login-form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

import { Separator } from "../ui/separator";
import { createClient, getUserClient } from "@/utils/supabase/client";
import { CollectionWithDesigns } from "@/types/database";
import DesignBookmarkTitle from "./design-form-title-bookmark";
import { insertDesignCollection } from "@/actions/designs/action";

function DesignBookmarkBttn({ designId }: { designId: string }) {
  const [user, setUser] = useState<User | null>();
  const [collections, setCollections] = useState<CollectionWithDesigns[]>();
  const [rerenderUseEffect, setRerenderUseEffect] = useState<number>(0);
  const [collectionId, setCollectionId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();

  const findCollectionIdAtFirstRender = (data: CollectionWithDesigns[]) => {
    const collection = data.find((collection) => {
      return collection.collection_designs.filter(
        (design) => design.design_id === designId
      );
    });
    if (!collection) return;
    setCollectionId(collection.id);
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserClient();
      if (!user) return;
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getCollections = async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*, collection_designs(*)");
      if (error) throw new Error(error.message);
      setCollections(data);
      findCollectionIdAtFirstRender(data);
    };
    getCollections();
  }, [setCollections, rerenderUseEffect, supabase]);

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
        <DesignBookmarkTitle setRerenderUseEffect={setRerenderUseEffect} />
        <Separator />

        <div>
          <h5 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4">
            Choose Collection:
          </h5>
          <div>
            <div className="flex gap-1 flex-col">
              {collections?.map((collection) => (
                <div key={collection.id} className="flex items-center">
                  <input
                    onChange={async (e) => {
                      setLoading(true);
                      try {
                        const collectionId = e.target.value;
                        if (!collectionId) return;
                        setCollectionId(collectionId);
                        await insertDesignCollection(designId, collectionId);
                        setRerenderUseEffect((prev) => prev + 1);
                      } finally {
                        setLoading(false);
                      }
                    }}
                    value={collection.id}
                    checked={collectionId === collection.id}
                    className="peer"
                    type="radio"
                    hidden
                    id={collection.id}
                    disabled={loading}
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
              ))}
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
