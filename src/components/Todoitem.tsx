export default function TodoItem({ task }: TodoItemProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(TasksDispatchContext);
  const router = useRouter();

  function handleEditClick(e: React.FormEvent) {
    e.preventDefault();
    setIsEditing(true);
  }

  function handleSaveClick(e: React.FormEvent) {
    e.preventDefault();
    setIsEditing(false);
    dispatch({
      type: "edited",
      task: {
        ...task,
        title: newTitle,
      },
    });
  }

  function handleChange(e: React.FormEvent) {
    e.preventDefault();
    const title = e.target.title.value;
    setNewTitle(title);
  }

  return (
    <div className="flex">
      <input
        id={task.id}
        type="checkbox"
        className="cursor-pointer peer"
        checked={task.complete}
        onChange={(e) =>
          dispatch({
            type: "changed",
            task: {
              ...task,
              complete: e.target.checked,
            },
          })
        }
      />

      <label
        htmlFor={task.id}
        className="group relative cursor-pointer peer-checked:line-through"
      >
        {isEditing ? (
          <form onSubmit={handleSaveClick}>
            <input
              type="text"
              name="title"
              value={newTitle}
              onChange={handleChange}
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          task.title
        )}
      </label>

      {isEditing ? null : (
        <button onClick={handleEditClick}>Edit</button>
      )}

      <div className="group relative focus: text-slate-400 hover:text-red-500">
        <button
          onClick={() =>
            dispatch({
              type: "deleted",
              id: task.id,
            })
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}