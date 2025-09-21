import "./Form.css";

export default function Form({ children, onChange=null, onSubmit=null }) {
    return (
        <form
            onChange={(e) => {
                e.preventDefault();
                if (onChange) onChange(e);
            }}
            onSubmit={(e) => {
                e.preventDefault();
                if (onSubmit) onSubmit(e);
            }}
        >
            {children}
        </form>
    );
}