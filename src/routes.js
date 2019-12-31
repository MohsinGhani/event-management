// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import MyVenues from "views/Dashboard/MyVenues.jsx";
import MyBookingItems from "views/Dashboard/MyBookingItems.js";
import PendingVenuesStatus from "views/Dashboard/PendingVenuesStatus.js";
import ArchiveVenues from "views/Dashboard/ArchiveVenues.js";
import PendingBookingItems from "./views/Dashboard/PendingBookingItems";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import List from "@material-ui/icons/List";
import BookingList from "@material-ui/icons/Event";
import Feedback from "@material-ui/icons/Feedback";
import Archive from "@material-ui/icons/Archive";
import PendingBooking from "@material-ui/icons/Announcement";
import ApproveBookingItems from "./views/Dashboard/ApproveBookingItems";

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/my-venues",
    name: "My Venues",
    icon: List,
    component: MyVenues,
    layout: "/admin"
  },
  {
    path: "/archive-venues",
    name: "Archive Venues",
    icon: Archive,
    component: ArchiveVenues,
    layout: "/admin"
  },
  {
    path: "/pending-booking-item",
    name: "Pending Booking Item",
    icon: PendingBooking,
    component: PendingBookingItems,
    layout: "/admin"
  },
  {
    path: "/approve-booking-item",
    name: "Approve Booking Item",
    icon: PendingBooking,
    component: ApproveBookingItems,
    layout: "/admin"
  },
  {
    path: "/my-booking-item",
    name: "My Booking Item",
    icon: BookingList,
    component: MyBookingItems,
    layout: "/admin"
  },
  {
    path: "/pending-venue-status",
    name: "Pending Venue Status",
    icon: Feedback,
    component: PendingVenuesStatus,
    layout: "/admin"
  },
  
  // {
  //   path: "/table",
  //   name: "Manage Orders",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },

  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
