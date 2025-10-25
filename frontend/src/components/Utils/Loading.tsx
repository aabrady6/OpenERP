const LoadingIndicator = () => (
  <div
    style={{
      position: 'absolute',
      top: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0,0,0,0.2)',
      zIndex: 1000,
    }}
  >
    Loading...
  </div>
);

export default LoadingIndicator;
