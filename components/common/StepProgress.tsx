
type stepProgressProps = { currentStep: number, stepList: string[] };

const StepProgress: React.FC<stepProgressProps> = (props) => {
    return (
        <div id="steps">
            {
                props.stepList.map((x: string, i: number) => {
                    return (
                        <div className={`step ${(props.currentStep > (i)) ? "active" : ""}`} key={i} data-desc={x}>
                            {i + 1}
                        </div>
                    );
                })
            }
        </div>
    );
}

export default StepProgress;
