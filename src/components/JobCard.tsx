import { useState } from "react";
import type { Job, Candidate } from "../types";
import { applyToJob } from "../services/api";

interface JobCardProps {
  job: Job;
  candidate: Candidate;
}

export default function JobCard({ job, candidate }: JobCardProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
     if (!repoUrl.startsWith("https://github.com/")) {
    setError("Please enter a valid GitHub repository URL.");
    return;
  }
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl,
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        {job.title}
      </h2>
      <input
        type="text"
        placeholder="https://github.com/tu-usuario/tu-repo"
        value={repoUrl}
        onChange={(e) => {setRepoUrl(e.target.value); 
            setError(null)}}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !repoUrl || success}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      {success && (
        <p className="text-green-600 text-sm">
          Application submitted successfully ✅
        </p>
      )}
      {error && (
        <p className="text-red-600 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}