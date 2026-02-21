const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

import type {
  Candidate,
  Job,
  ApplyToJobPayload,
} from "../types";

export const getCandidateByEmail = async (
  email: string
): Promise<Candidate> => {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error fetching candidate");
  }

  return response.json();
};

export const getJobs = async (): Promise<Job[]> => {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error fetching jobs");
  }

  return response.json();
};

export const applyToJob = async (
  payload: ApplyToJobPayload
): Promise<{ ok: boolean }> => {
  const response = await fetch(
    `${BASE_URL}/api/candidate/apply-to-job`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error applying to job");
  }

  return response.json();
};