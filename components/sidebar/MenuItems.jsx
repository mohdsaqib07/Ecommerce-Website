import {
  IconBoxMultiple, IconPlus, IconHome, IconList, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconEye, IconUser,Click
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/admin",
  },
  {
    id: uniqueId(),
    title: "Add Product",
    icon: IconPlus,
    href: "/admin/add",
  },
  {
    id: uniqueId(),
    title: "View Products",
    icon: IconEye,
    href: "/admin/allproducts",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: IconList,
    href: "/admin/orders",
  },
  {
    id: uniqueId(),
    title: "Images",
    icon: IconPhoto,
    href: "/admin/imageuploader",
  },
 
];

export default Menuitems;
