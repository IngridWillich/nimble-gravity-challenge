import type { Job, Candidate } from "../types";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: Job[];
  candidate: Candidate;
}

export default function JobList({ jobs, candidate }: JobListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          candidate={candidate}
        />
      ))}
    </div>
  );
}