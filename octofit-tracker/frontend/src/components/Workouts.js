import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
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
        <p className="mt-3">Loading workouts...</p>
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

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      'easy': 'success',
      'beginner': 'success',
      'medium': 'warning',
      'intermediate': 'warning',
      'hard': 'danger',
      'advanced': 'danger'
    };
    return badges[difficulty?.toLowerCase()] || 'secondary';
  };

  return (
    <div className="container mt-4">
      <h2>
        <i className="bi bi-clipboard-heart me-2"></i>
        Workout Suggestions
      </h2>
      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          No workout suggestions found.
        </div>
      ) : (
        <>
          <div className="row">
            {workouts.map(workout => (
              <div key={workout.id} className="col-lg-6 col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-heart-pulse me-2"></i>
                      {workout.name}
                    </h5>
                    <p className="card-text">{workout.description}</p>
                    <div className="mt-3">
                      <p className="mb-2">
                        <i className="bi bi-clock me-2"></i>
                        <strong>Duration:</strong> 
                        <span className="badge bg-info text-dark ms-2">{workout.duration} minutes</span>
                      </p>
                      <p className="mb-2">
                        <i className="bi bi-speedometer2 me-2"></i>
                        <strong>Difficulty:</strong> 
                        <span className={`badge bg-${getDifficultyBadge(workout.difficulty)} ms-2`}>
                          {workout.difficulty}
                        </span>
                      </p>
                      <p className="mb-0">
                        <i className="bi bi-tag me-2"></i>
                        <strong>Category:</strong> 
                        <span className="badge bg-primary ms-2">{workout.category}</span>
                      </p>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button className="btn btn-primary btn-sm w-100">
                      <i className="bi bi-play-circle me-2"></i>
                      Start Workout
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <p className="text-muted">Total Workouts: <strong>{workouts.length}</strong></p>
          </div>
        </>
      )}
    </div>
  );
}

export default Workouts;
