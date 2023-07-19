import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState, type MouseEvent, startTransition } from "react";
import { type Tab } from "@/types/Tab";
import {
  DragDropContext,
  Draggable,
  type DropResult,
} from "react-beautiful-dnd";
import { StrictModeDroppable } from "../utils/droppable";
import { api } from "@/utils/api";

type TabListProps = {
  tabList: Tab[];

  newTab: () => void;
  isCurrentTab: (id: string) => boolean;
  removeTab: (id: string) => (e: MouseEvent<HTMLButtonElement>) => void;
  setTab: (id: string) => () => void;
};

export default function TabList({
  tabList,

  newTab,
  removeTab,
  isCurrentTab,
  setTab,
}: TabListProps) {
  const [itemList, setItemList] = useState(tabList);
  const { mutate: reorderTab } = api.tab.reorderTab.useMutation();

  if (itemList.length !== tabList.length) setItemList(tabList);

  const handleDrop = (droppedItem: DropResult) => {
    if (!droppedItem.destination) return;

    const updatedList = [...itemList];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem as Tab);
    setItemList(updatedList);

    startTransition(() => {
      reorderTab({
        tabList: updatedList.map(({ id }, index) => ({ id, order: index })),
      });
    });
  };

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <StrictModeDroppable direction="horizontal" droppableId="nav">
        {({ droppableProps, innerRef, placeholder }) => (
          <nav
            {...droppableProps}
            className="hide-scrollbar tabs w-full flex-nowrap overflow-x-auto"
            ref={innerRef}
          >
            {itemList.map(({ title, id }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <div
                      tabIndex={0}
                      role="button"
                      key={id}
                      onClick={setTab(id)}
                      className={[
                        "item-container tab tab-bordered min-w-[200px] flex-1 flex-nowrap justify-between gap-2",
                        tabList.length === 1 || isCurrentTab(id)
                          ? "tab-active"
                          : "",
                      ].join(" ")}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <span className="truncate">{title || "무제"}</span>

                      {tabList.length > 1 && (
                        <button
                          className="btn btn-square btn-ghost btn-xs"
                          onClick={(e) => void removeTab(id)(e)}
                        >
                          <FaXmark />
                        </button>
                      )}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {placeholder}

            <button
              className="btn btn-square btn-ghost btn-sm ml-2"
              onClick={() => void newTab()}
            >
              <FaPlus />
            </button>
          </nav>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
