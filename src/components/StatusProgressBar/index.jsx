import { Status } from "../../constants/status";
import StepProgressBar from "../UI/StepProgressBar";

export default function StatusProgressBar({ currentStatus }) {
    return <StepProgressBar step={currentStatus} enumObject={Status} />
}