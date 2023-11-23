import {
  AiOutlineHome,
  AiOutlineCompass,
  AiFillCompass,
  AiOutlineHeart,
  AiFillHome,
  AiFillHeart,
  AiFillMessage,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlinePlusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

export const mainu = [
  {
    title: "Home",
    name: "홈",
    url: "/",
    icon: <AiOutlineHome className="text-2xl mr-5" />,
    activeIcon: <AiFillHome className="text-2xl mr-5" />,
  },
  {
    title: "Search",
    name: "검색",
    icon: <AiOutlineSearch className="text-2xl mr-5" />,
    activeIcon: <AiOutlineSearch className="text-2xl mr-5" />,
  },
  {
    title: "Explore",
    name: "탐색 탭",
    icon: <AiOutlineCompass className="text-2xl mr-5" />,
    activeIcon: <AiFillCompass className="text-2xl mr-5" />,
  },
  {
    title: "Reels",
    name: "릴스",
    icon: <RiVideoLine className="text-2xl mr-5" />,
    activeIcon: <RiVideoFill className="text-2xl mr-5" />,
  },
  {
    title: "Message",
    name: "메시지",
    icon: <AiOutlineMessage className="text-2xl mr-5" />,
    activeIcon: <AiFillMessage className="text-2xl mr-5" />,
  },
  {
    title: "Notifiaction",
    name: "알림",
    icon: <AiOutlineHeart className="text-2xl mr-5" />,
    activeIcon: <AiFillHeart className="text-2xl mr-5" />,
  },
  {
    title: "Create",
    name: "만들기",
    icon: <AiOutlinePlusCircle className="text-2xl mr-5" />,
    activeIcon: <AiFillPlusCircle className="text-2xl mr-5" />,
  },
  {
    title: "Profile",
    name: "프로필",
    url: "/username",
    icon: <CgProfile className="text-2xl mr-5" />,
    activeIcon: <CgProfile className="text-2xl mr-5" />,
  },
];
