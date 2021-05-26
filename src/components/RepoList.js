import RepoItem from "./RepoItem";

const RepoList = ({ data, repoClick, current }) => {
  console.log(data);
  return (
    data.map(repo => (
      <RepoItem
        key={repo.id}
        onClick={() => repoClick(repo)}
        className={`${repo.name === current ? 'selected' : ''}`}
      >
        <h3>{repo.name}</h3>
        <span>Forks:</span> <strong>{repo.forks_count}</strong>
      </RepoItem>
    ))
  );
}

export default RepoList;
