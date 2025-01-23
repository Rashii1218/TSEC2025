import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectDashboard = ({ owner, repo }) => {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/project-data`, {
          params: { owner, repo },
        });
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [owner, repo]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Project Dashboard</h2>

      {/* Repository Details */}
      <div>
        <h3>Repository Details</h3>
        <p><strong>Name:</strong> {projectData.repo.name}</p>
        <p><strong>Stars:</strong> {projectData.repo.stargazers_count}</p>
        <p><strong>Forks:</strong> {projectData.repo.forks_count}</p>
        <p><strong>Watchers:</strong> {projectData.repo.watchers_count}</p>
      </div>

      {/* Commits */}
      <div>
        <h3>Commit History</h3>
        <ul>
          {projectData.commits.map((commit) => (
            <li key={commit.sha}>
              <p><strong>Message:</strong> {commit.commit.message}</p>
              <p><strong>Author:</strong> {commit.commit.author.name}</p>
              <p><strong>Date:</strong> {new Date(commit.commit.author.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Branches */}
      <div>
        <h3>Branches</h3>
        <ul>
          {projectData.branches.map((branch) => (
            <li key={branch.name}>
              <p><strong>Branch Name:</strong> {branch.name}</p>
              <p><strong>Commit SHA:</strong> {branch.commit.sha}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Pull Requests */}
      <div>
        <h3>Pull Requests</h3>
        <ul>
          {projectData.pulls.map((pull) => (
            <li key={pull.id}>
              <p><strong>Title:</strong> {pull.title}</p>
              <p><strong>State:</strong> {pull.state}</p>
              <p><strong>Created:</strong> {new Date(pull.created_at).toLocaleString()}</p>
              <p><strong>Assignees:</strong> {pull.assignees.map(assignee => assignee.login).join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Issues */}
      <div>
        <h3>Issues</h3>
        <ul>
          {projectData.issues.map((issue) => (
            <li key={issue.id}>
              <p><strong>Title:</strong> {issue.title}</p>
              <p><strong>State:</strong> {issue.state}</p>
              <p><strong>Created:</strong> {new Date(issue.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Releases (Version Control) */}
      <div>
        <h3>Releases / Version History</h3>
        <ul>
          {projectData.releases.map((release) => (
            <li key={release.id}>
              <p><strong>Version:</strong> {release.tag_name}</p>
              <p><strong>Release Notes:</strong> {release.body}</p>
              <p><strong>Published at:</strong> {new Date(release.published_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDashboard;
