import JobList from "./components/JobList";
import { useJobs } from "./components/hooks/useJobs";

const EMAIL = "willichingrid@gmail.com";

function App() {
  const { candidate, jobs, loading, error } = useJobs(EMAIL);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading positions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!candidate) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Open Positions
          </h1>
          <p className="text-gray-600">
            Welcome {candidate.firstName} {candidate.lastName}
          </p>
        </div>

        <JobList jobs={jobs} candidate={candidate} />
      </div>
    </div>
  );
}

export default App;