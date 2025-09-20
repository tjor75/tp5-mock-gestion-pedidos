export default function Form({ children, onSubmit }) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            {children}
        </form>
    );
}