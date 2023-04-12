import { faHome, faBuilding, faTree, faCheckDouble } from '@fortawesome/free-solid-svg-icons';

export const CATEGORIES = [
  {
    id: 1,
    icon: faCheckDouble,
    title: "All",
    active: false,
    route: "/all"
  },
  {
    id: 2,
    icon: faHome,
    title: "Family house",
    active: false,
    route: "/family-house"
  },
  {
    id: 3,
    icon: faBuilding,
    title: "Apartment",
    active: false,
    route: "/apartment"
  },
  {
    id: 4,
    icon: faTree,
    title: "Land",
    active: false,
    route: "/land"
  },
]