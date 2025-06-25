import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
    disabled?: boolean;
    }

export const SearchInput = ({ disabled}:Props) => {
    return(
<div className="flex items-center gap-2 w-full">
    <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500"/>
        <Input className="pl-8" placeholder="Search products" disabled={disabled}/>
    </div>
    {/*TODO: Add Categories view all button*/}
    {/*TODO: Add library button*/}
</div>
    );
};