import styled from "styled-components";

const RepoItem = styled.div`
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  
  > h3 {
    margin: 0 0 5px;
    font-size: 1.5em;
    font-weight: bold;
  }

  &.selected, &:hover {
    background: #e3e9f7;
  }
`;

export default RepoItem;
