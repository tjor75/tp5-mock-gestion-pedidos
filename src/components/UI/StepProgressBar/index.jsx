import "./StepProgressBar.css";

export default function StepProgressBar({ step, enumObject }) {
    return (
        <div className="step-progress">
            <div className="step-progress-container">
                <div className="step-progress-active-line" style={{ width: (step * 100 / enumObject.length) + "%" }}></div>
                {Object.keys(enumObject).map((key) => (
                    <div className={"step" + (step >= enumObject[key] ? " active" : "")} key={key}>
                        <div className="step-circle">{enumObject[key] + 1}</div>
                        <div className="step-label">{key}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}