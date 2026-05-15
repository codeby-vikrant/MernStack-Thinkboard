import React from "react";
import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold font-mono">No Notes Yet</h3>
      <p className="text-base-content/70 font-mono">
        Ready To Oraganize Your Thoughts? Create Your First Note To Get Started
        On Your Journey
      </p>
      <Link to="/create" className="btn btn-primary font-mono">
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
