import CommitItem from "./CommitItem";

const CommitList = ({ data }) => {
  return (
    data.map(item => {
      const title = item.commit.message.split('\n')[0];
      return (
        <CommitItem key={item.sha}>
          <h2 className="commit-title">
            <a target="_blank" href={item.html_url}>{title}</a>
          </h2>
          <div className="commit-footer">
            {item.author &&
              <>
                <img className="user-avatar" src={item.author.avatar_url} />
                {' '}
                <a target="_blank" href={item.author.url}>{item.author.login}</a>
                {' '}
                committed
              </>
            }
          </div>
        </CommitItem>
      );
    })
  );
}

export default CommitList;
