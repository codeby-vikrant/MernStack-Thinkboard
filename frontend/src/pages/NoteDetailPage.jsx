import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching notes", error);
        toast.error("Failed To Fetch The Note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const confirmDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting notes", error);
      toast.error("Failed To Delete Note");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please Add a Title Or Content");
      return;
    }
    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note Updated Successfully");
      navigate("/");
    } catch (error) {
      console.log("Unable to save the note", error);
      toast.error("Failed To Save Note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost font-mono">
              <ArrowLeftIcon className="h-5 w-5" />
              Back To Notes
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="btn btn-error btn-outline font-mono"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-mono">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered font-mono"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-mono">Content</span>
                </label>
                <textarea
                  placeholder="Write Your Note Here..."
                  className="textarea textarea-bordered h-32 font-mono"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end mt-2">
                <button
                  className="btn btn-primary font-mono font-extrabold"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Note</h3>
            <p className="py-4">Are you sure you want to delete this note?</p>
            <div className="modal-action">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn btn-sm btn-error">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetailPage;
