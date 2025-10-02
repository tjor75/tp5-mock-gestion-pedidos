import "./Modal.css";

export default function Modal({ title, children, open, setOpen, onClose=null }) {
    const onCloseAction = (e) => {
        e.stopPropagation();
        if (onClose) onClose();
        setOpen(!open);
    };

    return (
        <div className="modal" onClick={onCloseAction} style={{ display: open ? "block" : "none" }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="modal-close" onClick={onCloseAction}>&times;</span>
                <h2 className="modal-title">{title}</h2>
                {children}
            </div>
        </div>
    );
}