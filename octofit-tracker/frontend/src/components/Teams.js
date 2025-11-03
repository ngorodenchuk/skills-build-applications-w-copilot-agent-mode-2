import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading teams...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2>
        <i className="bi bi-people me-2"></i>
        Teams
      </h2>
      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          No teams found.
        </div>
      ) : (
        <>
          <div className="row">
            {teams.map(team => (
              <div key={team.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-flag me-2"></i>
                      {team.name}
                    </h5>
                    <p className="card-text">{team.description}</p>
                  </div>
                  <div className="card-footer bg-transparent">
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      Created: {new Date(team.created_at).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <p className="text-muted">Total Teams: <strong>{teams.length}</strong></p>
          </div>
        </>
      )}
    </div>
  );
}

export default Teams;
