"use client";

interface ModalProps {
  event: { id: number; title: string; start: Date; end: Date };
  onClose: () => void;
  onDelete: () => void;
}

const Modal: React.FC<ModalProps> = ({ event, onClose, onDelete }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          margin: "50px auto",
          padding: 20,
          width: "50%",
          borderRadius: 8,
        }}
      >
        <h2>Detalhes do Evento</h2>
        <p>
          <strong>Título:</strong> {event.title}
        </p>
        <p>
          <strong>Início:</strong> {event.start.toString()}
        </p>
        <p>
          <strong>Fim:</strong> {event.end.toString()}
        </p>
        <button onClick={onClose} style={{ marginRight: 10 }}>
          Fechar
        </button>
        <button
          onClick={onDelete}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Modal;
