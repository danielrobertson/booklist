import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";

// Mock data for existing user lists
const userLists = [
  { id: 1, name: "Smut 🧚" },
  { id: 2, name: "Self help" },
  { id: 3, name: "Books I want to read" },
  { id: 4, name: "Reading List" },
];

export function AddToListDrawer({ trigger }: { trigger: React.ReactNode }) {
  const [selectedLists, setSelectedLists] = React.useState<number[]>([]);

  const handleListSelection = (listId: number) => {
    setSelectedLists((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  function handleAddToList(): void {
    console.log("🚀 ~ AddToListDrawer ~ selectedLists:", selectedLists);
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add to List</DrawerTitle>
            <DrawerDescription>
              Choose lists to add this item to.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <Button className="w-full mb-4">
              <Plus className="mr-2 h-4 w-4" /> New List
            </Button>
            <Separator className="my-4" />
            <div className="space-y-4">
              {userLists.map((list) => (
                <div key={list.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`list-${list.id}`}
                    checked={selectedLists.includes(list.id)}
                    onCheckedChange={() => handleListSelection(list.id)}
                  />
                  <label
                    htmlFor={`list-${list.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {list.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={handleAddToList}>Done</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline" onClick={() => setSelectedLists([])}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
