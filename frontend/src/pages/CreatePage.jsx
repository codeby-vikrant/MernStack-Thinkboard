import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All Field Are Required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note Created Successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down, You're creating notes too fast", {
          duration: 4000,
          icon: "🫠",
        });
      } else {
        toast.error("Failed To Create Note");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6 font-mono">
            <ArrowLeftIcon className="size-5" /> Back To Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 font-mono">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-mono">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered font-mono"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-mono">Content</span>
                  </label>
                  <textarea
                    placeholder="Write Your Note Here..."
                    className="textarea textarea-bordered h-32 font-mono"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="card-actions justify-end mt-2">
                    <button
                      type="submit"
                      className="btn btn-primary font-mono"
                      disabled={loading}
                    >
                      {loading ? "Creating" : "Create Note"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
