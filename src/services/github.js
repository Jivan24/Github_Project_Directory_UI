import axios from "./axios";

export const fetchRepos = async (orgName) => {
  const per_page = 20;
  const { data } = await axios.get(`https://api.github.com/orgs/${orgName}/repos`, { params: { per_page } });
  return data;
}

export const fetchCommits = async (orgName, repoName, sha) => {
  const per_page = 20;
  const { data } = await axios.get(`https://api.github.com/repos/${orgName}/${repoName}/commits`, { params: { sha, per_page } });
  return {
    commits: data,
    hasMore: data.length === per_page
  }
}