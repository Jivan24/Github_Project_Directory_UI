import styled from "styled-components";

const CommitItem = styled.div`
  padding: 10px 8px;
  border-bottom: 1px solid #f0f0f0;

  .commit-title {
    font-size: 1em;
    margin: 0 0 5px;
  }
  .commit-footer {
    display: flex;
    align-items:center;
  }
  .user-avatar { 
    width: 20px;
    height: 20px;
    border-radius: 12px;
    margin-right: 5px;
  }
  a {
    color: #333;
    text-decoration: none;
    margin-right: 5px;
  }
`;

export default CommitItem;
