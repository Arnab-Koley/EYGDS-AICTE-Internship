import { LuAlarmSmoke } from "react-icons/lu";
import { BiFirstAid } from "react-icons/bi";
import { LuFireExtinguisher } from "react-icons/lu";
import { GiTargeted } from "react-icons/gi";

const safetyItemsData = [
  {
    icon: LuAlarmSmoke,
    label: "Smoke Alarm",
    description: "Smoke detectors installed throughout the property.",
  },
  {
    icon: BiFirstAid,
    label: "First Aid Kit",
    description: "First aid kit available for emergencies.",
  },
  {
    icon: LuFireExtinguisher,
    label: "Fire Extinguisher",
    description: "Fire extinguisher located in the kitchen.",
  },
  {
    icon: GiTargeted,
    label: "Carbon Monoxide Alarm",
    description: "Carbon monoxide detectors installed for safety.",
  },
];

export default safetyItemsData;
