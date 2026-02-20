import { FolderArchive, Star, Trash } from "lucide-react";

const AdditionalFolder = () => {
  return (
    <div className="flex-end">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 text-xs font-semibold tracking-wider">
          More
        </h3>
      </div>
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2">
          <span>
            <Star />
          </span>
          Favorite
        </li>
        <li className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2">
          <span>
            <Trash />
          </span>
          Trash
        </li>
        <li className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2">
          <span>
            <FolderArchive />
          </span>
          Favorite
        </li>
      </ul>
    </div>
  );
};

export default AdditionalFolder;
