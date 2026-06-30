export default function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden="true">
      {/*
        Blobs are kept FULLY inside the aurora div (which is fixed + overflow:hidden).
        Old values like left:"-10%" or right:"-5%" caused real layout overflow.
        New values keep the blob center inside the viewport; blur handles fade.
      */}
      <div
        className="aurora-blob"
        style={{ width: 560, height: 560, background: '#6366f1', top: '-5%', left: '0%' }}
      />
      <div
        className="aurora-blob"
        style={{ width: 480, height: 480, background: '#8b5cf6', top: '25%', right: '0%', animationDelay: '5s' }}
      />
      <div
        className="aurora-blob"
        style={{ width: 400, height: 400, background: '#06b6d4', bottom: '5%', left: '25%', animationDelay: '10s' }}
      />
    </div>
  );
}
