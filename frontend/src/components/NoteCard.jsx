import React, { useState } from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
      toast.success("Note Deleted Successfully");
    } catch (error) {
      console.log("Error in deleting the note", error);
      toast.error("Failed To Delete Note");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
        <div className="card-body">
          <Link to={`/note/${note._id}`}>
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          </Link>

          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button
                type="button"
                className="btn btn-ghost btn-xs text-error"
                onClick={() => setShowModal(true)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Note</h3>
            <p className="py-4">Are you sure you want to delete this note?</p>
            <div className="modal-action">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="btn btn-sm btn-error">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;
