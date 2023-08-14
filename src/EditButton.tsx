type EditButtonProps = {
  onToggle: () => void;
};

const EditButton = ({ onToggle }: EditButtonProps) => {
  return (
    <div className="flex justify-end mb-4">
      <button
        className="inline-block bg-zinc-400 hover:bg-zinc-500 text-white px-2 py-1 rounded text-sm"
        onClick={onToggle}
      >
        Edit
      </button>
    </div>
  );
};

export default EditButton;
