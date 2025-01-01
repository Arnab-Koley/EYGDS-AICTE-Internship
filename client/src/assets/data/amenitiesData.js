import { IoWifi } from "react-icons/io5";
import { FaTv } from "react-icons/fa6";
import { PiOven } from "react-icons/pi";
import { LuWashingMachine } from "react-icons/lu";
import { FaCar } from "react-icons/fa";
import { LuParkingMeter } from "react-icons/lu";
import { TbAirConditioning } from "react-icons/tb";
import { BsPersonWorkspace } from "react-icons/bs";

const amenitiesData = [
  {
    icon: IoWifi,
    label: "Wifi",
    description: "Wireless internet available throughout the property.",
  },
  {
    icon: FaTv,
    label: "TV",
    description: "A television with basic and premium channels.",
  },
  {
    icon: PiOven,
    label: "Kitchen",
    description: "Fully equipped kitchen with necessary appliances.",
  },
  {
    icon: LuWashingMachine,
    label: "Washer",
    description: "Washing machine available for use.",
  },
  {
    icon: FaCar,
    label: "Free Parking",
    description: "Complimentary parking available on the premises.",
  },
  {
    icon: LuParkingMeter,
    label: "Paid Parking",
    description: "Paid parking is available nearby.",
  },
  {
    icon: TbAirConditioning,
    label: "AC",
    description: "Air conditioning available in all rooms.",
  },
  {
    icon: BsPersonWorkspace,
    label: "Workspace",
    description: "Dedicated workspace with a desk and chair.",
  },
];

export default amenitiesData;

