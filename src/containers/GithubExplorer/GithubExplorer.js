import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Col from "../../components/Col";
import CommitList from "../../components/CommitList";
import Input from "../../components/Input";
import RepoList from "../../components/RepoList";
import Row from "../../components/Row";
import { fetchCommits, fetchRepos } from "../../services/github";
import { addCommits, addRepos, loadingRepos, loadingCommits, repoClicked } from "../../store/reducers/githubReducer";


const Container = styled.div`
  max-width: 1200px;
  padding: 40px 20px;
  margin: 0 auto;
`;

const Form = styled.form`
  > input[type="text"] {
    min-width: 300px;
    margin-right: 10px;
  }
`;

const Content = styled.div`
  margin-top: 30px;
  .repos-title, .commits-title {
    font-size: 1em;
    font-weight: normal;
    margin: 0 0 10px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
`;

const LeftSidebar = styled(Col)`
  width: 330px;
  flex: none;
`;

const MainContent = styled(Col)`

`;

const GithubExplorer = () => {
  const [org, setOrg] = useState('');
  const [currentRepo, setCurrentRepo] = useState();
  const dispatch = useDispatch();
  const github = useSelector(state => state.github);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loadingRepos());
    const repos = await fetchRepos(org);
    repos.sort((a, b) => b.forks_count - a.forks_count);
    dispatch(addRepos({
      org,
      repos
    }));
    setCurrentRepo(repos.length ? repos[0].name : '');
  }
  const onChange = (e) => {
    setOrg(e.target.value);
  }
  const handleRepoClick = async (repo) => {
    setCurrentRepo(repo.name);
    dispatch(repoClicked(repo.name));
  }

  useEffect(() => {
    const effect = async () => {
      if (currentRepo) {
        const { list } = github.commits;
        dispatch(loadingCommits());
        let sha;
        if (list.length) {
          sha = list[list.length - 1].sha;
        }
        const payload = await fetchCommits(github.org, currentRepo, sha);
        dispatch(addCommits({
          ...payload,
          repo: currentRepo
        }));
      }
    }
    effect();
  }, [currentRepo])

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input type="text" onChange={onChange} name="org" placeholder="Organization Name" />
        <Button>Get Repositories</Button>
      </Form>
      <Content>
        {github.org
          ? (
            <Row>
              <LeftSidebar>
                <Card>
                  <h2 className="repos-title">Showing Top {github.repos.list.length} Repositories</h2>
                  <RepoList data={github.repos.list} repoClick={handleRepoClick} current={currentRepo} />
                </Card>
              </LeftSidebar>
              <MainContent>
                <Card>
                  <h2 className="commits-title">Latest Commits</h2>
                  <CommitList data={github.commits.list} />
                </Card>
              </MainContent>
            </Row>
          )
          : <Card>You have not selected any organization.</Card>
        }
      </Content>

    </Container>
  );
}

export default GithubExplorer;
