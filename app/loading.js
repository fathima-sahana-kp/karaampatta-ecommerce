

export default function Loading() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-50 text-center py-5">
      {/* Bootstrap Spinner */}
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      
      {/* Loading Title */}
      <h2 className="fs-5 fw-semibold text-dark mb-1">
        Loading products...
      </h2>
      
      {/* Loading Subtext */}
      <p className="small text-muted mx-auto" style={{ maxWidth: "300px" }}>
        Please hold on while we fetch the latest items for you.
      </p>
    </div>
  );
}