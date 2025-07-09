import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CustomCategory } from "../types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface props{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CustomCategory[];
}


export const CategoriesSidebar = ({open,onOpenChange,data}:props) => {
    const router = useRouter();

    const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CustomCategory | null>(null);
    
    const currentCategories = parentCategories ?? data ?? [];

    const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
    }

    const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
    setParentCategories(category.subcategories as CustomCategory[]);
    setSelectedCategory(category);
    }else {
            if(parentCategories && selectedCategory) {
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            } else {
                if (category.slug === "all") {
                    router.push("/");
                }else {
                    router.push(`/${category.slug}`);
                }
            }

            handleOpenChange(false);
    }
    }
    const handleBackClick = () => {
        if(parentCategories) {
            setParentCategories(null);
            setSelectedCategory(null);
        }
    }
const backgroundColor = selectedCategory?.color || "white";
    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}>
            <SheetHeader className="p-4 border-b">
            <SheetTitle>
                Categories
            </SheetTitle>

            </SheetHeader>
             <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">                
                {parentCategories && (    
                <Button
                    onClick={handleBackClick}
                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center
                text-base font-medium">
                    <ChevronLeftIcon className="size-4 mr-2"/>
                        Back
                </Button>
                )}       
                {currentCategories.map((category) => (
                    <button
                        key={category.slug}
                        onClick={() => handleCategoryClick(category)}
                        className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center
                            text-base font-medium cursor-pointer"  
                        >
                        {category.name}
                        {category.subcategories && category.subcategories.length>0 && (
                            <ChevronRightIcon className="size-4" />
                        )}
                    </button>
                ))}
            </ScrollArea>
        </SheetContent>
        </Sheet>
    )
}