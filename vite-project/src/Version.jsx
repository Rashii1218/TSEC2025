import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommitHistory = ({ owner, repo }) => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/commits`, {
          params: { owner, repo },
        });
        setCommits(response.data);
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    fetchCommits();
  }, [owner, repo]);

  return (
    <div>
      <h3>Commit History</h3>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>
            <p>
              <strong>Message:</strong> {commit.commit.message}
            </p>
            <p>
              <strong>Author:</strong> {commit.commit.author.name}
            </p>
            <p>
              <strong>Date:</strong> {new Date(commit.commit.author.date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommitHistory;
