import { useEffect, useState } from "react";
import type { Candidate, Job } from "../../types";
import { getCandidateByEmail, getJobs } from "../../services/api";

interface UseJobsResult {
  candidate: Candidate | null;
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

export function useJobs(email: string): UseJobsResult {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const candidateData = await getCandidateByEmail(email);
        const jobsData = await getJobs();
        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (err: any) { setError(err.message);} finally {setLoading(false);}
    };
    fetchData();
  }, [email]);

  return { candidate, jobs, loading, error };
}