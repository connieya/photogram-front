import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";

export const tabs = [
  {
    tab: "Post",
    icon: <AiOutlineTable />,
    activeTab: "",
  },
  {
    tab: "Reelds",
    icon: <RiVideoAddLine />,
    activeTab: "",
  },
  {
    tab: "Saved",
    icon: <BiBookmark />,
    activeTab: "",
  },
  {
    tab: "Tagged",
    icon: <BiBookmark />,
    activeTab: <AiOutlineUser />,
  },
];
